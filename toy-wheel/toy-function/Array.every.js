Array.prototype.toyEvery = function (callback, thisArg) {
  // 异常处理
  if (this == null) {
    throw new TypeError("Cannot read property 'every' of null or undefined")
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
      let everyedValue = callback.call(args, kValue, k, obj);
      if (!everyedValue) return false;
    }
    k++;
  }
  return true;
}

// ======================================================
/**
 * testing
 */
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
console.log(array1.toyEvery(isBelowThreshold));