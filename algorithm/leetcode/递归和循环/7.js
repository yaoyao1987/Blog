/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    if (nums[left] + nums[right] > target) {
      right--;
    } else if (nums[left] + nums[right] === target) {
      return [nums[left], nums[right]];
    } else {
      left++;
    }
  }
};

const nums = [10, 26, 30, 31, 47, 60],
  target = 40;
const result = twoSum(nums, target);
console.log("result", result);
