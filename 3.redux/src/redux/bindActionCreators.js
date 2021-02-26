/**
 *
 * @param {*} actionCreator
 * @param {*} dispatch store.disptch
 */
function bindActionCreator(actionCreator, dispatch) {
  const bindActionCreator = function (...args) {
    let action = actionCreator.apply(this, args);
    dispatch(action);
  };
  return bindActionCreator;
}
/**
 *
 * @param {*} actionCreators const actions = {add, minus};
 * @param {*} dispatch
 */
function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
  }
  return boundActionCreators;
}
export default bindActionCreators;
