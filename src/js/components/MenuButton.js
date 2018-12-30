import { Component } from '../core/Component';
import { Connect } from "../core/store";

class MenuButton extends Component {

  checkState(state) {
    const currentTool = state.toolbox.currentTool;
    const el = this.ids.get(`btn`);
    const { selected } = this.props

    if(selected === 'true') {
      el.classList.add('menu-button--selected');
      return
    } 

    if(selected === 'false') {
      el.classList.remove('menu-button--selected');
      return
    } 

    if(currentTool === this.props.type) {
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
    const { type } = this.props;
    return `
            <div 
                component-id="btn" class="menu-button icon icon-${type}"
            ></div>
        `;
  }
}

export default Connect(MenuButton);