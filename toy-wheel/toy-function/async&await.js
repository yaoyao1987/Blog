function toyAsyncToGenerator(fn) {
  return function () {
    let that = this;
    const args = arguments
    // 返回值promise变化
    return new Promise((resolve, reject) => {
      // 获取迭代器实例
      let gen = fn.apply(that, args);
      // 执行下一步
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      // 抛出异常
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      // 第一次触发
      _next(undefined)
    })
  }
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    const info = gen[key](arg);
    const value = info.value
  } catch (e) {
    reject(e);
    return
  }
  if (info.done) {
    // 迭代器完成，将返回值(return)保存起来
    resolve(value)
  } else {
    // 将所有值promise化
    // 可以做到统一 promise 输出
    // 当 promise 执行完之后再执行下一步
    // 递归调用 next 函数，直到 done == true
    Promise.resolve(value).then(_next, _throw)
  }
}
// ======================================================
/**
 * testing
 */

const asyncFunc = toyAsyncToGenerator(function* () {
  console.log(1);
  yield new Promise(resolve => {
    setTimeout(() => {
      resolve();
      console.log('sleep 1s')
    }, 1000);
  })
  console.log(2);
  const a = yield Promise.resolve('a');
  console.log(3);
  const b = yield Promise.resolve('b');
  const c = yield Promise.resolve('c');
  return [a, b, c]
})

asyncFunc().then(res => {
  console.log(res);
})