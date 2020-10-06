var reverseList = function(head) {
  if (!head || !head.next) return head;
  let node = head;
  let prev = null;
  while (node) {
    const temp = node.next;
    node.next = prev; // next 是上一个 prev 的 node
    prev = node;
    node = temp;
  }
  return prev;
};
