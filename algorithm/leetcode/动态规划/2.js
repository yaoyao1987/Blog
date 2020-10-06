const { min } = require("lodash");

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  const length = triangle.length;
  let mini = triangle[length - 1];
  for (let i = length - 2; i >= 0; --i) {
    for (let j = 0; j < triangle[i].length; ++j) {
      mini[j] = triangle[i][j] + Math.min(mini[j], mini[j + 1]);
      console.log(mini[j]);
    }
  }
  return mini[0];
};

const triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];

console.log("minimumTotal", minimumTotal(triangle));
