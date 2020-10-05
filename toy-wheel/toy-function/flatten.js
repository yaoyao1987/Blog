// 1. 使用flat()
// const flatten = arr => arr.flat(Infinity)

// 2. 利用正则
// const flatten = arr => JSON.stringify(arr).replace(/\[|\]/g, '').split(',')

// 3. 正则改良版
// const flatten = arr => JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')

// 4. reduce
// const flatten = arr => arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flatten(cur) : cur), [])

// 5. 函数递归
const flatten = arr => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

// ======================================================
/**
 * testing
 */

const arr = [1, [2, [3, [4, 5]]], 6];
console.log(flatten(arr));
