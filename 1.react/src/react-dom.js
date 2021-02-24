import { REACT_TEXT } from './constants';
import { addEvent } from './event';

const hookStates = [];
let hookIndex = 0; // curent hook index
let scheduleUpdate;

/**
 * In order to ensure that this callback function is not executed synchronously, but executed after the page is rendered.
 * @param {*} callback callback function, be executed after the page is rendered
 * @param {*} dependencies
 */
export function useEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    const [destroyFunction, lastDependencies] = hookStates[hookIndex];
    const allTheSame =
      dependencies &&
      dependencies.every((item, index) => item === lastDependencies[index]);
    if (allTheSame) {
      hookIndex++;
    } else {
      destroyFunction && destroyFunction();
      // Put the callback in the macro task queue
      setTimeout(dispatch);
    }
  } else {
    // first render
    setTimeout(dispatch);
  }
  function dispatch() {
    const destroyFunction = callback();
    hookStates[hookIndex++] = [destroyFunction, dependencies];
  }
}

export function useLayoutEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    const [destroyFunction, lastDependencies] = hookStates[hookIndex];
    const allTheSame =
      dependencies &&
      dependencies.every((item, index) => item === lastDependencies[index]);
    if (allTheSame) {
      hookIndex++;
    } else {
      destroyFunction && destroyFunction();
      // Put function to micro task queue
      queueMicrotask(dispatch);
    }
  } else {
    // first render
    Promise.resolve().then(dispatch);
  }
  function dispatch() {
    const destroyFunction = callback();
    hookStates[hookIndex++] = [destroyFunction, dependencies];
  }
}

export function useRef(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || { current: initialState };
  return hookStates[hookIndex++];
}

export function useMemo(factory, deps) {
  deps = Array.isArray(deps) ? deps : [deps];
  if (hookStates[hookIndex]) {
    const [lastMemo, lastDeps] = hookStates[hookIndex];
    const same = deps.every((item, index) => item === lastDeps[index]);
    if (same) {
      hookIndex++;
      return lastMemo;
    } else {
      return newMemo();
    }
  } else {
    return newMemo();
  }
  function newMemo() {
    const newMemo = factory();
    hookStates[hookIndex++] = [newMemo, deps];
    return newMemo;
  }
}

export function useCallback(callback, deps) {
  deps = Array.isArray(deps) ? deps : [deps];
  if (hookStates[hookIndex]) {
    const [lastCallback, lastDeps] = hookStates[hookIndex];
    const same = deps.every((item, index) => item === lastDeps[index]);
    if (same) {
      hookIndex++;
      return lastCallback;
    } else {
      return newCallback();
    }
  } else {
    return newCallback();
  }
  function newCallback() {
    hookStates[hookIndex++] = [callback, deps];
    return callback;
  }
}

export function useState(initialState) {
  return useReducer(null, initialState);
}

/**
 *
 * @param {*} reducer
 * @param {*} initialState
 */
export function useReducer(reducer, initialState) {
  // get old state, if not, use the default value
  hookStates[hookIndex] =
    hookStates[hookIndex] ||
    (typeof initialState === 'function' ? initialState() : initialState);
  let currentIndex = hookIndex;
  function dispatch(action) {
    const lastState = hookStates[currentIndex]; // get old state
    let nextState;
    if (reducer) {
      nextState = reducer(lastState, action);
    } else {
      if (typeof action === 'function') {
        nextState = action(lastState);
      } else {
        nextState = action;
      }
    }
    // If the old state and the new State are not equal, a shallow comparison is used
    if (lastState != nextState) {
      hookStates[currentIndex] = nextState;
      scheduleUpdate(); // Update the application again when the state changes
    } // if equal, nothing to do
  }
  return [hookStates[hookIndex++], dispatch];
}

/**
 * DOM-DIFF
 * @param {*} parentDOM parent real DOM
 * @param {*} oldVdom last virtual DOM
 * @param {*} newVdom current virtual DOM
 * @param {*} nextDOM brother node behind
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
  if (!oldVdom && !newVdom) {
    // both null
    return null;
  } else if (oldVdom && !newVdom) {
    // old exsit but new is null, it means this node has been deleted.
    const currentDOM = findDOM(oldVdom);
    if (currentDOM) parentDOM.removeChild(currentDOM);
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
      oldVdom.classInstance.componentWillUnmount();
    }
    if (hookStates[hookIndex]) {
      const [destroyFunction] = hookStates[hookIndex];
      destroyFunction && destroyFunction();
    }
  } else if (!oldVdom && newVdom) {
    // old is null but new exsit, it means create DOM node
    const newDOM = createDOM(newVdom); // Create a new real DOM and mount dom to parentNode
    if (nextDOM) {
      // if there is next brother DOM, insert it in front of the brother.
      parentDOM.insertBefore(newDOM, nextDOM);
    } else {
      parentDOM.appendChild(newDOM);
    }
    // execute new vdom didmount event
    if (
      newVdom.classInstance &&
      newVdom.classInstance.componentWillReceiveProps
    ) {
      newVdom.classInstance.componentWillReceiveProps();
    }
  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
    // if both exist but different type, also need to change old to new
    const oldDOM = oldVdom.dom;
    const newDOM = createDOM(newVdom);
    oldDOM.parentNode.replaceChild(newDOM, oldDOM);
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
      oldVdom.classInstance.componentWillUnmount();
    }
    if (hookStates[hookIndex]) {
      const [destroyFunction] = hookStates[hookIndex];
      destroyFunction && destroyFunction();
    }
    if (newVdom.classInstance && newVdom.classInstance.componentDidMount) {
      newVdom.classInstance.componentDidMount();
    }
  } else {
    // if both exist and same type
    updateElement(oldVdom, newVdom);
  }
}

/**
 * In-depth comparison of these two virtual DOMs
 * @param {*} oldVdom old virtual DOM
 * @param {*} newVdom new virtual DOM
 */
function updateElement(oldVdom, newVdom) {
  if (oldVdom.type === REACT_TEXT) {
    // Text node
    const currentDOM = (newVdom.dom = oldVdom.dom); // Reuse old real DOM node
    currentDOM.textContent = newVdom.props.content; // update old DOM textContent
  } else if (typeof oldVdom.type === 'string') {
    // native component
    const currentDOM = (newVdom.dom = oldVdom.dom); //Reuse old real DOM node
    updateProps(currentDOM, oldVdom.props, newVdom.props); // update props
    // update children, only native component will be compared in-depth
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
  } else if (typeof oldVdom.type === 'function') {
    // custom component
    if (oldVdom.type.isReactComponent) {
      updateClassComponent(oldVdom, newVdom);
    } else {
      updateFunctionComponent(oldVdom, newVdom);
    }
  }
}

function updateFunctionComponent(oldVdom, newVdom) {
  const parentDOM = findDOM(oldVdom).parentNode;
  const { type, props } = newVdom;
  const oldRenderVdom = oldVdom.oldRenderVdom;
  const newRenderVdom = type(props);
  compareTwoVdom(parentDOM, oldRenderVdom, newRenderVdom);
  newVdom.oldRenderVdom = newRenderVdom;
}

function updateClassComponent(oldVdom, newVdom) {
  const classInstance = (newVdom.classInstance = oldVdom.classInstance);
  newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
  if (classInstance) {
    if (classInstance.componentWillReceiveProps) {
      classInstance.componentWillReceiveProps();
    }
    // Trigger update of the component with new props
    classInstance.updater.emitUpdate(newVdom.props);
  }
}

function updateChildren(parentDOM, oldVChildren, newVChildren) {
  // because children may be object or array, in order to facilitate comparison by index, all are formatted as array
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  const maxLength = Math.max(oldVChildren.length, newVChildren.length);
  for (let i = 0; i < maxLength; i++) {
    const nextDOM = oldVChildren.find(
      (item, index) => index > i && item && item.dom
    );
    compareTwoVdom(
      parentDOM,
      oldVChildren[i],
      newVChildren[i],
      nextDOM && nextDOM.dom
    );
  }
}

function mount(vdom, container) {
  const newDOM = createDOM(vdom);
  container.appendChild(newDOM);
}

/**
 *
 * @param {*} dom real dom
 * @param {*} oldProps old props
 * @param {*} newProps new props
 */
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') continue; // independent processing, not here
    if (key === 'style') {
      const styleObj = newProps.style;
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith('on')) {
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];
    }
  }
}

/**
 * 1. Create instance of class component
 * 2.
 * @param {*} vdom virtual dom, type is class component
 */
function mountClassComponent(vdom) {
  const { type, props, ref } = vdom;
  // Create instance
  const classInstance = new type(props);
  if (ref) {
    classInstance.ref = ref; // ref in vdom -> instance of class component
  }
  vdom.classInstance = classInstance;
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  // call the render method of the instance to return the virtual DOM object to be rendered
  const oldRenderVdom = classInstance.render();
  // add the virtual DOM to be rendered to the instance of the class
  classInstance.oldRenderVdom = vdom.oldRenderVdom = oldRenderVdom;
  // Create real DOM  according to virtual DOM object
  const dom = createDOM(oldRenderVdom);
  // componentDidMount
  if (classInstance.componentDidMount) {
    classInstance.componentDidMount();
  }
  classInstance.dom = dom;
  return dom;
}

function mountFunctionComponent(vdom) {
  let { type, props } = vdom;
  const oldRenderVdom = type(props);
  vdom.oldRenderVdom = oldRenderVdom;
  return createDOM(oldRenderVdom);
}

function createDOM(vdom) {
  const { type = 'div', props, ref } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else if (typeof type === 'function') {
    // custom component
    if (type.isReactComponent) {
      // class component
      return mountClassComponent(vdom);
    } else {
      // function components
      return mountFunctionComponent(vdom);
    }
  } else {
    // native component
    dom = document.createElement(type);
  }
  if (props) {
    // update dom attributes by vitural dom attributes
    updateProps(dom, {}, props);

    // handle props.children
    if (typeof props.children === 'object' && props.children.type) {
      // only one child
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      // muliple children
      reconcileChildren(props.children, dom);
    }
  }
  vdom.dom = dom;
  if (ref) {
    ref.current = dom;
  }
  return dom;
}

function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    mount(childVdom, parentDOM);
  }
}

/**
 * when mount root containter
 * @param {*} vdom
 * @param {*} container
 */
export function render(vdom, container) {
  // container.innerHTML = '';
  mount(vdom, container);
  scheduleUpdate = () => {
    hookIndex = 0;
    compareTwoVdom(container, vdom, vdom);
  };
}

/**
 * find the real DOM corresponding to this virtual DOM
 * @param {*} vdom
 */
export function findDOM(vdom) {
  const { type } = vdom;
  let dom;
  if (typeof type === 'function') {
    // if component
    dom = findDOM(vdom.oldRenderVdom);
  } else {
    // if normal string, means native component, dom point to real DOM
    dom = vdom.dom;
  }
  return dom;
}

const ReactDOM = {
  render,
};
export default ReactDOM;
