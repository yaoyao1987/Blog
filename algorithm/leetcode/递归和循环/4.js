const { max } = require("lodash");

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  if (matrix == null || matrix.length == 0 || matrix[0].length) {
    return matrix;
  }

  let result = [];
  let y = matrix.length;
  let x = matrix[0].length;
  let length = x * y;
  let top = 0;
  let right = x;
  let bottom = y;
  let left = 0;

  for (let i = 0; i < length; i++) {
    if (left < right && top < bottom) {
      result.push(matrix[top][i]);
    }
  }
};

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
// const matrix = [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12],
// ];
const result = spiralOrder(matrix);
console.log("result", result);
