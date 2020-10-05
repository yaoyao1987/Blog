// https://juejin.im/post/6844903617619558408
// 1. 基础版
function ToyPromise(fn) {
  let that = this; // 缓存当前promise实例
  that.value = null; // 成功时的值
  that.error = null; // 失败时的原因
  that.onFulfilled = null; // 成功的回调函数
  that.onRejected = null; // 失败的回调函数

  function resolve(value) {
    that.value = value;
    that.onFulfilled(that.value) // resolve 时执行成功回调
  }

  function reject(error) {
    that.error = error
    that.onRejected(that.error) // reject 时执行成功回调
  }

  fn(resolve, reject)
}

ToyPromise.prototype.then = function (onFulfilled, onRejected) {
  this.onFulfilled = onFulfilled
  this.onRejected = onRejected
}

module.exports = ToyPromise

// ======================================================
/**
 * testing
 */