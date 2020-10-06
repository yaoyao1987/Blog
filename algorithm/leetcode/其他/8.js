let dfs = function(queens, diff, sum) {
  let len = queens.length;

  while (len) {
    
  }
};
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  if (n < 1) return [];

  let result = [];
  dfs([], [], []);

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      console.log(["." * i + "Q" + "." * (i - j - 1)]);
    }
  }
};

console.log(solveNQueens(4));
