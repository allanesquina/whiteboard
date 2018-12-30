import { Component } from "../core/Component";
import { Connect } from "../core/store";

class MenuBackgroundProperties extends Component {
  constructor(DOM) {
    super(DOM);
    this.DOM.classList.add('hidden');
  }

  checkVisibility(state) {
    const { currentTool } = state.toolbox;

    if(currentTool === `background`) {
      this.DOM.classList.add('visible');
    } else {
      this.DOM.classList.remove('visible');
    }
  }

  onInit() {
     this.checkVisibility(this.store.state);
  }

  onStateChange(state) {
    this.checkVisibility(state);
  }

  render() {
    return `
            <div class="menu-properties">
              <label> Background </label>
              <div data-component="MenuButton"
                  data-selected='false'
                  data-type="background"
              ></div>
              <span class="separator"></span>
              <label> Color: </label>
              <span data-type="background" data-component="ColorButton"></span>
            </div>
        `;
  }
}

export default Connect(MenuBackgroundProperties);
