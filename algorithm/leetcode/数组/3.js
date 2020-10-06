/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
  const length = nums.length;
  if (!length) return "";
  if (length === 1) return "" + nums[0];
  return nums.sort((a, b) => "" + a + b - ("" + b + a)).join("");
};
