/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
  let res = 0;
  let div = 1;
  let a = 0;
  let b = 0;
  for (let num of nums) {
    res ^= num;
  }

  while ((div & res) === 0) {
    div <<= 1;
  }
  for (const num of nums) {
    if (div & num) {
      a ^= num;
    } else {
      b ^= num;
    }
  }
  return [a, b];
};

let nums = [1,2,10,4,1,4,3,3];
let result = singleNumbers(nums);
console.log("result", result);
