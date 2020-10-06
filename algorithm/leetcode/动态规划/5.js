/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const length = prices.length;
  if (length < 2) return 0;
  let mp = new Array(length).fill([]).map(item => [0, 0])
  mp[0][1] = - prices[0]

  for (let i = 1; i < length; i++) {
    mp[i][0] = Math.max(mp[i - 1][0], mp[i - 1][1] + prices[i]);
    mp[i][1] = Math.max(mp[i - 1][1], mp[i - 1][0] - prices[i])
  }
  return mp[length - 1][0];
};

console.log('maxProfit', maxProfit([7, 1, 5, 3, 6, 4]));
