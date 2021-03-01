import React, { useContext } from 'react';
import ReactReduxContext from './ReactReduxContext';
import { bindActionCreators } from '../redux';

/**
 * Connect component and store
 * Two routes
 * 1. input, pass state of store to component, mapStateToProps
 * 2. output, open methods to component, to operate state in store, actions
 * Moreover, in order to let component get latest state from store, notify component to update once state in store has been changed.
 * @param {*} mapStateToProps
 * @param {*} mapDispatchToProps map store.dispatch to props
 */
function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return function NewComponent(props) {
      const { store } = useContext(ReactReduxContext);
      const state = store.getState(); // Get general state from store
      const stateProps = React.useMemo(() => {
        console.log('Recalculate stateProps');
        return mapStateToProps(state);
      }, [state]);
      let dispatchProps = React.useMemo(() => {
        console.log('Recalculate dispatchProps');
        let dispatchProps;
        if (typeof mapDispatchToProps === 'object') {
          dispatchProps = bindActionCreators(
            mapDispatchToProps,
            store.dispatch
          );
        } else if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(store.dispatch);
        } else {
          dispatchProps = { dispatch: store.dispatch };
        }
        return dispatchProps;
      }, [store.disaptch]);
      const [, setState] = React.useState({});
      React.useEffect(() => {
        let unsubscribe = store.subscribe(() => setState({}));
        return unsubscribe;
      }, [store]);
      return <OldComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}
export default connect;
