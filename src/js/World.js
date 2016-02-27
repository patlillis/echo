import Actor from './Actor.js';
import { average } from './_math.js';
import { TWEEN } from 'tween.js';

export default class World {
	constructor(options = {}) {
		//Set up options
		this.options = {
			numResources: options.numResources || 3,
			numActors: options.numActors || 1,
			stepsPerSecond: options.stepsPerSecond || 60
		};

		this.millisecondsUntilStep = 0;
		this.stepNumber = 0;
		this.frameNumber = 0;

		this.canvas		= options.canvas || document.querySelector('canvas');
		this.ctx		= this.canvas.getContext('2d');
		this.resources 	= new Array(this.options.numResources);
		this.actors  	= [];
		for (let i = 0; i < this.options.numActors; i++)
			this.actors.push(new Actor({ ctx: this.ctx }));

		this._running 	= false;
	}


	//Milliseconds Per Simluation Step
	get millisecondsPerStep() {
		return 1000 / this.options.stepsPerSecond;
	}


	//Start Simulation
	start() {
		this._running = true;
		requestAnimationFrame(this.loop.bind(this));
	}


	//Stop Simulation (pause?)
	stop() {
		this._running = false;
	}


	//Single loop frame
	loop(time) {
		this.frameNumber++;

		if (!this.previousLoopTimestamp)
			this.previousLoopTimestamp = time;

		//Get time since last loop
		const delta = time - this.previousLoopTimestamp;

		//Draw stuff
		this.draw(delta);

		//Simluate stuff
		//Run simulation appropriate number of times
		this.millisecondsUntilStep -= delta;
		while (this.millisecondsUntilStep <= 0) {
			this.simulationStep();
			this.millisecondsUntilStep += this.millisecondsPerStep;
		}

		this.previousLoopTimestamp = time;

		//Request next frame
		if (this._running)
			requestAnimationFrame(this.loop.bind(this));
	}


	//Draw (once per frame)
	draw(delta) {
		for (let a of this.actors)
			a.draw();
	}


	//Step simluation (could be multiple per frame, or one every few frames)
	simulationStep() {
		this.stepNumber++;
	}
}