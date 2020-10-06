// hash方法
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  const length = s.length;
  if (length !== t.length) return false;

  const hash = {};

  for (let i = 0; i < length; i++) {
    const key1 = s[i];
    const key2 = t[i];
    hash[key1] = hash[key1] ? hash[key1] + 1 : 1;
    hash[key2] = hash[key2] ? hash[key2] - 1 : -1;
  }

  for (const value in hash) {
    if (hash[value] !== 0) {
      return false;
    }
  }
  return true;
};

const s = "anagram",
  t = "nagaram";
console.log(isAnagram(s, t));
