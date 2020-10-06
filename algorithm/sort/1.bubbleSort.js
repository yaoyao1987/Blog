// 冒泡排序的思路：遍历数组，然后将最大数沉到最底部；
// 时间复杂度：O(N ^ 2) ；
// 空间复杂度：O(1)
const bubbleSort = (array) => {
  if (array == null || array.length <= 0) return [];
  let length = array.length;
  for (let i = length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
      }
    }
  }
  return array;
}