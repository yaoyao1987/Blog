import { forEachValue } from '../util'

export default class Module {
  constructor(rawModule) {
    this._children = {};
    this._rawModule = rawModule;
    this.state = rawModule.state;
  }
  get namespaced() {
    return !!this._rawModule.namespaced;
  }
  getChild(key) {
    return this._children[key]
  }
  addChild(key, module) {
    this._children[key] = module
  }
  forEachMutations(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
  forEachActions(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }
  forEachGetters(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }
  forEachChild(fn) {
    forEachValue(this._children, fn);
  }
}