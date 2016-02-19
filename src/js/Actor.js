import palette from './palette.js'

export default class Actor {
  constructor(options = {}) {
  	this.ctx = options.ctx;
  	console.log(palette);
  }

  draw() {
  	this.ctx.fillStyle = palette.slate;
	this.ctx.fillRect(20,20,150,100);
  }
}
