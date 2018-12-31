import { Component } from '../core/Component';
import { Connect } from "../core/store";

class ColorButton extends Component {

  onStateChange(state) {
    this.check(state)
  }

  onInit() {
    this.check(this.store.state)
  }

  check(state) {
    const type = this.props.type;
    const el = this.ids.get(`btn`);
    const typeObject = state.toolbox[type];
    let color;

    if(typeObject) {
      color = typeObject.color;
    }

    if(this.color !== color) {
      el.style.backgroundColor = color;
    } 

    this.color = color;
  }

  handleClick(e) {
    const el = e.target;
    this.store.setState({ colorPallet: { target: this.props.type, isVisible: true, x: el.offsetLeft }});
  }

  render() {
    return `
            <div 
								title="Color"
                component-id="btn" 
                component-click="handleClick(e)"
                class="color-button"
            ></div>
        `;
  }
}

export default Connect(ColorButton);