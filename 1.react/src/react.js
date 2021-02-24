import { Component, PureComponent } from './component';
import {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
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
  useState,
  useReducer,
  useEffect,
  memo,
  useMemo,
  useCallback,
};
export default React;
