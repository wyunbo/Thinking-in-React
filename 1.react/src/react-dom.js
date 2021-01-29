import { REACT_TEXT } from './constants';
import { wrapToVdom } from './utils';

let scheduleUpdate;

function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
  if (!oldVdom && !newVdom) {
    // both null
    return null;
  } else if (oldVdom && !newVdom) {
    // old not null and new null, means this node has been deleted
  } else if (!oldVdom && newVdom) {
    // old null and new not null, create DOM node
  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
  } else {
    updateElement(oldVdom, newVdom);
  }
}

function updateElement(oldVdom, newVdom) {
  console.log(typeof oldVdom.type);
}

function mount(vdom, container) {
  const newDOM = createDOM(vdom);
  container.appendChild(newDOM);
}

function createDOM(vdom) {
  const { type, props, ref } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else {
    dom = document.createElement(type);
  }
  if (props) {
    if (typeof props.children === 'object' && props.children.type) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    } /*else if (typeof props.children === 'string') {
      mount(wrapToVdom(props.children), dom);
    }*/
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
  container.innerHTML = '';
  mount(vdom, container);
  // scheduleUpdate = () => {
  //   compareTwoVdom(container, vdom, vdom);
  // };
}

const ReactDOM = {
  render,
};
export default ReactDOM;
