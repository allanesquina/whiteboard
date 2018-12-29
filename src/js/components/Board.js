import { deepExtend } from '../core/util';

export default class Board {
  constructor(config, canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.config = {
      pencil: {
        size: 3,
        color: `#000`
      },
      backgroundColor: '#ccc',
    };

    this.setConfig(this.config);

  }

  setConfig(config) {
    this.config = deepExtend(this.config, config);
    this.setBackgroundColor(this.config.backgroundColor);
  }

  setBackgroundColor(color) {
    this.canvas.style.background = color;
  }

  draw(prevPos, pos) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(prevPos.x, prevPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineWidth = this.config.pencil.size;
    ctx.strokeStyle = this.config.pencil.color;
    ctx.stroke();
    ctx.closePath();
  }
}