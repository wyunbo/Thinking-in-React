import React from 'react';
import RouterContext from './RouterContext';

class Router extends React.Component {
  static computedRootMatch(pathname) {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
  }
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };
    // Listen location change in history object, execute callback once location change, parameter is latest location object
    // return a cancel listening func, call it can cancel listening
    this.unlisten = props.history.listen((location) => {
      this.setState({ location });
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    let value = {
      location: this.state.location, // pass to Route to judge if router match
      history: this.props.history, // let component jump location
      match: Router.computedRootMatch(this.state.location.pathname),
    };
    return (
      <RouterContext.Provider value={value}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
export default Router;
