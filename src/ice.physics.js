var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("physics");
	ice.physics = {};
	ice.physics.version = "v2.0.0"; // This version of the ice.physics module

	/*
	 *	================ Physics Module ================
	 */

	// Constructors

	ice.physics.Vector = function(x, y) {
		if(!(this instanceof ice.physics.Vector)) {
			return new ice.physics.Vector(x, y);
		}

		this.x = x || 0;
		this.y = y || 0;
	}

	// Returns a clone of the vector
	ice.physics.Vector.prototype.clone = function() {
		return new ice.physics.Vector(this.x, this.y);
	}
	ice.physics.Vector.prototype.copy = ice.physics.Vector.prototype.clone;
	ice.physics.Vector.prototype.duplicate = ice.physics.Vector.prototype.clone;

	// Returns the magnitude of the vector
	ice.physics.Vector.prototype.magnitude = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	ice.physics.Vector.prototype.mag = ice.physics.Vector.prototype.magnitude;
	ice.physics.Vector.prototype.length = ice.physics.Vector.prototype.magnitude;

	// Faster than .magnitude() (for comparison)
	ice.physics.Vector.prototype.magnitudeSq = function() {
		return this.x * this.x + this.y * this.y;
	}
	ice.physics.Vector.prototype.magSq = ice.physics.Vector.prototype.magnitudeSq;
	ice.physics.Vector.prototype.lengthSq = ice.physics.Vector.prototype.magnitudeSq;

	// Returns whether or not two vectors are equal (same x and y)
	ice.physics.Vector.prototype.equals = function(vec) {
		return this.x === vec.x && this.y === vec.y;
	}

	// Normalizes the vector (The magnitude is set to 1, but the angle is unchanged)
	ice.physics.Vector.prototype.normalize = function() {
		return this.div(this.magnitude() || 1);
	}
	ice.physics.Vector.prototype.norm = ice.physics.Vector.prototype.normalize;

	// Sets the magnitude (The angle remains unchanged)
	ice.physics.Vector.prototype.setMagnitude = function(mag) {
		return this.normalize().mult(mag);
	}
	ice.physics.Vector.prototype.scale = ice.physics.Vector.prototype.setMagnitude;
	ice.physics.Vector.prototype.setMag = ice.physics.Vector.prototype.setMagnitude;

	// Moves the vector towards another (By absolute distance)
	ice.physics.Vector.prototype.towards = function(vec, dist) {
		return this.add(vec.clone().sub(this).normalize().mult(dist));
	}

	// Moves the vector towards another (By relative distance)
	ice.physics.Vector.prototype.linearInterpolate = function(vec, frac) {
		return this.add(vec.clone().sub(this).mult(frac));
	}
	ice.physics.Vector.prototype.linInt = ice.physics.Vector.prototype.linearInterpolate;
	ice.physics.Vector.prototype.lerp = ice.physics.Vector.prototype.linearInterpolate;

	// Inverts the vector (x and/or y *= -1)
	ice.physics.Vector.prototype.invert = function() {
		return this.mult(-1);
	}
	ice.physics.Vector.prototype.invertX = function() {
		return this.multX(-1);
	}
	ice.physics.Vector.prototype.invertY = function() {
		return this.multY(-1);
	}

	// Sets the vectors x and y
	ice.physics.Vector.prototype.set = function(vec) {
		this.x = vec.x || (vec.x === 0 ? 0 : vec);
		this.y = vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.setX = function(vec) {
		this.x = vec.x || (vec.x === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.setY = function(vec) {
		this.y = vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.setXY = function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}

	// Adds to the vectors x and y
	ice.physics.Vector.prototype.add = function(vec) {
		this.x += vec.x || (vec.x === 0 ? 0 : vec);
		this.y += vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.addX = function(vec) {
		this.x += vec.x || (vec.x === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.addY = function(vec) {
		this.y += vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.addXY = function(x, y) {
		this.x += x;
		this.y += y;
		return this;
	}

	// Subtracts from the vectors x and y
	ice.physics.Vector.prototype.subtract = function(vec) {
		this.x -= vec.x || (vec.x === 0 ? 0 : vec);
		this.y -= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.subtractX = function(vec) {
		this.x -= vec.x || (vec.x === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.subtractY = function(vec) {
		this.y -= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.subtractXY = function(x, y) {
		this.x -= x;
		this.y -= y;
		return this;
	}
	ice.physics.Vector.prototype.sub = ice.physics.Vector.prototype.subtract;
	ice.physics.Vector.prototype.subX = ice.physics.Vector.prototype.subtractX;
	ice.physics.Vector.prototype.subY = ice.physics.Vector.prototype.subtractY;
	ice.physics.Vector.prototype.subXY = ice.physics.Vector.prototype.subtractXY;

	// Multiplies the vectors x and y
	ice.physics.Vector.prototype.multiply = function(vec) {
		this.x *= vec.x || (vec.x === 0 ? 0 : vec);
		this.y *= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.multiplyX = function(vec) {
		this.x *= vec.x || (vec.x === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.multiplyY = function(vec) {
		this.y *= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.multiplyXY = function(x, y) {
		this.x *= x;
		this.y *= y;
		return this;
	}
	ice.physics.Vector.prototype.mult = ice.physics.Vector.prototype.multiply;
	ice.physics.Vector.prototype.multX = ice.physics.Vector.prototype.multiplyX;
	ice.physics.Vector.prototype.multY = ice.physics.Vector.prototype.multiplyY;
	ice.physics.Vector.prototype.multXY = ice.physics.Vector.prototype.multiplyXY;

	// Divides the vectors x and y
	ice.physics.Vector.prototype.divide = function(vec) {
		this.x /= vec.x || (vec.x === 0 ? 0 : vec);
		this.y /= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.divideX = function(vec) {
		this.x /= vec.x || (vec.x === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.divideY = function(vec) {
		this.y /= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.divideXY = function(x, y) {
		this.x /= x;
		this.y /= y;
		return this;
	}
	ice.physics.Vector.prototype.div = ice.physics.Vector.prototype.divide;
	ice.physics.Vector.prototype.divX = ice.physics.Vector.prototype.divideX;
	ice.physics.Vector.prototype.divY = ice.physics.Vector.prototype.divideY;
	ice.physics.Vector.prototype.divXY = ice.physics.Vector.prototype.divideXY;

	// Methods

	ice.physics.method = function() {
		// code
	}

	return ice;
}(ice || {}));
