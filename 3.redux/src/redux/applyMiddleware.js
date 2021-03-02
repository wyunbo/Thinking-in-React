function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer) {
      let store = createStore(reducer); // Create old store first
      let dispatch = () => {
        throw new Error();
      }; // point to modified dispatch methods
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => {
          dispatch(action);
        },
      };
      let chain = middlewares.map((middleware) => middleware(middlewareAPI));
      // let [promise, thunk, logger] = chain;
      // dispatch = promise(thunk(logger(store.dispatch)));
      dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}

function compose(...fns) {
  return function (args) {
    return fns.reduceRight((args, fn) => {
      return fn(args);
    }, args);
  };
}

export default applyMiddleware;
