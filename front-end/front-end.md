# 前端面试题

## html

### 为什么需要语义化

语义化的优点：

- 易修改、易维护
- 无障碍阅读支持
- 搜索引擎友好，利于 SEO
- 面向未来的 HTML，浏览器在未来可能提供更丰富的支持

### 结构语义化

语义元素仅仅是页面结构的规范化，并不会对内容有本质的影响。

#### 头部 header

<header>元素有两种用法，第一是标注内容的标题，第二是标注网页的页眉。除非必要（内容标题附带其它信息的情况下：发布时间、作者等），一般不在内容中使用<header>

#### 导航栏 nav

nav 可以用作导航栏，也可以用于一组文章的链接，通常仅仅在页面的主要导航部分使用它

```html
<!-- 案例 -->
<nav>
  <!-- 此处是链接 -->
  <aside></aside>
  <aside></aside>
</nav>

<!-- 案例二，如果侧栏中包含其它不同于链接的其它区块 -->
<aside>
  <nav>
    <!-- 此处是链接 -->
  </nav>
  <section></section>
  <div></div>
</aside>
```

#### 附注

<aside>元素并不仅仅是侧栏，它表示与它周围文本没有密切关系的内容。文章中同样可以使用<aside>元素，来说明文章的附加内容、解释说明某个观点、相关内容链接等等。

<section>标签适合标记的内容区块：
- 与页面主体并列显示的小内容块
- 独立性内容，清单、表单等
- 分组内容，如CMS系统中的文章分类区块
- 比较长的文档。

#### 页脚

<footer>标签仅仅可以包含版权、来源信息、法律限制等等之类的文本或链接信息。

```html
<div>
  <aside>
    <!-- 其它内容 -->
  </aside>

  <footer>
    <!-- 法律、版权、来源、联系信息等 -->
  </footer>
</div>
```

#### 主要内容

<main>标签可以帮助屏幕阅读工具识别页面的主体部分，从而让访问者迅速得到有用的信息

#### 文章

<article>表示一个完整的、自成一体的内容块。如文章或新闻报道。

## CSS

### 1. 盒模型

### 2. BFC、IFC、GFC、FFC

**BFC(Block formatting context)：块级格式化上下文**，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

- 触发条件：

  - 根元素
  - 浮动元素（float 属性不为 none）
  - position 为 absolute 或 fixed
  - overflow 不为 visible 的块元素
  - display 为 inline-block、table-cell、table-caption

- BFC 布局规则

  - 属于同一个 BFC 的两个相邻 Box 垂直排列
  - BFC 内，两个相邻 Box 的垂直距离由 margin 属性决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
  - BFC 中子元素的 margin box 的左边，与包含块(BFC)border box 的左边相接触(子元素 absolute 除外)
  - BFC 的区域不会与 float 的元素区域重叠
  - 计算 BFC 的高度时，浮动子元素也参与计算
  - 文字层不会被浮动蹭覆盖，环绕于周围

- BFC 应用：

  - 防止 margin 重叠 (同一个 BFC 内的两个两个相邻 Box 的 margin 会发生重叠，触发生成两个 BFC，即不会重叠)
  - 清除内部浮动(创建一个新的 BFC，因为根据 BFC 的规则，计算 BFC 的高度时，浮动元素也参与计算)
  - 自适应多栏布局(BFC 的区域不会与 float box 重叠。因此可以触发生成一个新的 BFC)

**IFC（Inline formatting contexts）：内联格式上下文**

- IFC 应用：
  - 水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过 text-align 则可以使其水平居中。
  - 垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其 vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。
  
**GFC（GrideLayout formatting contexts）：网格布局格式化上下文**

**FFC（Flex formatting contexts）:自适应格式上下文**

### 3. 层叠上下文

元素提升为一个比较特殊的图层，在三维空间中(z 轴)高出普通元素一等。

- 触发条件：

  - 根层叠上下文(html)
  - position
  - css3 属性
    - flex
    - transform
    - opacity
    - filter
    - will-change
    - -webkit-overflow-scrolling

- 层叠等级：层叠上下文在 z 轴上的排序
  - 在同一层叠上下文中，层叠等级才有意义
  - z-index 的优先级最高

![层叠等级](images/层叠等级.webp)

### 4. 居中布局

水平居中：

- 行内元素：text-align:center;
- 块级元素：margin: 0 auto;
- absolute + transform
- flex + justify-content: center;

垂直居中：

- line-hight: height;
- absolute + transform
- flex + align-items: center
- table

水平垂直居中：

- absolute + transform
- flex + justify-content + align-items

### 5. 选择器优先级

- !important > 行内样式 > #id > .class > tag > \* > 继承 > 默认
- 选择器**从右往左**解析

### 6. 去除浮动影响

- 通过增加伪元素清楚浮动
  - :after / <br> : clear: both
- 创建父级 BFC
- 父级设置高度

### 7. link 与@import 的区别

### 8. CSS 预处理器

预处理器原理：将类 css 语言通过**webpack 编译**转成浏览器可读的真正 CSS.

常用功能：

- 嵌套
- 变量
- 循环语句
- 条件语句
- 自动前缀
- 单位转换
- mixin 复用

### 9. CSS 动画

- transition：过渡动画

  - transition-property: 属性
  - transition-duration: 间隔
  - transition-timing-function: 曲线
  - transition-delay： 延迟
  - 常用钩子:transitionend

- animation / keyframes：

  - animation-name: 动画名称，对应@keyframes
  - animation-duration: 间隔
  - animation-timing-function: 曲线
  - animation-delay: 延迟
  - animation-iteration-count: 次数
  - infinite: 循环动画
  - animation-direction: 方向
  - alternate: 反向播放
  - animation-fill-mode: 静止模式
  - forwards: 停止时，保留最后一帧
  - backwards: 停止时，回到第一帧
  - both: 同时运用 forwards / backwards
  - 常用钩子: animationend

- 动画属性：尽量使用动画属性进行动画，能拥有较好的性能表现
  - translate
  - scale
  - rotate
  - skew
  - opacity
  - color

### 10. 经验

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

原型(prototype):所有对象都有私有字段[[prototype]]，就是对象的原型。
构造函数: 可以通过 new 来 新建一个对象 的函数。
实例: 通过构造函数和 new 创建出来的对象，便是实例。 实例通过\_\_proto\_\_指向原型，通过 constructor 指向构造函数。

### 7. 原型链

原型链是由原型对象组成，每个对象都有\_\_proto\_\_属性，指向了创建该对象的构造函数的原型，\_\_proto\_\_将对象连接起来组成了原型链。是一个用来实现继承和共享属性的有限的对象链。

属性查找机制: 当查找对象的属性时，如果实例对象自身不存在该属性，则沿着原型链往上一级查找，找到时则输出，不存在时，则继续沿着原型链往上一级查找，直至最顶级的原型对象 Object.prototype，如还是没找到，则输出 undefined；

属性修改机制: 只会修改实例对象本身的属性，如果不存在，则进行添加该属性，如果需要修改原型的属性时，则可以用: b.prototype.x = 2；但是这样会造成所有继承于该对象的实例的属性发生改变。

### 8. 执行上下文

### 9. 变量对象

### 10. 作用域

### 11. 作用域链

### 12. 闭包

定义：当函数可以记住并访问所在的词法作用域时，就产生了闭包。

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

1. 创建一个空对象，构造函数中的 this 指向这个空对象
2. 这个新对象被执行[[原型]]连接
3. 执行构造函数方法，属性和方法被添加到 this 引用的对象中
4. 如果构造函数中没有返回其他对象

```javascript
function _new() {
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
```

### 16. instanceof 原理

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

### 19. 类型转换

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
const curry = (fn, ...args) =>
  args.length < fn.length
    ? // 参数长度不足时，重新柯理化该函数，等待接受新参数
      (...arguments) => curry(fn, ...args, ...arguments)
    : // 参数长度满足时，执行函数
      fn(...args);
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

## React

### 写 React/Vue 项目时为什么要在列表组件中写 key，其作用是什么？

作用：在更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。key 是给每一个 vnode 的唯一 ID，可以依靠 key 更准确、更快速得拿到缓存的旧的虚拟节点中对应的虚拟 vnode。

## 常见面试题

### ['1', '2', '3'].map(parseInt) what & why ?

arr.map(function callback(currentValue[, index[, array]]),返回的是一个数组  
parseInt(string[, radix]),radix 一个介于 2 和 36 之间的整数,默认为 10

1. parseInt('1', 0),radix 为 0 时，且 string 参数不以“0x”和“0”开头时，按照 10 为基数处理。这个时候返回 1
2. parseInt('2', 1),基数为 1（1 进制）表示的数中，最大值小于 2，所以无法解析，返回 NaN
3. parseInt('3', 2),基数为 2（2 进制）表示的数中，最大值小于 3，所以无法解析，返回 NaN

### 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

Set 和 Map 主要的应用场景在于**数据重组**和**数据储存**

Set 是一种叫集合的数据结构，Map 是一种叫做字典的数据结构

WeakSet 对象允许你将弱引用对象储存在一个集合中

WeakSet 与 Set 的区别：

- WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
- WeakSet 对象中储存的对闲置都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对象的引用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉。WeakSet 对象是无法被遍历的

WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意的。**WeakMap 弱引用的只有键名，而不是键值**

总结：

- Set：

  - 成员唯一、无序且不重复
  - [value, value]，键值与键名是一致的
  - 可以遍历，方法有：add、delete、has

- WeakSet：

  - 成员都是对象
  - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 dom 节点，不容易造成内存泄漏
  - 不能遍历，方法有 add、delete、has

- Map：

  - 本质上是键值对的集合，类似集合
  - 可以遍历，方法很多可以跟各种数据格式转换

- WeakMap：
  - 只接受对象作为键名(null 除外)，不接受其他类型的值作为键名
  - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
  - 不能遍历，方法有 get、set、has、delete

### ES5/ES6 的继承除了写法以为还有什么区别

- class 声明并不像 function 声明，它不存在提升。它类似 let 声明，存在 TDZ(temporal dead zone)
- class 中的代码都会自动的使用严格模式，没办法选择
- 所有的方法都是不可枚举的(non-enumerable),注：非绑定当前对象的方法
- class 内所有方法内部都缺少[[Construct]]方法，所以如果对这些方法进行 new 会出错
- 不携带 new 操作符调用 class 会报错
- 尝试在类的方法中改变类名会报错

### setTimeout、Promise、Async/Await 的区别

事件循环分为宏任务队列和微任务队列。其中 setTimeout 的回调函数放到宏任务队列里，等待执行栈清空以后执行。promise.then 里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行；async 函数表示函数里面可能会有异步方法，await 后面跟一个表达式，async 方法执行时，遇到 await 会立即执行表达式，然后表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行

- Macrotask 宏观任务：

  - setTimeout
  - setImmediate
  - setInterval
  - I/O
  - UI 渲染

- MicroTask 微观任务
  - process.nextTick
  - promise
  - Object.observe(废弃)
  - MutationObserver

总结：

1. 在执行上下文栈的同步任务执行完成后；
2. 首先执行 Microtask 队列，按照队列“先进先出”的原则，一次执行完所有 Microtask 队列任务；
3. 然后执行 Macrotask/task 队列，一次执行一个，一个执行完后，检测 Microtask 是否为空
4. 为空则执行下一个 Macrotask/task
5. 不为空则执行 Microtask

### Virtual Dom 的优势

1. DOM 引擎、JS 引擎互相独立，但又工作在同一线程(主线程)。JS 代码调用 DOM API 必须挂起 JS 引擎、转换传入参数数据、激活 DOM 引擎，DOM 重绘后再转换可能有的返回值，最后激活 JS 引擎并继续执行。如果有频繁的 DOM API 调用，浏览器不做批量处理优化，引擎切换的单位代价将迅速积累。如果其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图形会引擎更大的性能消耗

2. VDOM 和真实 DOM 的区别和优化：

- 虚拟 DOM 不会立马进行排版与重绘操作
- 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要修改的部分，最后在真实 DOM 中进行排版与重绘，减少过多 DOM 节点排版与重绘损耗
- 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版

### CommonJS 和 es6 中模块引入的区别

差别：

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
3. CommonJS 是单个值导入，ES6 Module 可以导出多个
4. CommonJS 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层
5. CommonJS 的 this 是当前模块，ES6 Module 的 this 是 undefined

### Cookie token 和 session 的区别

产生背景：
原理：
有什么问题

### 从输入 URL 到页面加载的过程

## 计算机基础

### 一个 tcp 连接能发几个 http 请求

1. HTTP1.0 版本协议，一般情况下一个 TCP 发送一个 HTTP 请求（每次发送请求完毕后 TCP 链接就会断开）；有种特殊情况可以发送多条，通过 Connection 和 Keep-Alive 首部，在请求头上带上 Connection:Keep-Alive，并且可以通过 Keep-Alive 通用首部中指定的，用逗号分隔的选项调节 Keep-Alive 的行为，如果客户端和服务端都支持的情况下就可以发送多条

2. HTTP1.1 版本协议，支持长连接，只要 TCP 连接不断开，可以一直发送 HTTP 请求，持续不断，没有上限
3. HTTP2.0 版本协议，支持多路复用，一个 TCP 连接可以并发多个 HTTP 请求，同样也支持长连接，只要不断开 TCP 的连接，HTTP 请求数也是可以没有上限地持续发送

### TCP 三次握手

客户端发送 syn，跟服务器说“我要连接啦”，进入 syn_send 状态。
服务端接收然后发送 syn + ack 包给客户端，跟客户端说“我知道了，我这边 ok 了”，进入 syn_recv 状态。
客户端接收后发一个 ack，跟服务端说”我要连接咯！“，进入 establish 状态，连接成功。

因为三次是为了确定双方的收发能力：第一次，确定了客户端的发送能力。第二次，服务端确定了自己的接受能力。第三次，确定了客户端的接受能力与服务端的发送能力。
再比如说，如果我们第一次握手，因为卡住了或者别的原因，导致连接请求没有发送出去，那么客户端会发起第二次连接请求，然后连接成功，之后断开。这时候！！这时候！！如果第一次握手的请求不卡了，现在发起了连接，而如果只需要两次握手，那么现在客户端与服务端就连接起来了，但是这时候客户端并没有东西要发送，所以就导致服务端资源被占用啦。

### XSS 和 CSRF 攻防

csrf 就是跨站页面请求来进行攻击，就比如我们现在登录了一个银行的网页，然后我们打开新的标签页，点击了一些攻击的网页，这时候因为我们刚刚登录，cookie 还没有过期，我们刚刚点击的网页就会进行 csrf 攻击，利用 cookie 进行 csrf 攻击，钱就没了啦......
css 就是跨站脚本攻击，分为 XXX 类，常见的比如现在有一个评论的组件，用户输入评论存储进数据库，然后别的用户访问的时候可以看到。如果这时候用户植入恶意的 js 代码评论，我们存储到数据库中，那样别的用户访问就会被攻击啦！我们可以通过过滤尖角号，或者把他转换成 html 实体来防御......

## 参考文章

[中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)
[从输入 URL 到页面加载的过程？如何由一道题完善自己的前端知识体系！](https://juejin.im/post/5aa5cb846fb9a028e25d2fb1)
[从输入 URL 到页面加载的过程？如何由一道题完善自己的前端知识体系！](https://dailc.github.io/2018/03/12/whenyouenteraurl.html)
[从输入 URL 到页面加载完成的过程中都发生了什么事情？](http://fex.baidu.com/blog/2014/05/what-happen/)
[(1.6w 字)浏览器灵魂之问，请问你能接得住几个？](https://juejin.im/post/5df5bcea6fb9a016091def69)
[(建议收藏)原生 JS 灵魂之问, 请问你能接得住几个？(上)](https://juejin.im/post/5dac5d82e51d45249850cd20)
[(建议精读)原生 JS 灵魂之问(中)，检验自己是否真的熟悉 JavaScript？](https://juejin.im/post/5dbebbfa51882524c507fddb)
[(2.4w 字,建议收藏)😇 原生 JS 灵魂之问(下), 冲刺 🚀 进阶最后一公里(附个人成长经验分享)](https://juejin.im/post/5dd8b3a851882572f56b578f)
[我如何零基础转行成为一个自信的前端](https://juejin.im/post/5c75d34851882564965edb23)
