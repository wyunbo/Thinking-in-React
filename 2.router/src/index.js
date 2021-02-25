import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';

ReactDOM.render(
  <HashRouter>
    <Route exact={true} path="/" component={Home} />
    <Route path="/user" component={User} />
    <Route path="/profile" component={Profile} />
  </HashRouter>,
  document.getElementById('root')
);
