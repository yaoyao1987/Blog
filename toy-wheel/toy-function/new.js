// new 操作符接受一个构造器和一组调用参数
// 1. 以构造器的 prototype 属性（注意与私有字段[[prototype]]的区分）为原型，创建新对象；
// 2. 将 this 和调用参数传给构造器，执行
// 3. 如果构造器返回的是对象，则返回，否则返回第一步创建的对象
// function toyNew() {
//   const obj = {};  // 创建了一个全新的对象。
//   const Constructor = [].shift.call(arguments) //取得外部传入的构造器
//   obj.__proto__ = Constructor.prototype; //指向正确的原型
//   let result = Constructor.apply(obj, arguments) // 借用外部传入的构造器给obj设置属性
//   return result instanceof Object ? r : obj; // 确保构造器总是返回一个对象
// }

// __proto__ 在IE浏览器中不支持
// 优化版
function toyNew(fn, ...arg) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, arg);
  return ret instanceof Object ? ret : obj;
}

// ======================================================
/**
 * testing
 */

function Animal(type) {
  this.type = type; // 实例上的属性
}
Animal.prototype.say = function () {
  console.log(this.type);
};

let animal = new Animal("哺乳类动物");

console.log(animal.type);
animal.say();

let animal1 = toyNew(Animal, 'cat');

console.log(animal1.type);
animal1.say();
