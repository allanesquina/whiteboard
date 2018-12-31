import { Component } from "../core/Component";
import { Connect } from "../core/store";

class MenuEraserProperties extends Component {
  constructor(DOM) {
    super(DOM);
    this.sizes = [5, 10, 15, 20];
    this.DOM.classList.add('hidden');
  }

  checkVisibility(state) {
    const { currentTool } = state.toolbox;

    if(currentTool === `eraser`) {
      this.DOM.classList.add('visible');
    } else {
      this.DOM.classList.remove('visible');
    }
  }


  onStateChange(state) {
    this.checkVisibility(state);
  }

  onInit() {
    this.checkVisibility(this.store.state);

    const select = this.ids.get('select');
    select.addEventListener('change', e => {
      const el = e.target;
      this.store.setState({ toolbox: { eraser: { size: this.sizes[el.selectedIndex]}}})
    })
  }

  renderSelect() {
    let buff = [];
    const currentSize = this.store.getState(`toolbox.eraser.size`);
    this.sizes.forEach(size => {
      const selected = size === currentSize ? `selected='selected'` : ``;
      buff.push(`<option ${selected} value="${size}">${size}pt</option>`);
    });

    return `
      <select component-id="select">
        ${buff.join('')}
      </select>
    `
  }

  render() {
    return `
            <div class="menu-properties">
              <label> Eraser </label>
              <div data-component="MenuButton"
                  data-icon="eraser"
              ></div>
              <span class="separator"></span>
              <label> Size: </label>
              ${this.renderSelect()}
            </div>
        `;
  }
}

export default Connect(MenuEraserProperties);
