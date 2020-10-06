var twoSum = function(nums, target) {
  const length = nums.length;

  if (!length) return [];

  let map = new Map();
  let temp = null;

  for (let i = 0; i < length; i++) {
    temp = nums[i];
    if (map.has(target - temp)) {
      return [map.get(target - temp), i];
    }
    map.set(temp, i);
  }
  return [];
};

const nums = [2, 7, 11, 15],
  target = 9;
const result = twoSum(nums, target);
console.log("result", result);
