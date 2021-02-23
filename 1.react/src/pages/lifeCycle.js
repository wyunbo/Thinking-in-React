import React from '../react';
import ReactDOM from '../react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  IndexPage,
  LifeCycle,
  FunctionComp,
  ClassComp,
  Hooks,
} from '../router';

function Counter(props) {
  console.log('props', props);
  // React.useEffect(() => {
  //   console.log('Counter DidMount or DidUpdate');
  //   return () => {
  //     console.log('Counter willUnmount');
  //   };
  // });
  return (
    <div>
      <p>{props.number}</p>
    </div>
  );
}

function App() {
  const [number, setNumber] = React.useState(0);
  return (
    <div style={{ backgroundColor: 'pink' }}>
      {number <= 2 ? <Counter number={123} /> : null}
      <button onClick={() => setNumber((number) => number + 1)}>+</button>
    </div>
  );
}

export default App;
