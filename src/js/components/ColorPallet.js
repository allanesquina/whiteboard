import { Component } from "../core/Component";
import { Connect } from "../core/store";

class ColorPallet extends Component {
  constructor(DOM) {
    super(DOM);
    this.createColorPallet();
  }

  onStateChange(state) {
    const { target } = this.props;
    if (!state.colorpallet[target]) {
      return;
    }
    if (state.colorpallet[target].isVisible) {
      this.DOM.firstChild.classList.add("visible");
    } else {
      this.DOM.firstChild.classList.remove("visible");
    }
  }

  handleChangeColor(color) {
    this.store.setState({
      [this.props.target]: {
        color
      }
    });
  }

  createColorPallet() {
    const colors = ["#fff", "#ccc", "#999", "#444", "#58c7ae"];
    colors.forEach(color => {
      const el = document.createElement("div");
      el.classList.add("color-pallet__color");
      el.style.background = color;
      el.setAttribute("data-action", color);

      this.DOM.addEventListener("click", e => {
        const target = e.target;
        const colorName = target.getAttribute("data-action");

        if (colorName) {
          this.handleChangeColor(colorName);
        }
      });

      this.DOM.firstChild.appendChild(el);
    });
  }

  render() {
    return `
        <div 
          class="color-pallet" 
        ></div>
        `;
  }
}

export default Connect(ColorPallet);
