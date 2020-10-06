/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  const length = prices.length;
  let mp = new Array(length).fill().map(item => [0, 0])
  //当i = 0 手里持有股票，最大利润为 -prices[0]
  mp[0][1] = -prices[0];

  console.log(mp);
  for (let i = 1; i < length; i++) {
    // 手里不持股，比较(1:不动，2:卖了，利润+prices[i])
    mp[i][0] = Math.max(mp[i - 1][0], mp[i - 1][1] + prices[i] - fee);
    // 手里持股，比较(1:不动，2:买了，利润-prices[i])
    mp[i][1] = Math.max(mp[i - 1][1], mp[i - 1][0] - prices[i]);
  }
  return Math.max(mp[n - 1][0], mp[n - 1][1]);
};

let prices = [1, 3, 2, 8, 4, 9], fee = 2

console.log(maxProfit(prices, fee));