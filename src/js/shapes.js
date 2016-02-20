import palette from './palette.js'
import {
    Point,
    Point3D,
    Vector,
    Size,
    RGBA,
    Alpha,
    Particle } from './objects.js'

class Shape {
	constructor(options = {}) {
		this.ctx = options.ctx;
		this.position = options.position || new Point(0, 0)
		this.size = options.size || new Size(10, 10)
	}

	get center() {
		return new Point(
			this.position.x + (this.size.w / 2),
			this.position.y + (this.size.h / 2)
		);
	}
}

export class Rectangle extends Shape {
	draw() {
		this.ctx.beginPath()
		this.ctx.rect(this.position.x, this.position.y, this.size.w, this.size.h)
		this.ctx.fillStyle = palette.green
		this.ctx.fill()
		this.ctx.lineWidth = 5
		this.ctx.strokeStyle = palette.red
	    this.ctx.stroke()
	}
}

export class Triangle extends Shape {
	draw() {
		console.log('drawing Triangle')
	}
}

export class Circle extends Shape {
	draw() {
		this.ctx.save()
		this.ctx.beginPath()
		this.ctx.arc(this.center.x, this.center.y, this.size.w / 2, 0, 2 * Math.PI, false)
		this.ctx.scale(this.size.ratio, 1)
		this.ctx.restore()
		this.ctx.fillStyle = palette.green
		this.ctx.fill()
		this.ctx.lineWidth = 5
		this.ctx.strokeStyle = palette.red
	    this.ctx.stroke()
	}
}