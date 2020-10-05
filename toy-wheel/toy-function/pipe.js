// pipe 函数跟compose函数的作用是一样的，也是将参数平铺，区别在它的顺序是从左往右的
// ES5
const pipe = function () {
  const args = [].slice.apply(arguments);
  return function (x) {
    return args.reduce((res, cb) => cb(res), x)
  }
}

// ES6
const pipe = (...fns) => (...args) => fns.reduce((a, b) => b(a), ...args)
// ======================================================
/**
 * testing
 */