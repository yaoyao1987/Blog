/**
 * @param {number[]} prices
 * @return {number}
 */
// public class Solution {
//   public int maxProfit(int[] prices) {
//     int len = prices.length;
//     if (len < 2) {
//       return 0;
//     }
//     int[][] dp = new int[len][2];
//     dp[0][0] = 0;
//     dp[0][1] = -prices[0];

//     for (int i = 1; i < len; i++) {
//       dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
//       dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
//     }
//     return dp[len - 1][0];
//   }
// }

var maxProfit = function (prices) {
  const length = prices.length;
  if (length < 2) return 0;
  let mp = new Array(length).fill([]).map(item => [0, 0])
  mp[0][1] = - prices[0]

  for (let i = 1; i < length; i++) {
    mp[i][0] = Math.max(mp[i - 1][0], mp[i - 1][1] + prices[i]);
    mp[i][1] = Math.max(mp[i - 1][1], - prices[i])
  }
  return mp[length - 1][0];
};

console.log('maxProfit', maxProfit([7, 1, 5, 3, 6, 4]));