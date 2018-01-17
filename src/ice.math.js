var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("math");
	ice.math = {};
	ice.math.version = "v2.0.8"; // This version of the ice.math module
	console.log("%cice.math " + ice.math.version + " imported successfully.", "color: #008000");

	/*
	 *	================ Math Module ================
	 */

	// Private variables/functions

	var RAD_TO_DEG = 180 / Math.PI;
	var DEG_TO_RAD = Math.PI / 180;
	var fibMem = {};

	// Properties

	ice.math.PI = Math.PI;
	ice.math.TAU = ice.math.PI * 2;

	// Methods

	ice.math.randomInt = function(min, max) { // returns a random int from min (inclusive) to max (inclusive)
		if(max === undefined) {
			if(min === undefined) {
				return Math.random();
			}
			var maxInt = Math.floor(min);
			return Math.floor(Math.random() * (maxInt + 1));
		}
		var minInt = Math.ceil(min);
		var maxInt = Math.floor(max);
		return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
	}
	ice.math.randomFloat = function(min, max) { // returns a random float from min (inclusive) to max (exclusive)
		if(max === undefined) {
			if(min === undefined) {
				return Math.random() < 0.50;
			}
			return Math.random() * min;
		}
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
		return Math.random() < chance;
	}
	ice.math.percentChance = function(chance) { // returns true [chance] percent of the time
		return Math.random() * 100 < chance;
	}
	ice.math.coinFlip = function() { // returns true 50% of the time
		return Math.random() < 0.50;
	}
	ice.math.pythag = function(dX, dY) { // returns the length of the hypotenuse from the two other side lengths
		return Math.sqrt(dX * dX + dY * dY);
	}
	ice.math.distSq = function(x1, y1, x2, y2) {
		if(x2 === undefined) {
			var dx = x1.x - y1.x;
			var dy = x1.y - y1.y;
			return dx * dx + dy * dy;
		}
		var dx = x1 - x2;
		var dy = y1 - y2;
		return dx * dx + dy * dy;
	}
	ice.math.dist = function(x1, y1, x2, y2) {
		if(x2 === undefined) {
			var dx = x1.x - y1.x;
			var dy = x1.y - y1.y;
			return Math.sqrt(dx * dx + dy * dy);
		}
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	}
	ice.math.map = function(n, oldMin, oldMax, newMin, newMax, clamp) {
		/*
		 * A note to future me:
		 * STOP TRYING TO OPTIMIZE THIS!!!
		 * MAYBE it can be sped up, but how much?
		 * A few milliseconds? And don't you even
		 * think about a lookup table/Map constructor,
		 * you know better than that! Don't overcomplicate.
		 * Just let it go. Woo-sah, wooooo-saaaahh
		 */
		if(newMin === newMax) return newMin;
		var mapped = (n - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
		if(clamp) mapped = ice.math.clamp(mapped, newMin, newMax);
		return mapped;
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
	ice.math.radToDeg = function(rad) {
		return rad * RAD_TO_DEG;
	}
	ice.math.degToRad = function(deg) {
		return deg * DEG_TO_RAD;
	}
	ice.math.fibonacci = function(n) {
		if(n > 1475) { // any n above 1475 will return Infinity anyway, this is just faster
			return Infinity;
		}
		n = Math.floor(n);
		if(fibMem[n] === undefined) {
			if(n <= 1) {
				return 1;
			}
			fibMem[n] = ice.math.fibonacci(n - 1) + ice.math.fibonacci(n - 2);
		}
		return fibMem[n];
	}
	ice.math.clamp = function(n, min, max) {
		if(min > max) {
			var temp = min;
			min = max;
			max = temp;
		}
		if(n < min) return min;
		if(n > max) return max;
		return n;
	}

	return ice;
}(ice || {}));
