// 字符串转二进制
function charToBinary(text) {
  let code = '';
  for (const i of text) {
    // 字符编码
    let number = i.charCodeAt().toString(2);
    let len = 8 - number.length
    // 1 bytes = 8bit,将number不足8位的0补上
    for (let j = 0; j <= len; j++) {
      number = 0 + number;
    }
    code += number;
  }
  return code;
}