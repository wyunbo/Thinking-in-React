import React from 'react';
import ReactReduxContext from '../ReactReduxContext';

function useSelector(selector) {
  const { store } = React.useContext(ReactReduxContext);
  let state = store.getState(); // Get general state
  let selectedState = selector(state); // Get sub state
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    return store.subscribe(forceUpdate);
  });
  return selectedState;
}
export default useSelector;
