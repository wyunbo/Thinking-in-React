import * as types from '../action-types';

let initialState = { number: 10, color: '' };
/**
 * reducer for counter2
 * @param {*} oldState
 * @param {*} action
 */
const counter1 = (oldState = initialState, action) => {
  switch (action.type) {
    case types.ADD2:
      return { number: oldState.number + 1 };
    case types.MINUS2:
    case types.MINUS:
      return { number: oldState.number - 1 };
    default:
      return oldState;
  }
};
export default counter1;
