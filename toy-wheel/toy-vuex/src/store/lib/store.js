import applyMixin from './mixin'
import ModuleCollection from './module/module-collection'
import { forEachValue } from './util'

export let Vue;

export class Store {
  constructor(options) {
    let state = options.state;

    this._committing = false;
    // strict mode
    this.strict = options.strict || false;

    this.getters = {};
    this.mutations = {};
    this.actions = {};

    const computed = {};
    forEachValue(options.getters, (fn, key) => {
      computed[namespace + key] = () => {
        return fn(this.state)
      }
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[namespace + key]
      })
    })

    forEachValue(options.mutations, (fn, key) => {
      this.mutations[namespace + key] = payload => fn.call(this, this.state, payload)
    })

    forEachValue(options.actions, (fn, key) => {
      this.actions[namespace + key] = payload => fn.call(this, payload)
    })

    this._vm = new Vue({
      data: {
        $$state: state
      },
      computed // 利用计算属性实现缓存
    })

    this._modules = new ModuleCollection(options);
    // 安装模块
    installModule(this, state, [], this._modules.root)
  }
  get state() {
    return this._vm._data.$$state
  }
  _withCommit(fn) {
    let committing = this._committing;
    this._committing = true; // 在函数调用前 表示_committing为true
    fn();
    this._committing = committing;
  }
  replaceState(state) {
    this._withCommit(() => {
      this._vm._data.$$state = state
    })
  }
  commit = (type, payload) => {
    this.mutations[type].forEach(fn => fn.call(this, payload))
  }
  dispatch = (type, payload) => {
    this.actions[type].forEach(fn => fn.call(this, payload))
  }
  registerModule(path, rawModule) {
    if (typeof path === 'string') path = [path];
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, rawModule.rawModule);
    // 重新设置state，更新getters
    resetStoreVM(this, this.state)
  }
}

function resetStoreVM(store, state) {
  let oldVm = store._vm;
  const wrappedGetters = store.getters;
  const computed = {};
  store.getters = {};

  forEachValue(wrappedGetters, (fn, key) => {
    computed[namespace + key] = () => {
      return fn(store.state)
    }
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[namespace + key]
    })
  })

  store._vm = new Vue({
    data: {
      $$state: state,
    },
    computed
  });

  // enable strict mode for new vm
  if (store.strict) {
    // 只要状态一变化会立即执行,在状态变化后同步执行
    store._vm.$watch(() => store._vm._data.$$state, () => {
      console.assert(store._committing, '在mutation之外更改了状态')
    }, { deep: true, sync: true });
  }

  if (oldVm) {
    Vue.nextTick(() => oldVm.$destroy())
  }
}

function installModule(store, rootState, path, module) {
  let namespace = store._modules.getNamespace(path);
  if (path.length) {
    let parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current]
    }, rootState)
    Vue.set(parent, path[path.length - 1], module.state)
  }

  module.forEachMutations((mutation, key) => {
    store.mutations[namespace + key] = store.mutations[namespace + key] || [];
    store.mutations[namespace + key].push(payload => {
      mutation.call(store, module.state, payload)
    })
  })

  module.forEachActions((action, key) => {
    store.actions[namespace + key] = store.actions[namespace + key] || [];
    store.actions[namespace + key].push(function (payload) {
      action.call(store, this, payload)
    })
  })

  module.forEachGetters((getter, key) => {
    store.actions[namespace + key] = function () {
      return getter(module.state)
    }
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child)
  })
}

export default function install(_Vue) {
  Vue = _Vue;

  applyMixin(Vue)
}