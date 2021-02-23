import { compareTwoVdom, findDOM } from './react-dom';

// Update queue
export const updateQueue = {
  isBatchingUpdate: false, // whether it is currently in batch update mode, default value is false
  updaters: [],
  batchUpdate() {
    // batch update
    for (let updater of updateQueue.updaters) {
      updater.updateComponent();
    }
    updateQueue.isBatchingUpdate = false;
    updateQueue.updaters.length = 0;
  },
};

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance; // class component instance
    this.pendingStates = []; // states pending to take effect, maybe an object or a function
    this.callbacks = [];
  }
  addState(partialState, callback) {
    this.pendingStates.push(partialState); // states waiting to update or take effect
    if (typeof callback === 'function') {
      this.callbacks.push(callback); // callback after state updated
    }
    this.emitUpdate();
  }
  // component will be updated, props change or states change
  emitUpdate(nextProps) {
    this.nextProps = nextProps;
    if (updateQueue.isBatchingUpdate) {
      // if batch update mode, cache updater first
      updateQueue.updaters.push(this); // then end of this setState call
    } else {
      this.updateComponent(); // update component directly
    }
  }
  updateComponent() {
    const { classInstance, pendingStates, nextProps } = this;
    // if there is state waiting to update
    if (nextProps || pendingStates.length > 0) {
      shouldUpdate(classInstance, nextProps, this.getState(nextProps));
    }
  }
  getState() {
    // get latest state
    const { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      // pendingState is a function, pass old state, return new state, then mege
      if (typeof nextState === 'function') {
        nextState = nextState(state);
      }
      state = { ...state, ...nextState };
    });
    pendingStates.length = 0; // empty array

    return state;
  }
}
/**
 * whether need to update
 * @param {*} classInstance
 * @param {*} nextProps
 * @param {*} nextState
 */
function shouldUpdate(classInstance, nextProps, nextState) {
  let willUpdate = true;
  // if there is shouldComponentUpdate function and its return value is false, then it will not be updated
  if (
    classInstance.shouldComponentUpdate &&
    !classInstance.shouldComponentUpdate(nextProps, nextProps)
  ) {
    classInstance.componentWillUpdate();
  }
  // whether to update or not, the new props and states have to be changed
  if (nextProps) {
    classInstance.props = nextProps;
  }
  classInstance.state = nextState;
  // if need to update, execute component logic
  if (willUpdate) {
    classInstance.updateComponent();
  }
}

export class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  setState(partialState, callback) {
    this.updater.addState(partialState, callback);
  }
  updateComponent() {
    const newRenderVdom = this.render(); // call render again, get new vdom
    const oldRenderVdom = this.oldRenderVdom;
    const oldDOM = findDOM(oldRenderVdom);
    // deep compare new and old virtual DOM
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;
  }
}
