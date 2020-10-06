/**
* 判断left是不是right类型的对象
* @param {*} left
* @param {*} right
* @return {Boolean}
*/
function toyInstanceOf(left, right) {
  let proto = left.__proto__;
  let prototype = right.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__
  }
}