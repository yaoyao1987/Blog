// 1. JSON.parse
// const deepClone = target => JSON.parse(JSON.stringify(target))

// 2. 递归法
// const deepClone = target => {
//   if (typeof target !== 'object') return target

//   let cloneTarget = {};
//   for (const key in target) {
//     if (target.hasOwnProperty(key)) {
//       cloneTarget[key] = target[key]
//     }
//   }
//   return cloneTarget
// }

// 3. 递归法，考虑数组
// const deepClone = target => {
//   if (typeof target !== 'object') return target

//   let cloneTarget = Array.isArray(target) ? [] : {};
//   for (const key in target) {
//     if (target.hasOwnProperty(key)) {
//       cloneTarget[key] = deepClone(target[key])
//     }
//   }
//   return cloneTarget
// }

// 4. 解决循环引用
// const deepClone = (target, map = new Map()) => {
//   if (typeof target !== 'object') return target
//   let cloneTarget = Array.isArray(target) ? [] : {};
//   if (map.get(target)) {
//     return map.get(target);
//   }
//   map.set(target, cloneTarget);
//   for (const key in target) {
//     if (target.hasOwnProperty(key)) {
//       cloneTarget[key] = deepClone(target[key], map)
//     }
//   }
//   return cloneTarget
// }

// 5.提高性能，WeakMap让target和map形成弱引用关系，下一次垃圾回收机制执行的时候，这块内存就会被释放掉
// const deepClone5 = (target, map = new WeakMap()) => {
//   if (typeof target !== 'object') return target
//   let cloneTarget = Array.isArray(target) ? [] : {};
//   if (map.get(target)) {
//     return map.get(target);
//   }
//   map.set(target, cloneTarget);
//   for (const key in target) {
//     if (target.hasOwnProperty(key)) {
//       cloneTarget[key] = deepClone5(target[key], map)
//     }
//   }
//   return cloneTarget
// }

// 6. 提高性能
// const forEach = (array, iteratee) => {
//   let index = -1;
//   const length = array.length;
//   while (++index < length) {
//     iteratee(array[index], index);
//   }
//   return array;
// }
// const deepClone6 = (target, map = new WeakMap()) => {
//   if (!typeof target !== 'object') return target;
//   const isArray = Array.isArray;
//   let cloneTarget = isArray(target) ? [] : {};
//   if (map.get(target)) {
//     return map.get(target)
//   }
//   map.set(target, cloneTarget);
//   const keys = isArray ? undefined : Object.keys(target);
//   forEach(keys || target, (value, key) => {
//     if (keys) {
//       key = value
//     }
//     cloneTarget[key] = deepClone6(target[key], map)
//   });
//   return cloneTarget
// }

// 7. 完整代码
// 可继续遍历的数据类型
const MAP_TAG = 'Map';
const SET_TAG = 'Set';
const ARRAY_TAG = 'Array';
const OBJECT_TAG = 'Object';
const ARG_TAG = 'Arguments'

// 不可遍历的数据类型
const BOOLEAN_TAG = 'Boolean';
const DATE_TAG = 'Date';
const NUMBER_TAG = 'Number';
const STRING_TAG = 'String';
const SYMBOL_TAG = 'Symbol';
const ERROR_TAG = 'Error';
const REGEXP_TAG = 'RegExp';
const FUNC_TAG = 'Function';

const DEEP_TAG = [MAP_TAG, SET_TAG, ARRAY_TAG, OBJECT_TAG, ARG_TAG];

// 工具函数forEach
const forEach = (array, iteratee) => {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

// 工具函数-获取实际类型
const getType = target => Object.prototype.toString.call(target).replace(/\[object\s|\]/g, '')

// 工具函数-判断是否为引用类型
const isObject = target => {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

// 工具函数-初始化被克隆的对象
const getInit = target => {
  const Ctor = target.constructor;
  return new Ctor();
}

// 工具函数-克隆Symbol
const cloneSymbol = target => Object(Symbol.prototype.valueOf.call(target));

// 工具函数-克隆正则
const cloneReg = target => {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

// 工具函数-克隆函数
const cloneFunction = func => {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  // 普通函数
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    // 匹配到函数体
    if (body) {
      // 匹配到参数
      if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString)
  }
}

// 工具函数-克隆不可遍历类型
const cloneOtherType = (target, type) => {
  const Ctor = target.constructor
  switch (type) {
    case BOOLEAN_TAG:
    case NUMBER_TAG:
    case STRING_TAG:
    case ERROR_TAG:
    case DATE_TAG:
      return new Ctor(target);
    case REGEXP_TAG:
      return cloneReg(target);
    case SYMBOL_TAG:
      return cloneSymbol(target);
    case FUNC_TAG:
      return cloneFunction(target);
    default:
      return null;
  }
}

const deepClone = (target, map = new WeakMap()) => {
  // 原始类型直接返回
  if (!isObject(target)) {
    return target;
  }

  // 根据不同类型进行操作
  const type = getType(target);
  let cloneTarget;
  if (DEEP_TAG.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === SET_TAG) {
    target.forEach(value => {
      cloneTarget.add(deepClone(value, map));
    })
    return cloneTarget;
  }

  // 克隆map
  if (type === MAP_TAG) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value, map));
    })
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === ARRAY_TAG ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = deepClone(target[key], map)
  })
  return cloneTarget
}
// ======================================================
/**
 * testing
 */

// const target = {
//   field1: 1,
//   field2: undefined,
//   field3: {
//     child: 'child'
//   },
//   field4: [2, 4, 8],
//   f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
// };

// target.target = target;

// console.time();
// const result = deepClone5(target);
// console.timeEnd();

// console.time();
// const result2 = deepClone6(target);
// console.timeEnd();


const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  }
};

const result = clone(target);

console.log(target);
console.log(result);