// 剑指 Offer 18. 删除链表的节点

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {
  let result = new ListNode(-1);
  result.next = head;

  let node = result;

  while (node) {
    if (node.next.val === val) {
      node = node.next.next;
      break;
    }
    node = node.next;
  }
  return result.next;
};
