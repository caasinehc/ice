var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("physics");
	ice.physics = {};
	ice.physics.version = "v2.1.5"; // This version of the ice.physics module
	console.log("%cice.physics " + ice.physics.version + " imported successfully.", "color: #008000");

	/*
	 *	================ Physics Module ================
	 */

	// Private variables/functions

	var TAU = Math.PI * 2;
	var radToDeg = 180 / Math.PI;
	var degToRad = Math.PI / 180;

	// Constructors

	/*
	 *	TODO:
	 *		.slerp(angle, center)
	 *		collision detection
	 */

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

	// Faster than .magnitude() (For comparison)
	ice.physics.Vector.prototype.magnitudeSq = function() {
		return this.x * this.x + this.y * this.y;
	}

	// Returns the dot product of the vector and another
	ice.physics.Vector.prototype.dot = function(vec) {
		return this.x * vec.x + this.y * vec.y;
	}

	// Returns the cross product of the vector and another
	ice.physics.Vector.prototype.cross = function(vec) {
		return (this.x * vec.y) - (this.y * vec.x);
	}

	// Returns the angle of the vector from another (In radians)
	ice.physics.Vector.prototype.radians = function(vec) {
		if(vec === undefined) {
			return Math.atan2(this.y, this.x);
		}
		return Math.atan2(this.y, this.x) - Math.atan2(vec.y, vec.x);
	}

	// Returns the angle of the vector from another (In degrees)
	ice.physics.Vector.prototype.degrees = function(vec) {
		return this.radians(vec) * radToDeg;
	}

	// Returns the angle of the vector from another (In non-negative radians)
	ice.physics.Vector.prototype.radiansCCW = function(vec) {
		return (TAU + this.radians(vec)) % TAU;
	}

	// Returns the angle of the vector from another (In non-negative degrees)
	ice.physics.Vector.prototype.degreesCCW = function(vec) {
		return (360 + this.radians(vec) * radToDeg) % 360;
	}

	// Returns the euclidian distance between the vector and another
	ice.physics.Vector.prototype.distance = function(vec) {
		var dx = this.x - vec.x;
		var dy = this.y - vec.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	ice.physics.Vector.prototype.distanceX = function(vec) {
		return this.x - vec.x;
	}
	ice.physics.Vector.prototype.distanceY = function(vec) {
		return this.y - vec.y;
	}

	// Faster than .distance() (for comparison)
	ice.physics.Vector.prototype.distanceSq = function(vec) {
		var dx = this.x - vec.x;
		var dy = this.y - vec.y;
		return dx * dx + dy * dy;
	}

	// Returns the manhattan distance between the vector and another
	ice.physics.Vector.prototype.manhattanDistance = function(vec) {
		return Math.abs(this.x - vec.x) + Math.abs(this.y - vec.y);
	}

	// Returns whether or not two vectors are equal (same x and y)
	ice.physics.Vector.prototype.equals = function(vec) {
		return this.x === vec.x && this.y === vec.y;
	}

	// Returns the vector as a string (Mostly for debugging)
	ice.physics.Vector.prototype.toString = function() {
		return "[object ice.physics.Vector] {x: " + this.x + ", y: " + this.y + "}";
	}

	// Returns the vector as an object (Mostly for debugging)
	ice.physics.Vector.prototype.toObject = function() {
		return {x: this.x, y: this.y};
	}

	// Returns the vector as an array (Mostly for debugging)
	ice.physics.Vector.prototype.toArray = function() {
		return [this.x, this.y];
	}

	// Normalizes the vector (The magnitude is set to 1, but the angle is unchanged)
	ice.physics.Vector.prototype.normalize = function() {
		return this.divide(this.magnitude() || 1);
	}

	// Sets the magnitude (The angle remains unchanged)
	ice.physics.Vector.prototype.setMagnitude = function(mag) {
		return this.normalize().multiply(mag);
	}

	// Moves the vector towards another (By absolute distance)
	ice.physics.Vector.prototype.towards = function(vec, dist) {
		return this.add(vec.clone().subtract(this).normalize().multiply(dist || (dist === undefined ? 1 : dist)));
	}

	// Moves the vector towards another (By relative distance)
	ice.physics.Vector.prototype.linearInterpolate = function(vec, frac) {
		frac = frac || (frac === undefined ? 0.5 : frac);
		this.x += (vec.x - this.x) * frac;
		this.y += (vec.y - this.y) * frac;
		return this;
	}

	// Rotates the vector around another by a certain angle (In radians)
	ice.physics.Vector.prototype.rotate = function(angle, center) {
		center = center || ice.physics.origin();

		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		var x = this.x - center.x;
		var y = this.y - center.y;

		this.x = x * cos - y * sin + center.x;
		this.y = x * sin + y * cos + center.y;
		return this;
	}

	// Rotates the vector around another by a certain angle (In degrees)
	ice.physics.Vector.prototype.rotateDegrees = function(angle, center) {
		return this.rotate(angle * degToRad, center);
	}

	// Sets the vectors angle (In radians)
	ice.physics.Vector.prototype.setAngle = function(angle, center) {
		center = center || ice.physics.origin();

		var mag = this.distance(center);

		this.x = Math.cos(angle) * mag + center.x;
		this.y = Math.sin(angle) * mag + center.y;
		return this;
	}

	// Sets the vectors angle (In degrees)
	ice.physics.Vector.prototype.setDegrees = function(angle, center) {
		return this.setAngle(angle * degToRad, center);
	}

	// Inverts the vector (x and y *= -1)
	ice.physics.Vector.prototype.invert = function(center) {
		if(center === undefined) {
			this.x *= -1;
			this.y *= -1;
			return this;
		}
		this.x = ((this.x - center.x) * -1) + center.x;
		this.y = ((this.y - center.y) * -1) + center.y;
		return this;
	}
	ice.physics.Vector.prototype.invertX = function(center) {
		if(center === undefined) {
			this.x *= -1;
			return this;
		}
		this.x = ((this.x - center.x) * -1) + center.x;
		return this;
	}
	ice.physics.Vector.prototype.invertY = function(center) {
		if(center === undefined) {
			this.y *= -1;
			return this;
		}
		this.y = ((this.y - center.y) * -1) + center.y;
		return this;
	}

	// Rounds the vector's x and y to the nearest integer
	ice.physics.Vector.prototype.round = function() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}
	ice.physics.Vector.prototype.roundX = function() {
		this.x = Math.round(this.x);
		return this;
	}
	ice.physics.Vector.prototype.roundY = function() {
		this.y = Math.round(this.y);
		return this;
	}

	// Clamps the vector's x and y
	ice.physics.Vector.prototype.clamp = function(topLeft, bottomRight) {
		this.x = Math.max(topLeft.x, Math.min(bottomRight.x, this.x));
		this.y = Math.max(topLeft.y, Math.min(bottomRight.y, this.y));
		return this;
	}
	ice.physics.Vector.prototype.clampX = function(min, max) {
		if(min > max) {
				var newMin = max;
				max = min;
				min = newMin;
		}
		this.x = Math.max(min, Math.min(max, this.x));
		return this;
	}
	ice.physics.Vector.prototype.clampY = function(min, max) {
		if(min > max) {
				var newMin = max;
				max = min;
				min = newMin;
		}
		this.y = Math.max(min, Math.min(max, this.y));
		return this;
	}

	// Clamps the vector's magnitude
	ice.physics.Vector.prototype.clampMagnitude = function(min, max) {
		if(max < min) {
			var oldMax = max;
			max = min;
			min = oldMax;
		}
		if(this.magnitude() < min) {
			return this.setMagnitude(min);
		}
		if(this.magnitude() > max) {
			return this.setMagnitude(max);
		}
		return this;
	}

	// Randomizes the vector's x and y
	ice.physics.Vector.prototype.randomize = function(topLeft, bottomRight) {
		this.x = Math.random() * (bottomRight.x - topLeft.x) + topLeft.x;
		this.y = Math.random() * (topLeft.y - bottomRight.y) + bottomRight.y;
		return this;
	}
	ice.physics.Vector.prototype.randomizeX = function(topLeft, bottomRight) {
		this.x = Math.random() * (bottomRight.x - topLeft.x) + topLeft.x;
		return this;
	}
	ice.physics.Vector.prototype.randomizeY = function(topLeft, bottomRight) {
		this.y = Math.random() * (topLeft.y - bottomRight.y) + bottomRight.y;
		return this;
	}
	ice.physics.Vector.prototype.randomizeXY = function(topLeft, bottomRight) {
		if(Math.random() < 0.50) {
			this.x = Math.random() * (bottomRight.x - topLeft.x) + topLeft.x;
		}
		else {
			this.y = Math.random() * (topLeft.y - bottomRight.y) + bottomRight.y;
		}
		return this;
	}
	ice.physics.Vector.prototype.randomizeAngle = function(min, max) {
		min = min || (min === undefined ? 0 : 0);
		max = max || (max === undefined ? TAU : 0);
		return this.setAngle(Math.random() * (max - min) + min);
	}
	ice.physics.Vector.prototype.randomizeDegrees = function(min, max) {
		min = min || (min === undefined ? 0 : 0);
		max = max || (max === undefined ? 360 : 0);
		return this.setDegrees(Math.random() * (max - min) + min);
	}
	ice.physics.Vector.prototype.randomizeMagnitude = function(min, max) {
		return this.setMagnitude(Math.random() * (max - min) + min);
	}

	// Sets the vectors x and y
	ice.physics.Vector.prototype.set = function(vec) {
		this.x = vec.x || (vec.x === undefined ? vec : 0);
		this.y = vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.setX = function(vec) {
		this.x = vec.x || (vec.x === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.setY = function(vec) {
		this.y = vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.setXY = function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}

	// Adds to the vectors x and y
	ice.physics.Vector.prototype.add = function(vec) {
		this.x += vec.x || (vec.x === undefined ? vec : 0);
		this.y += vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.addX = function(vec) {
		this.x += vec.x || (vec.x === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.addY = function(vec) {
		this.y += vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.addXY = function(x, y) {
		this.x += x;
		this.y += y;
		return this;
	}

	// Subtracts from the vectors x and y
	ice.physics.Vector.prototype.subtract = function(vec) {
		this.x -= vec.x || (vec.x === undefined ? vec : 0);
		this.y -= vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.subtractX = function(vec) {
		this.x -= vec.x || (vec.x === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.subtractY = function(vec) {
		this.y -= vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.subtractXY = function(x, y) {
		this.x -= x;
		this.y -= y;
		return this;
	}

	// Multiplies the vectors x and y
	ice.physics.Vector.prototype.multiply = function(vec) {
		this.x *= vec.x || (vec.x === undefined ? vec : 0);
		this.y *= vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.multiplyX = function(vec) {
		this.x *= vec.x || (vec.x === 0 ? 0 : vec);
		return this;
	}
	ice.physics.Vector.prototype.multiplyY = function(vec) {
		this.y *= vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.multiplyXY = function(x, y) {
		this.x *= x;
		this.y *= y;
		return this;
	}

	// Divides the vectors x and y
	ice.physics.Vector.prototype.divide = function(vec) {
		this.x /= vec.x || (vec.x === undefined ? vec : 0);
		this.y /= vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.divideX = function(vec) {
		this.x /= vec.x || (vec.x === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.divideY = function(vec) {
		this.y /= vec.y || (vec.y === undefined ? vec : 0);
		return this;
	}
	ice.physics.Vector.prototype.divideXY = function(x, y) {
		this.x /= x;
		this.y /= y;
		return this;
	}

	// Synonyms

	ice.physics.Vector.prototype.copy = ice.physics.Vector.prototype.clone;
	ice.physics.Vector.prototype.duplicate = ice.physics.Vector.prototype.clone;
	ice.physics.Vector.prototype.mag = ice.physics.Vector.prototype.magnitude;
	ice.physics.Vector.prototype.length = ice.physics.Vector.prototype.magnitude;
	ice.physics.Vector.prototype.magSq = ice.physics.Vector.prototype.magnitudeSq;
	ice.physics.Vector.prototype.lengthSq = ice.physics.Vector.prototype.magnitudeSq;
	ice.physics.Vector.prototype.rad = ice.physics.Vector.prototype.radians;
	ice.physics.Vector.prototype.angle = ice.physics.Vector.prototype.radians;
	ice.physics.Vector.prototype.deg = ice.physics.Vector.prototype.degrees;
	ice.physics.Vector.prototype.radCCW = ice.physics.Vector.prototype.radiansCCW;
	ice.physics.Vector.prototype.radiansFull = ice.physics.Vector.prototype.radiansCCW;
	ice.physics.Vector.prototype.radFull = ice.physics.Vector.prototype.radiansCCW;
	ice.physics.Vector.prototype.degCCW = ice.physics.Vector.prototype.degreesCCW;
	ice.physics.Vector.prototype.degreesFull = ice.physics.Vector.prototype.degreesCCW;
	ice.physics.Vector.prototype.degFull = ice.physics.Vector.prototype.degreesCCW;
	ice.physics.Vector.prototype.dist = ice.physics.Vector.prototype.distance;
	ice.physics.Vector.prototype.distX = ice.physics.Vector.prototype.distanceX;
	ice.physics.Vector.prototype.distY = ice.physics.Vector.prototype.distanceY;
	ice.physics.Vector.prototype.distSq = ice.physics.Vector.prototype.distanceSq;
	ice.physics.Vector.prototype.manDist = ice.physics.Vector.prototype.manhattanDistance;
	ice.physics.Vector.prototype.manhattan = ice.physics.Vector.prototype.manhattanDistance;
	ice.physics.Vector.prototype.manhattanDist = ice.physics.Vector.prototype.manhattanDistance;
	ice.physics.Vector.prototype.norm = ice.physics.Vector.prototype.normalize;
	ice.physics.Vector.prototype.setMag = ice.physics.Vector.prototype.setMagnitude;
	ice.physics.Vector.prototype.setLength = ice.physics.Vector.prototype.setMagnitude;
	ice.physics.Vector.prototype.scale = ice.physics.Vector.prototype.setMagnitude;
	ice.physics.Vector.prototype.linInt = ice.physics.Vector.prototype.linearInterpolate;
	ice.physics.Vector.prototype.lerp = ice.physics.Vector.prototype.linearInterpolate;
	ice.physics.Vector.prototype.rotateRadians = ice.physics.Vector.prototype.rotate;
	ice.physics.Vector.prototype.rotateRad = ice.physics.Vector.prototype.rotate;
	ice.physics.Vector.prototype.rotateDeg = ice.physics.Vector.prototype.rotateDegrees;
	ice.physics.Vector.prototype.setRadians = ice.physics.Vector.prototype.setAngle;
	ice.physics.Vector.prototype.setRad = ice.physics.Vector.prototype.setAngle;
	ice.physics.Vector.prototype.setDeg = ice.physics.Vector.prototype.setDegrees;
	ice.physics.Vector.prototype.limit = ice.physics.Vector.prototype.clamp;
	ice.physics.Vector.prototype.limitX = ice.physics.Vector.prototype.clampX;
	ice.physics.Vector.prototype.limitY = ice.physics.Vector.prototype.clampY;
	ice.physics.Vector.prototype.clampMag = ice.physics.Vector.prototype.clampMagnitude;
	ice.physics.Vector.prototype.clampLength = ice.physics.Vector.prototype.clampMagnitude;
	ice.physics.Vector.prototype.limitMagnitude = ice.physics.Vector.prototype.clampMagnitude;
	ice.physics.Vector.prototype.limitMag = ice.physics.Vector.prototype.clampMagnitude;
	ice.physics.Vector.prototype.limitLength = ice.physics.Vector.prototype.clampMagnitude;
	ice.physics.Vector.prototype.random = ice.physics.Vector.prototype.randomize;
	ice.physics.Vector.prototype.randomX = ice.physics.Vector.prototype.randomizeX;
	ice.physics.Vector.prototype.randomY = ice.physics.Vector.prototype.randomizeY;
	ice.physics.Vector.prototype.randomXY = ice.physics.Vector.prototype.randomizeXY;
	ice.physics.Vector.prototype.randomAngle = ice.physics.Vector.prototype.randomizeAngle;
	ice.physics.Vector.prototype.randomizeRadians = ice.physics.Vector.prototype.randomizeAngle;
	ice.physics.Vector.prototype.randomRandians = ice.physics.Vector.prototype.randomizeAngle;
	ice.physics.Vector.prototype.randomizeRad = ice.physics.Vector.prototype.randomizeAngle;
	ice.physics.Vector.prototype.randomRad = ice.physics.Vector.prototype.randomizeAngle;
	ice.physics.Vector.prototype.randomDegrees = ice.physics.Vector.prototype.randomizeDegrees;
	ice.physics.Vector.prototype.randomizeDeg = ice.physics.Vector.prototype.randomizeDegrees;
	ice.physics.Vector.prototype.randomDeg = ice.physics.Vector.prototype.randomizeDegrees;
	ice.physics.Vector.prototype.randomMagnitude = ice.physics.Vector.prototype.randomizeMagnitude;
	ice.physics.Vector.prototype.randomizeMag = ice.physics.Vector.prototype.randomizeMagnitude;
	ice.physics.Vector.prototype.randomMag = ice.physics.Vector.prototype.randomizeMagnitude;
	ice.physics.Vector.prototype.randomizeLength = ice.physics.Vector.prototype.randomizeMagnitude;
	ice.physics.Vector.prototype.randomLength = ice.physics.Vector.prototype.randomizeMagnitude;
	ice.physics.Vector.prototype.randomAny = ice.physics.Vector.prototype.randomizeAny;
	ice.physics.Vector.prototype.sub = ice.physics.Vector.prototype.subtract;
	ice.physics.Vector.prototype.subX = ice.physics.Vector.prototype.subtractX;
	ice.physics.Vector.prototype.subY = ice.physics.Vector.prototype.subtractY;
	ice.physics.Vector.prototype.subXY = ice.physics.Vector.prototype.subtractXY;
	ice.physics.Vector.prototype.mult = ice.physics.Vector.prototype.multiply;
	ice.physics.Vector.prototype.multX = ice.physics.Vector.prototype.multiplyX;
	ice.physics.Vector.prototype.multY = ice.physics.Vector.prototype.multiplyY;
	ice.physics.Vector.prototype.multXY = ice.physics.Vector.prototype.multiplyXY;
	ice.physics.Vector.prototype.div = ice.physics.Vector.prototype.divide;
	ice.physics.Vector.prototype.divX = ice.physics.Vector.prototype.divideX;
	ice.physics.Vector.prototype.divY = ice.physics.Vector.prototype.divideY;
	ice.physics.Vector.prototype.divXY = ice.physics.Vector.prototype.divideXY;

	// Methods

	ice.physics.origin = function() {
		return new ice.physics.Vector(0, 0);
	}

	return ice;
}(ice || {}));
