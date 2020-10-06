// 剑指 Offer 25. 合并两个排序的链表
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  if (l1 && !l2) return l1;
  if (l2 && !l1) return l2;
  let current = new ListNode();
  const dummy = current;
  while (l1 || l2) {
    if (!l1) {
      current.next = l2;
      return dummy.next;
    } else if (!l2) {
      current.next = l1;
      return dummy.next;
    }
    if (l1.val <= l2.val) {
      current.next = l1;
      current = current.next;
      l1 = l1.next;
    } else {
      current.next = l2;
      current = current.next;
      l2 = l2.next;
    }
  }
  return dummy.next;
};
