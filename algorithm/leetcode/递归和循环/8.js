/**
 * @param {number} target
 * @return {number[][]}
 */
// var findContinuousSequence = function(target) {
//   if (target < 2) return [];
//   let limit = (target - 1) / 2;
//   let sum = 0;
//   const result = [];
//   let res = [];
//   for (let i = 0; i <= limit; i++) {
//     for (let j = i; ; ++j) {
//       sum += j;
//       if (sum > target) {
//         sum = 0;
//         break;
//       } else if (sum === target) {
//         res = [];
//         for (let k = i; k <= j; ++k) res.push(k);
//         result.push(res);
//         sum = 0;
//         break;
//       }
//     }
//   }
//   return result;
// };

var findContinuousSequence = function(target) {
  let i = 1; // 滑动窗口左边界
  let j = 1; // 滑动窗口右边界
  let sum = 0; // 滑动窗口中数字的和
  const result = [];
  const limit = target / 2;

  while (i <= limit) {
    if (sum < target) {
      // 右边界向右移
      sum += j;
      j++;
    } else if (sum > target) {
      // 左边界向右移动
      sum -= i;
      i++;
    } else {
      // 记录结果
      // let arr = new Array(j - i).fill().map((v, l) => l + i); // 性能差一点
      let arr = [];
      for (let k = i; k < j; k++) {
        arr.push(k);
      }
      result.push(arr);
      // 左边界向右移动
      sum -= i;
      i++;
    }
  }

  return result;
};

const target = 15;
const result = findContinuousSequence(target);
console.log("result", result);
