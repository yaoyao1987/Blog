Array.prototype.toyReduce = function (callback, initialValue) {
  // 异常处理
  if (this == null) {
    throw new TypeError("Cannot read property 'reduce' of null or undefined")
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + " is not a function")
  }

  let obj = Object(this)
  let len = obj.length >>> 0;
  let k = 0;
  let value;
  if (initialValue) {
    value = initialValue
  } else {
    while (k < len && !(k in obj)) {
      k++
    }
    if (k >= len) {
      throw new TypeError('Reduce of empty array ' +
        'with no initial value');
    }
    value = obj[k++]
  }

  while (k < len) {
    if (k in obj) {
      value = callback(value, obj[k], obj)
    }
    k++
  }
  return value
}

// ======================================================
/**
 * testing
 */

var initialValue = 0;
var sum1 = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(function (accumulator, currentValue) {
  return accumulator + currentValue.x;
}, initialValue)
var sum2 = [{ x: 1 }, { x: 2 }, { x: 3 }].toyReduce(function (accumulator, currentValue) {
  return accumulator + currentValue.x;
}, initialValue)

console.log(sum1) // logs 6
console.log(sum2) // logs 6
