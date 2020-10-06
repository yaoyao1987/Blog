// 剑指 Offer 06. 从尾到头打印链表
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
  let node = head;
  let result = [];
  while (node) {
    result.push(node.val);
    node = node.next;
  }
  return result.reverse();
};
