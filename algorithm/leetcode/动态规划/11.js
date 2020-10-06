/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const length = coins.length
  if (!length) return 0;

  let dp = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < length; j++) {
      if (coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount]
};

let coins = [1, 2, 5], amount = 11
console.log('coinChange', coinChange(coins, amount));
console.log('coinChange', coinChange([2], 3));