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
var minDepth = function(root) {
  if (!root) return 0;
  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);

  const leftMinDepth = minDepth(root.left);
  const rightMinDepth = minDepth(root.right);

  return 1 + Math.min(leftMinDepth, rightMinDepth);
};

var minDepth = function(root) {
  if (!root) return 0;

  let queue = [root];
  let min = 1;

  while (queue.length) {
    let len = queue.length;
    while (len) {
      let node = queue.shift();

      if (!node.left && !node.right) {
        return min;
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      len--;
    }
    min++;
  }
};
