import React from 'react';
import ReactReduxContext from './ReactReduxContext';

function Provider(props) {
  const [stateValue, setStateValue] = React.useState({ store: props.store });

  setTimeout(() => {
    setStateValue({ store: { ...stateValue.store } });
  }, 3000);
  return (
    <ReactReduxContext.Provider value={stateValue}>
      {props.children}
    </ReactReduxContext.Provider>
  );
}
export default Provider;
