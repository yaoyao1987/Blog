import { forEachValue } from '../util'

export default class ModuleCollection {
  constructor(options) {
    this.register([], options)
  }
  getNamespace(path) {
    let module = this.root;
    return path.reduce((namespace, key) => {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + '/' : '')
    })
  }

  register(path, rootModule) {
    let newModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    };

    if (path.length === 0) {
      this.root = newModule;
    } else {
      let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo._children[current]
      }, this.root);
    }
    if (rootModule.modules) {
      forEachValue(rootModule.modules, (module, moduleName) => {
        this.register(path.concat(moduleName), module);
      })
    }
  }
}
