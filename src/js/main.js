import Actor from './Actor.js'
import World from './World.js'

document.addEventListener('DOMContentLoaded', event => new Main)

class Main {
  constructor(options = {}) {
  	const world = new World({
  		canvas: document.querySelector('#canvas')
  	})

  	world.start();
  }
}

