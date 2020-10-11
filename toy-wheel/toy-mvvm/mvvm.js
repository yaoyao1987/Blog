const CompileUtil = {
  setValue(vm, expr, value) {
    expr.split('.').reduce((data, current, index, arr) => {
      if (index === arr.length - 1) {
        return data[current] = value;
      }
    }, vm.$data)
  },
  // 根据表达式取到对应的数据
  getVal(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },
  model(node, expr, vm) { // node是节点 expr是表达式 vm是当前实例
    let fn = this.updater['modelUpdater']
    new Watcher(vm, expr, newVal => {
      fn(node, newVal)
    })
    node.addEventListener('input', e => {
      let value = e.target.value;
      this.setValue(vm, expr, value)
    })
    // 给输入框赋予value属性
    let value = this.getVal(vm, expr);
    fn(node, value)
  },
  html(node, expr, vm) {
    let fn = this.updater['htmlUpdater'];
    new Watcher(vm, expr, newVal => {
      fn(node, newVal);
    })
    let value = this.getVal(vm, expr);
    fn(node, value)
  },
  on(node, expr, vm, eventName) {
    node.addEventListener(eventName, (e) => {
      vm[expr].call(vm, e);
    })
  },
  text(node, expr, vm) {
    let fn = this.updater['textUpdater'];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      let arg = args[1].trim();
      // 给每个{{}}加watcher
      new Watcher(vm, arg, () => {
        fn(node, this.getContentValue(vm, expr))
      })
      return this.getVal(vm, arg)
    })
    fn(node, content)
  },
  getContentValue(vm, expr) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      let arg = args[1].trim();
      return this.getVal(vm, arg)
    })
  },
  updater: {
    // 把数据插入到节点中
    modelUpdater(node, value) {
      node.value = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    // 处理文本节点
    textUpdater(node, value) {
      node.textContent = value;
    }
  }
}
// 观察者 (发布订阅)
class Dep {
  constructor() {
    this.subs = []; // 存放所有的watcher
  }
  // 订阅
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 默认先存放一个旧值
    this.oldValue = this.get()
  }
  get() {
    Dep.target = this; // 把自己放在this上
    // 取值 把观察者和数据关联起来
    let value = CompileUtil.getVal(this.vm, this.expr);
    Dep.target = null;
    return value
  }
  update() {
    // 更新操作 数据变化后 会调用观察者的update方法
    let newValue = CompileUtil.getVal(this.vm, this.expr);
    if (newValue !== this.oldValue) {
      this.cb(newValue)
    }
  }
}
// 实现数据劫持
class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    // 如果是对象才观察
    if (data && typeof data === 'object') {
      for (const key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(obj, key, value) {
    this.observer(value);
    let dep = new Dep(); // 给每个属性都加上一个具有发布订阅的功能
    Object.defineProperty(obj, key, {
      get() {
        // 创建watcher时，会取到对应的内容，并且把watcher放到全局上
        Dep.target && dep.addSub(Dep.target)
        return value;
      },
      set: (newVal) => {
        if (newVal !== value) {
          this.observer(newVal);
          value = newVal
          dep.notify();
        }
      }
    })
  }
}
class Compiler {
  constructor(el, vm) {
    this.vm = vm;
    // 判断el属性，是否一个元素，如果不是元素就获取它
    this.el = this.isElementNode(el) ? el : document.querySelector(el);

    // 把当前节点中的元素获取后放到内存中
    let fragment = this.node2Fragment(this.el);

    // 把节点中的内容进行替换

    // 编译模板 用数据编译
    this.compile(fragment)
    // 把内容插入到页面中
    this.el.appendChild(fragment);
  }
  // 判断是否元素节点
  isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE
  }
  node2Fragment(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = node.firstChild) {
      // appendChild具有移动性
      fragment.appendChild(firstChild)
    }
    return fragment;
  }
  // 用来编译内存中的dom节点
  compile(node) {
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child)
        // 如果是元素，把自己传进去，再去遍历子节点
        this.compile(child)
      } else {
        this.compileText(child)
      }
    })
  }
  // 编译元素
  compileElement(node) {
    let attributes = node.attributes;
    [...attributes].forEach(attribute => {
      let { name, value: expr } = attribute;
      // 判断是否指令
      if (this.isDirective(name)) {
        let [, directive] = name.split('-')
        let [directiveName, eventName] = directive.split(":")
        // 调用不同的指令来处理
        CompileUtil[directiveName](node, expr, this.vm, eventName);
      }
    });
  }
  // 编译文本
  compileText(node) {
    let content = node.textContent;
    // 判断当前文本节点中内容是否包含{{}}
    if (/\{\{(.+?)\}\}/.test(content)) {
      // 文本节点
      CompileUtil['text'](node, content, this.vm)
    }
  }
  // 判断是否指令
  isDirective(attrName) {
    if (attrName.startsWith('v-')) return true
    return false;
  }
}
class MVVM {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    let computed = options.computed
    let methods = options.methods;

    // 根元素存在则编译模板
    if (this.$el) {
      // 吧数据全部转化成用Object.defineProperty来定义
      new Observer(this.$data);

      for (const key in computed) {
        Object.defineProperty(this.$data, key, {
          get: () => {
            return computed[key].call(this)
          }
        })
      }

      for (const key in methods) {
        Object.defineProperty(this, key, {
          get() {
            return methods[key]
          }
        })
      }

      // vm上的取值操作，都代理到vm.$data;
      this.proxyVm(this.$data);

      new Compiler(this.$el, this);
    }
  }
  proxyVm(data) {
    for (const key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    }
  }
}

export default MVVM;