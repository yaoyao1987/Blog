/**
 * 判断有效的括号
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const length = s.length;

  if (length < 2) return false;
  let map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  let stack = [];

  for (let i = 0; i < length; i++) {
    if (!map[s[i]]) {
      stack.push(s[i]);
    } else {
      if (stack.pop() !== map[s[i]]) {
        return false;
      }
    }
  }

  if (stack.length) {
    return false;
  } else {
    return true;
  }
};

var isValid = function(s) {
  const length = s.length;

  // 剪枝处理
  if (!length) return true;
  if (length < 2) return false;
  if (length % 2 === 1) return false;

  // 定义字符串匹配 map
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  // 用栈来校验闭合情况
  let stack = [];
  for (let i = 0; i < length; i++) {
    const temp = map[s[i]];
    if (!temp) {
      stack.push(s[i]);
    } else {
      if (temp !== stack.pop()) {
        return false;
      }
    }

    if (stack.length > length / 2) {
      return false;
    }
  }

  // 遍历结束，如果仍有未匹配完的左括号，返回 false
  if (stack.length) {
    return false;
  } else {
    return true;
  }
};

let s1 = "()";
let s2 = "()[]{}";
let s3 = "(]";
let s4 = "([)]";
let s5 = "{[]}";
const result = isValid(s4);
console.log("result", result);
