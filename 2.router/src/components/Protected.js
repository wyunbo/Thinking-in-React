import { Route, Redirect } from '../react-router-dom';
const Protected = (props) => {
  //path is the path need to match, RouteComponent is component need to render
  let { path, component: RouteComponent } = props;
  return (
    <Route
      path={path}
      render={(
        routeProps //{history,location,match}
      ) =>
        localStorage.getItem('login') ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: path } }} />
        )
      }
    />
  );
};
export default Protected;
