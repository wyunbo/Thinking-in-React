import React from '../react';

class App extends React.Component {
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
          <p>{number}</p>
          <button onClick={() => this.setState({ number: number + 1 })}>
            +
          </button>
          <button onClick={() => this.setState({ number: number - 1 })}>
            -
          </button>
        </div>
      </div>
    );
  }
}

export default App;
