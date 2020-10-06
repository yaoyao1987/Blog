/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// var getKthFromEnd = function(head, k) {
//   let node = head;
//   let cached = [];
//   while (node) {
//     cached.push(node);
//     node = node.next;
//   }
//   const length = cached.length;
//   const len = (length - k) % length;
//   return cached[len];
// };

var getKthFromEnd = function(head, k) {
  let node = head;
  let cached = new Map();
  let i = 0;
  while (node) {
    cached.set(i, node);
    i++;
    node = node.next;
  }
  return cached.get(i - k);
};
