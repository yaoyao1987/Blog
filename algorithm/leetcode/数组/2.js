// var exchange = function(nums) {
//   const length = nums.length;
//   const oddArr = []; // 奇数
//   const evenArr = []; // 偶数

//   for (let i = 0; i < length; i++) {
//     const num = nums[i];
//     // 偶数
//     if (!(num % 2)) {
//       evenArr.push(num);
//     } else {
//       oddArr.push(num);
//     }
//   }
//   return [...oddArr, ...evenArr];
// };

// var exchange = function(nums) {
//   const oddArr = []; // 奇数
//   const evenArr = []; // 偶数

//   nums.forEach((num) => {
//     num % 2 ? oddArr.push(num) : evenArr.push(num);
//   });

//   return [...oddArr, ...evenArr];
// };
