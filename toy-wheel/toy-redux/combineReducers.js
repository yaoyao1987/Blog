export const combineReducers = reducers => (state = {}, action) => {
  let currentState = {};
  for (const key in reducers) {
    if (reducers.hasOwnProperty(key)) {
      currentState[key] = reducers[key](state[key], action)
    }
  }
  return currentState;
}