import { combineReducers } from '../../redux';
import counter1 from './counter1';
import counter2 from './counter2';
let reducers = {
  counter1,
  counter2,
};
// convert obj to reducer
let rootReducer = combineReducers(reducers);
export default rootReducer;
