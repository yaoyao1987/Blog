const sleep = time => new Promise((resolve, reject) => { setTimeout(resolve, time); })
// ======================================================
/**
 * testing
 */
// 测试例子
sleep(1000).then(() => {
  console.log(1);
})