/**
 * 替换空格
 * @param {string} s
 * @return {string}
 */
// var replaceSpace = function(s) {
//   return s == null || !s.length ? s : s.replace(/\s/g, '%20');
// };

var replaceSpace = function(s) {
  let length = s.length;
  let array = new Array(length * 3);
  let size = 0;
  for (let i = 0; i < length; i++) {
    const char = s[i];
    if (char == ' ') {
      array[size++] = '%';
      array[size++] = '2';
      array[size++] = '0';
    } else {
      array[size++] = char;
    }
  }
  return array.join('');
};

var s = 'We are happy.';
console.log(replaceSpace(s));
