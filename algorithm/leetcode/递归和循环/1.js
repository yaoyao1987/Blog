/**
 * @param {number} n
 * @return {number}
 */
// var numWays = function(n) {
//   if (n <= 1) return 1;
//   let dp = [1, 1, 2];
//   const Max = 1e9 + 7;
//   for (let i = 3; i <= n; i++) {
//     dp[i] = (dp[i - 1] + dp[i - 2]) % Max;
//   }
//   return dp[n];
// };

const numWays = function(n) {
  if (n <= 1) return 1;
  let cur = 1;
  let pre = 1;
  let result = 2;
  const MOD = 1e9 + 7;
  for (let i = 3; i <= n; i++) {
    pre = cur;
    cur = result;
    result = (cur + pre) % MOD;
  }
  return result;
};

const n = 7;
const result = numWays(n);
console.log("result", result);
