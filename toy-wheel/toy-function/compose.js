// 同步
const compose = (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)))

// ======================================================
/**
 * testing
 */

const init = (...args) => args.reduce((total, val) => total + val, 0)
const step2 = (val) => val + 2
const step3 = (val) => val + 3
const step4 = (val) => val + 4
const steps = [step4, step3, step2, init]
let composeFunc = compose(...steps)
console.log(composeFunc(1, 2, 3))

// 最后返回的是一个promise对象，我们在then方法中将最终值输出
let composeFunc = compose(...steps)
composeFunc(1, 2, 3).then((val) => {
  console.log(val)
})