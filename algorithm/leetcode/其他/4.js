/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// dfs,深度优先搜索
// var dfs = function(node, level, res) {
//   if (!node) return;
//   if (!res[level]) res[level] = [];
//   res[level].push(node.val);
//   dfs(node.left, level + 1, res);
//   dfs(node.right, level + 1, res);
// };
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// var levelOrder = function(root) {
//   if (!root) return [];
//   let result = [];
//   dfs(root, 0, result);
//   return result;
// };

// bfs，广度优先搜索
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) return [];
  let result = [];
  let queue = [root];

  while (queue.length) {
    let len = queue.length;
    let arr = [];
    while (len) {
      let node = queue.shift();
      arr.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      len--;
    }
    result.push(arr);
  }
  return result;
};
