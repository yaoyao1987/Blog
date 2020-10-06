/**
 * @param {number[]} numbers
 * @return {number}
 */
// var minArray = function(numbers) {
//   if(!numbers.length) return
//   return Math.min(...numbers);
// };
var minArray = function(numbers) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const mid = left + ((right - left) >>> 1);
    if (numbers[mid] > numbers[right]) {
      left = mid + 1;
    } else if (numbers[mid] == numbers[right]) {
      right--;
    } else {
      right = mid;
    }
  }
  return numbers[left];
};

var arr = [3, 4, 5, 1, 2];
var result = minArray(arr);
console.log(result);
