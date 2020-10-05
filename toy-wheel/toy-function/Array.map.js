Array.prototype.toyMap = function (callback, thisArg) {
  // 异常处理
  if (this == null) {
    throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  // callback 不是函数时抛出异常
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // 1. 转成数组对象，有 length 属性和 K - V 键值对
  let obj = Object(this);
  // 无符号右移 0 位，左侧用 0 填充，结果非负
  let len = obj.length >>> 0;
  let args = thisArg;
  let res = new Array(len);
  let k = 0;

  while (k < len) {
    if (k in obj) {
      let kValue = obj[k];
      res[k] = callback.call(args, kValue, k, obj)
    }
    k++;
  }

  // 返回新数组
  return res;
}

// ======================================================
/**
 * testing
 */

var numbers = [1, 4, 9];
var doubles1 = numbers.map(function (num) {
  return num * 2;
});
var doubles2 = numbers.toyMap(function (num) {
  return num * 2;
});

console.log(doubles1);
console.log(doubles2);