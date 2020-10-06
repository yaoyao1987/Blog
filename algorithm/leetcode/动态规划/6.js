/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const length = prices.length;
  if (length < 2) return 0;
  // mp[i][k][j], i代表天数，k代表交易次数，j代表是否持有股票
  let mp = new Array(length).fill([]).map(item => [[0, 0], [0, 0], [0, 0]])
  // let mp = new Array(length).fill().map(item => new Array(3).fill().map(() => [0, 0]))
  console.log(mp);

  //当i = 0, 手里持有股票，因最大利润为 -prices[0]
  mp[0][0][1] = - prices[0]
  mp[0][1][1] = - prices[0]
  mp[0][2][1] = - prices[0]

  for (let i = 1; i < length; i++) {
    for (let k = 1; k <= 2; k++) {
      // 手里不持股，比较(1:不动，2:卖了，利润+prices[i])
      mp[i][k][0] = Math.max(mp[i - 1][k][0], mp[i - 1][k][1] + prices[i]);
      // 手里持股，比较(1:不动，2:买了，利润-prices[i])
      mp[i][k][1] = Math.max(mp[i - 1][k][1], mp[i - 1][k - 1][0] - prices[i]);
    }
  }

  return mp[length - 1][2][0];
};

console.log('maxProfit', maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));
