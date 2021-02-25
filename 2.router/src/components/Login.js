import React from 'react';
class UserList extends React.Component {
  login = (event) => {
    localStorage.setItem('login', 'true');
    let to;
    if (this.props.location.state) {
      to = this.props.location.state.from || '/';
    }
    this.props.history.push(to);
  };
  render() {
    return <button onClick={this.login}>Login</button>;
  }
}
export default UserList;
