var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("math");
	ice.math = {};
	ice.math.version = "v2.0.0"; // This version of the ice.math module
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

	return ice;
}(ice || {}));
