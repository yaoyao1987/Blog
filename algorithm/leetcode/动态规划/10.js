/**
 * @param {number[]} nums
 * @return {number}
 */
// var lengthOfLIS = function (nums) {
//   if (!nums || !nums.length) return 0;

//   const length = nums.length;

//   let res = 1;
//   let dp = new Array(length + 1).fill(1)

//   for (let i = 1; i < length; i++) {
//     for (let j = 0; j < i; j++) {
//       if (nums[j] < nums[i]) {
//         dp[i] = Math.max(dp[i], dp[j] + 1)
//       }
//     }
//     res = Math.max(res, dp[i]);
//   }
//   return res;
// };

/**
 * @description
 * @author yaoyao1987
 * @date 2020-09-28
 * @param {*} res
 * @param {*} data
 * @returns 
 */
function binarySearch(res, data) {
  const length = res.length;
  let l = 0;
  
  let r = length
  while (l < r) {
    let mid = (l + r) >> 1;
    if (res[mid] < data) {
      l = mid + 1;
    } else {
      r = mid
    }
  }
  res[r] = data
  return res
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const length = nums.length;
  if (length < 2) return length;

  // 记录上升子序列数量
  let max = 0;
  let res = [];
  for (let i = 0; i < length; i++) {
    // 当前值大于上升子序列的最大值则直接增加
    if (nums[i] > res[max]) {
      res.push(nums[i])
      max++
    } else {
      // 二分查找法
      let d = binarySearch(res, nums[i]);
      if (d.length > max) {
        max++
      }
    }
  }
  return max;
};

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));