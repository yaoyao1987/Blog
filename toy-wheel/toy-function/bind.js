// ES5
// Function.prototype.toyBind = function (context, args) {
//   if (typeof this !== 'function') {
//     throw new TypeError("Uncaught TypeError:Cannot read property 'bind' of " + typeof this);
//   }

//   var that = this;
//   var fNOP = function () { };
//   var fBound = function () {
//     var bindArgs = [].slice.call(arguments);
//     return that.apply(
//       this instanceof fNOP ? this : context,
//       args.concat(bindArgs)
//     );
//   };
//   fNOP.prototype = this.prototype;
//   fBound.prototype = new fNOP();
//   return fBound;
// };

// ES6
Function.prototype.toyBind = function (context, args) {
  if (typeof this !== 'function') {
    throw new TypeError("Uncaught TypeError:Cannot read property 'bind' of " + typeof this);
  }

  const that = this;

  return function F() {
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    return that.apply(context, [args, ...arguments])
  }
}

// ======================================================
/**
 * testing
 */

function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
  return arg1 + arg2
}

// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList1 = list.bind(null, 37);
var list1 = leadingThirtysevenList1();

var leadingThirtysevenList2 = list.toyBind(null, 37);
var list2 = leadingThirtysevenList2();

console.log(list1);
console.log(list2);