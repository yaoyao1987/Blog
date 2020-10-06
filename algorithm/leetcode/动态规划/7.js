/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const length = prices.length;
  if (length < 2) return 0;
  // mp[i][j], i代表天数，j代表是否持有股票, 0表示不持有，1表示冷冻，2表示持有
  let mp = new Array(length).fill([]).map(item => [0, 0, 0])
  
  //当i = 0 手里持有股票，最大利润为 -prices[0]
  mp[0][2] = - prices[0]

  for (let i = 1; i < length; i++) {
    // 手里不持股，比较(1:不动，2:卖了，利润+prices[i])
    mp[i][0] = Math.max(mp[i - 1][0], mp[i - 1][1]);
    // 手里不持股，冷冻期
    mp[i][1] = mp[i - 1][2] + prices[i];
    // 手里持股，比较(1:不动，2:买了，利润-prices[i])
    mp[i][2] = Math.max(mp[i - 1][2], mp[i - 1][0] - prices[i]);
  }
  return Math.max(mp[length - 1][0], mp[length - 1][1]);
};

console.log('maxProfit', maxProfit([1, 2, 3, 0, 2]));
