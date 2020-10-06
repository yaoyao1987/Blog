// 2个位都是1的时候，结果才是1
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
  let res = 0;
  while (n) {
    n = n & (n - 1);
    res++;
  }
  return res;
};

let n = 9;
let result = hammingWeight(n);
console.log("result", result);
