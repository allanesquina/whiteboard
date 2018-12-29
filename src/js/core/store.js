import Event from "./jps";
import { deepExtend } from './util';

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

export const store = new Store();

export const Connect = comp => {

  return function(DOM) {
    const c = new comp(DOM)
    c.store = store;
    store.on("change", state => {
      c.onStateChange && c.onStateChange(state);
    });
    return c;
  }
};
