let failures = 0;

function expect(desc) {
	// Okay... so I don't exactly like this...
	// But I don't think there's a better alternative
	// that is nearly as clean or convenient.
	let val = eval(desc);
	let retVal = {}
	const t = "";
	const c = "color: black; background: #C0C0C0;";
	retVal.toExist = function() {
		if(val === undefined) {
			failures++;
			console.error(
				`%cUNIT TEST FAILED: expected %c${desc}%c to exist\n`,
				t, c, t,
				{
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
				`%cUNIT TEST FAILED: expected %c${desc}%c to be %c${expected}%c, not %c${val}%c\n`,
				t, c, t, c, t, c, t,
				{
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
					`%cUNIT TEST FAILED: expected %c${desc}%c to be a %c${expected}%c, not a %c${typeof val}%c\n`,
					t, c, t, c, t, c, t,
					{
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
					`%cUNIT TEST FAILED: expected %c${desc}%c to be an instance of %c${expected}%c\n`,
					t, c, t, c, t,
					{
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
				`%cUNIT TEST FAILED: expected %c${desc}%c to be in%c`, t, c, t, c,
				expected,
				`\n`,
				{
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
				`%cUNIT TEST FAILED: expected %c${desc}%c to pass %c${expected}%c`,
				t, c, t, c, t,
				{
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

console.log("%cBeginning unit test...", "font-size: 24px;");

/*****************************\
 *                           *
 *   UNIT TESTS START HERE   *
 *                           *
\*****************************/

// Just a test. All of these should pass
expect(`"test"`)
	.toExist()
	.toBe("test")
	.toBeA("string")
	.toBeIn(["hi", "foo", 5, "test", true])
	.toPass(arg => arg.length === 4);

// Ice
expect("ice")
	.toExist()
	.toBeAn("object");

// Meta
expect("ice.meta")
	.toExist()
	.toBeAn("object");
expect("ice.meta.version")
	.toExist()
	.toBeA("string");
expect("ice.meta.author")
	.toExist()
	.toBeAn("object");
expect("ice.meta.author.name")
	.toExist()
	.toBeA("string");
expect("ice.meta.author.email")
	.toExist()
	.toBeA("string");
expect("ice.meta.author.github")
	.toExist()
	.toBeA("string");

// Debug
expect("ice.debug")
	.toExist()
	.toBeAn("object");
expect("ice.debug.Style")
	.toExist()
	.toBeA("function");
expect("ice.debug.styles")
	.toExist()
	.toBeAn("object");
expect("ice.debug.styles.BOLD")
	.toExist()
	.toBeAn(ice.debug.Style);
expect("ice.debug.styles.BOLD.toString()")
	.toExist()
	.toBeA("string");
expect("ice.debug.log")
	.toExist()
	.toBeA("function");
expect("ice.debug.info")
	.toExist()
	.toBeA("function");
expect("ice.debug.warn")
	.toExist()
	.toBeA("function");
expect("ice.debug.err")
	.toExist()
	.toBeA("function");
expect("ice.debug.aval")
	.toExist()
	.toBeA("function");
expect(`ice.debug.aval("2 + 2")`)
	.toExist()
	.toBeA(Promise);
expect("ice.debug.testFunction")
	.toExist()
	.toBeA("function");
expect("ice.debug.summonDebugDoug")
	.toExist()
	.toBeA("function");

// Dom
expect("ice.dom")
	.toExist()
	.toBeAn("object");

/***************************\
 *                         *
 *   UNIT TESTS END HERE   *
 *                         *
\***************************/

if(failures === 0) {
	console.log(`%cAll unit tests ran and passed!`, "font-size: 24px; color: #00FF00;");
}
else {
	console.error(`%cUnit tests ran with ${failures} failure${failures > 1 ? "s" : ""}!`, "font-size: 24px;");
}