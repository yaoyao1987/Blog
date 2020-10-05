Function.prototype.toyCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError("Uncaught TypeError:Cannot read property 'call' of " + typeof this);
  }
  const fn = Symbol("fn");
  context = context || window;
  context[fn] = this;
  let result = context[fn](...args);
  delete context[fn];
  return result;
}

// ======================================================
/**
 * testing
 */

let test = {
  name: 'test'
}
let o = {
  name: 'o',
  fn: function () {
    console.log(this.name);
  }
}
o.fn() // "o"
o.fn.call(test) // "test"
o.fn.toyCall(test) // "test"