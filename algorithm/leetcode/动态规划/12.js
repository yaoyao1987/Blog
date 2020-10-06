/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let m = word1.length;
  let n = word2.length
  if (!n) return m
  if (!m) return n

  // mp[i][j], i代表word1的前i个字符，j代表word2前j个字符.整体代表word1的前i个字符替换word2前j个字符的最少次数
  let dp = new Array(m + 1).fill().map(item => new Array(n + 1).fill(0))

  for (let i = 0; i < m + 1; i++) {
    for (let j = 0; j < n + 1; j++) {
      if (i === 0) {
        dp[0][j] = j;
        continue;
      }
      if (j === 0) {
        dp[i][0] = i;
        continue;
      }
      let count = word1[i - 1] === word2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j - 1] + count, dp[i - 1][j] + 1, dp[i][j - 1] + 1)
    }
  }
  return dp[m][n]
};

let word1 = "horse", word2 = "ros"
console.log(minDistance(word1, word2));