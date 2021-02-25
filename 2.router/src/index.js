import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, Route, Switch } from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/user" component={User} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
