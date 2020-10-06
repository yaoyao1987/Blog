// 剑指 Offer 53 - I. 在排序数组中查找数字 I

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  if (!nums.length) return 0;
  const length = nums.length;
  let left = 0;
  let right = length - 1;
  let mid = Math.floor((left + right) / 2);
  let result = 0;

  while (left <= mid) {
    if (nums[left] > target) break;
    if (nums[left] === target) {
      result++;
    }
    left++;
  }

  while (right > mid) {
    if (nums[right] < target) break;
    if (nums[right] === target) {
      result++;
    }
    right--;
  }
  return result;
};

let nums = [5, 7, 7, 8, 8, 10],
  target = 8;
// let nums = [1, 3],
//   target = 1;

let result = search(nums, target);

console.log(result);
