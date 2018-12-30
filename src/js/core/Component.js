
export class Component {
  constructor(DOM) {
    this.ids = new Map();
    this.DOM = DOM;
    this.DOM.removeAttribute("data-component");
    this.props = this.DOM.dataset;
  }

  _init() {
    this._render();
    (this.onInit && this.onInit());
  }

  _render() {
    const parser = new DOMParser();
    const toHTML = parser.parseFromString(this.render(), "text/html");
    this.DOM.appendChild(toHTML.querySelector('body').firstChild);
    // bind events
    const actionsEl = this.DOM.querySelectorAll("[component-click]");
    actionsEl.forEach(el => {
      const actionName = el.getAttribute("component-click");
      // add event
      el.addEventListener("click", e => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const fn = new Function(`
                return function (e) {
                    return this.${actionName};
                }
            `);
        fn().call(this, e);
      });
    });

    // Get ids
    const innerComps = this.DOM.querySelectorAll("[component-id]");
    innerComps.forEach(el => {
      const id = el.getAttribute("component-id");
      this.ids.set(id, el);
    });
  }
}
