import React from 'react';
import { bindActionCreators } from '../redux';
import store from '../store';
import actions from '../store/actions/counter1';

const boundActions = bindActionCreators(actions, store.dispatch);

class Counter1 extends React.Component {
  state = { number: store.getState().c1.number };
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ number: store.getState().c1.number });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={boundActions.add1}>add1</button>
        <button onClick={boundActions.minus1}>minus1</button>
        <button onClick={boundActions.minus}>minus</button>
      </div>
    );
  }
}

export default Counter1;
