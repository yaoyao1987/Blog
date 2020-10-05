// 将二进制数据每 6bit 位替换成一个 base64 字符
function binaryToBase64(code) {
  let base64Code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let res = '';
  // 1 bytes = 8bit，6bit 位替换成一个 base64 字符
  // 所以每 3 bytes 的数据，能成功替换成 4 个 base64 字符
  // 对不足 24 bit (也就是 3 bytes) 的情况进行特殊处理
  if (code.length % 24 === 8) {
    code += '0000';
    res += '=='
  }
  if (code.length % 24 === 16) {
    code += '00';
    res += '=';
  }

  let encode = '';
  // code 按 6bit 一组，转换为
  for (let i = 0; i < code.length; i += 6) {
    const item = code.slice(i, i + 6);
    encode += base64Code[parseInt(item, 2)]
  }
  return encode + res;
}