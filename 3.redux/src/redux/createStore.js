/**
 *
 * @param {*} reducer processor
 * @param {*} preloadedState initial state
 */
function createStore(reducer, preloadedState) {
  let state = preloadedState;
  let listeners = [];
  function getState() {
    return state;
  }
  /**
   * subscribe function will return a unsubscribe function
   * @param {*} listener
   */
  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      let index = listeners.indexOf(listener); // find listener index
      listeners.splice(index, 1); // remove listener by index
    };
  }

  function dispatch(action) {
    // receive reducer, calculate new state
    state = reducer(state, action);
    // execute subscribe functions one by one
    listeners.forEach((l) => l());
    return action;
  }
  const store = {
    getState,
    subscribe,
    dispatch,
  };
  return store;
}
export default createStore;
