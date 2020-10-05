const { reject } = require("lodash");

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function ToyPromise(fn) {
  let that = this;
  that.status = PENDING;
  that.value = null;
  that.error = null;
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
      that.status = reject;
      that.error = error;
      that.onRejectedCallbacks.forEach(callback => callback(that.error));
    }, 16);
  }
  fn(resolve, reject)
}

ToyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  let bridgePromise;
  // 防止使用者不传成功或失败回调函数，所以成功失败回调都给了默认回调函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

  if (that.status === FULFILLED) {
    return bridgePromise = new ToyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 16);
    })
  } else if (that.status === REJECTED) {
    return bridgePromise = new ToyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.error)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 16);
    })
  } else if (that.status === PENDING) {
    return bridgePromise = new ToyPromise((resolve, reject) => {
      that.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
      that.onRejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

ToyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

// 用来解析回调函数的返回值x，x可能是普通值也可能是个promise对象
function resolvePromise(bridgePromise, x, resolve, reject) {
  // 如果x是一个promise
  if (x instanceof ToyPromise) {
    //如果这个promise是pending状态，就在它的then方法里继续执行resolvePromise解析它的结果，直到返回值不是一个pending状态的promise为止
    if (x.status === PENDING) {
      x.then(y => { resolvePromise(bridgePromise, y, resolve, reject), error => reject(error) })
    } else {
      x.then(resolve, reject);
    }
  } else {
    // 如果 x 是一个普通值，就让 bridgePromise 的状态 fulfilled，并把这个值传递下去
    resolve(x)
  }
}