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
	ice.physics.Vector.prototype.setMag = ice.physics.Vector.prototype.setMagnitude;

	// Moves the vector towards another (By absolute distance)
	ice.physics.Vector.prototype.towards = function(vec, dist) {
		return this; // TODO: This
	}

	// Moves the vector towards another (By relative distance)
	ice.physics.Vector.prototype.linearInterpolate = function(vec, frac) {
		return this.add(vec.sub(this).mult(frac));
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
		this.x = vec.x || x;
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
		this.y += (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.addXY = function(x, y) {
		this.x += x;
		this.y += y;
		return this;
	}

	// Subtracts from the vectors x and y
	ice.physics.Vector.prototype.sub = function(vec) {
		this.x -= vec.x || (vec.x === 0 ? 0 : vec);
		this.y -= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.subX = function(vec) {
		this.x -= vec.x || (vec.x === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.subY = function(vec) {
		this.y -= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.subXY = function(x, y) {
		this.x -= x;
		this.y -= y;
		return this;
	}

	// Multiplies the vectors x and y
	ice.physics.Vector.prototype.mult = function(vec) {
		this.x *= vec.x || (vec.x === 0 ? 0 : vec);
		this.y *= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.multX = function(vec) {
		this.x *= vec.x || (vec.x === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.multY = function(vec) {
		this.y *= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.multXY = function(x, y) {
		this.x *= x;
		this.y *= y;
		return this;
	}

	// Divides the vectors x and y
	ice.physics.Vector.prototype.div = function(vec) {
		this.x /= vec.x || (vec.x === 0 ? 0 : vec);
		this.y /= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.divX = function(vec) {
		this.x /= vec.x || (vec.x === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.divY = function(vec) {
		this.y /= vec.y || (vec.y === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.divXY = function(x, y) {
		this.x /= x;
		this.y /= y;
		return this;
	}

	// Methods

	ice.physics.method = function() {
		// code
	}

	return ice;
}(ice || {}));
