/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = (root) => {
  if (!root) return 0;
  const leftMaxDepth = maxDepth(root.left);
  const rightMaxDepth = maxDepth(root.right);
  return 1 + Math.max(leftMaxDepth, rightMaxDepth);
};

const maxDepth = (root) => {
  if (!root) return 0;
  let queue = [root];
  let max = 1;
  while (queue.length) {
    let len = queue.length;
    while (len) {
      let node = queue.shift();

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      len--;
    }
    if (queue.length) max++;
  }
  return max;
};