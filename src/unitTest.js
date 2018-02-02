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
})();
