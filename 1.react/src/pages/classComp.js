import React from '../react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Counter getDerivedStateFromProps');
    const { number } = nextProps;
    return { number: number + ` month${number > 1 ? 's' : ''}` };
  }

  render() {
    const { number } = this.state;
    return <p>{number}</p>;
  }
}

class ClassComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  render() {
    const { title, style } = this.props;
    const { number } = this.state;
    return (
      <div>
        <div style={style}>{title}</div>
        <div>
          <Counter number={number} />
          <button onClick={() => this.setState({ number: number + 1 })}>
            +
          </button>
          <button
            onClick={() => number > 0 && this.setState({ number: number - 1 })}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

export default ClassComp;
