import React from 'react';
import { UserAPI } from '../utils';
class UserList extends React.Component {
  state = { name: '' };
  nameRef = React.createRef();
  handleSubmit = (event) => {
    event.preventDefault(); // prevent form refresh
    //let name = this.nameRef.current.value;
    UserAPI.add({ id: Date.now() + '', name: this.state.name });
    this.props.history.push('/user/list');
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.name}
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default UserList;
