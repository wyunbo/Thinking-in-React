import { updateQueue } from './component';

/**
 * add event function to real DOM
 *
 * @param {*} dom
 * @param {*} eventType
 * @param {*} handleClick
 */
export function addEvent(dom, eventType, handleClick) {
  let store;
  if (dom.store) {
    store = dom.store;
  } else {
    dom.store = {};
    store = dom.store;
  }
  store[eventType] = handleClick; // store.onclick = handleClick
  if (!document[eventType]) {
    // event delegation, no matter which DOM element you bind the event to, it will be delegated to the document in the end.
    document[eventType] = dispatchEvent;
  }
}
const syntheticEvent = {};
function dispatchEvent(event) {
  let { target, type } = event; // e.g. type=click
  const eventType = `on${type}`; // onclick
  updateQueue.isBatchingUpdate = true; // set batch update mode
  setSyntheticEvent(event);
  while (target) {
    const { store } = target;
    const handleClick = store && store[eventType];
    handleClick && handleClick.call(target, syntheticEvent);
    target = target.parentNode;
  }
  setSyntheticEvent(null);
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate();
}

function setSyntheticEvent(nativeEvent) {
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent === null ? nativeEvent : nativeEvent[key];
  }
}
