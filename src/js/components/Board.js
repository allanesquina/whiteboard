import { deepExtend } from '../core/util';
import { Connect } from "../core/store";

class Board {
  constructor(config, canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.config = {
      pencil: {
        size: 10,
        color: `#ccc`
      },
      brush: {
        size: 10,
        color: `#ccc`
      },
      background: {
        color: `#222`
      }
    };

    this.setConfig(config);
  }

  onStateChange(state) {
    this.setConfig(state.toolbox);
  }

  setConfig(config) {
    this.config = deepExtend(this.config, config);
    this.setBackgroundColor(this.config.background.color);
  }

  setBackgroundColor(color) {
    this.canvas.style.background = color;
  }

  drawLine(prevPos, pos) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over';
    ctx.moveTo(prevPos.x, prevPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineWidth = this.config.pencil.size;
    ctx.strokeStyle = this.config.pencil.color;
    ctx.stroke();
    ctx.closePath();
  }

  drawBrush(prevPos, pos) {
    const ctx = this.ctx;
    let diffX = pos.x - prevPos.x;
    let diffY = pos.y - prevPos.y;

    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over';
    ctx.arc(pos.x, pos.y, this.config.brush.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.config.brush.color;
    ctx.fill();
    ctx.closePath();
  }

  draw(prevPos, pos) {
    if(this.config.currentTool === 'pencil') {
        this.drawLine(prevPos, pos);
        return;
    }

    if(this.config.currentTool === 'brush') {
        this.drawBrush(prevPos, pos);
        return
    }

    if(this.config.currentTool === 'eraser') {
        this.clear(prevPos, pos);
        return
    }
  }

  clear(prevPos,pos) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(prevPos.x, prevPos.y);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.arc(pos.x, pos.y, this.config.eraser.size, 0, 2 * Math.PI);
    ctx.moveTo(pos.x, pos.y);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

  }
}

export default Connect(Board);