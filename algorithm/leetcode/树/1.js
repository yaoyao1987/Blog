/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {};

const preorder = [3, 9, 20, 15, 7];
const inorder = [9, 3, 15, 20, 7];
const result = buildTree(preorder, inorder);
console.log("result", result);
