import React from 'react';
import { Link } from './';
import { __RouterContext as RouterContext, Route } from '../react-router';
import { matchPath } from '../react-router';

function NavLink(props) {
  const {
    to,
    className: classNameProp = '', // native class name
    style: styleProp = {}, // initial inline style object
    activeClassName = '',
    activeStyle = {},
    children,
    exact,
  } = props;
  return (
    <Route
      path={to}
      exact={exact}
      children={(routeProps) => {
        let match = routeProps.match;
        let className = match
          ? joinClassNames(classNameProp, activeClassName)
          : classNameProp;
        let style = match ? { ...styleProp, ...activeStyle } : styleProp;
        let linkProps = { className, style, to, children };
        return <Link {...linkProps} />;
      }}
    />
  );
}
function joinClassNames(...classNames) {
  return classNames.filter((c) => c).join(' '); // filter empty class name
}
export default NavLink;
