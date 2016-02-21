import palette from './_palette.js';
import {
	ellipseWithBezier,
	ellipseWithBezierByCenter
} from './_drawing.js';
import {
    Point,
    Point3D,
    Vector,
    Size,
    RGBA,
    Alpha,
    Particle
} from './_objects.js';

//Base class for Shape
class Shape {
	constructor(options = {}) {
		this.ctx = options.ctx;
		this.position = options.position || new Point(0, 0);
		this.size = options.size || new Size(10, 10);
	}

	//Center point
	get center() {
		return new Point(
			this.position.x + (this.size.w / 2),
			this.position.y + (this.size.h / 2)
		);
	}

	//Base draw method
	draw() {
		this.ctx.fillStyle = palette.green;
		this.ctx.fill();
		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = palette.red;
	    this.ctx.stroke();

	    this.ctx.strokeRect(this.center.x, this.center.y, 1, 1); // fill in the pixel at (10,10)

	}
}

//Rectangle - pretty straightforward
export class Rectangle extends Shape {
	draw() {
		this.ctx.beginPath();
		this.ctx.rect(this.position.x, this.position.y, this.size.w, this.size.h);
		super.draw();
	}
}

//Triangle - Note that this is an isocoles triangle
export class Triangle extends Shape {
	draw() {
		this.ctx.beginPath();
		this.ctx.moveTo(this.position.x + (this.size.w / 2), this.position.y);
		this.ctx.lineTo(this.position.x + this.size.w, this.position.y + this.size.h);
		this.ctx.lineTo(this.position.x, this.position.y + this.size.h);
		this.ctx.closePath();
		super.draw();
	}

	get center() {
		return new Point(
			this.position.x + (this.size.w / 2),
			this.position.y + (this.size.h * (2 / 3))
		);
	}
}

//Circle - pretty straightforward.
export class Circle extends Shape {
	draw() {
		this.ctx.beginPath();
		ellipseWithBezierByCenter(this.ctx, this.center.x, this.center.y, this.size.w, this.size.h);
		super.draw();
	}
}