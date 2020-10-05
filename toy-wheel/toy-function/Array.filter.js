Array.prototype.toyFilter = function (callback, thisArg) {
  // 异常处理
  if (this == null) {
    throw new TypeError("Cannot read property 'filter' of null or undefined")
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + " is not a function")
  }

  let obj = Object(this);
  let len = obj.length >>> 0;
  let args = thisArg
  let res = []
  let k = 0;

  while (k < len) {
    if (k in obj) {
      let kValue = obj[k];
      let filteredValue = callback.call(args, kValue, k, obj);
      if (filteredValue) {
        res.push(kValue);
      }
    }
    k++;
  }
  return res;
}

// ======================================================
/**
 * testing
 */

var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
function filterItems1(query) {
  return fruits.filter(function (el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}

function filterItems2(query) {
  return fruits.toyFilter(function (el) {
    console.log(el);
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}

console.log(filterItems1('ap')); // ['apple', 'grapes']
console.log(filterItems2('an')); // ['banana', 'mango', 'orange']