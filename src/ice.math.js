var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("math");
	ice.math = {};
	ice.math.version = "v2.0.3"; // This version of the ice.math module
	console.log("%cice.math " + ice.math.version + " imported successfully.", "color: #008000");

	/*
	 *	================ Math Module ================
	 */

	// Properties

	ice.math.PI = Math.PI;
	ice.math.TAU = ice.math.PI * 2;

	// Methods

	ice.math.randomInt = function(min, max) { // returns a random int from min (inclusive) to max (inclusive)
		var minInt = Math.ceil(min);
		var maxInt = Math.floor(max);
		return Math.floor(Math.random() * (maxInt - minInt + 1) + min);
	}
	ice.math.randomIntExcl = function(min, max) { // returns a random int from min (inclusive) to max (exclusive)
		var minInt = Math.ceil(min);
		var maxInt = Math.floor(max);
		return Math.floor(Math.random() * (maxInt - minInt) + min);
	}
	ice.math.randomFloat = function(min, max) { // returns a random float from min (inclusive) to max (exclusive)
		return Math.random() * (max - min) + min;
	}
	ice.math.randomFrom = function(arr) { // returns a random element from an array
		return arr[Math.floor(Math.random() * arr.length)];
	}
	ice.math.random = function(arg1, arg2) {
		if(arg1 instanceof Array) {
			return arg1[Math.floor(Math.random() * arg1.length)];
		}
		if(arg2 === undefined) {
			if(arg1 === undefined) {
				return Math.random();
			}
			return Math.random() * arg1;
		}
		return Math.random() * (arg2 - arg1) + arg1;
	}
	ice.math.chance = function(chance) { // returns true [chance] out of 1 times ([1] always returns true, [0.50] returns true 50% of the time, etc.)
		return chance > Math.random();
	}
	ice.math.percentChance = function(chance) { // returns true [chance] percent of the time
		return chance > Math.random() * 100;
	}
	ice.math.coinFlip = function() { // returns true 50% of the time
		return 0.50 > Math.random();
	}
	ice.math.pythag = function(dX, dY) { // returns the length of the hypotenuse from the two other side lengths
		return Math.sqrt(dX * dX + dY * dY);
	}
	ice.math.distSq = function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return dx * dx + dy * dy;
	}
	ice.math.dist = function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	}
	ice.math.map = function(n, oldMin, oldMax, newMin, newMax) {
		return (n - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
	}
	ice.math.isPrime = function(n) { // returns whether or not a number is prime (0, 1, and Infinity are not prime)
		if(isFinite(n)) {
			for(var i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
				if(n % i === 0) {
					return false;
				}
			}
			return n && n !== 1;
		}
		return false;
	}

	return ice;
}(ice || {}));
