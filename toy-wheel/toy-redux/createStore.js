export default function createStore(reducer, enhancer) {
  // 如果传入了中间件函数，使用中间件增强createStore
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer)
  }
  let state = null; // 用来存储全局状态
  let listeners = []; // 用来存储状态发送变化的回调函数数组

  // 用来获取最新的全局状态
  const getState = () => state;

  // 用来注册回调函数
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l != listener)
    }
  }

  // 用来接收一个action，并利用reducer，根据旧的state和action计算出最新的state，然后遍历回调函数数组，执行回调.
  const dispatch = action => {
    state = reducer(state, action); // 生成新的state
    listeners.forEach(listener => listener()) // 执行回调
  }

  // 初始化全局状态
  dispatch({})

  return { getState, subscribe, dispatch }
}