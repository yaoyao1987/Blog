# Vue

[Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)

## Vue 响应式原理

Vue2.x 的响应式是通过`Object.defineProperty`来对数据进行劫持，并结合观察者模式实现。利用`Object.defineProperty`创建一个`observe`来劫持监听所有属性，把这些属性全部转为`getter`和`setter`。每个组件实例都会有一个对应的`watcher`实例，它会在组件渲染的过程中把使用过的数据属性通过`getter`收集依赖。

## Vue 高级特性

- 自定义 v-model
- \$nextTick
- slot
- 动态、异步组件
- keep-alive
- mixin

## 1. vue
