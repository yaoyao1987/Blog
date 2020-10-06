// ES5
// function curry(fn, args) {
//   var length = fn.length;
//   var args = args || []
//   return function () {
//     var newArgs = args.concat(Array.prototype.slice.call(arguments));
//     if (newArgs.length < length) {
//       return curry.call(this, fn, newArgs)
//     }
//     return fn.apply(this, newArgs)
//   }
// }

// ES6
// ======================================================
const curry = (fn, arr = []) => (...args) => ((arg) => (arg.length === fn.length ? fn(...arg) : curry(fn, arg)))([...arr, ...args])

// ES5
function unCurry(fn) {
  return function () {
    var args = [].slice.call(arguments, 1)
    return fn.apply(arguments[0], args);
  }
}
// ES6
const unCurry = (fn) => (args) => fn.apply(arguments[0], args)

// ======================================================
/**
 * testing
 */

function multiFn(a, b, c) {
  return a * b * c;
}
var multi = curry(multiFn);

console.log(multi(2)(3)(4));
console.log(multi(2, 3, 4));
console.log(multi(2)(3, 4));
console.log(multi(2, 3)(4));