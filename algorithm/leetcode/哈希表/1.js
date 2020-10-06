/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
  if (n == 1) return 1;

  let res = [1];

  let a = 0; // 下个数字永远 * 2
  let b = 0; // 下个数字永远 * 3
  let c = 0; // 下个数字永远 * 5

  for (let i = 1; i < n; i++) {
    res[i] = Math.min(res[a] * 2, res[b] * 3, res[c] * 5);
    if (res[i] === res[a] * 2) {
      ++a;
    }
    if (res[i] === res[b] * 3) {
      ++b;
    }
    if (res[i] === res[c] * 5) {
      ++c;
    }
  }
  return res[n - 1];
};

let n = 10;
let result = nthUglyNumber(n);
console.log("result", result);
