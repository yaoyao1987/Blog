// JSON.stringify(value[, replacer [, space]])：

//MDN https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
// Boolean | Number| String 类型会自动转换成对应的原始值。
// undefined、任意函数以及symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
// 不可枚举的属性会被忽略
// 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。

function toyJsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object" || type === null) {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = []
    arr = (obj && obj.constructor === Array);
    for (let k in obj) {
      let v = obj[k];
      let _type = typeof v;
      if (/string|undefined|function/.test(_type)) {
        v = '"' + v + '"';
      } else if (_type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
  }
}

console.log(toyJsonStringify({ x: 5 })) // "{"x":5}"
console.log(toyJsonStringify([1, "false", false])) // "[1,"false",false]"
console.log(toyJsonStringify({ b: undefined })) // "{"b":"undefined"}"

// 对付xss
// var rx_one = /^[\],:{}\s]*$/;
// var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
// var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
// var rx_four = /(?:^|:|,)(?:\s*\[)+/g;

// if (
//   rx_one.test(
//     json
//       .replace(rx_two, "@")
//       .replace(rx_three, "]")
//       .replace(rx_four, "")
//   )
// ) {
//   var obj = eval("(" + json + ")");
// }
function toyJsonParse(opt) {
  return eval('(' + opt + ')');
}

console.log(toyJsonParse(toyJsonStringify({ x: 5 })))
// Object { x: 5}
console.log(toyJsonParse(toyJsonStringify([1, "false", false])))
// [1, "false", falsr]
console.log(toyJsonParse(toyJsonStringify({ b: undefined })))
// Object { b: "undefined"}

// Function版本
var jsonStr = '{ "age": 20, "name": "jack" }'
var json = (new Function('return ' + jsonStr))();

console.log(json);