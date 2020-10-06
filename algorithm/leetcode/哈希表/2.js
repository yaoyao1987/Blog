/**
 * @param {string} s
 * @return {character}
 */
// var firstUniqChar = function(s) {
//   let cached = {};
//   let length = s.length;
//   let result = " ";
//   for (let i = 0; i < length; i++) {
//     if (cached[s[i]]) {
//       cached[s[i]] = -1;
//     } else {
//       cached[s[i]] = s[i];
//     }
//   }

//   for (const key in cached) {
//     if (cached[key] !== -1) {
//       result = cached[key];
//       break;
//     }
//   }
//   return result;
// };

var firstUniqChar = function(s) {
  let cached = new Map();
  const length = s.length;
  for (let i = 0; i < length; i++) {
    if (cached.get(s[i])) {
      cached.set(s[i], -1);
    } else {
      cached.set(s[i], 1);
    }
  }

  for (const key of cached.keys()) {
    if (cached.get(key) === 1) {
      return key;
    }
  }
  return " ";
};

let s = "loveleetcode";
let result = firstUniqChar(s);
console.log("result", result);
