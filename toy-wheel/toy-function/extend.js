/**
 * 寄生组合继承的核心代码，只需要调用 1 次父类的构造函数
 * @param {Function} sub 子类
 * @param {Function} parent 父类
 */
const inheritPrototype = (sub, parent) => {
  // 拿到父类的模型
  let prototype = Object.create(parent.prototype)
  // 改变constructor指向
  prototype.constructor = sub;
  // 父类原型赋值给子类
  sub.prototype = prototype;

  // 静态变量
  const staticKeys = Object.entries(parent);
  const len = staticKeys.length;
  for (let i = 0; i < len; i++) {
    const key = staticKeys[i][0];
    const value = staticKeys[i][1];
    sub[key] = value;
  }
}

// ======================================================
/**
 * testing
 */

function Parent(name) {
  this.name = name;
}
// 静态属性
Parent.typeName = '人类'

Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child(age, name) {
  Parent.call(this, name); // 只调用了1次构造函数
  this.age = age;
}

// 继承
inheritPrototype(Child, Parent);

Child.prototype.sayAge = function () {
  console.log(this.age)
}

const child = new Child(18, 'Jack')
child.sayName()
child.sayAge()