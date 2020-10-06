/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

var helper = function(root, prev) {
  console.log("root", root);
  console.log("prev", prev);

  if (!root) return true;
  if (!helper(root.left, prev)) return false;
  if (prev && prev.val >= root.val) return false;
  prev = root;

  return helper(root.right, prev);
};
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  let prev = null;
  return helper(root, prev);
};

// 递归法
// var isValid = function(root, min, max) {
//   if (root === null) return true;
//   if (min !== null && root.val <= min) return false;
//   if (max !== null && root.val >= max) return false;

//   return (
//     isValid(root.left, min, root.val) && isValid(root.right, root.val, max)
//   );
// };
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// var isValidBST = function(root) {
//   return isValid(root);
// };

/**
 * @param {TreeNode} root
 * @param {TreeNode} pre 当前节点值的下限
 * @param {TreeNode} next 当前节点值的上限
 * @return {boolean}
 */
var isValidBST = function(root, pre = null, next = null) {
  if (!root) return true;
  // 在这里打印日志可以很好的观察到遍历顺序以及每个节点到底与哪些上下限进行了比较
  // console.log(root && root.val, pre && pre.val, next && next.val);
  if (pre && pre.val >= root.val) return false;
  if (next && next.val <= root.val) return false;
  return isValidBST(root.left, pre, root) && isValidBST(root.right, root, next);
};
