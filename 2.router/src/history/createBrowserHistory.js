function createBrowserHistory() {
  const globalHistory = window.history;
  const listeners = [];
  let action;
  let state;
  function go(n) {
    globalHistory.go(n);
  }
  function goBack(n) {
    go(-1);
  }
  function goForward(n) {
    go(1);
  }
  function listen(listener) {
    listeners.push(listener);
    return () => {
      let idx = listeners.indexOf(listener);
      listeners.splice(idx, 1);
    };
  }
  function notify(newHistory) {
    Object.assign(history, newHistory);
    listeners.forEach((listener) => listener(history.location));
  }
  function push(pathname, nextState) {
    action = 'PUSH';
    if (typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    // native history.pushState
    globalHistory.pushState(state, null, pathname);
    let location = { state, pathname };
    notify({ action, location });
  }
  function replace(pathname, nextState) {
    action = 'REPLACE';
    if (typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    // native history.replaceState
    globalHistory.replaceState(state, null, pathname);
    let location = { state, pathname };
    notify({ action, location });
  }
  window.onpopstate = (event) => {
    nofity({
      action: 'POP',
      location: {
        pathname: window.location.pathname,
        state: globalHistory.state,
      },
    });
  };
  const history = {
    action: 'POP', //当前最后一个动作是什么动作 push PUSH  goBack POP
    location: {
      pathname: window.location.pathname,
      state: globalHistory.state,
    },
    go,
    goBack,
    goForward,
    push,
    replace,
    listen,
  };
  return history;
}
export default createBrowserHistory;
