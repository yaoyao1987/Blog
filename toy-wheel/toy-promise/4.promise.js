const { reject } = require("lodash");

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function ToyPromise(fn) {
  let that = this;
  that.value = null;
  that.status = PENDING;
  that.onFulfilledCallbacks = [];
  that.onRejectedCallbacks = [];

  function resolve(value) {
    setTimeout(() => {
      that.status = FULFILLED;
      that.value = value;
      that.onFulfilledCallbacks.forEach(callback => callback(that.value));
    }, 16);
  }

  function reject(error) {
    setTimeout(() => {
      that.status = REJECTED;
      that.error = error;
      that.onRejectedCallbacks.forEach(callback => callback(that.error));
    }, 16);
  }

  fn(resolve, reject)
}

ToyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onRejected);
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value);
  } else if (this.status === REJECTED) {
    onRejected(this.error)
  }
}