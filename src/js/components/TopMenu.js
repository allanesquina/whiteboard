import { Component } from "../core/Component";
import { Connect } from "../core/store";
import { openFullscreen, closeFullscreen } from "../core/util";

class TopMenu extends Component {
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

  handleClickDownload(e) {
    this.store.setState({
      board: {
        download: true
      }
    });
  }

  handleClickEraser(e) {
    if (confirm(`Do you want to clear your board?`)) {
      this.store.setState({
        board: {
          reset: true,
        }
      });
    }
  }

  render() {
    return `
            <div class="top-menu">
                <div data-component="MenuButton"
										data-icon="garbage"
                    component-click="handleClickEraser(e)"
                ></div>

                <div data-component="MenuButton"
										data-icon="download"
                    component-click="handleClickDownload(e)"
                ></div>

                <span class="separator"></span>

                <div data-component="MenuButton"
										data-type="on"
										data-path="toolbox.fullscreen"
										data-icon="fullscreen"
                    component-click="handleClickFullscreen(e)"
                ></div>
            </div>
        `;
  }
}

export default Connect(TopMenu);
