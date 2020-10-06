// 选择排序的实现思路：遍历数组，把最小数放在头部；
// 时间复杂度：O(N^2)；
// 空间复杂度：O(1)
const SelectionSort = array => {
  if (!array || array.length <= 0) return;
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = 0; j < length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex;
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]]
  }
  return array;
}