import Event from "./jps";
import { deepExtend } from './util';

export let store;

export default class Store {
  constructor(initialState = {}) {
    this.state = {};
    this.event = new Event();
    this.setState(initialState);
    this.on = this.event.on;
    this.emit = this.event.emit;
  }

  setState(state) {
    let newState = deepExtend(this.state, state);
    this.event.emit("change", newState);
    this.state = newState;
  }
}

export function createStore(state) {
 store = new Store(state);
}

export const Connect = comp => {

  return function() {

    const c = new comp(...arguments)
    c.store = store;
    store.on("change", state => {
      c.onStateChange && c.onStateChange(state);
    });
    return c;
  }
};
