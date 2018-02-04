(function() {
	const LOG_FAILURE = function(desc) {
		console.error(`UNIT TEST FAILED! ${desc}`);
	};
	function expect(inputVal) {
		let retVal = {}
		retVal.toExist = function() {
			if(typeof inputVal === "undefined") {
				return {
					otherwise: function(func, ...rest) {
						func(...rest);
					}
				};
			}
			return {otherwise: function() {}};
		},
		retVal.toBe = function(val) {
			if(inputVal !== val) {
				return {
					otherwise: function(func, ...rest) {
						func(...rest);
					}
				};
			}
			return {otherwise: function() {}};
		},
		retVal.toBeA = function(type) {
			if(typeof type === "string") {
				if(typeof inputVal !== type) {
					return {
						otherwise: function(func, ...rest) {
							func(...rest);
						}
					};
				}
				return {otherwise: function() {}};
			}
			else {
				if(!(inputVal instanceof type)) {
					return {
						otherwise: function(func, ...rest) {
							func(...rest);
						}
					};
				}
				return {otherwise: function() {}};
			}
		},
		retVal.toBeAn = retVal.toBeA,
		retVal.toBeIn = function(arr) {
			if(!arr.includes(inputVal)) {
				return {
					otherwise: function(func, ...rest) {
						func(...rest);
					}
				};
			}
			return {otherwise: function() {}};
		},
		retVal.toPass = function(func) {
			if(!func(inputVal)) {
				return {
					otherwise: function(func, ...rest) {
						func(...rest);
					}
				};
			}
			return {otherwise: function() {}};
		}
		return retVal;
	}

	expect(ice).toExist()
		.otherwise(LOG_FAILURE, "ice doesn't exist");
	expect(ice).toBeAn("object")
		.otherwise(LOG_FAILURE, "ice wasn't an object");

	expect(ice.colors).toExist()
		.otherwise(LOG_FAILURE, "ice.colors doesn't exist");
	expect(ice.colors.RED).toBe("#FF0000")
		.otherwise(LOG_FAILURE, "ice.colors.RED wasn't \"#FF0000\"");
	expect(ice.colors.RED).toBeA("string")
		.otherwise(LOG_FAILURE, "ice.colors.RED wasn't a string");
	expect(ice.colors.RED).toBeIn(ice.colors.hues)
		.otherwise(LOG_FAILURE, "ice.colors.RED wasn't in ice.colors.hues");
	expect(ice.colors.random()).toBeIn(ice.colors.huesExt)
		.otherwise(LOG_FAILURE, "ice.colors.random() wasn't in ice.colors.huesExt");
	expect(ice.colors.all).toBeAn(Array)
		.otherwise(LOG_FAILURE, "ice.colors.all wasn't an Array");
	expect(ice.colors.rgbToHsl(255, 127.5, 0, 0.25)).toBeAn(Array)
		.otherwise(LOG_FAILURE, "ice.colors.rgbToHsl(255, 127.5, 0, 0.25) wasn't an array");
	expect(ice.colors.rgbToHsl(255, 127.5, 0, 0.25).join(", ")).toBe("30, 100, 50, 0.25")
		.otherwise(LOG_FAILURE, "ice.colors.rgbToHsl(255, 127.5, 0, 0.25) wasn't [30, 100, 50, 0.25]");
	expect(ice.colors.rgbToHsl(255, 127.5, 0, 0.25).join(", ")).toBe("30, 100, 50, 0.25")
		.otherwise(LOG_FAILURE, "ice.colors.rgbToHsl(255, 127.5, 0, 0.25) wasn't [30, 100, 50, 0.25]");
	expect(ice.colors.rgbToHsl([255, 0.3]).join(", ")).toBe("0, 0, 100, 0.3")
		.otherwise(LOG_FAILURE, "ice.colors.rgbToHsl([255, 0.3]) wasn't [0, 0, 100, 0.3]");
	expect(ice.colors.hexToRgb(ice.colors.RED).join(", ")).toBe("255, 0, 0, 1")
		.otherwise(LOG_FAILURE, "ice.colors.hexToRgb(ice.colors.RED) wasn't [255, 0, 0, 1]");
	expect(ice.colors.rgbToHex([255, 0, 0, 1])).toBe(ice.colors.RED.toLowerCase())
		.otherwise(LOG_FAILURE, "ice.colors.rgbToHex([255, 0, 0, 1]) wasn't ice.colors.RED");

	expect(ice.debug).toExist()
		.otherwise(LOG_FAILURE, "ice.debug doesn't exist");

	expect(ice.dom).toExist()
		.otherwise(LOG_FAILURE, "ice.dom doesn't exist");

	expect(ice.graphics).toExist()
		.otherwise(LOG_FAILURE, "ice.graphics doesn't exist");

	expect(ice.math).toExist()
		.otherwise(LOG_FAILURE, "ice.math doesn't exist");
	expect(ice.math.PI).toBeA("number")
		.otherwise(LOG_FAILURE, "ice.math.PI wasn't a number");
	expect(ice.math.PI).toBe(Math.PI)
		.otherwise(LOG_FAILURE, "ice.math.PI wasn't Math.PI");
	expect(ice.math.TAU).toBeA("number")
		.otherwise(LOG_FAILURE, "ice.math.TAU wasn't a number");
	expect(ice.math.TAU).toBe(Math.PI * 2)
		.otherwise(LOG_FAILURE, "ice.math.TAU wasn't Math.PI * 2");
	expect(ice.math.randomInt()).toBeA("number")
		.otherwise(LOG_FAILURE, "ice.math.randomInt() wasn't a number");
	expect(ice.math.randomInt()).toBeIn([0, 1])
		.otherwise(LOG_FAILURE, "ice.math.randomInt() wasn't in [0, 1]");
	expect(ice.math.randomInt(10)).toPass(val => val % 1 === 0 && val >= 0 && val <= 10)
		.otherwise(LOG_FAILURE, "ice.math.randomInt(10) wasn't an integer from 0 to 10");
	expect(ice.math.randomInt(5, 10)).toPass(val => val % 1 === 0 && val >= 5 && val <= 10)
		.otherwise(LOG_FAILURE, "ice.math.randomInt(5, 10) wasn't an integer from 5 to 10");
	expect(ice.math.randomFloat()).toBeA("number")
		.otherwise(LOG_FAILURE, "ice.math.randomFloat() wasn't a number");
	expect(ice.math.randomFloat()).toPass(val => val >= 0 && val < 1)
		.otherwise(LOG_FAILURE, "ice.math.randomFloat() wasn't >= 0 and < 1");
	expect(ice.math.randomFloat(10)).toPass(val => val >= 0 && val < 10)
		.otherwise(LOG_FAILURE, "ice.math.randomFloat() wasn't >= 0 and < 10");
	expect(ice.math.randomFloat(5, 10)).toPass(val => val >= 5 && val <= 10)
		.otherwise(LOG_FAILURE, "ice.math.randomFloat() wasn't >= 5 and < 10");
	expect(ice.math.randomFrom([3])).toBe(3)
		.otherwise(LOG_FAILURE, "ice.math.randomFrom([3]) wasn't 3");
	expect(ice.math.randomFrom(["foo", "bar", "baz", "bat"])).toBeIn(["foo", "bar", "baz", "bat"])
		.otherwise(LOG_FAILURE, `ice.math.randomFrom(["foo", "bar", "baz", "bat"]) wasn't in ["foo", "bar", "baz", "bat"]`);
	expect(ice.math.randomFrom("foo bar baz bat")).toBeIn(["f", "o", " ", "b", "a", "r", "z", "t"])
		.otherwise(LOG_FAILURE, `ice.math.randomFrom("foo bar baz bat") wasn't in ["f", "o", " ", "b", "a", "r", "z", "t"]`);
	expect(ice.math.random()).toBeA("number")
		.otherwise(LOG_FAILURE, "ice.math.random() wasn't a number");
	expect(ice.math.random()).toPass(val => val >= 0 && val < 1)
		.otherwise(LOG_FAILURE, "ice.math.random() wasn't >= 0 and < 1");
	expect(ice.math.random("foo bar baz bat")).toBeIn(["f", "o", " ", "b", "a", "r", "z", "t"])
		.otherwise(LOG_FAILURE, `ice.math.random("foo bar baz bat") wasn't in ["f", "o", " ", "b", "a", "r", "z", "t"]`);
	expect(ice.math.random(["foo", "bar", "baz", "bat"])).toBeIn(["foo", "bar", "baz", "bat"])
		.otherwise(LOG_FAILURE, `ice.math.random(["foo", "bar", "baz", "bat"]) wasn't in ["foo", "bar", "baz", "bat"]`);
	expect(ice.math.chance()).toBeA("boolean")
		.otherwise(LOG_FAILURE, "ice.math.chance() wasn't a boolean");
	expect(ice.math.chance(0)).toBe(false)
		.otherwise(LOG_FAILURE, "ice.math.chance(0) wasn't false");
	expect(ice.math.chance(1)).toBe(true)
		.otherwise(LOG_FAILURE, "ice.math.chance(1) wasn't true");
	expect(ice.math.percentChance()).toBeA("boolean")
		.otherwise(LOG_FAILURE, "ice.math.percentChance() wasn't a boolean");
	expect(ice.math.percentChance(0)).toBe(false)
		.otherwise(LOG_FAILURE, "ice.math.percentChance(0) wasn't false");
	expect(ice.math.percentChance(100)).toBe(true)
		.otherwise(LOG_FAILURE, "ice.math.percentChance(100) wasn't true");
	expect(ice.math.coinFlip()).toBeA("boolean")
		.otherwise(LOG_FAILURE, "ice.math.percentChance() wasn't a boolean");
	expect(ice.math.dieRoll()).toBeA("number")
		.otherwise(LOG_FAILURE, "ice.math.dieRoll() wasn't a number");
	expect(ice.math.dieRoll()).toBeIn([1, 2, 3, 4, 5, 6])
		.otherwise(LOG_FAILURE, "ice.math.dieRoll() wasn't in [1, 2, 3, 4, 5, 6]");
	expect(ice.math.dieRoll()).toPass(val => val % 1 === 0)
		.otherwise(LOG_FAILURE, "ice.math.dieRoll() wasn't an integer");
	expect(ice.math.dieRoll(20)).toPass(val => val % 1 === 0 && val >= 0 && val <= 20)
		.otherwise(LOG_FAILURE, "ice.math.dieRoll() wasn't an integer >= 0 and <= 20");
	expect(ice.math.pythag(3, 4)).toBe(5)
		.otherwise(LOG_FAILURE, "ice.math.pythag(3, 4) wasn't 5");
	expect(ice.math.pythag(6, 8)).toBe(10)
		.otherwise(LOG_FAILURE, "ice.math.pythag(6, 8) wasn't 10");
	expect(ice.math.distSq(2, 3, 3, 3)).toBe(1)
		.otherwise(LOG_FAILURE, "ice.math.distSq(2, 3, 3, 3) wasn't 1");
	expect(ice.math.distSq(-2, -1, -6, 2)).toBe(25)
		.otherwise(LOG_FAILURE, "ice.math.distSq(-2, -1, -6, 2) wasn't 25");
	expect(ice.math.distSq({x: -2, y: -1}, {x: -6, y: 2})).toBe(25)
		.otherwise(LOG_FAILURE, "ice.math.distSq({x: -2, y: -1}, {x: -6, y: 2}) wasn't 25");
	expect(ice.math.dist({x: 2, y: 3}, {x: 3, y: 3})).toBe(1)
		.otherwise(LOG_FAILURE, "ice.math.dist({x: 2, y: 3}, {x: 3, y: 3}) wasn't 1");
	expect(ice.math.dist({x: -2, y: -1}, {x: -6, y: 2})).toBe(5)
		.otherwise(LOG_FAILURE, "ice.math.dist({x: -2, y: -1}, {x: -6, y: 2}) wasn't 5");
	expect(ice.math.map(0.5, 0, 1, 0, 10)).toBeA("number")
		.otherwise(LOG_FAILURE, "ice.math.map(0.5, 0, 1, 0, 10) wasn't a number");
	expect(ice.math.map(0.5, 0, 1, 0, 10)).toBe(5)
		.otherwise(LOG_FAILURE, "ice.math.map(0.5, 0, 1, 0, 10) wasn't 5");
	expect(ice.math.map(0.5, 0, 1, 10, 0)).toBe(5)
		.otherwise(LOG_FAILURE, "ice.math.map(0.5, 0, 1, 10, 0) wasn't 5");
	expect(ice.math.map(0.5, 0, 1, -10, 0)).toBe(-5)
		.otherwise(LOG_FAILURE, "ice.math.map(0.5, 0, 1, -10, 0) wasn't -5");
	expect(ice.math.map(-0.5, 0, 1, 10, 0)).toBe(15)
		.otherwise(LOG_FAILURE, "ice.math.map(-0.5, 0, 1, 10, 0) wasn't 15");
	expect(ice.math.map(-0.5, 0, 1, 0, 10)).toBe(-5)
		.otherwise(LOG_FAILURE, "ice.math.map(-0.5, 0, 1, 10, 0) wasn't 15");
	expect(ice.math.map(-0.5, 0, 1, 0, 10, true)).toBe(0)
		.otherwise(LOG_FAILURE, "ice.math.map(-0.5, 0, 1, 0, 10, true) wasn't 0");
	expect(ice.math.map(Math.random(), Infinity, NaN, 4, 4)).toBe(4)
		.otherwise(LOG_FAILURE, "ice.math.map(Math.random(), Infinity, NaN, 4, 4) wasn't 4");
	expect(ice.math.isPrime(5)).toBe(true)
		.otherwise(LOG_FAILURE, "ice.math.isPrime(5) wasn't true");
	expect(ice.math.isPrime(9)).toBe(false)
		.otherwise(LOG_FAILURE, "ice.math.isPrime(9) wasn't false");
	expect(ice.math.radToDeg(Math.PI)).toBe(180)
		.otherwise(LOG_FAILURE, "ice.math.radToDeg(Math.PI) wasn't 180");
	expect(ice.math.radToDeg(Math.PI * 4)).toBe(720)
		.otherwise(LOG_FAILURE, "ice.math.radToDeg(Math.PI * 4) wasn't 720");
	expect(ice.math.degToRad(180)).toBe(Math.PI)
		.otherwise(LOG_FAILURE, "ice.math.degToRad(180) wasn't Math.PI");
	expect(ice.math.degToRad(720)).toBe(Math.PI * 4)
		.otherwise(LOG_FAILURE, "ice.math.degToRad(720) wasn't Math.PI * 4");
	expect([0, 1, 2, 3, 4, 5, 6, 7, 8].map(ice.math.fibonacci).join(", ")).toBe("1, 1, 2, 3, 5, 8, 13, 21, 34")
		.otherwise(LOG_FAILURE, "[0, 1, 2, 3, 4, 5, 6, 7, 8].map(ice.math.fibonacci) wasn't [1, 1, 2, 3, 5, 8, 13, 21, 34]");
	expect(ice.math.clamp(0, 5, 10)).toBe(5)
		.otherwise(LOG_FAILURE, "ice.math.clamp(0, 5, 10) wasn't 5");
	expect(ice.math.clamp(5, 5, 10)).toBe(5)
		.otherwise(LOG_FAILURE, "ice.math.clamp(5, 5, 10) wasn't 5");
	expect(ice.math.clamp(7, 5, 10)).toBe(7)
		.otherwise(LOG_FAILURE, "ice.math.clamp(7, 5, 10) wasn't 7");
	expect(ice.math.clamp(10, 5, 10)).toBe(10)
		.otherwise(LOG_FAILURE, "ice.math.clamp(10, 5, 10) wasn't 10");
	expect(ice.math.clamp(15, 5, 10)).toBe(10)
		.otherwise(LOG_FAILURE, "ice.math.clamp(15, 5, 10) wasn't 10");
	expect(ice.math.clamp(0, 10, 5)).toBe(5)
		.otherwise(LOG_FAILURE, "ice.math.clamp(0, 10, 5) wasn't 5");
	expect(ice.math.clamp(5, 10, 5)).toBe(5)
		.otherwise(LOG_FAILURE, "ice.math.clamp(5, 10, 5) wasn't 5");
	expect(ice.math.clamp(7, 10, 5)).toBe(7)
		.otherwise(LOG_FAILURE, "ice.math.clamp(7, 10, 5) wasn't 7");
	expect(ice.math.clamp(10, 10, 5)).toBe(10)
		.otherwise(LOG_FAILURE, "ice.math.clamp(10, 10, 5) wasn't 10");
	expect(ice.math.clamp(15, 10, 5)).toBe(10)
		.otherwise(LOG_FAILURE, "ice.math.clamp(15, 10, 5) wasn't 10");
	expect(ice.math.clamp(1, -2, -1)).toBe(-1)
		.otherwise(LOG_FAILURE, "ice.math.clamp(1, -2, -1) wasn't -1");

	expect(ice.physics).toExist()
		.otherwise(LOG_FAILURE, "ice.physics doesn't exist");

	expect(ice.time).toExist()
		.otherwise(LOG_FAILURE, "ice.time doesn't exist");
})();
