import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

/**
 * 1. get context value
 * 2. compare current url and path in math router rules.
 * if equal, render component, if not, don't render
 */
class Route extends React.Component {
  static contextType = RouterContext;
  render() {
    const { history, location } = this.context;
    const { component: RouteComponent, computedMatch } = this.props;
    const match = computedMatch
      ? computedMatch
      : matchPath(location.pathname, this.props);
    let renderElement = null;
    const routeProps = { history, location, match };
    if (match) {
      renderElement = <RouteComponent {...routeProps} />;
    }
    return renderElement;
  }
}
export default Route;
