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
  getState(nextProps) {
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
    if (classInstance.constructor.getDerivedStateFromProps) {
      const partialState = classInstance.constructor.getDerivedStateFromProps(
        nextProps,
        classInstance.state
      );
      if (partialState) {
        state = { ...state, ...partialState };
      }
    }

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
  forceUpdate() {
    let nextState = this.state;
    let nextProps = this.props;
    if (this.constructor.getDerivedStateFromProps) {
      const partialState = this.constructor.getDerivedStateFromProps(
        nextProps,
        nextProps
      );
      if (partialState) {
        nextState = { ...nextState, partialState };
      }
    }
    this.state = nextState;
    this.updateComponent();
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

export class PureComponent extends Component {
  // update only if state or props has been changed
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }
}

/**
 * shallow compare obj1 and obj2
 * As long as the reference addresses are the same, they are considered equal
 * @param {*} obj1
 * @param {*} obj2
 */
function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) return true; // if reference addresses equal, they are considerd equal, don't care if atrributes change.
  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    // Either is not an object, or null, consider not equal
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    // Attribute count different, not equal
    return false;
  }
  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
