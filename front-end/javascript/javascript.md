## javascript 基础

https://github.com/mqyqingfeng/Blog
https://zhuanlan.zhihu.com/p/93639500

衡量一个语言是否是面向对象的时候，应该是衡量这个语言是否符合面向对象的本质特征和设计思想。

面向对象是相对于面向过程来讲的，面向对象实际上是一种对**现实世界理解和抽象**的方法，只要能把事物很好的抽象出来，就可以算是面向对象。JavaScript 利用原型或类来抽象和复用对象，是一种基于原型的面向对象。

对象三要素：

- 对象具有唯一标识性
- 对象有状态
- 对象具有行为

### 1. 基本类型(Primitive)

6 种原始值：

- boolean
- null
- undefined
- number
- string
- symbol

**boolean**
boolean 类型有两个值，true 和 false，用于表示逻辑意义上的真和假。

**null**
null 类型表示"定义了但是为空"，它的类型只有一个值，就是 null。

**undefined**
undefined 类型表示"未定义"，它的类型只有一个值，就是 undefined。undefined 不是一个关键字，所以为了避免无意中被篡改，建议使用 void 0 来获取 undefined 值。

**number**
number 类型有 2<sup>64</sup> - 2<sup>53</sup> + 3 个值。符合 IEEE754 规定的双精度浮点数规则。JavaScript 为了表达几个额外的语言场景，规定了几个例外情况：

- NaN，占用了 9007199254740990
- Infinity，无穷大
- \-Infinity，无穷大, 负无穷大

根据双精度浮点数的定义，Number 类型中有效的整数范围是 -0x1fffffffffffff 至 0x1fffffffffffff，所以 Number 无法精确表示此范围外的整数。

**string**
string 表示文本数据，最大长度是 2<sup>53</sup>-1。string 的意义是字符串的 UTF16 编码，所以字符串的最大长度，实际上是受到字符串的编码长度影响的。基本字符区域(BMP)：0-65536(U+0000-U+FFFF)

**symbol**
symbol 是一切非字符串的对象 key 的集合。

**Object**
Object 表示对象，是一切有形和无形物体的总称。在 JavaScript 中，对象的定义是“属性的集合”。
.运算符提供了装箱操作，它会根据基础类型构造一个临时对象，使得我们能在基础类型上调用对应对象的方法。

### 2. 类型转换

js 中类型转换只有三种情况：

- 转换为布尔值
- 转换为数字
- 转换为字符串

规则：

- -、\*、/、% ：一律转换成数值后计算
- +：
  - 数字 + 字符串 = 字符串， 运算顺序是从左到右
  - 数字 + 对象， 优先调用对象的 valueOf -> toString
  - 数字 + boolean/null -> 数字
  - 数字 + undefined -> NaN
- [1].toString() === '1'
- {}.toString() === '[object object]'
- NaN !== NaN 、+undefined 为 NaN

| 原始值                | 转换目标 |           结果            |
| --------------------- | -------: | :-----------------------: |
| number                |  Boolean | 除了 0、-0、NaN 都为 true |
| string                |  Boolean |     除了空串都为 true     |
| undefined、null       |  Boolean |           false           |
| 引用类型              |  Boolean |           true            |
| number                |   String |          5=>'5'           |
| boolean、函数、Symbol |   String |          'true'           |
| 数组                  |   String |       [1,2]=>'1,2'        |
| 对象                  |   String |     '[object Object]'     |
| string                |   Number |     '1'=>1, 'a'=>NaN      |
| null                  |   Number |             0             |
| 除了数组的引用类型    |   Number |            NaN            |
| Symbol                |   Number |           抛错            |

### 3. 四则运算符

加法运算符不同于其他几个运算符，它有以下几个特点：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

### 4. 比较运算

1. 如果是对象，就通过 toPrimitive 转换对象
2. 如果是字符串，就通过 unicode 字符索引来比较

### 5. this 指向

简单得说就是：谁调用它，this 就指向谁。

this 的指向可以按照以下顺序判断：

1. **全局环境中的 this**：

- 浏览器环境：无论是否在严格模式下，在全局执行环境中(在任何函数体外部)，this 都指向全局对象 window;
- node 环境：无论是否在严格模式下，在全局执行环境中(在任何函数体外部)，this 都是空对象{}

2. **是否是 new 绑定**

如果是 new 绑定，并且构造函数中没有返回 function 或者 object，那么 this 指向这个新对象。

```javascript
// 构造函数返回值不是function或object，new Super()返回的是this对象
function Super(age) {
  this.age = age;
}
let instance = new Super("25");
console.log(instance.instance); // 26
```

```javascript
// 构造函数返回值不是function或object，new Super()返回的是this对象
function Super(age) {
  this.age = age;
  let obj = { a: "2" };
  return obj;
}
let instance = new Super("25");
console.log(instance); // { a: "2" }
console.log(instance.instance); // 26
```

3. **函数是否通过 call,apply 调用，或者使用了 bind 绑定，如果是，那么 this 绑定的就是指定的对象[归结为显式绑定]**

```javascript
function info() {
  console.log(this.age);
}
var person = {
  age: 20,
  info,
};
var age = 28;
var info = person.info;
info.call(person); // 20
info.apply(person); // 20
info.bind(person)(); // 20
```

注意：第一个传入的参数是 undefined 或者 null，严格模式下 this 的值为传入的值 null/undefined。非严格模式下，实际使用的默认绑定规则，this 指向全局

4. **隐式绑定，函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的隐式调用为：xxx.fn()**

```javascript
function info() {
  console.log(this.age);
}
var person = {
  age: 20,
  info,
};
var age = 28;
person.info(); // 20,执行的是隐式绑定
```

5. 默认绑定，在不能应用其他绑定规则时使用默认规则，通常是独立函数调用。

非严格模式：node 环境，执行全局对象 global，浏览器环境，执行全局对象 window。
严格模式：执行 undefined

```javascript
function info() {
  console.log(this.age);
}
var age = 28;
// 严格模式：抛错
// 非严格模式，node下输出undefined(因为全局的age不会挂在global上)
// 非严格模式，浏览器环境下输出28(因为全局的age会挂在window上)
```

6. 箭头函数的情况

箭头函数没有自己的 this，继承外层上下文绑定的 this

```javascript
let obj = {
  age: 20,
  info: function() {
    return () => {
      console.log(this.age); // this继承的是外层上下文绑定的this
    };
  },
};
let person = { age: 28 };
let info = obj.info();
info(); // 20

let info2 = obj.info.call(person);
info2(); // 28
```

### 6. 原型/构造函数/实例

**原型(`prototype`)**：所有对象都有私有字段`[[prototype]]`，就是对象的原型。这个属性的值是一个对象，用来存储当前类型的共有的属性和方法。保存在原型上面的属性和方法称为公有属性或公有方法
**构造函数**: 可以通过 new 来 新建一个对象 的函数。
**实例**: 通过构造函数和 new 创建出来的对象，便是实例。 实例通过`\_\_proto\_\_`指向原型，通过 `constructor` 指向构造函数。

### 7. 原型链

**原型链**是由原型对象组成，每个对象都有`\_\_proto\_\_`属性，指向了创建该对象的构造函数的原型，`\_\_proto\_\_`将对象连接起来组成了**原型链**。是一个用来实现继承和共享属性的有限的对象链。

**属性查找机制**: 当查找对象的属性时，如果实例对象自身不存在该属性，则沿着原型链往上一级查找，找到时则输出，不存在时，则继续沿着原型链往上一级查找，直至最顶级的原型对象 `Object.prototype`，如还是没找到，则输出 `undefined`；

**属性修改机制**: 只会修改实例对象本身的属性，如果不存在，则进行添加该属性，如果需要修改原型的属性时，则可以用: `b.prototype.x = 2`；但是这样会造成所有继承于该对象的实例的属性发生改变。

### 8. 执行上下文

### 9. 变量对象

### 10. 作用域

### 11. 作用域链

### 12. 闭包

定义：当函数可以记住并访问所在的词法作用域时，就产生了闭包。

函数执行时形成一个私有作用域，保护里面的变量不受外界干扰，这种保护机制称为闭包

作用：

- 能够访问函数定义时所在的词法作用域(阻止其被回收)。
- 私有化变量

```javascript
function base() {
  let x = 10; // 私有变量
  return {
    getX: function() {
      return x;
    },
  };
}
let obj = base();
console.log(obj.getX()); // 10
```

- 模拟块级作用域

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = (function(j) {
    return function() {
      console.log(j);
    };
  })(i);
}
a[6]();
```

- 创建模块
  - 必须有外部的封闭函数，该函数必须至少被调用一次(每次调用都会创建一个新的模块实例)
  - 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态

```javascript
function coolModule() {
  let name = "yaoyao";
  let age = 30;
  function sayName() {
    console.log(name);
  }
  function sayAge() {
    console.log(age);
  }
  return {
    sayName,
    sayAge,
  };
}
let info = coolModule();
info.sayName(); // yaoyao
```

经典问题：多个子函数的[[scope]]都是同时指向父级，是完全共享的。因此当父级的变量对象被修改时，所有子函数都受到影响。

解决：

- 变量可以通过**函数参数的形式**传入，避免使用默认的[[scope]]向上查找
- 使用 setTimeout 包裹，通过第三个参数传入
- 使用**块级作用域**，让变量称为自己上下文的属性，避免共享。

### 13. script 引入方式

- html 静态\<script>引入
- js 动态插入\<script>
- \<script defer>：延迟加载，元素解析完成后执行
- \<script async>：异步加载，但执行时会阻塞元素渲染

defer 和 async 的区别：

- defer 要等到整个页面在内存中正常渲染结束(DOM 结构完全生成，以及其他脚本执行完成),在 window.onload 之前执行;
- async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本之后，再继续渲染；
- 如果有多个 defer 脚本，会按照它们在页面出现的顺序加载
- 多个 async 脚本不能保证加载顺序

动态创建的 script ，设置 src 并不会开始下载，而是要添加到文档中，JS 文件才会开始下载。

### 14. 对象的拷贝

浅拷贝：

用赋值的形式拷贝引用对象，仍然指向同一个地址，修改时原来的对象也会受到影响

浅拷贝实现：

- Object.assign
- 扩展运算符(...)
- Array.prototype.slice、Array.prototype.concat

```javascript
let obj = {
  name: "yaoyao",
  age: 18,
  hobbies: ["reading", "photography"],
};
let obj2 = Object.assign({}, obj);
let obj3 = { ...obj };

obj.name = "helo";
obj.hobbies.push("coding");

console.log(obj);
// {name: "helo", age: 18, hobbies: ["reading", "photography",'coding']}
console.log(obj2);
// {name: "yaoyao", age: 18, hobbies: ["reading", "photography",'coding']}
console.log(obj3);
// {name: "yaoyao", age: 18, hobbies: ["reading", "photography",'coding']}
```

深拷贝：

完全拷贝一个新对象，修改时原来的对象不再受到任何影响

深拷贝实现：

- JSON.parse(JSON.stringify(obj))
- 递归进行逐一赋值

JSON.parse(JSON.stringify(obj))：

优点：

性能最快

缺点：

- 对象的属性值是函数时，无法拷贝
- 原型链上的属性无法拷贝
- 不能正确的处理 Date 类型的数据
- 不能处理 RegExp
- 会忽略 Symbol
- 会忽略 undefined

实现 deepClone 函数

- 如果是基本数据类型，直接返回
- 如果是 RegExp 或者 Date 类型，返回对应类型
- 如果是复杂数据类型，递归
- 考虑循环引用的问题

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== "object") {
    // 如果不是复杂数据类型，直接返回
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  /*
   * 如果obj是数组，那么obj.constructor是[Function:Array]
   * 如果obj是对象，那么obj.constructor是[Function:Object]*/
  let t = new obj.constructor();
  hash.set(obj, t);
  for (let key in obj) {
    // 递归
    if (obj.hasOwnProperty(key)) {
      // 是否是自身的属性
      t[key] = deepClone(obj[key], hash);
    }
  }
  return t;
}
```

### 15.new 运算符的执行过程

**new**的实现原理：

1. 以构造器的 prototype 属性（注意与私有字段[[prototype]]的区分）为原型，创建新对象；
2. 将 this 和调用参数传给构造器，执行
3. 如果构造器返回的是对象，则返回，否则返回第一步创建的对象

```javascript
// ES5
function toyNew() {
  let target = {}; // 创建的新对象
  // 第一个参数是构造函数
  let [constructor, ...args] = [...arguments];

  // 执行[[原型]]链接;target是constructor的实例
  target.__proto__ = constructor.prototype;

  // 执行构造函数，将属性或方法添加到创建的空对象上
  let result = constructor.apply(target, args);

  if (result && (typeof result === "object" || typeof result === "function")) {
    // 如果构造函数执行的结构返回的是一个对象，那么返回这个对象
    return result;
  }
  // 如果构造函数返回的不是一个对象，返回创建的新对象
  return target;
}

// ES6
function toyNew(fn, ...arg) {
  const obj = Object.create(fn.prototype); // 以构造器的 prototype 属性（注意与私有字段[[prototype]]的区分）为原型，创建新对象
  const ret = fn.apply(obj, arg); // 将 this 和调用参数传给构造器，执行
  return ret instanceof Object ? ret : obj; // 如果构造器返回的是对象，则返回，否则返回第一步创建的对象
}
```

### 16. instanceof 原理

1. 先取得当前类的原型，当前实例对象的原型链
2. 一直循环(执行原型链的查找机制)
   取得当前实例对象原型链的原型链（proto = proto.\_**\_proto\_\_**，沿着原型链一直向上查找）
   如果 当前实例的原型链\_**\_proto**上找到了当前类的原型 prototype，则返回 true
   如果 一直找到 Object.prototype.\_**\_proto\_\_** == null，Object 的基类(null)上面都没找到，则返回 false

```javascript
function toyInstanceOf(left, right) {
  let proto = left.__proto__;
  let prototype = right.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}
```

### 17. 代码的复用

- 函数封装
- 继承
- 复制 extend
- 混入 mixin
- 借用 apply/call

### 18. 继承

继承：通过指定原型，并可以通过原型链继承原型上的属性或者方法

1. 原型链继承

基本思想是利用原型让上一个引用类型继承另一个引用类型的属性和方法

```javascript
function SuperType() {
  this.name = "yaoyao";
  this.colors = ["pink", "blue", "green"];
}
SuperType.prototype.getName = function() {
  return this.name;
};
function SubType() {
  this.age = 22;
}
SubType.prototype = new SuperType();
SubType.prototype.getAge = function() {
  return this.age;
};
SubType.prototype.constructor = SubType;

let instancel = new SubType();
instancel.colors.push("yellow");
console.log(instancel.getName()); // yaoyao
console.log(instancel.colors); // ["pink", "blue", "green", "yellow"]

let instancel2 = new SubType();
console.log(instancel2.colors); // ["pink", "blue", "green", "yellow"]
```

缺点：

- 通过原型来实现继承时，原型会变成另一个类型的实例，原先的实例属性变成了现在的原型属性，该原型的引用类型属性会被所有的实例共享。
- 在创建子类型的实例时，没有办法在不影响所有对象实例的情况下给超类型的构造函数中传递参数

2. 借用构造函数

基本思想：在子类型的构造函数中调用超类型构造函数。

```javascript
function SuperType() {
  this.name = "yaoyao";
  this.colors = ["pink", "blue", "green"];
}
function SubType() {
  SuperType.call(this, name);
}
let instancel = new SubType("yaoyao");
instancel.colors.push("yellow");
console.log(instancel.colors); // ["pink", "blue", "green", "yellow"]

let instancel2 = new SubType("Jack");
console.log(instancel2.colors); // ["pink", "blue", "green"]
```

优点：

- 可以向超类传递参数
- 解决了原型中包含引用类型值被所有实例共享的问题

缺点：

- 方法都在构造函数中定义，函数复用无从谈起，另外超类型原型中定义的方法对于子类型而言都是不可见的。

3. 组合继承(原型链 + 借用构造函数)

基本思想：使用原型链实现对原先属性和方法的继承，通过借用构造函数来实现对实例属性的基础，既通过在原型上定义方法来实现了函数复用，又保证了每个实例都有自己的属性。

```javascript
function SuperType(name) {
  this.name = name;
  this.colors = ["pink", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType() {
  SuperType.call(this, name);
  this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  console.log(this.age);
};

let instancel = new SubType("yaoyao", 20);
instancel.colors.push("yellow");
console.log(instancel.colors); // ["pink", "blue", "green", "yellow"]
instancel.sayName(); // yaoyao

let instancel2 = new SubType("Jack", 20);
console.log(instancel2.colors); // ["pink", "blue", "green"]
instancel2.sayName(); // Jack
```

优点：

- 可以向超类传递参数
- 每个实例都有自己的属性
- 实现了函数复用

缺点：

- 无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。

4. 原型继承

基本思想：借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

```javascript
// ES5
var person = {
  name: "yaoyao",
  hobbies: ["reading", "photography"],
};
var person1 = Object.create(person);
```

缺点:
同原型链实现继承一样，包含引用类型值的属性会被所有实例共享

5. 寄生式继承

基本思想：创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回这个对象。

```javascript
function createAnother(original) {
  var clone = object(original); // 通过调用函数创建一个新对象
  // 以某种方式增强这个对象
  clone.sayHi = function() {
    console.log("hi");
  };
  return clone; // 返回这个对象
}
var person = {
  name: "yaoyao",
  hobbies: ["reading", "photography"],
};

var person2 = createAnother(person);
person2.sayHi(); // hi
```

缺点：

- 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而效率低下
- 同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。

6. 寄生组合式继承

基本思路：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。

```javascript
function inheritPrototype(subType, superType) {
  var prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 指定对象
}

function SuperType(name) {
  this.name = name;
  this.colors = ["pink", "blue", "green"];
}
function SubType() {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = new SuperType();
inheritPrototype(SubType, SuperType);
```

优点：

- 只调用了一次构造函数，效率更高。
- 避免在 SubType.prototype 上创建不必要、多余的属性。原型链能保持不变

7. 圣杯模式：

```javascript
var inherit = (function(c, p) {
  var F = function() {};
  return function(c, p) {
    F.prototype = p.prototype;
    c.prototype = new F();
    c.uber = p.prototype;
    c.prototype.constructor = c;
  };
})();
```

### 20. 类型判断

### 21. 模块化

### 22. 防抖与节流

1. 防抖 debounce

**定义**：触发高频事件后 n 秒内函数只会执行最后一次，如果 n 秒内高频事件再次被触发，则从最后一次触发监听事件开始重新计算时间。

**注**：是将多次执行变为最后一次执行

**思路**：每次触发事件时都取消之前的延时调用方法

**应用场景**：

- 搜索框输入查询
- 表单验证
- 按钮提交
- 浏览器窗口缩放

```javascript
function debounce(fn, wait, immediate) {
  var result, timeout;

  var debounced = function() {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);

      if (callNow) result = fn.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
```

2. 节流 throttle

**定义**：高频事件触发，但在 n 秒内只会执行一次，而这个时间的计算，是从上次执行方法开始算起，所以节流会稀释函数的执行频率

**注**：将多次执行变成每隔一段时间执行

**思路**：每次触发事件时都判断当前是否有等待执行的延时函数

**应用场景**：

- 按钮点击事件
- 鼠标/触摸屏的 mouseover/touchmove 事件
- 页面窗口的 resize 事件
- 滚动条的 scroll 事件

```javascript
// 节流
function throttle(fn, wait, options) {
  var timeout, context, args;
  var previous = 0;

  var later = function() {
    previous = options.leading ? 0 : +new Date();
    clearTimeout(timeout);
    timeout = null;
    fn.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = +new Date();
    if (!previous || options.leading === false) previous = now;
    var remaing = wait - (now - previous);

    context = this;
    args = arguments;

    if (remaing <= 0 || remaing > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.tailing === false) {
      timeout = setTimeout(later, remaing);
    }
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
    prev = 0;
  };

  return throttled;
}
```

### 23. 函数执行改变 this

三种方式：

- call: fn.call(target, 1, 2)
- apply: fn.apply(target, [1, 2])
- bind: fn.bind(target)(1,2)

### 24. ES6/ES7

### 25. AST

### 26. babel 编译原理

### 27. 函数柯里化

函数柯里化：是把接受多个参数的函数变换成一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

<!-- 函数科里化，是固定不符参数，返回一个接受剩余参数的函数，也称为部分计算函数，目的是为了缩小适用范围，创建一个针对性更强的函数。 -->

主要作用：

- 参数复用
- 提前返回-返回接受余下的参数且返回结果的新函数
- 延迟执行-返回新函数，等待执行

```javascript
const curry = (fn, arr = []) => (...args) =>
  ((arg) => (arg.length === fn.length ? fn(...arg) : curry(fn, arg)))([
    ...arr,
    ...args,
  ]);
```

### 28. 数组(array)

### 29. json

### 30. call、bind、apply 区别及实现

bind、call、apply 的作用相同，都是改变 this 的指向
call、apply 立即执行函数。区别在于传参方式的不同。
bind 会返回一个函数

- func.call(thisArg, arg1,arg2, ...)：第一个参数是 this 指向的对象，其他参数依次传入
- func.apply(thisArg, [argsArray])：第一个参数是 this 指向的对象，第二个参数是数组或类数组

如何实现 call：

- 在 call 方法中获取调用 call()函数
- 如果第一个参数没有传入，那么默认指向 window/global（非严格模式）
- 传入 call 的第一个参数是 this 指向的对象，根据隐式绑定的规则 obj.foo(),foo()中的 this 指向 obj；
- 返回执行结果

```javascript
Function.prototype.call = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  context = context || window;
  const fn = Symbol("fn");
  context[fn] = this;
  const args = [...arguments].slice(1);
  const result = context[fn](...args);
  // ES6 method allows to delete properties
  Reflect.deleteProperty(context, fn);
  return result;
};
```

apply 的实现思路和 call 一致，仅参数处理略有差别

```javascript
Function.prototype.apply = function(context) {
  if(typof this !== "function") {
    return TypeError("error")
  }
  context = context || window
  const fn = Symbol("fn");
  context[fn] = this;
  const args = [].slice.call(arguments, 1);
  let result;
  if(args) {
    result = context[fn](...args);
  } else {
    result = context[fn]()
  }

  // ES6 method allows to delete properties
  Reflect.deleteProperty(context, fn);
  return result;
};
```
