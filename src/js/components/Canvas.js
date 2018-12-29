import { Component } from "../core/Component";
import { Connect } from "../core/store";
import { getViewportSize } from "../core/util";
import  Board from "./Board";
import  Vector2 from "./Vector2";

function setCanvasSize(canvas) {
  canvas.width = getViewportSize().w - 10;
  canvas.height = getViewportSize().h - 10;
}

function bindEvents(canvas, board) {
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
}

class Canvas extends Component {
  onInit() {
    const canvas = this.ids.get("canvas");
    const board = new Board({
      pencil: {
        size: 3,
        color: `#ccc`
      }
    }, canvas);

    setCanvasSize(canvas);

    bindEvents(canvas, board)

    this.board = board;
    this.canvas = canvas;
  }

  onStateChange(state) {
    if(state.pencil && state.pencil.color) {
      this.board.setConfig({
        pencil: {
          color: state.pencil.color
        }
      })
    }

    if(state.background && state.background.color) {
      this.board.setConfig({
        backgroundColor: state.background.color 
      })
    }

  }

  render() {
    return `
        <canvas component-id="canvas"></canvas>
    `;
  }
}

export default Connect(Canvas);
