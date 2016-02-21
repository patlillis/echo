import Actor from './Actor.js';
import World from './World.js';


//Init
document.addEventListener('DOMContentLoaded', () => Main.init());


class Main {
	static init() {
		const main = new Main();
		window.addEventListener('resize', () => main.resize());
	}

  constructor(options = {}) {
  	this.canvas = document.querySelector('#canvas');

  	const world = new World({
  		canvas: this.canvas
  	});

  	this.resize();
  	world.start();
  }

  resize() {
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.canvas.width = this.width;
	this.canvas.height = this.height;

	console.log(`Resizing. W: ${this.width} H: ${this.height}`);
  }
}