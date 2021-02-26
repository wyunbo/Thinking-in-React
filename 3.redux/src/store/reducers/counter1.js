import * as types from '../action-types';

let initialState = { number: 5, color: '' };
/**
 * reducer for counter1
 * @param {*} oldState
 * @param {*} action
 */
const counter1 = (oldState = initialState, action) => {
  switch (action.type) {
    case types.ADD1:
      return { number: oldState.number + 1 };
    case types.MINUS1:
    case types.MINUS:
      return { number: oldState.number - 1 };
    default:
      return oldState;
  }
};
export default counter1;
