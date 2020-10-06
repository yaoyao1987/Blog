/**
 * @param {number} x
 * @return {number}
 */
// var mySqrt = function(x) {
//   if (x == 0 || x == 1) return x;
//   let l = 1;
//   let r = x;
//   let res;

//   while (l <= r) {
//     let m = Math.floor((l + r) / 2);
//     const v = x / m;
//     if (m == v) {
//       return m;
//     } else if (m > v) {
//       r = m - 1;
//     } else {
//       l = m + 1;
//       res = m;
//     }
//   }
//   return res;
// };

// 牛顿迭代法
var mySqrt = function(x) {
  if (x == 0 || x == 1) return x;
  let r = x;
  while (r * r > x) {
    r = ((r + x / r) / 2) | 0;
  }
  return r;
};

console.log(mySqrt(8));
