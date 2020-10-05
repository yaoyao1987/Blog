import compose from './compose'
export default function applyMiddleware(...middlewares) {
  return function a1(createStore) {
    return function a2(reducer) {
      // 取出原始dispatch方法
      const store = createStore(reducer);
      let dispatch = store.dispatch;
      let chain = [];

      // 包装dispatch
      const middlewareAPI = {
        getState: store.getState,
        dispatch
      }
      chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch)

      // 使用包装后的dispatch覆盖store.dispatch返回新的store对象
      return {
        ...store,
        dispatch
      }
    }
  }
}