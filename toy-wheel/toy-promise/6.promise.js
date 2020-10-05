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
    if (value instanceof ToyPromise) {
      return value.then(resolve, reject)
    }
    if (that.status === PENDING) {
      setTimeout(() => {
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.forEach(callback => callback(that.value));
      }, 0);
    }

  }

  function reject(error) {
    if (that.status === PENDING) {
      setTimeout(() => {
        that.status = REJECTED;
        that.error = error;
        that.onRejectedCallbacks.forEach(callback => callback(that.error));
      }, 0);
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

ToyPromise.prototype.then = function (onFulfilled, onRejected) {
  let that = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
  let bridgePromise;

  if (that.status === FULFILLED) {
    return bridgePromise = new ToyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0);
    })
  } else if (that.status === REJECTED) {
    return bridgePromise = new ToyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.error)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0);
    })
  } else {
    return bridgePromise = new ToyPromise((resolve, reject) => {
      that.onFulfilledCallbacks.push(value => {
        try {
          let x = onFulfilled(value)
          bridgePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
      that.onRejectedCallbacks.push(error => {
        try {
          let x = onRejected(error)
          bridgePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    })
  }
}

ToyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

ToyPromise.deferred = function () {
  let defer = {};
  defer.promise = new ToyPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  })
  return defer;
}

function resolvePromise(bridgePromise, x, resolve, reject) {
  // 避免循环引用
  if (bridgePromise === x) {
    return reject(new TypeError('Circular reference'))
  }
  let called = false;
  if (x instanceof ToyPromise) {
    if (x.status === PENDING) {
      x.then(y => resolvePromise(bridgePromise, y, resolve, reject), e => reject(e))
    } else {
      x.then(resolve, reject)
    }
  } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = tue;
          resolvePromise(bridgePromise, y, resolve, reject);
        }, error => {
          if (called) return;
          called = true;
          reject(error)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e)
    }
  } else {
    resolve(x)
  }
}

try {
  module.exports = ToyPromise
} catch (e) {

}