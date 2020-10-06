/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  if (!head || !head.next) return head;
  let dummy = new ListNode(-1);
  dummy.next = head;

  let prev = dummy;
  let first, second;

  while (prev.next && prev.next.next) {
    // 赋值
    first = prev.next;
    second = first.next;

    // swap
    prev.next = second;
    first.next = second.next;
    second.next = first;
    
    prev = first;
  }
  return dummy.next
};