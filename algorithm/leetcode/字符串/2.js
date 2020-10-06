/**
 * 字符串的全排列
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
  let arr = s.split('');
  let result = new Set();
  let path = []; // 第几层
  let visited = [];
  dfs(arr, path, result, visited);
  return result;
};

function dfs(arr, path, result, visited) {
  if (arr.length === path.length) {
    result.add(path.join(''));
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) {
      continue;
    }

    visited[i] = true;
    path.push(arr[i]);
    dfs(arr, path, result, visited);
    path.pop();
    visited[i] = false;
  }
}
var s = 'abc';
var result = permutation(s);
console.log('result', result);
