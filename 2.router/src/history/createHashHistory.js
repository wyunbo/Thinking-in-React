function createHashHistory() {
  let action;
  let listeners = [];
  let historyStack = []; // History stack
  let historyIndex = -1; // Stack pointer
  let state;
  function listen(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  }

  function push(pathname, nextState) {
    action = 'PUSH';
    if (typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    window.location.hash = pathname;
  }
  function go(n) {
    action = 'POP';
    historyIndex += n;
    let nextLocation = historyStack[historyIndex];
    state = nextLocation.state;
    window.location.hash = nextLocation.pathname;
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }

  const history = {
    action: 'POP', // PUSH, REPLACE, POP
    location: { pathname: '/', state: undefined },
    go,
    goBack,
    goForward,
    push,
    listen,
  };

  window.addEventListener('hashchange', () => {
    let pathname = window.location.hash.slice(1); // remove #
    Object.assign(history, { action, location: { pathname, state } });
    if (!action || action === 'PUSH') {
      historyStack[++historyIndex] = history.location;
    }
    listeners.forEach((listener) => listener(history.location));
  });

  return history;
}
export default createHashHistory;
