function ToyPromise(fn) {
  let that = this
  that.value = null;
  that.error = null;
  that.onFulfilled = null;
  that.onRejected = null;

  function resolve(value) {
    // 利用 setTimeout 特性将具体执行放到 then 之后
    setTimeout(() => {
      that.value = value
      that.onFulfilled(that.value)
    }, 16);
  }
  function reject(error) {
    setTimeout(() => {
      that.error = error
      that.onRejected(that.error)
    }, 16);
  }
  fn(resolve, reject)
}

ToyPromise.prototype.then = function (onFulfilled, onRejected) {
  this.onFulfilled = onFulfilled;
  this.onRejected = onRejected;
}

module.exports = ToyPromise

// ======================================================
/**
 * testing
 */