import React from 'react';
import { connect } from '../react-redux';
import actions from '../store/actions/counter1';

class Counter1 extends React.Component {
  render() {
    const { number, add1, minus1, minus } = this.props;
    return (
      <div>
        <p>{number}</p>
        <button onClick={add1}>add1</button>
        <button onClick={minus1}>minus1</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.counter1;
export default connect(mapStateToProps, actions)(Counter1);
