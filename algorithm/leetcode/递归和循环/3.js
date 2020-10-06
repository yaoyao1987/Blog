/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function(n) {
  const length = Number("".padStart(n, "9"));
  return new Array(length).fill().map((v, i) => i + 1);
};

var printNumbers = function(n) {
  const length = Number("".padStart(n, "9"));
  return Array.from({ length }, (item, index) => index + 1);
};

const n = 1;
const result = printNumbers(n);
console.log("result", result);
