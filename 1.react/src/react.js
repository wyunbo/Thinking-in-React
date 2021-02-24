import { Component, PureComponent } from './component';
import {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useRef,
} from './react-dom';
import { wrapToVdom } from './utils';
import { REACT_ELEMENT } from './constants';
/**
 * @param {*} type element type
 * @param {*} config config object
 * @param {*} children  children
 */
function createElement(type, config, children) {
  let ref, key;
  if (config) {
    ref = config.ref;
    key = config.key;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    props.children = wrapToVdom(children);
  }
  return {
    $$typeof: REACT_ELEMENT,
    type,
    ref,
    key,
    props,
  };
}
function cloneElement(oldElement, newProps, ...newChildren) {
  let children = oldElement.props.children;
  // children: undefined || object || array
  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }
  } else {
    children = [];
  }
  children.push(...newChildren);
  children = children.map(wrapToVdom);
  if (children.length === 0) {
    children = undefined;
  } else if (children.length === 1) {
    children = children[0];
  }
  newProps.children = children;
  const props = { ...oldElement.props, ...newProps };
  return { ...oldElement, props };
}
function createRef() {
  return { current: null };
}
function forwardRef(FunctionComponent) {
  return class NewComp extends Component {
    render() {
      if (FunctionComponent.length < 2) {
        console.error(
          'forwardRef render functions accept exactly two parameters: props and ref. Did you forget to use the ref parameter?'
        );
      }
      return FunctionComponent(this.props, this.ref);
    }
  };
}

function createContext(initialValue = {}) {
  const context = { Provider, Consumer };
  function Provider(props) {
    context._currentValue = context._currentValue || initialValue;
    Object.assign(context._currentValue, props.value);
    return props.children;
  }
  function Consumer(props) {
    return props.children(context._currentValue);
  }
  return context;
}

function useContext(context) {
  return context._currentValue;
}

function memo(FunctionComponent) {
  return class MemoComp extends PureComponent {
    return() {
      return FunctionComponent(this.props);
    }
  };
}

const React = {
  createElement,
  Component,
  PureComponent,
  createRef,
  createContext,
  cloneElement,
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  memo,
  useMemo,
  useCallback,
  useRef,
  forwardRef,
  useContext,
};
export default React;
