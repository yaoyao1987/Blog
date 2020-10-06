// 排序后再取k个数
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
  return arr.sort((a, b) => a - b).splice(0, k);
};

// const arr = [3, 2, 1];
const arr = [4, 5, 1, 6, 2, 7, 3, 8];
const k = 4;
const result = getLeastNumbers(arr, k);
console.log("result", result);
