//-------------------------------------------------------------------------------------------
//  OBJECTS
//-------------------------------------------------------------------------------------------

export class Point {
    constructor( x, y ) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

export class Point3D {
    constructor( x, y, z ) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
}

export class Vector {
    constructor( x, y ) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

export class Size {
    constructor( w, h ) {
        this.w = w || 0;
        this.h = h || this.w;
    }

    get ratio() {
        return this.w / this.h;
    }
}

export class RGBA {
    constructor( r, g, b, a ) {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a;
    }

    toString() {
        return "rgba("+this.R+","+this.G+","+this.B+",1)";
    }

    clone() {
        return new RGBA(this.R, this.G, this.B, this.A);
    }
}

export class Alpha {
    constructor(a) {
        this.A = a;
    }
}

export class Particle {
    constructor(point,vector) {
        this.Position = point || new Point();
        this.Vector = vector || new Vector();
        this.Active = false;
    }
}