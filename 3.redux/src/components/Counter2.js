import React from 'react';
import store from '../store';
import { bindActionCreators } from '../redux';
import actions from '../store/actions/counter2';
// bind actionCreator
const boundActions = bindActionCreators(actions, store.dispatch);
/**
 * store.getState()={counter1:Counter1state,counter2:counter2State}
 */
class Counter1 extends React.Component {
  state = { number: store.getState().c2.number };
  componentDidMount() {
    //subscribe
    this.unsubscribe = store.subscribe(() => {
      this.setState({ number: store.getState().c2.number });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={boundActions.add2}>add2</button>
        <button onClick={boundActions.minus2}>minus2</button>
        <button onClick={boundActions.minus}>minus</button>
      </div>
    );
  }
}
export default Counter1;
