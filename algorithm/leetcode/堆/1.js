// 排序后再取k个数
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
  return arr.sort((a, b) => a - b).splice(0, k);
};
