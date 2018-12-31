import { Component } from "../core/Component";
import { Connect } from "../core/store";
import { openFullscreen, closeFullscreen } from "../core/util";

class Menu extends Component {
  constructor(DOM) {
    super(DOM);
  }

  handleClickFullscreen(e) {
    const isFullscreen =
      this.store.getState(`toolbox.fullscreen`, this.store.state) === "on";
    if (isFullscreen) {
      this.store.setState({
        toolbox: { fullscreen: `off` }
      });
      closeFullscreen();
    } else {
      if (confirm(`It would reset your board, do you want to proceed?`)) {
        this.store.setState({
          toolbox: { fullscreen: `on` }
        });
        openFullscreen();
      }
    }
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
										data-icon="pencil"
										data-title="Pencil"
										data-type="pencil"
										data-path="toolbox.currentTool"
                    component-click="handleClickPencil(e)"
                >
                </div>
								<div data-component="MenuButton"
										data-title="Brush"
										data-type="brush"
										data-icon="brush"
										data-path="toolbox.currentTool"
                    component-click="handleClickBrush(e)"
                >
                </div>
                <div data-component="MenuButton"
										data-title="Eraser"
										data-type="eraser"
										data-icon="eraser"
										data-path="toolbox.currentTool"
                    component-click="handleClickEraser(e)"
                ></div>

                <span class="separator-horizontal"></span>

                <div data-component="MenuButton"
										data-title="Background Settings"
										data-type="background"
										data-path="toolbox.currentTool"
										data-icon="background"
                    component-click="handleClickBackground(e)"
                >
                </div>
            </div>
        `;
  }
}

export default Connect(Menu);
