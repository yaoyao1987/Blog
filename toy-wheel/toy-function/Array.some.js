Array.prototype.toySome = function (callback, thisArg) {
  // 异常处理
  if (this == null) {
    throw new TypeError("Cannot read property 'some' of null or undefined")
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + " is not a function")
  }

  let obj = Object(this);
  let len = obj.length >>> 0;
  let args = thisArg;
  let k = 0;

  while (k < len) {
    if (k in obj) {
      let kValue = obj[k];
      let result = callback.call(args, kValue, k, obj);
      if (result) return true;
    }
    k++;
  }
  return false;
}

// ======================================================
/**
 * testing
 */
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
console.log(array.toySome(even));