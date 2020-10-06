// 亚瑟夫环
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
// var lastRemaining = function(n, m) {
//   if (n === 1) return 0;
//   var current = 0;
//   var result = new Array(n).fill().map((val, i) => i);
//   while (result.length > 1) {
//     current = (current + m - 1) % result.length;
//     result.splice(current, 1);
//   }
//   return result[0];
// };

var lastRemaining = function(n, m) {
  if (n === 1) return 0;
  let res = 0;
  for (let i = 2; i <= n; i++) {
    res = (res + m) % i;
  }
  return res;
};

var n = 5,
  m = 3;
var result = lastRemaining(n, m);
console.log("result", result);
