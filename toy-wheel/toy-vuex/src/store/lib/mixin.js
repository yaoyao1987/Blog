const applyMixin = Vue => {
  Vue.mixin({
    beforeCreate: vuexInit
  })
}

function vuexInit() {
  const options = this.$options;
  if (options.store) {
    // 给根实例增加$store属性
    this.$store = options.store;
  } else if (options.parent && options.parent.$store) {
    // 给组件增加$store属性
    this.$store = options.parent.$store
  }
}

export default applyMixin