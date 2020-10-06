/**
 * @param {string} str
 * @return {number}
 */
// var myAtoi = function(str) {
//   const INT_MIN = -Math.pow(2, 31);
//   const INT_MAX = -INT_MIN - 1;
//   let number = '';
//   let sign = null;
//   str = str.trim();
//   for (let i = 0; i < str.length; i++) {
//     const c = str[i];
//     if (i === 0 && ['+', '-'].includes(c)) {
//       sign = c;
//       number += c;
//       continue;
//     }
//     if (isNaN(c) || c == ' ') break;
//     if (!isNaN(c)) {
//       number += c;
//     }
//   }

//   if (number > INT_MAX || number === Infinity) {
//     number = INT_MAX;
//   }

//   if (number < INT_MIN || number === -Infinity) {
//     number = INT_MIN;
//   }

//   if (number === '+' || number === '-') {
//     number = 0;
//   }

//   if (isNaN(Number(number))) {
//     number = 0;
//   }

//   return Number(number);
// };
// var myAtoi = function(str) {
//   const INT_MIN = -Math.pow(2, 31);
//   const INT_MAX = -INT_MIN - 1;
//   const length = str.length;
//   let number = '';
//   let startIndex = 0;
//   let sign = null;

//   // 过滤空字符串
//   while (startIndex < length && str[startIndex] === ' ') {
//     startIndex++;
//   }

//   // 第一个非空字符是否是符号，如果是保留符号
//   if (['+', '-'].includes(str[startIndex])) {
//     sign = str[startIndex];
//     number += str[startIndex];
//     startIndex++;
//   }

//   while (startIndex < length && !isNaN(str[startIndex])) {
//     if (str[startIndex] === ' ') break;
//     number += str[startIndex];
//     startIndex++;
//   }

//   if (number === '+' || number === '-') {
//     number = 0;
//   }

//   number = Number(number);
//   if(number < INT_MIN) {
//     return INT_MIN
//   } else if(number > INT_MAX) {
//     return INT_MAX
//   } else {
//     return number
//   }
// };

var myAtoi = function(str) {
  const INT_MIN = -Math.pow(2, 31);
  const INT_MAX = -INT_MIN - 1;
  const number = parseInt(str, 10);
  console.log(isNaN(number));
  return !isNaN(number) ? (number > INT_MAX ? INT_MAX : number < INT_MIN ? INT_MIN : number) : 0;
};
// var test = myAtoi('   -42');
// var test = myAtoi('42');
// var test = myAtoi('4193 with words');
// var test = myAtoi('words and 987');
// var test = myAtoi('-91283472332');
// var test = myAtoi('91283472332');
// var test = myAtoi('+');
// var test = myAtoi(' +-2');
var test = myAtoi('    -88827   5655  U');
console.log('test', test);
