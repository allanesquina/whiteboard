import { Component } from "../core/Component";
import { Connect } from "../core/store";

class MenuBrushProperties extends Component {
  constructor(DOM) {
    super(DOM);
    this.sizes = [5, 10, 15, 20];
    this.DOM.classList.add('hidden');
  }

  checkVisibility(state) {
    const { currentTool } = state.toolbox;

    if(currentTool === `brush`) {
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
      this.store.setState({ toolbox: { brush: { size: this.sizes[el.selectedIndex]}}})
    })
  }

  renderSelect() {
    let buff = [];
    this.sizes.forEach(size => {
      buff.push(`<option value="${size}">${size}pt</option>`);
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
              <label> Brush </label>
              <div data-component="MenuButton"
                  data-selected='false'
                  data-type="brush"
              ></div>
              <span class="separator"></span>
              <label> Color: </label>
              <span data-type="brush" data-component="ColorButton"></span>
              <span class="separator"></span>
              <label> Size: </label>
              ${this.renderSelect()}
            </div>
        `;
  }
}

export default Connect(MenuBrushProperties);
