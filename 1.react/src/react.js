import { wrapToVdom } from './utils';
import { REACT_ELEMENT } from './constants';
/**
 * @param {*} type 元素的类型
 * @param {*} config 配置对象
 * @param {*} children  儿子或儿子们
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
};
export default React;
