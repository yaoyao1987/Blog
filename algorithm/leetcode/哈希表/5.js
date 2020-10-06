/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var threeSum = function(nums) {
//   const length = nums.length;
//   if (length < 3) return [];
//   nums = nums.sort();
//   let res = new Set();
//   for (let i = 0; i < length; i++) {
//     const element = nums[i];
//     if (i >= 1 && element == nums[i - 1]) {
//       continue;
//     }
//     const d = {};
//     for (const key in nums[i + 1]) {
//       if (d.includes(key)) {
//         res.add(element, [-element - key, key]);
//       } else {
//         d[-element - key] = 1;
//       }
//     }
//   }
//   return new Map(res);
// };

var threeSum = function(nums) {
  const length = nums.length;
  if (length < 3) return [];
  nums = nums.sort((a, b) => a - b);

  let res = {};
  let hash = {};
  for (let i = 0; i < length - 2 && nums[i] <= 0; i++) {
    const item = nums[i];
    if (i >= 1 && item == nums[i - 1]) {
      continue;
    }
    hash = {};
    for (let j = i + 1; j < length; j++) {
      const value = nums[j];
      const temp = -item - value;

      if (hash[temp]) {
        // res.set(`${item}, ${temp}, ${value}`, [item, temp, value]);
        res[`${item}, ${temp}, ${value}`] = [item, temp, value];
      } else {
        hash[value] = 1;
      }
    }
  }
  return Object.values(res);
};

// var threeSum = function(nums) {
//   let arr = []
//   if(nums == null || nums.length < 3) return arr;
//   nums.sort((a, b) => a - b)
//   for(var i =0; i<nums.length-2; i++){
//     const hashMap = new Map()
//     if(nums[i] > 0) break;
//     // 去重处理
//     if(i > 0 && nums[i] == nums[i-1]) continue
//     for(var j =i+1; j<nums.length; j++){
//       const dif = -(nums[i]+nums[j])
//       // 去重处理
//       // 因为hashMap是首次记录第二次才会push到数组，所以需要判断只有三次重复才能continue
//       if(j>i+2 && nums[j]==nums[j-1] && nums[j]==nums[j-2])
//         continue
//       if(hashMap.has(dif)){
//         arr.push([nums[i],nums[hashMap.get(dif)],nums[j]])
//         hashMap.delete(dif)
//       }
//       hashMap.set(nums[j],j)
//     }
//   }
//   return arr
// };

// const nums = [-1, 0, 1, 2, -1, -4];
// const nums = [1, 2, -2, -1];
const nums = [0, 0, 0, 0];
console.log(threeSum(nums));
