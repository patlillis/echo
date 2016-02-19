import Actor from './Actor.js'

export default class World {
	constructor(options = {}) {
		//Set up options
		this.options = {
			numResources: options.numResources || 3,
			numActors: options.numActors || 1
		}



		this.canvas		= options.canvas || document.querySelector('canvas')
		this.ctx		= this.canvas.getContext('2d')
		this.resources 	= new Array(this.options.numResources)
		this.actors  	= Array.apply(null, Array(this.options.numActors)).map(() => new Actor({ ctx: this.ctx }));

		this._running 	= false


	    this.width = window.innerWidth;
	    this.height = window.innerHeight;

		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;

	}

	start() {
		this._running = true;
		this.loop();
	}

	stop() {
		this._running = false;
	}


	loop() {
		//Do stuff
		for (let a of this.actors)
			a.draw();

		if (this._running)
			requestAnimationFrame(this.loop.bind(this));		
	}
}