/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let dx = [-1, 1, 0, 0];
  let dy = [0, 0, -1, 1];
  let maxX = grid.length;
  let maxY = grid[0].length;
  let visited = [];
  function dfs(x, y) {
    if (!isValid(x, y)) return 0;
    visited.push([x, y]);
    for (let i = 0; i < 4; i++) {
      dfs(x + dx[i], y + dy[i])
    }
    return 1;
  }

  function isValid(x, y) {
    if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
      return false;
    }
    if (grid[x, y] === '0') {
      return false
    }
    return true;
  }
  let result = 0;
  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      result += dfs(i, j)
    }
  }
  return result;
};



console.log(numIslands([
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0']
]))

// console.log(numIslands([
//   ['1', '1', '0', '0', '0'],
//   ['1', '1', '0', '0', '0'],
//   ['0', '0', '1', '0', '0'],
//   ['0', '0', '0', '1', '1']
// ]))