import React from '../react';

const UserInfoContext = React.createContext();

class UserInfo extends React.Component {
  static contextType = UserInfoContext;
  render() {
    const { realName, country, company } = this.context;
    return (
      <div>
        <p>{realName}</p>
        <p>{country}</p>
        <p>{company}</p>
      </div>
    );
  }
}

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
    return (
      <div>
        <UserInfo />
        <p>{number}</p>
      </div>
    );
  }
}

class ClassComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      userInfo: {
        realName: 'Bison',
        country: 'China',
        company: 'JD',
      },
    };
  }

  render() {
    const { title, style } = this.props;
    const { number, userInfo } = this.state;
    return (
      <div>
        <div style={style}>{title}</div>
        <div>
          <UserInfoContext.Provider value={userInfo}>
            <Counter number={number} />
          </UserInfoContext.Provider>
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
