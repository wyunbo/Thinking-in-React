import React from 'react';
import { createStore, bindActionCreators } from '../redux';

const ADD = 'ADD';
const MINUS = 'MINUS';
const reducer = (oldState = { number: 5 }, action) => {
  switch (action.type) {
    case ADD:
      return { number: oldState.number + action.payload };
    case MINUS:
      return { number: oldState.number - action.payload };
    default:
      return oldState;
  }
};
let store = createStore(reducer, { number: 10 });

function add(event, amount) {
  return { type: ADD, payload: amount };
}
function minus(event, amount) {
  return { type: MINUS, payload: amount };
}
const actions = { add, minus };
const bindActions = bindActionCreators(actions, store.dispatch);

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
        {/* <button onClick={() => store.dispatch({ type: ADD, payload: 1 })}>
          +1
        </button>
        <button onClick={() => store.dispatch({ type: ADD, payload: 2 })}>
          +2
        </button>
        <button onClick={() => store.dispatch({ type: MINUS })}>-</button> */}
        <button onClick={(event) => bindActions.add(event, 2)}>+2</button>
        <button onClick={(event) => bindActions.minus(event, 2)}>-2</button>
      </div>
    );
  }
}

export default Counter1;
