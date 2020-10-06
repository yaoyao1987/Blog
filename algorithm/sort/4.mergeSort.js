// 归并排序的思路：
// 1.先左侧部分排好序
// 2.再右侧部分排好序
// 3.再准备一个辅助数组，用外排的方式，小的开始填，直到有个动到末尾，将另一个数组剩余部分拷贝到末尾
// 4.再将辅助数组拷贝回原数组
// 时间复杂度:O(N * logN)
// 空间复杂度:O(N)

const { merge, ary } = require("lodash");

// 递归实现
// const mergeSort = array => {
//   if (!array || array.length <= 0) return [];
//   sortProcess(array, 0, array.length - 1);
//   return array
// }

// function sortProcess(array, left, right) {
//   // 递归的终止条件
//   if (left == right) {
//     return;
//   }
//   let middle = left + ((right - left) >> 1); // 找出中间值
//   sortProcess(array, left, middle); // 对左侧部分进行递归
//   sortProcess(array, middle + 1, right); // 对右侧部分进行递归
//   merge(array, left, middle, right); // 然后利用外排方式进行结合
// }

// function merge(array, left, middle, right) {
//   let help = [];
//   let l = left;
//   let r = middle + 1;
//   let index = 0;
//   // 利用外排方式进行
//   while (l <= middle && r <= right) {
//     help[index++] = arr[l] < arr[r] ? arr[l++] : arr[r++];
//   }
//   while (l <= middle) {
//     help.push(arr[l++])
//   }
//   while (r <= right) {
//     help.push(arr[r++])
//   }

//   array.splice(left, help.length, ...help);
// }

// 循环实现
const mergeSort = array => {
  if (!array || array.length <= 0) return [];
  let length = array.length;

  for (let i = 1; i < length; i *= 2) {
    let index = 0; // 第一组的起始索引
    while (2 * i + index <= length) {
      index += i * 2;
      merge(array, index - 2 * i, index - i, index);
    }
    // 说明剩余两个小组，但其中一个小组数据的数量已经不足2的幂次方个
    if (index + i < length) {
      merge(array, index, index + 1, length)
    }
  }

  return array
}

//利用外排的方式进行结合
function merge(array, start, middle, right) {
  // 辅助数组
  let help = [];
  let l = start;
  let r = middle;
  let i = 0;
  while (l < middle && r < right) {
    help[i++] = array[l] < array[r] ? array[l++] : array[r++];
  }
  while (l < middle) {
    help[i++] = array[l++]
  }
  while (r < right) {
    help[i++] = array[r++]
  }
  array.splice(left, help.length, ...help);
}