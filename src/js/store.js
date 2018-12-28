import Event from "./jps";

function deepExtend(target, source) {
  for (var prop in source)
    if (
      prop in target &&
      typeof target[prop] === "object" &&
      typeof source[prop] === "object"
    )
      deepExtend(target[prop], source[prop]);
    else target[prop] = source[prop];
  return target;
}

export default class Store {
  constructor(initialState = {}) {
    this.state = {};
    this.event = new Event();
    this.set(initialState);
    this.on = this.event.on;
    this.emit = this.event.emit;
  }

  set(state) {
    let newState = deepExtend(this.state, state);
    this.event.emit("change", newState);
    this.state = newState;
  }
}
