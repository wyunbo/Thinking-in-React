import { REACT_TEXT } from './constants';
/**
 * for the following DOM-DIFF, individually encapsulate or identify the text node
 * no matter what you are, all are packaged in the form of React elements.
 * @param {*} element it can be a React element, it can be a string or a number
 */
export function wrapToVdom(element) {
  return typeof element === 'string' || typeof element === 'number'
    ? { type: REACT_TEXT, props: { content: element } }
    : element;
}
