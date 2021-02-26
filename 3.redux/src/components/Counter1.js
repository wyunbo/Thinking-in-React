import React from 'react';
import { createStore } from '../redux';

const ADD = 'ADD';
const MINUS = 'MINUS';
const reducer = (oldState = { number: 5 }, action) => {
  switch (action.type) {
    case ADD:
      return { number: oldState.number + action.payload };
    case MINUS:
      return { number: oldState.number - 1 };
    default:
      return oldState;
  }
};
let store = createStore(reducer, { number: 10 });

class Counter1 extends React.Component {
  state = { number: store.getState().number };
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ number: store.getState().number });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => store.dispatch({ type: ADD, payload: 1 })}>
          +1
        </button>
        <button onClick={() => store.dispatch({ type: ADD, payload: 2 })}>
          +2
        </button>
        <button onClick={() => store.dispatch({ type: MINUS })}>-</button>
      </div>
    );
  }
}

export default Counter1;
