import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link,
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from './react-router-dom';

const Home = () => <div>Home</div>;
function UserDetail() {
  let params = useParams(); // get path parameters
  console.log('params', params);
  let location = useLocation(); // get location object
  console.log('location', location);
  let history = useHistory(); // get history object
  console.log('history', history);
  return (
    <div>
      id:{params.id} name:{location.state.name}
    </div>
  );
}
function Post() {
  let match = useRouteMatch({
    path: '/post/:id', // match path
    strict: true,
    sensitive: true,
  });
  return match ? <div>id:{match.params.id}</div> : <div>Not Found</div>;
}
ReactDOM.render(
  <BrowserRouter>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link
          to={{ pathname: `/user/detail/1`, state: { id: 1, name: '张三' } }}
        >
          User detail
        </Link>
      </li>
      <li>
        <Link to="/post/1">Post</Link>
      </li>
    </ul>
    <Route path="/" component={Home} />
    <Route path="/user/detail/:id" component={UserDetail} />
    <Route path="/post/:id" component={Post} />
  </BrowserRouter>,
  document.getElementById('root')
);
