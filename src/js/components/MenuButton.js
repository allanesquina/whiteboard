import { Component } from '../core/Component';
import { Connect } from "../core/store";

class MenuButton extends Component {

  checkState(state) {

    const el = this.ids.get(`btn`);
    const { path, selected, type } = this.props
    const storeValue = path ? this.store.getState(path) : false;
    const isSelected = selected || storeValue === type;

    if(isSelected) {
      el.classList.add('menu-button--selected');
    } else {
      el.classList.remove('menu-button--selected');
    }
  }

  onInit() {
    this.checkState(this.store.state);
  }

  onStateChange(state) {
    this.checkState(state);
  }

  render() {
    const { icon } = this.props;
    return `
            <div 
                component-id="btn" class="menu-button icon icon-${icon}"
            ></div>
        `;
  }
}

export default Connect(MenuButton);