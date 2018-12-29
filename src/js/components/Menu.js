import { Component } from "../core/Component";
import { Connect } from "../core/store";

class Menu extends Component {
  constructor(DOM) {
    super(DOM);
    this.handleClick = this.handleClick.bind(this);
  }

  onStateChange(state) {
    console.log(`menu`, state);
  }

  handleClick(e) {
    this.store.setState({ colorpallet: { pencil: { isVisible: true } } });
  }

  handleClick2(e) {
    this.store.setState({ colorpallet: { pencil: { isVisible: false } } });
  }

  handleClick3(e) {
    this.store.setState({ colorpallet: { background: { isVisible: true } } });
  }

  handleClick4(e) {
    this.store.setState({ colorpallet: { background: { isVisible: false } } });
  }

  render() {
    return `
            <div id="menu">
								<div data-component="MenuButton"
										data-type="pencil"
                    component-click="handleClick(e)"
                >
                </div>
                <div data-component="MenuButton"
										data-type="eraser"
                    component-click="handleClick2(e)"
                ></div>
                <div data-component="MenuButton"
										data-type="background"
                    component-click="handleClick3(e)"
                >
                </div>
                <div data-component="MenuButton"
                    component-click="handleClick4(e)"
                ></div>
                <div data-target="background" data-component="ColorPallet"></div>
                <div data-target="pencil" data-component="ColorPallet"></div>
            </div>
        `;
  }
}

export default Connect(Menu);
