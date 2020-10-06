var findNumberIn2DArray = function(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;
  let y = matrix.length - 1;
  let x = 0;
  while (x < matrix[0].length && y >= 0) {
    if (matrix[y][x] > target) {
      y--;
    } else if (matrix[y][x] < target) {
      x++;
    } else {
      return true;
    }
  }
  return false;
};
