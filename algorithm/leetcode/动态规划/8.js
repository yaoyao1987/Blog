/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const length = prices.length;

  if (length <= 1) return 0;

  if (k >= length / 2) {
    let profit = 0;
    for (let i = 0; i < length - 1; i++) {
      if (prices[i + 1] > prices[i]) {
        profit += prices[i + 1] - prices[i];
      }
    }
    return profit
  }

  // mp[i][k][j], i代表天数，k代表交易次数，j代表是否持有股票
  let mp = new Array(length).fill().map(item => new Array(k + 1).fill().map(() => [0, 0]))

  for (let i = 0; i < length; i++) {
    for (let j = 1; j <= k; j++) {
      //当i = 0 手里持有股票，最大利润为 -prices[0]
      if (i === 0) {
        mp[0][j][1] = - prices[0];
        continue;
      }
      // // 手里不持股，比较(1:不动，2:卖了，利润+prices[i])
      mp[i][j][0] = Math.max(mp[i - 1][j][0], mp[i - 1][j][1] + prices[i]);
      // // 手里持股，比较(1:不动，2:买了，利润-prices[i])
      mp[i][j][1] = Math.max(mp[i - 1][j][1], mp[i - 1][j - 1][0] - prices[i]);
    }
  }
  return mp[length - 1][k][0]
};

// console.log('maxProfit', maxProfit(1, [1, 2]));
// console.log('maxProfit', maxProfit(2, [1, 2, 4]));
// console.log('maxProfit', maxProfit(2, [3, 3, 5, 0, 0, 3, 1, 4]));
