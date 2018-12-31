import { Component } from '../core/Component';
import { Connect } from "../core/store";

class MenuButton extends Component {
  constructor(DOM) {
    super(DOM);
  }

  checkState(state) {

    const el = this.ids.get(`btn`);
    const { path, selected, type } = this.props
    const storeValue = path ? this.store.getState(path) : false;
    const isSelected = selected || storeValue === type;

    if(isSelected) {
      el.classList.add('menu-button-selected');
    } else {
      el.classList.remove('menu-button-selected');
    }
  }

  onInit() {
    this.checkState(this.store.state);
  }

  onStateChange(state) {
    this.checkState(state);
  }

  render() {
    const { icon, title } = this.props;
    const strTitle = title || '';
    return `
            <button 
                component-id="btn" title="${strTitle}" class="menu-button icon icon-${icon}"
            ></button>
        `;
  }
}

export default Connect(MenuButton);