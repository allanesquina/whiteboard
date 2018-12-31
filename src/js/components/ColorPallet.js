import { Component } from "../core/Component";
import { Connect } from "../core/store";
import Pallets from './Pallets';

class ColorPallet extends Component {
  constructor(DOM) {
    super(DOM);
  }

  onInit() {
    this.init();
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
    const el = this.ids.get("comp");

    if (isVisible) {
      el.style.left = `${x}px`;
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }

    this.props.target = target;
    this.createColorPallet();
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
  bindEvents() {
    this.DOM.addEventListener("click", e => {
      const target = e.target;
      const colorName = target.getAttribute("data-action");

      if (colorName) {
        this.handleChangeColor(colorName);
      }
    });
  }

  init() {
    this.createColorPallet();
    this.bindEvents();
  }

  createColorPallet() {
    const target = this.store.getState(`colorPallet.target`);
    const currentColor = this.store.getState(`toolbox.${target}.color`);
    const parent = this.ids.get("container");
    const buff = document.createElement("div");

    Pallets.forEach(p => {
      const palette = document.createElement("div");
      palette.classList.add('color-palette__wrapper')
      p.colors.forEach(color => {
        const el = document.createElement("div");
        el.classList.add("color-palette__color");
        el.style.background = color;
        el.setAttribute("data-action", color);

        if (currentColor === color) {
          el.classList.add("color-palette__color--selected");
        }

        palette.appendChild(el);
      });


      const separator = document.createElement("div");
      separator.innerHTML = `<label>${p.name}</label>`;
      buff.appendChild(separator);
      buff.appendChild(palette);
    });

    parent.innerHTML = ``;
    parent.appendChild(buff);
  }

  render() {
    return `
        <div 
          component-id="comp"
          class="color-palette" 
        >
          <div
            component-id="container"
            class="color-palette__container" 
          > </div>
        </div>
        `;
  }
}

export default Connect(ColorPallet);
