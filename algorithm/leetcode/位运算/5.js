/**
 * @param {number} n
 * @return {boolean}
 */
// 内置方法
// var isPowerOfTwo = function(n) {
//   return Number.isInteger(Math.log2(n));
// };

// var isPowerOfTwo = function(n) {
//   if (n < 1) return false;

//   return n & (n - 1) ? false : true;
// };

var isPowerOfTwo = function(n) {
  return n > 0 && !(n & (n - 1));
};

console.log(isPowerOfTwo(4));
