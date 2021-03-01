import React from 'react';
import actions from '../store/actions/counter2';
import { connect } from '../react-redux';

class Counter1 extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.add2}>add2</button>
        <button onClick={this.props.minus2}>minus2</button>
        <button onClick={this.props.minus}>minus</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => state.counter2;
export default connect(mapStateToProps, actions)(Counter1);
