import { Component } from "../core/Component";
import { Connect } from "../core/store";
import { getViewportSize } from "../core/util";
import Board from "./Board";
import Vector2 from "./Vector2";

function setCanvasSize(canvas) {
  canvas.width = getViewportSize().w - 55;
  canvas.height = getViewportSize().h - 50;
}

function bindEvents(Canvas) {
  let prevPos;
  ["mouseover", "mousemove", "mouseup", "mousedown"].forEach(eventType => {
    Canvas.canvas.addEventListener(eventType, e => {
      if (eventType === "mousedown") {
        Canvas.preserve();
      }

      if (eventType === "mousemove") {
        let currentPos = new Vector2(e.offsetX, e.offsetY);
        prevPos = prevPos ? prevPos : currentPos;

        if (e.buttons === 1) {
          Canvas.draw(prevPos, currentPos);
        }
        if (e.buttons === 2) {
          Canvas.erase(prevPos, currentPos);
        }

        prevPos = currentPos;
      }
      if (eventType === "mouseup") {
        // clear previus position
        prevPos = false;
        Canvas.restore();
      }
    });
  });

  window.addEventListener("contextmenu", e => {
    e.preventDefault();
  });

  window.addEventListener("resize", e => {
    setCanvasSize(Canvas.canvas);
  });
}

class Canvas extends Component {
  onInit() {
    const canvas = this.ids.get("canvas");
    const board = new Board(this.store.state.toolbox, canvas);
    this.board = board;
    this.canvas = canvas;

    setCanvasSize(canvas);
    bindEvents(this);
  }

  draw(prevPos, currentPos) {
    this.board.draw(prevPos, currentPos);
  }

  erase(prevPos, currentPos) {
    this.store.setState({ toolbox: { currentTool: "eraser" } });
    this.board.draw(prevPos, currentPos);
  }

  preserve() {
    this.currentTool = this.store.getState("toolbox.currentTool");
  }

  restore() {
    this.store.setState({ toolbox: { currentTool: this.currentTool } });
  }

  onStateChange(state) {
    if (state.pencil && state.pencil.color) {
      this.board.setConfig({
        pencil: {
          color: state.pencil.color
        }
      });
    }

    if (state.background && state.background.color) {
      this.board.setConfig({
        backgroundColor: state.background.color
      });
    }

    if (state.board.reset) {
      this.store.setState({
        board: {
          reset: false
        }
      });
      this.reset();
      return
    }

    if (state.board.download) {
      this.store.setState({
        board: {
          download: false
        }
      });
      this.download();
      return;
    }
  }

  download() {
    const img = this.canvas.toDataURL();
    const image = new Image();
    image.src = img;

    var w = window.open("");
    w.document.write(image.outerHTML);
  }

  reset() {
    this.canvas.width = this.canvas.width;
  }

  render() {
    return `
        <canvas component-id="canvas"></canvas>
    `;
  }
}

export default Connect(Canvas);
