/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
  let result = 0;
  let mask = 1;
  for (let i = 0; i < 32; i++) {
    if (n & mask) {
      result += 1;
    }
    mask = mask << 1;
  }
  return result;
};

var hammingWeight = function(n) {
  let result = 0;
  for (; n; n &= n - 1) {
    ++result;
  }
  return result;
};
