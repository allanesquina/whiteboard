import { Component } from "../core/Component";
import { Connect } from "../core/store";

class MenuPencilProperties extends Component {
  constructor(DOM) {
    super(DOM);
    this.sizes = [1, 2, 3, 4, 5, 10];
    this.DOM.classList.add('hidden');
  }

  checkVisibility(state) {
    const { currentTool } = state.toolbox;

    if(currentTool === `pencil`) {
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
      this.store.setState({ toolbox: { pencil: { size: this.sizes[el.selectedIndex]}}})
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
              <label> Pencil </label>
              <div data-component="MenuButton"
                  data-selected='false'
                  data-type="pencil"
              ></div>
              <span class="separator"></span>
              <label> Color: </label>
              <span data-type="pencil" data-component="ColorButton"></span>
              <span class="separator"></span>
              <label> Size: </label>
              ${this.renderSelect()}
            </div>
        `;
  }
}

export default Connect(MenuPencilProperties);
