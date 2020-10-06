/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// var myPow = function(x, n) {
//   return x ** n;
// };

var myPow = function(x, n) {
  if (+x === 0) return 0;
  if (n === 0) return 1;

  let res = 1;
  let flag = n < 0 ? true : false;
  n = n > 0 ? n : -n;

  while (n > 0) {
    if (n % 2) res = res * x;
    x *= x;
    n >>>= 1;
  }

  return flag ? 1 / res : res;
};

const x = 2.0;
const n = -2;
const result = myPow(x, n);
console.log("result", result);
