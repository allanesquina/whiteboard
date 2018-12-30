import { Component } from "../core/Component";
import { Connect } from "../core/store";

class ColorPallet extends Component {
  constructor(DOM) {
    super(DOM);
  }

  onInit() {
    this.createColorPallet();
    document.addEventListener("click", e => {
      const { isVisible } = this.store.state.colorPallet;
      if (isVisible) {
        this.store.setState({
          colorPallet: { isVisible: false }
        });
      }
    });
  }

  onStateChange(state) {
    const { target, isVisible, x } = state.colorPallet;
    const el = this.ids.get('comp');
    console.log(this.store.state.colorPallet)

    if (isVisible) {
      el.style.left = `${x}px`;
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }

    this.props.target = target;
  }

  handleChangeColor(color) {
    this.store.setState({
      toolbox: {
        [this.props.target]: {
          color
        }
      }
    });
  }

  createColorPallet() {
    const colors = ["#fff", "#ccc", "#999", "#444", "#58c7ae"];
    const parent = this.ids.get('comp');
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

      parent.appendChild(el);
    });
  }

  render() {
    return `
        <div 
          component-id="comp"
          class="color-pallet" 
        ></div>
        `;
  }
}

export default Connect(ColorPallet);
