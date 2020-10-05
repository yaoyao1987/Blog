function Parent(name) {
  this.name = name;
}

function Child(age, name) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child

Child.prototype.sayAge = function () {
  console.log(this.age)
}

// ======================================================
/**
 * testing
 */
const child = new Child(18, 'Jack')
child.sayName()
child.sayAge()