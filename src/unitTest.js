(function() {
	let failures = 0;

	function expect(desc, val) {
		let retVal = {}
		retVal.toExist = function() {
			if(typeof val === "undefined") {
				failures++;
				console.error(
					`UNIT TEST FAILED: expected ${desc} to exist! %o`, {
						"testing": desc,
						"expected": "to exist"
					}
				);
			}
			return this;
		}
		retVal.toBe = function(expected) {
			if(val !== expected) {
				failures++;
				console.error(
					`UNIT TEST FAILED: expected ${desc} to be ${expected}, not ${val}! %o`, {
						"testing": desc,
						"expected": expected,
						"got": val
					}
				);
			}
			return this;
		}
		retVal.toBeA = function(expected) {
			if(typeof expected === "string") {
				if(typeof val !== expected) {
					failures++;
					console.error(
						`UNIT TEST FAILED: expected ${desc} to be a ${expected}, not a ${typeof val}! %o`, {
							"testing": desc,
							"expected": expected,
							"got": val
						}
					);
				}
				return this;
			}
			else {
				if(!(val instanceof expected)) {
					failures++;
					console.error(
						`UNIT TEST FAILED: expected ${desc} to be an instance of ${expected}! %o`, {
							"testing": desc,
							"expected": expected,
							"got": val
						}
					);
				}
				return this;
			}
		}
		retVal.toBeAn = retVal.toBeA;
		retVal.toBeIn = function(expected) {
			if(!expected.includes(val)) {
				failures++;
				console.error(
					`UNIT TEST FAILED: expected ${desc} to be in [${expected.join(", ")}]! %o`, {
						"testing": desc,
						"expected": expected,
						"got": val
					}
				);
			}
			return this;
		}
		retVal.toPass = function(expected) {
			if(!expected(val)) {
				failures++;
				console.error(
					`UNIT TEST FAILED: expected ${desc} to pass ${expected}! %o`, {
						"testing": desc,
						"expected": expected,
						"got": val
					}
				);
			}
			return this;
		}
		return retVal;
	}

	expect("test", "test")
		.toExist()
		.toBeA("string")
		.toBeIn(["test", "foo"])
		.toBe("test");

	expect("ice", ice)
		.toExist()
		.toBeAn("object");

	expect("ice.colors", ice.colors)
		.toExist();
	expect("ice.colors.RED", ice.colors.RED)
		.toBe("#FF0000")
		.toBeA("string")
		.toBeIn(ice.colors.hues);
	expect("ice.colors.random()", ice.colors.random())
		.toBeIn(ice.colors.huesExt);
	expect("ice.colors.all", ice.colors.all)
		.toBeAn(Array);
	expect("ice.colors.rgbToHsl(255, 127.5, 0, 0.25)", ice.colors.rgbToHsl(255, 127.5, 0, 0.25))
		.toBeAn(Array);
	expect(`ice.colors.rgbToHsl(255, 127.5, 0, 0.25).join(", ")`, ice.colors.rgbToHsl(255, 127.5, 0, 0.25).join(", "))
		.toBe("30, 100, 50, 0.25");
	expect(`ice.colors.rgbToHsl("rgba(255, 127.5, 0, 0.25)").join(", ")`, ice.colors.rgbToHsl("rgba(255, 127.5, 0, 0.25)").join(", "))
		.toBe("30, 100, 50, 0.25");
	expect(`ice.colors.rgbToHsl([255, 0.3]).join(", ")`, ice.colors.rgbToHsl([255, 0.3]).join(", "))
		.toBe("0, 0, 100, 0.3");
	expect(`ice.colors.hexToRgb(ice.colors.RED).join(", ")`, ice.colors.hexToRgb(ice.colors.RED).join(", "))
		.toBe("255, 0, 0, 1");
	expect("ice.colors.rgbToHex([255, 0, 0, 1])", ice.colors.rgbToHex([255, 0, 0, 1]))
		.toBe(ice.colors.RED);

	expect("ice.debug", ice.debug)
		.toExist();

	expect("ice.dom", ice.dom)
		.toExist();

	expect("ice.graphics", ice.graphics)
		.toExist();

	expect("ice.math", ice.math)
		.toExist();
	expect("ice.math.PI", ice.math.PI)
		.toBeA("number")
		.toBe(Math.PI);
	expect("ice.math.TAU", ice.math.TAU)
		.toBeA("number")
		.toBe(Math.PI * 2);
	expect("ice.math.randomInt()", ice.math.randomInt())
		.toBeA("number")
		.toBeIn([0, 1]);
	expect("ice.math.randomInt(10)", ice.math.randomInt(10))
		.toPass(val => val % 1 === 0 && val >= 0 && val <= 10);
	expect("ice.math.randomInt(5, 10)", ice.math.randomInt(5, 10))
		.toPass(val => val % 1 === 0 && val >= 5 && val <= 10);
	expect("ice.math.randomFloat()", ice.math.randomFloat())
		.toBeA("number")
		.toPass(val => val >= 0 && val < 1);
	expect("ice.math.randomFloat(10)", ice.math.randomFloat(10))
		.toPass(val => val >= 0 && val < 10);
	expect("ice.math.randomFloat(5, 10)", ice.math.randomFloat(5, 10))
		.toPass(val => val >= 5 && val <= 10);
	expect("ice.math.randomFrom([3])", ice.math.randomFrom([3]))
		.toBe(3);
	expect(`ice.math.randomFrom(["foo", "bar", "baz", "bat"])`, ice.math.randomFrom(["foo", "bar", "baz", "bat"]))
		.toBeIn(["foo", "bar", "baz", "bat"]);
	expect(`ice.math.randomFrom("foo bar baz bat")`, ice.math.randomFrom("foo bar baz bat"))
		.toBeIn(["f", "o", " ", "b", "a", "r", "z", "t"]);
	expect("ice.math.random()", ice.math.random())
		.toBeA("number")
		.toPass(val => val >= 0 && val < 1);
	expect(`ice.math.random("foo bar baz bat")`, ice.math.random("foo bar baz bat"))
		.toBeIn(["f", "o", " ", "b", "a", "r", "z", "t"]);
	expect(`ice.math.random(["foo", "bar", "baz", "bat"])`, ice.math.random(["foo", "bar", "baz", "bat"]))
		.toBeIn(["foo", "bar", "baz", "bat"]);
	expect("ice.math.chance()", ice.math.chance())
		.toBeA("boolean");
	expect("ice.math.chance(0)", ice.math.chance(0))
		.toBe(false);
	expect("ice.math.chance(1)", ice.math.chance(1))
		.toBe(true);
	expect("ice.math.percentChance()", ice.math.percentChance())
		.toBeA("boolean");
	expect("ice.math.percentChance(0)", ice.math.percentChance(0))
		.toBe(false);
	expect("ice.math.percentChance(100)", ice.math.percentChance(100))
		.toBe(true);
	expect("ice.math.coinFlip()", ice.math.coinFlip())
		.toBeA("boolean");
	expect("ice.math.dieRoll()", ice.math.dieRoll())
		.toBeA("number")
		.toBeIn([1, 2, 3, 4, 5, 6])
		.toPass(val => val % 1 === 0);
	expect("ice.math.dieRoll(20)", ice.math.dieRoll(20))
		.toPass(val => val % 1 === 0 && val >= 0 && val <= 20);
	expect("ice.math.pythag(3, 4)", ice.math.pythag(3, 4))
		.toBe(5);
	expect("ice.math.pythag(6, 8)", ice.math.pythag(6, 8))
		.toBe(10);
	expect("ice.math.distSq(2, 3, 3, 3)", ice.math.distSq(2, 3, 3, 3))
		.toBe(1);
	expect("ice.math.distSq(-2, -1, -6, 2)", ice.math.distSq(-2, -1, -6, 2))
		.toBe(25);
	expect("ice.math.distSq({x: -2, y: -1}, {x: -6, y: 2})", ice.math.distSq({
			x: -2,
			y: -1
		}, {
			x: -6,
			y: 2
		}))
		.toBe(25);
	expect("ice.math.dist({x: 2, y: 3}, {x: 3, y: 3})", ice.math.dist({
			x: 2,
			y: 3
		}, {
			x: 3,
			y: 3
		}))
		.toBe(1);
	expect("ice.math.dist({x: -2, y: -1}, {x: -6, y: 2})", ice.math.dist({
			x: -2,
			y: -1
		}, {
			x: -6,
			y: 2
		}))
		.toBe(5);
	expect("ice.math.map(0.5, 0, 1, 0, 10)", ice.math.map(0.5, 0, 1, 0, 10))
		.toBeA("number")
		.toBe(5);
	expect("ice.math.map(0.5, 0, 1, 10, 0)", ice.math.map(0.5, 0, 1, 10, 0))
		.toBe(5);
	expect("ice.math.map(0.5, 0, 1, -10, 0)", ice.math.map(0.5, 0, 1, -10, 0))
		.toBe(-5);
	expect("ice.math.map(-0.5, 0, 1, 10, 0)", ice.math.map(-0.5, 0, 1, 10, 0))
		.toBe(15);
	expect("ice.math.map(-0.5, 0, 1, 0, 10)", ice.math.map(-0.5, 0, 1, 0, 10))
		.toBe(-5);
	expect("ice.math.map(-0.5, 0, 1, 0, 10, true)", ice.math.map(-0.5, 0, 1, 0, 10, true))
		.toBe(0);
	expect("ice.math.map(Math.random(), Infinity, NaN, 4, 4)", ice.math.map(Math.random(), Infinity, NaN, 4, 4))
		.toBe(4);
	expect("ice.math.isPrime(5)", ice.math.isPrime(5))
		.toBe(true);
	expect("ice.math.isPrime(9)", ice.math.isPrime(9))
		.toBe(false);
	expect("ice.math.radToDeg(Math.PI)", ice.math.radToDeg(Math.PI))
		.toBe(180);
	expect("ice.math.radToDeg(Math.PI * 4)", ice.math.radToDeg(Math.PI * 4))
		.toBe(720);
	expect("ice.math.degToRad(180)", ice.math.degToRad(180))
		.toBe(Math.PI);
	expect("ice.math.degToRad(720)", ice.math.degToRad(720))
		.toBe(Math.PI * 4);
	expect(`[0, 1, 2, 3, 4, 5, 6, 7, 8].map(ice.math.fibonacci).join(", ")`, [0, 1, 2, 3, 4, 5, 6, 7, 8].map(ice.math.fibonacci).join(", "))
		.toBe("1, 1, 2, 3, 5, 8, 13, 21, 34");
	expect("ice.math.clamp(0, 5, 10)", ice.math.clamp(0, 5, 10))
		.toBe(5);
	expect("ice.math.clamp(5, 5, 10)", ice.math.clamp(5, 5, 10))
		.toBe(5);
	expect("ice.math.clamp(7, 5, 10)", ice.math.clamp(7, 5, 10))
		.toBe(7);
	expect("ice.math.clamp(10, 5, 10)", ice.math.clamp(10, 5, 10))
		.toBe(10);
	expect("ice.math.clamp(15, 5, 10)", ice.math.clamp(15, 5, 10))
		.toBe(10);
	expect("ice.math.clamp(0, 10, 5)", ice.math.clamp(0, 10, 5))
		.toBe(5);
	expect("ice.math.clamp(5, 10, 5)", ice.math.clamp(5, 10, 5))
		.toBe(5);
	expect("ice.math.clamp(7, 10, 5)", ice.math.clamp(7, 10, 5))
		.toBe(7);
	expect("ice.math.clamp(10, 10, 5)", ice.math.clamp(10, 10, 5))
		.toBe(10);
	expect("ice.math.clamp(15, 10, 5)", ice.math.clamp(15, 10, 5))
		.toBe(10);
	expect("ice.math.clamp(1, -2, -1)", ice.math.clamp(1, -2, -1))
		.toBe(-1);

	expect("ice.physics", ice.physics)
		.toExist();

	expect("ice.time", ice.time)
		.toExist();

	console.log(`%cUnit test ran! failures: ${failures}`, `color: ${failures > 0 ? "red" : "green"}; font-weight: bold; background-color: ${failures > 0 ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 255, 0, 0.2)"}; display: block;`);
})();
