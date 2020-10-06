var generateOneByOne = function(sublist, result, left, right) {
  if (!left && !right) {
    result.push(sublist);
  }
  if (left > 0) {
    generateOneByOne(sublist + "(", result, left - 1, right);
  }
  if (right > left) {
    generateOneByOne(sublist + ")", result, left, right - 1);
  }
};
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let result = [];
  generateOneByOne("", result, n, n);
  return result;
};
