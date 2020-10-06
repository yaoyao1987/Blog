/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
  this.input = [];
  this.output = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.input.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  while (this.input.length) {
    this.output.push(this.input.pop());
  }
  const item = this.output.pop();
  if (this.output.length) {
    while (this.output.length) {
      this.input.push(this.output.pop());
    }
  }
  return item;
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  while (this.input.length) {
    this.output.push(this.input.pop());
  }
  const item = this.output[this.output.length - 1];
  while (this.output.length) {
    this.input.push(this.output.pop());
  }
  return item;
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  this.input.length == 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
