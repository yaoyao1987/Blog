/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  const length = nums.length;
  if (!length) return 0;

  let dp = [
    [0, 0],
    [0, 0],
  ];
  dp[0][1] = nums[0];
  dp[0][0] = nums[0];
  let res = nums[0];

  for (let i = 1; i < length; i++) {
    let tmp = nums[i];
    let x = i % 2;
    let y = (i - 1) % 2;
    dp[x][0] = Math.max(dp[y][0] * tmp, dp[y][1] * tmp, tmp);
    dp[x][1] = Math.min(dp[y][0] * tmp, dp[y][1] * tmp, tmp);
    res = Math.max(res, dp[x][0]);
  }
  return res;
};

console.log(maxProduct([2, 3, -2, 4]));
