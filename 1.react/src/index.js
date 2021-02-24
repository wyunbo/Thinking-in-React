import React from './react';
import ReactDOM from './react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import FunctionComp from './pages/functionComp';
import ClassComp from './pages/classComp';
import LifeCycle from './pages/lifeCycle';
import Hooks from './pages/hooks';

console.log(App());

function App() {
  return (
    <div>
      <ClassComp
        title="Class component demo"
        style={{ backgroundColor: '#ccc', color: '#' }}
      />
      <FunctionComp
        title="Function component demo"
        style={{ backgroundColor: 'green', color: '#fff' }}
      />
      <Hooks
        title="Hooks demo"
        style={{ backgroundColor: '#31c4cc', color: '#fff' }}
      />
    </div>
    // <BrowserRouter>
    //   {NavItems.map((item) => (
    //     <Route
    //       key={item.path}
    //       path={item.path}
    //       exact
    //       component={item.component}
    //     />
    //   ))}
    // </BrowserRouter>
    // <Home />
  );
}

ReactDOM.render(<App name="app" />, document.getElementById('root'));
