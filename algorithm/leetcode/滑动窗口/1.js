// 双端队列
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  const length = nums.length;

  if (!length) return [];

  let idxArr = [],
    res = [];

  for (let i = 0; i < length; i++) {
    if (i >= k && idxArr[0] <= i - k) {
      idxArr.shift();
    }
    while (idxArr && nums[idxArr[idxArr.length - 1]] <= nums[i]) {
      idxArr.pop();
    }
    idxArr.push(i);
    if (i >= k - 1) {
      res.push(nums[idxArr[0]]);
    }
  }
  return res;
};

// const nums = [1, -1],
//   k = 1;

// const nums = [9,11],
//   k = 2;

// const nums = [7, 2, 4],
//   k = 2;

const nums = [1, 3, 1, 2, 0, 5],
  k = 3;

console.log(maxSlidingWindow(nums, k));
