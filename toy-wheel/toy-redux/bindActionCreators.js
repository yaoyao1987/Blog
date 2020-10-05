export default function bindActionCreators(actions, dispatch) {
  let newActions = {}
  for (const key in actions) {
    if (actions.hasOwnProperty(key)) {
      newActions[key] = (...args) => dispatch(actions.apply(null, ...args))
    }
  }
  return newActions
}