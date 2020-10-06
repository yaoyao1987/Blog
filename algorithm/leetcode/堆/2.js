// 1.数组排序并保存前k个值
// 2.add的值比前k值小则剔除
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
  this.minHeap = nums.sort((a, b) => b - a).slice(0, k);
  this.k = k;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  let length = this.minHeap.length;
  for (let i = 0; i < length; i++) {
    if (val >= this.minHeap[i]) {
      length = i;
      break;
    }
  }
  this.minHeap.splice(length, 0, val);
  return this.minHeap[this.k - 1]
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// 小顶堆：根结点为最小值，每个结点的值小于或等于其孩子结点的值
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 调整堆
function heapify(arr, len, i) {
  while (true) {
    if (i >= len) return;
    let leftChildIndex = 2 * i + 1;
    let rightChildIndex = 2 * i + 2;
    let max = i;
    if (leftChildIndex < len && arr[leftChildIndex] < arr[max]) {
      max = leftChildIndex;
    }
    if (rightChildIndex < len && arr[rightChildIndex] < arr[max]) {
      max = rightChildIndex;
    }
    if (max != i) {
      swap(arr, max, i);
      i = max;
    } else {
      return;
    }
  }
}

// 构建小顶堆
function buildHeap(arr, len) {
  let lastNodeIndex = len - 1;
  let lastNodeParentIndex = (lastNodeIndex - 1) >> 1;
  for (let i = lastNodeParentIndex; i >= 0; i--) {
    heapify(arr, len, i);
  }
}

var KthLargest = function(k, nums) {
  this.nums = nums.sort((a, b) => b - a);
  this.k = k;
  if (this.nums.length >= this.k) {
    this.nums.length = this.k;
    buildHeap(this.nums, this.nums.length);
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  if (this.nums.length < this.k) {
    this.nums.push(val);
    buildHeap(this.nums, this.nums.length);
    if (this.nums.length < this.k) {
      return undefined;
    } else {
      return this.nums[0];
    }
  }
  if (val <= this.nums[0]) {
    return this.nums[0];
  }
  this.nums[0] = val;
  heapify(this.nums, this.nums.length, 0);
  return this.nums[0];
};

let k = 3;
let nums = [4, 5, 8, 2];
var obj = new KthLargest(k, nums);
var param_1 = obj.add(3); // returns 4
var param_2 = obj.add(5); // returns 5
var param_3 = obj.add(10); // returns 5
var param_4 = obj.add(9); // returns 8
var param_5 = obj.add(4); // returns 8
console.log("param_1", param_1);
console.log("param_2", param_2);
console.log("param_3", param_3);
console.log("param_4", param_4);
console.log("param_5", param_5);
