/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
  if (num === 0) return [0];
  let result = new Array(num + 1).fill(0);
  for (let i = 1; i <= num; i++) {
    result[i] += result[i & (i - 1)] + 1;
  }
  return result;
};