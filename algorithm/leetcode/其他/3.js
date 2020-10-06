/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  const length = prices.length;
  let res = 0;
  for (let i = 0; i < length - 1; i++) {
    const temp = prices[i + 1] - prices[i];
    if (temp > 0) {
      res += temp;
    }
  }
  return res;
};

const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices));
