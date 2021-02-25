import UserAdd from './UserAdd';
import UserList from './UserList';
import UserDetail from './UserDetail';
import { Route, Link } from '../react-router-dom';
const User = (props) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/user/list">User list</Link>
        </li>
        <li>
          <Link to="/user/add">Add user</Link>
        </li>
      </ul>
      <Route path={`/user/list`} component={UserList} />
      <Route path="/user/add" component={UserAdd} />
      <Route path="/user/detail/:id" component={UserDetail} />
    </div>
  );
};
export default User;
