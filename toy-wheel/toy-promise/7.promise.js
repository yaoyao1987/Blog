/**
 * 一起学习造轮子（一）：从零开始写一个符合Promises/A+规范的promise https://juejin.im/post/6844903617619558408
 * Promises/A+规范 https://promisesaplus.com/ https://segmentfault.com/a/1190000002452115
 */
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function ToyPromise(fn) {
  const that = this;
  that.status = PENDING;
  that.value = null;
  that.error = null;
  that.onFulfilledCallbacks = []
  that.onRejectedCallbacks = []

  function resolve(value) {
    if (value instanceof ToyPromise) {
      return value.then(resolve, reject);
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
        that.onRejectedCallbacks.forEach((callback) => callback(that.error));
      }, 0);
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

function resolvePromise(bridgePromise, x, resolve, reject) {
  // 2.3.1规范，避免循环引用
  if (bridgePromise === x) {
    return reject(new TypeError('避免循环引用'))
  }

  let called = false;

  // 2.3.3规范，如果 x 为对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      // 是否是thenable对象（具有then方法的对象/函数）
      //2.3.3.1 将 then 赋为 x.then
      let then = x.then;
      if (typeof then === 'function') {
        // 2.3.3.3 如果 then 是一个函数，以x为this调用then函数，且第一个参数是resolvePromise，第二个参数是rejectPromise
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(bridgePromise, y, resolve, reject);
        }, e => {
          if (called) return;
          called = true;
          reject(e);
        })
      } else {
        // 2.3.3.4 如果 then不是一个函数，则以x为值fulfill promise。
        resolve(x);
      }
    } catch (e) {
      // 2.3.3.2 如果在取x.then值时抛出了异常，则以这个异常做为原因将promise拒绝。
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 规范 2.3.4，x 为基本类型，则以 x 为值 fulfill promise
    resolve(x)
  }
}

ToyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  let bridgePromise;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };

  if (that.status === FULFILLED) {
    return bridgePromise = new ToyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e)
        }
      }, 0);
    })
  } else if (that.status === REJECTED) {
    return bridgePromise = new ToyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e)
        }
      }, 0);
    })
  } else if (that.status === PENDING) {
    return bridgePromise = new ToyPromise((resolve, reject) => {
      that.onFulfilledCallbacks.push(value => {
        try {
          let x = onFulfilled(value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      that.onRejectedCallbacks.push(error => {
        try {
          let x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    })
  }
}

ToyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

ToyPromise.all = function (promises) {
  return new ToyPromise(function (resolve, reject) {
    let result = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function (data) {
        result[i] = data;
        if (++count === promises.length) {
          resolve(reject)
        }
      }, function (error) {
        reject(error)
      })
    }
  })
}

ToyPromise.race = function (promises) {
  return new ToyPromise(function (resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function (data) {
        resolve(data);
      }, function (error) {
        reject(error)
      })
    }
  })
}

ToyPromise.resolve = function (value) {
  return new ToyPromise(resolve => {
    resolve(value)
  })
}

ToyPromise.reject = function (error) {
  return new ToyPromise((resolve, reject) => {
    reject(error)
  })
}

ToyPromise.promisify = function (fn) {
  return function () {
    var args = Array.from(arguments);
    return new ToyPromise(function (resolve, reject) {
      fn.apply(null, args.concat(function (err) {
        err ? reject(err) : resolve(arguments[1])
      }));
    })
  }
}

// 执行测试用例需要用到的代码
ToyPromise.deferred = function () {
  let defer = {};
  defer.promise = new ToyPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
}

try {
  module.exports = ToyPromise;
} catch (e) {

}