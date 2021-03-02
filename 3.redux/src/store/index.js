import { createStore, applyMiddleware } from '../redux';
import rootReducer from './reducers';
// let store = createStore(rootReducer);

let store = applyMiddleware(promise, thunk, logger)(createStore)(rootReducer);

function promise({ dispatch, getState }) {
  return function promiseNext(next) {
    // Modified dispatch methods
    return function promiseDispatch(action) {
      if (typeof action.then === 'function') {
        return action.then((newAction) => dispatch(newAction));
      }
      return next(action);
    };
  };
}

function thunk({ dispatch, getState }) {
  return function thunkNext(next) {
    return function thunkDispatch(action) {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      return next(action);
    };
  };
}

function logger({ dispatch, getState }) {
  return function loggerNext(next) {
    return function loggerDispatch(action) {
      console.log('prev state', getState());
      next(action);
      console.log('next state', getState());
    };
  };
}

export default store;
