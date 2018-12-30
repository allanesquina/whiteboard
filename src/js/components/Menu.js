import { Component } from "../core/Component";
import { Connect } from "../core/store";
import { openFullscreen } from "../core/util";

class Menu extends Component {
  constructor(DOM) {
    super(DOM);
  }

  onStateChange(state) {
    console.log(`menu`, state);
  }

  handleClickFullscreen(e) {
    openFullscreen();
  }

  handleClickBackground(e) {
    this.store.setState({
      toolbox: { currentTool: "background" }
    });
  }

  handleClickEraser(e) {
    this.store.setState({
      toolbox: { currentTool: "eraser" }
    });
  }

  handleClickPencil(e) {
    this.store.setState({
      toolbox: { currentTool: "pencil" }
    });
  }

  handleClickBrush(e) {
    this.store.setState({
      toolbox: { currentTool: "brush" }
    });
  }

  render() {
    return `
            <div class="tool-box__menu">
								<div data-component="MenuButton"
										data-type="brush"
                    component-click="handleClickBrush(e)"
                >
                </div>
								<div data-component="MenuButton"
										data-type="pencil"
                    component-click="handleClickPencil(e)"
                >
                </div>
                <div data-component="MenuButton"
										data-type="eraser"
                    component-click="handleClickEraser(e)"
                ></div>
                <div data-component="MenuButton"
										data-type="background"
                    component-click="handleClickBackground(e)"
                >
                </div>
                <div data-component="MenuButton"
										data-type="fullscreen"
                    component-click="handleClickFullscreen(e)"
                ></div>
            </div>
        `;
  }
}

export default Connect(Menu);
