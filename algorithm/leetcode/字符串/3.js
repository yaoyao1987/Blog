/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let arr = s.trim().split(' ');

  return arr.reduceRight((accumulator, currentValue) => {
    return currentValue ? accumulator.trim() + ' ' + currentValue.trim() : accumulator;
  });
};

let str = 'a good   example';
// "world! hello "
let result = reverseWords(str);
console.log('result', result);
