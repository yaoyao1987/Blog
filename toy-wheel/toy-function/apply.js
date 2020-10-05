/**
 * 思路：将要改变this指向的方法挂到目标this上执行并返回
 * @param {*} context 
 * @param {*} args 
 */
Function.prototype.toyApply = function (context, args) {
  if (typeof this !== 'function') {
    throw new TypeError("Uncaught TypeError:Cannot read property 'apply' of " + typeof this);
  }

  context = context || window;
  const fn = Symbol('fn')
  context[fn] = this;

  let result = args ? context[fn](...args) : context[fn]
  delete context[fn]
  return result
}

// ======================================================
/**
 * testing
 */

/* 找出数组中最大/小的数字 */
var numbers = [5, 6, 2, 3, 7];

/* 使用Math.max以及apply 函数时的代码 */
var max1 = Math.max.apply(null, numbers);
var max2 = Math.max.toyApply(null, numbers);