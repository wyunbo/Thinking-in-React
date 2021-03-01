import React from 'react';
import { useSelector, useDispatch } from '../react-redux';
import * as types from '../store/action-types';

function Counter1() {
  let dispatch = useDispatch(); // store.dispatch
  const mapStateToProps = (state) => ({
    counter1: state.counter1,
    counter2: state.counter2,
    something: 'something',
  });
  let state = useSelector(mapStateToProps);
  return (
    <div>
      <p>{state.counter1.number}</p>
      <button onClick={() => dispatch({ type: types.ADD1 })}>add1</button>
      <button onClick={() => dispatch({ type: types.MINUS1 })}>minus1</button>
      <button onClick={() => dispatch({ type: types.MINUS })}>minus</button>
    </div>
  );
}

export default Counter1;
