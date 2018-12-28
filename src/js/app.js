function getViewportSize() {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );

  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  return {
    w,
    h
  };
}
class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Board {
  constructor(config) {
    this.config = {
      pencil: {
        size: 3,
        color: `#000`
      }
    };

    this.setConfig(config);
  }

  setConfig(config) {
    this.config = Object.assign(this.config, config);
  }

  draw(prevPos, pos) {
    ctx.beginPath();
    ctx.moveTo(prevPos.x, prevPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineWidth = this.config.pencil.size;
    ctx.strokeStyle = this.config.pencil.color;
    ctx.stroke();
    ctx.closePath();
  }
}

function setCanvasSize(canvas) {
  canvas.width = getViewportSize().w;
  canvas.height = getViewportSize().h;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
setCanvasSize(canvas);

const board = new Board({
  pencil: {
    size: 3,
    color: `#ccc`
  }
});

let prevPos;
["mouseover", "mousemove", "mouseup"].forEach(eventType => {
  canvas.addEventListener(eventType, e => {
    if (eventType === "mousemove") {
      if (e.buttons === 1) {
        let currentPos = new Vector2(e.offsetX, e.offsetY);
        prevPos = prevPos ? prevPos : currentPos;
        board.draw(prevPos, currentPos);
        prevPos = currentPos;
      }
    }
    if (eventType === "mouseup") {
      // clear previus position
      prevPos = false;
    }
  });
});

window.addEventListener("resize", e => {
  setCanvasSize(canvas);
});

// UI --------------------------
class Component {
  constructor(el, name) {
    this.el = el;
    this.name = name.toLowerCase();
    this.el.classList.add("ui-" + this.name);
  }

  show() {
    this.el.classList.add('visible');
    // this.el.style.visibility = "visible";
    this.visible = true;
  }

  hide() {
    this.el.classList.remove('visible');
    // this.el.style.visibility = "hidden";
    this.visible = false;
  }

  toggle() {
    if(this.visible) {
      this.hide();
      return;
    } 
    this.show();
  }
}

function createColorPallet() {
  const colors = ['#fff', '#ccc', '#999', '#444', '#58c7ae'];
  colors.forEach(color => {
    const el = document.createElement('div');
    el.classList.add('ui-colorpallet__color');
    el.style.background = color;
    el.setAttribute('data-action', `{"name": "changeColor", "value": "${color}"}`);
    components.get('colorpallet').el.appendChild(el);
  });
}

const components = new Map();

const actions = {
  toggleColorPallet: e => {
    components.get("colorpallet").toggle();
  },
  togglePencilSettings: e => {
    components.get("pencilsettings").toggle();
  },
  hideAll: e => {
    components.forEach(c => c.hide());
  },
  changeColor: color => {
    actions.hideAll();
    board.setConfig({ pencil: { color }});
  }
};

const types = {
  component: comp => {
    components.set(comp.name, comp);
  }
};

const uiComponents = document.querySelectorAll("[data-component]");
uiComponents.forEach(comp => {
  const name = comp.getAttribute("data-component");
  types.component(new Component(comp, name));
});

createColorPallet();

["click", "touchpress"].forEach(eventType => {
  document.addEventListener(eventType, e => {
    const comp = e.target;
    const data = comp.getAttribute("data-action");
    let action;
    try {
      action = JSON.parse(data);
      actions[action.name] && actions[action.name](action.value, e);
    } catch (error) {
      action = data;
      actions[action] && actions[action](null, e);
    }
    
  });
});

