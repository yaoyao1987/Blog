const { has } = require("lodash");

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  const length = nums.length;
  if (length === 1) return nums[0];

  let hash = {};
  let res = new Set();
  for (let i = 0; i < length; i++) {
    const item = nums[i];
    if (hash[item]) {
      hash[item]++;

      if (hash[item] > length / 2) {
        res.add(item);
      }
    } else {
      hash[item] = 1;
    }
  }
  return [...res];
};

const nums = [3, 2, 3];
console.log(majorityElement(nums));
