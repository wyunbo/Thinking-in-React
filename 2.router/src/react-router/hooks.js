import React, { useContext } from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
export function useHistory() {
  return useContext(RouterContext).history;
}
export function useLocation() {
  return useContext(RouterContext).location;
}
export function useParams() {
  let match = useContext(RouterContext).match;
  return match ? match.params : {};
}
// context value {history, location, match}
export function useRouteMatch(path) {
  let location = useLocation(); // get current location object {pathname}
  let match = useContext(RouterContext).match; // current match, from Provider
  return path ? matchPath(location.pathname, path) : match;
}
