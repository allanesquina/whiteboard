import start from "./core";
import { createStore } from "./core/store";

createStore({
  toolbox: {
    brush: { color: "#0091ea", size: 10},
    pencil: { color: "#0091ea", size: 3},
    eraser: { size: 10},
    background:{ color: `#eceff1` },
    currentTool: `pencil`,
  },
  colorPallet: { target: "", isVisible: false }
});
start(document.getElementById("app-root"));

// function getViewportSize() {
//   const w = Math.max(
//     document.documentElement.clientWidth,
//     window.innerWidth || 0
//   );

//   const h = Math.max(
//     document.documentElement.clientHeight,
//     window.innerHeight || 0
//   );

//   return {
//     w,
//     h
//   };
// }
// class Vector2 {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
// }

// class Board {
//   constructor(config) {
//     this.config = {
//       pencil: {
//         size: 3,
//         color: `#000`
//       }
//     };

//     this.setConfig(config);
//   }

//   setConfig(config) {
//     this.config = Object.assign(this.config, config);
//   }

//   draw(prevPos, pos) {
//     ctx.beginPath();
//     ctx.moveTo(prevPos.x, prevPos.y);
//     ctx.lineTo(pos.x, pos.y);
//     ctx.lineWidth = this.config.pencil.size;
//     ctx.strokeStyle = this.config.pencil.color;
//     ctx.stroke();
//     ctx.closePath();
//   }
// }

// function setCanvasSize(canvas) {
//   canvas.width = getViewportSize().w - 10;
//   canvas.height = getViewportSize().h - 10;
// }

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// setCanvasSize(canvas);

// const board = new Board({
//   pencil: {
//     size: 3,
//     color: `#ccc`
//   }
// });

// let prevPos;
// ["mouseover", "mousemove", "mouseup"].forEach(eventType => {
//   canvas.addEventListener(eventType, e => {
//     if (eventType === "mousemove") {
//       if (e.buttons === 1) {
//         let currentPos = new Vector2(e.offsetX, e.offsetY);
//         prevPos = prevPos ? prevPos : currentPos;
//         board.draw(prevPos, currentPos);
//         prevPos = currentPos;
//       }
//     }
//     if (eventType === "mouseup") {
//       // clear previus position
//       prevPos = false;
//     }
//   });
// });

// window.addEventListener("resize", e => {
//   setCanvasSize(canvas);
// });

// // UI --------------------------
// class Component {
//   constructor(el, name) {
//     this.el = el;
//     this.name = name.toLowerCase();
//     this.isVisible = false;
//     this.isActive = false;
//     this.el.classList.add("ui-" + this.name);
//   }

//   show() {
//     this.el.classList.add('visible');
//     this.isVisible = true;
//   }

//   hide() {
//     this.el.classList.remove('visible');
//     this.isVisible = false;
//   }

//   toggle() {
//     if(this.isVisible) {
//       this.hide();
//       return;
//     }
//     this.show();
//   }

//   toggleActive() {
//     if(this.isActive) {
//       this.deactive();
//       return;
//     }
//     this.active();
//   }

//   active() {
//     this.isActive = true;
//     this.el.classList.add('active');
//   }

//   deactive() {
//     this.isActive = false;
//     this.el.classList.remove('active');
//   }
// }

// function createColorPallet() {
//   const colors = ['#fff', '#ccc', '#999', '#444', '#58c7ae'];
//   colors.forEach(color => {
//     const el = document.createElement('div');
//     el.classList.add('ui-colorpallet__color');
//     el.style.background = color;
//     el.setAttribute('data-action', `{"name": "changeColor", "value": "${color}"}`);
//     components.get('colorpallet').el.appendChild(el);
//   });
// }

// const store = new Store();
// const components = new Map();
// store.on('change', state => console.log(state))

// const actions = {
//   toggleColorPallet: e => {
//     const state = store.state;
//     if(state.colorpallet.isVisible) {
//       store.set({
//         colorpallet: { isVisible: false},
//       });
//     } else {
//       store.set({
//         colorpallet: { isVisible: true},
//       });
//     }
//   },
//   toggleBackgroundSettings: e => {
//     const state = store.state;
//     if(state.backgroundsettings.isVisible) {
//       store.set({
//         backgroundbtn: { isActive: false },
//         backgroundsettings: { isVisible: false},
//       });
//     } else {
//       store.set({
//         backgroundbtn: { isActive: true },
//         backgroundsettings: { isVisible: true},
//         colorpallet: { target: `background`},
//       });
//     }
//   },
//   togglePencilSettings: e => {
//     const state = store.state;
//     if(state.pencilsettings.isVisible) {
//       store.set({
//         pencilbtn: { isActive: false },
//         pencilsettings: { isVisible: false},
//       });
//     } else {
//       store.set({
//         pencilbtn: { isActive: true },
//         pencilsettings: { isVisible: true},
//         colorpallet: { target: `pencil`},
//       });
//     }
//   },
//   hideAll: e => {
//     store.set({
//       pencilbtn: { isActive: false },
//       pencilsettings: { isVisible: false},
//       backgroundsettings: { isVisible: false},
//       backgroundbtn: { isActive: false },
//       colorpallet: { isVisible: false},
//     });
//   },
//   changeColor: color => {
//     const state = store.state;
//     actions.hideAll();
//     if(state.colorpallet.target === 'pencil') {
//       board.setConfig({ pencil: { color }});
//     } else {
//       document.body.style.backgroundColor = color;
//     }
//   }
// };

// const init = {
//   pencilbtn: (comp) => {
//     const state = {
//       [comp.name]: {
//         isActive: false,
//       }
//     };
//     store.set(state);

//     store.on('change', (state) => {
//       const compState = state[comp.name];
//       if(comp.isActive !== compState.isActive) {
//         comp.toggleActive();
//       }
//     });
//   },
//   pencilsettings: (comp) => {
//     const state = {
//       [comp.name]: {
//         isVisible: false,
//       }
//     };
//     store.set(state);

//     store.on('change', (state) => {
//       const compState = state[comp.name];
//       if(comp.isVisible !== compState.isVisible) {
//         comp.toggle();
//       }
//     });
//   },
//   backgroundbtn: (comp) => {
//     const state = {
//       [comp.name]: {
//         isActive: false,
//       }
//     };
//     store.set(state);

//     store.on('change', (state) => {
//       const compState = state[comp.name];
//       if(comp.isActive !== compState.isActive) {
//         comp.toggleActive();
//       }
//     });
//   },
//   backgroundsettings: (comp) => {
//     const state = {
//       [comp.name]: {
//         isVisible: false,
//       }
//     };
//     store.set(state);

//     store.on('change', (state) => {
//       const compState = state[comp.name];
//       if(comp.isVisible !== compState.isVisible) {
//         comp.toggle();
//       }
//     });
//   },
//   colorpallet: (comp) => {
//     const state = {
//       [comp.name]: {
//         isVisible: false,
//       }
//     };
//     store.set(state);

//     store.on('change', (state) => {
//       const compState = state[comp.name];
//       if(comp.isVisible !== compState.isVisible) {
//         comp.toggle();
//       }
//     });
//   }
// };

// const types = {
//   component: comp => {
//     components.set(comp.name, comp);
//     init[comp.name] && init[comp.name](comp);
//   },
//   modal: comp => {
//     comp.el.classList.add('modal');
//   }
// };

// const uiComponents = document.querySelectorAll("[data-component]");
// uiComponents.forEach(comp => {
//   const name = comp.getAttribute("data-component");
//   const type = comp.getAttribute("data-type");
//   const uiComp = new Component(comp, name);
//   types.component(uiComp);
//   types[type] && types[type](uiComp)
// });

// createColorPallet();

// ["click", "touchpress"].forEach(eventType => {
//   document.addEventListener(eventType, e => {
//     e.preventDefault();
//     const comp = e.target;
//     const data = comp.getAttribute("data-action");
//     let action;
//     try {
//       action = JSON.parse(data);
//       actions[action.name] && actions[action.name](action.value, e);
//     } catch (error) {
//       action = data;
//       actions[action] && actions[action](null, e);
//     }

//   });
// });
