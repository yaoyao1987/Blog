// 插入排序实现思路：将一个新的数，和前面的比较，只要当前数小于前一个则和前一个交换位置，否则终止；
// 时间复杂度：O(N^2)；
// 空间复杂度：O(1)
const insertSort = array => {
  if (!array || array.length <= 0) return [];
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = i - 1; j > 0 && array[j] > array[j + 1]; j--) {
      [array[j], array[j + 1]] = [array[j + 1], array[j]]
    }
  }
  return array
}