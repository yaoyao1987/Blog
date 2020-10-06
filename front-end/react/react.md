# React

## 写 React/Vue 项目时为什么要在列表组件中写 key，其作用是什么？

作用：在更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。key 是给每一个 vnode 的唯一 ID，可以依靠 key 更准确、更快速得拿到缓存的旧的虚拟节点中对应的虚拟 vnode。

## react16 新生命周期，有什么变化

两个 static、一个 didcatch 捕获错误的、一个 getsnapshot

## react16 之前的那些不好的生命周期怎么过度到 react16 的新生命周期

getDriverStateFromProps 替代 componentWillReceiveProps，加上逻辑对比上次 state 和 props 来决定 state。willupdate 换成 getSnapshotBeforeUpdate，willmount 直接写成初始 state（react16 的 state 不先写出来是 null，你需要先在 class 组件里面写一下 state = {...}）

## componentWillReceiveProps 用到了 this，getDriverStateFromProps 也要用，怎么办

把 this.xxx 存到 state 里面，第二个参数是 state，里面有 xxx（有点挫，懂的人应该都有同样的感受吧，如果是函数组件，一个 useRef 保存一下即可）。另外的方法，如果和内部变量无关，把它抠到 class 组件外面去

## react 性能优化

scu 生命周期、memo；usememo & usecallback 记住一些值不用重新计算；虚拟列表；immutable+scu/memo；原生 js

## 长列表优化，多种方案及对比

虚拟列表、intersectionobserver、监听滚动长列表+raf

## diff 算法、key 作用，不要 key 会怎样

树 diff、组件 diff、元素 diff；key 可以原地复用，没有 key 无脑会更新（此时你可以发现，index 做 key 其实会形同虚设）

## react 的 usememo 原理

闭包、缓存、memorize

## react 生命周期和 diff 算法

新的、旧的，hook 替代的。树、组件、列表三种 diff

## key 的作用

复用元素，描述一下有 key 的列表 diff 过程

## 内部系统配置页面不写或少写代码的实现思路

新建页面 => 设置配置、db => 新页面 onload => 拉配置，根据 db 的字段和配置渲染表格 => 配置不能满足的使用装饰器劫持实现个性化 => 业务代码&框架代码分离(微前端架构)

## 多框架、历史页面怎么解决

旧页面 iframe、新页面走上面的流程，多框架使用 external + 动态引入

## react 生命周期介绍，怎么执行。说一下下面的组件生命周期执行顺序【描述】有<A> <B /> </A>这样的组件：

```
a.willMount 3
b.willMount 1
a.didMount 4
b.didMount 2
```

react16 前是递归的，是这个顺序。react16 后改成 fiber 架构，是反过来的了，没有像栈那样 fifo

## redux vs context，为什么不用 context

随意修改，莫名其妙的 bug。redux 将这个过程规范化，单向数据流

## react 17 要做什么规划，concurrent mode

concurrent mode、去掉危险的生命周期。concurrent mode 是 react 重点面试题了，基于 requestidlecallback 实现(考虑兼容性，官方自己实现了一个)——浏览器空闲的时候做事情

## react 的 class 组件和函数组件有什么不同

class 组件有生命周期有状态、函数组件就看返回值无状态(现在有 hook 了)

## class 组件存在问题，函数组件的问题

class 组件随着项目变大生命周期逻辑过于耦合、庞大，函数组件可以更细粒。class 组件需要走实例化流程，但可以使用装饰器。函数组件就不能使用装饰器了，函数组件 ref 需要 forwardRef，不用纠结 this。如果代码量都很多，函数组件可读性高一些

## class 组件和函数组件 diff、渲染、挂载过程差异

其实是一样的，最终结果有点不一样，可以看打包后代码

## 如果 react 项目要接入 redux，每一步要怎么做

从 api 的使用到源码的实现。源码流程：provider 传入 store，connect 要 return 一个组件，使用 mapstatetoprops 和 mapdispatchtoprops 扩展 props，然后 subscribe 一下 store，每次变化更新组件

