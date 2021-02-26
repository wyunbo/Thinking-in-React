/**
 * convert reducers obj to reducer func
 * @param {*} reducers
 */
function combineReducers(reducers) {
  // return final root reducer function
  let rootReducer = (state = {}, action) => {
    let nextState = {}; // declare a empty object to save final state
    for (let key in reducers) {
      // key counter1 counter2
      const reducer = reducers[key]; // sub reducer
      const previousStateForKey = state[key]; // old sub state
      const nextStateForKey = reducer(previousStateForKey, action); // calculate new sub state
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
  return rootReducer;
}
export default combineReducers;
