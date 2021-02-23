import { Component } from './component';
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

const React = {
  createElement,
  Component,
  useState,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
};
export default React;
