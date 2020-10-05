// 定义三种状态
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED'

function ToyPromise(fn) {
  let that = this;
  that.value = null;
  that.status = PENDING;
  that.onFulfilled = null;
  that.onRejected = null;

  function resolve(value) {
    setTimeout(() => {
      that.status = FULFILLED;
      that.value = value
      that.onFulfilled(that.value)
    }, 16);
  }

  function reject(error) {
    setTimeout(() => {
      that.status = REJECTED
      that.value = value
      that.onRejected(that.error)
    }, 16);
  }

  fn(resolve, reject)
}

ToyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value)
  } else if (this.status === REJECTED) {
    onRejected(this.error)
  }
  return this;
}