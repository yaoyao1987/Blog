// hash法
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  if (nums.length === 1) return nums[0];
  let cached = Object.create(null);
  let length = nums.length;
  for (let i = 0; i < length; i++) {
    if (cached[nums[i]]) {
      cached[nums[i]]++;
      if (cached[nums[i]] > length / 2) {
        return nums[i];
      }
    } else {
      cached[nums[i]] = 1;
    }
  }
  return null;
};

// 摩尔投票法,通过不断消除不同元素直到没有不同元素
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let count = 1;
  let majority = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      majority = nums[i];
    }
    if (nums[i] === majority) {
      count++;
    } else {
      count--;
    }
  }
  return majority;
};

const nums = [1];
const result = majorityElement(nums);
console.log("result", result);
