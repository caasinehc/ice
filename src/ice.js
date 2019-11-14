/*
 * ice.js
 * v2.0.5
 * By Isaac Chen
 * Last Updated: 11/8/2019
 */
/*
 * TODO:
 *    • Sweep through and make sure whitespace/formatting is nice and consistent (prob spaces instead of tabs 
 *      and lines over 80 chars from chromebook editing)
 *    • Vibrations
 */

let ice = (function() {
	
	let version = "v2.0.5";
	let ice = {};
	let basics = (function() {
		// This really doesn't have to be wrapped in an IIFE, but it allows it to
		// be collapsed in an IDE.
		let basics = {};
		//     PI     ≈ 3.14159265358979323846. https://en.wikipedia.org/wiki/Pi
		basics.PI     = 3.141592653589793;
		//     TAU    ≈ 6.28318530717958647693. https://en.wikipedia.org/wiki/Turn_(geometry)#Tau_proposals
		basics.TAU    = 6.283185307179586;
		//     E      ≈ 2.71828182845904523536. https://en.wikipedia.org/wiki/E_(mathematical_constant)
		basics.E      = 2.718281828459045;
		//     SQRT2  ≈ 1.41421356237309504880. https://en.wikipedia.org/wiki/Square_root_of_2
		basics.SQRT2  = 1.4142135623730951;
		basics.random = Math.random;
		basics.abs    = Math.abs;
		basics.sign   = Math.sign;
		basics.min    = Math.min;
		basics.max    = Math.max;
		basics.round  = Math.round;
		basics.floor  = Math.floor;
		basics.ceil   = Math.ceil;
		basics.sqrt   = Math.sqrt;
		basics.cbrt   = Math.cbrt
		basics.log    = Math.log;
		basics.pow    = Math.pow;
		basics.sin    = Math.sin;
		basics.cos    = Math.cos;
		basics.tan    = Math.tan;
		basics.asin   = Math.asin;
		basics.acos   = Math.acos;
		basics.atan   = Math.atan;
		basics.deg    = function(rad) {return rad * 180 / PI;}
		basics.rad    = function(deg) {return deg * PI / 180;}
		basics.clamp  = function(n, min, max) {
			if(max === undefined) return n > min ? min : n;
			if(min > max) {
				let temp = min;
				min = max;
				max = temp;
			}
			if(n < min) return min;
			if(n > max) return max;
			return n;
		}
		return basics;
	})();
	
	function logImport(module) {
		console.log(`%cice.${module} imported successfully.`, "color: #008000;");
	}
	
	console.log(
		`%c---------- Importing ice.js ${version} ----------`,
		"font-weight: bold; font-size: 24px;"
	);
	
	/*
	 * [Module name]  example
	 * [Version]      v1.0.0
	 * [Dependencies] none.
	 * [Level]        0
	 * [Description]  An example module. Not actually useful. It is meant to
	 *     serve as a template for creating more modules. The rest of this text
	 *     is not important to anything. It is to illustrate the formatting for
	 *     longer descriptions.
	 * [TODO]
	 *     • None
	 */
	/*
	ice.example = (function() {
		let example = {};
		
		// Private constructors
		// No template to save space. Just imagine it here :)

		// Private properties
		let privateVariable = "Only visible in the scope of module";
		
		// Private methods
		function myPrivateMethod(a, b) {
			return a + b;
		}
		
		// Constructors
		example.Person = function(
			// Parameters and their defaults
			name = "default",
			age = 0
		) {
			// Allows omitting the "new" keyword
			if(new.target === undefined) {
				return new ice.example.Person(name, age);
			}
			
			// Private variables
			let secrets = ["Nobody but me can see this"];
			
			// Private functions
			function mySecretFunction() {
				return "Shhh!";
			}
			
			// Properties
			this.name = name;
			this.age  = age; // Whatever they pass as "age", or default to 0
			
			// Methods
			this.greet = function() {
				console.log(`Hello, my name is ${this.name}, and I am ${this.age} years old.`);
			}
			
			this.getSecrets = function() {
				return secrets;
			}
			
			this.setSecrets = function(_secrets) {
				secrets = _secrets;
			}
		}
		
		example.Person.prototype.clone = function() {
			let clone = new this.constructor(this.name, this.age);
			clone.setSecrets(this.getSecrets());
			return clone;
		}
		
		// Properties
		example.MY_CONSTANT = "THIS IS MY CONSTANT"; // Not enforced constant
		
		// Methods
		// Recieves {a} and {b}, and returns the sum
		example.myMethod = function(a, b) {
			return a + b;
		}
		
		// Finalization
		
		logImport("example");
		return example;
	})();
	*/
	
	/*
	 * [Module name]  meta
	 * [Version]	  v1.0.0
	 * [Dependencies] none.
	 * [Level]        0
	 * [Description]  Contains meta information about the ice library
	 * [TODO]
	 *     • None
	 */
	ice.meta = (function() {
		let meta = {};
		
		// Properties
		meta.version = version;
		meta.author = {
			"name": "Isaac J. Chen",
			"email": "isaacjchen1@gmail.com",
			"github": "https://github.com/caasinehc"
		};
		// For the ice framework
		meta.framework = {
			initialized: false
		};

		return meta;
	})();
	
	/*
	 * [Module name]  debug
	 * [Version]	  v1.0.0
	 * [Dependencies] none.
	 * [Level]        1
	 * [Description]  A modules to assist with debugging. It can test
	 *     functions, make custom console logs with pretty colors or
	 *     images, and even summon the man himself, Debug Doug.
	 * [TODO]
	 *     • Log images
	 *     • Log bars
	 *     • Expect (unit testing)
	 */
	ice.debug = (function() {
		let debug = {};
		
		// Constructors
		debug.Style = function(
			// Parameters and their defaults
			/* settings template:
			{
				font         : "monospace", // The "font family"
				size         : "12px",      // can also be in em or %
				color        : "#000000",   // can also be "black" or "rgb(0, 0, 0)"
				background   : "#00000000", // can also be "transparent" or "rgba(0, 0, 0, 0)"
				padding      : "0px",       // can also be in em or %. Supports NESW custom sides
				bold         : false,       // True or false
				italic       : false,       // True or false
				underline    : false,       // True or false
				overline     : false,       // True or false
				strike       : false,       // True or false
				line_style   : "solid",     // Many options. see https://www.w3schools.com/cssref/pr_border-style.asp
				line_color   : "#000000",   // can also be "black" or "rgb(0, 0, 0)"
				border       : false,       // True or false
				border_style : "solid",     // Many options. see https://www.w3schools.com/css/css_border.asp. Supports NESW custom sides
				border_color : "#000000",   // can also be "black" or "rgb(0, 0, 0)". Supports NESW custom sides
				border_width : "medium",    // can be "thin", "medium", "thick", or in px or em. Supports NESW custom sides
				border_radius: "0px",       // can also be in em or %. Supports NESW custom sides
			};
			*/
			settings = {}
		) {
			// Allows omitting the "new" keyword
			if(new.target === undefined) {
				return new ice.debug.Style(settings);
			}
			
			// Properties
			this.font          = settings.font;
			this.size          = settings.size;
			this.color         = settings.color;
			this.background    = settings.background;
			this.padding       = settings.padding;
			this.bold          = settings.bold;
			this.italic        = settings.italic;
			this.underline     = settings.underline;
			this.overline      = settings.overline;
			this.strike        = settings.strike;
			this.line_style    = settings.line_style;
			this.line_color    = settings.line_color;
			this.border        = settings.border;
			this.border_style  = settings.border_style;
			this.border_color  = settings.border_color;
			this.border_width  = settings.border_width;
			this.border_radius = settings.border_radius;
			this.css = "";
			if(this.font       !== undefined) this.css += `font-family: ${this.font};\n`;
			if(this.size       !== undefined) this.css += `font-size: ${this.size};\n`;
			if(this.color      !== undefined) this.css += `color: ${this.color};\n`;
			if(this.background !== undefined) this.css += `background: ${this.background};\n`;
			if(this.padding    !== undefined) this.css += `padding: ${this.padding};\n`;
			if(this.bold)                     this.css += "font-weight: bold;\n";
			if(this.italic)                   this.css += "font-style: italic;\n";
			if(this.underline || this.overline || this.strike) {
				let textDecoration = "";
				if(this.underline) textDecoration += " underline";
				if(this.overline)  textDecoration += " overline";
				if(this.strike)    textDecoration += " line-through";
				if(this.line_style !== undefined) textDecoration += ` ${this.line_style}`;
				if(this.line_color !== undefined) textDecoration += ` ${this.line_color}`;
				this.css += `text-decoration:${textDecoration};\n`;
			}
			if(this.border) {
				this.css += `border-style: ${this.border_style || "solid"};\n`;
				if(this.border_color  !== undefined) this.css += `border-color: ${this.border_color};\n`;
				if(this.border_width  !== undefined) this.css += `border-width: ${this.border_width};\n`;
				if(this.border_radius !== undefined) this.css += `border-radius: ${this.border_radius};\n`;
			}
			this.css = this.css.slice(0, -1);
			
			// Methods
			this.toString = function() {
				return this.css;
			}
		}
		
		// Properties
		debug.styles = {};
		debug.styles.LARGE      = new debug.Style({size: "4em"});
		debug.styles.SMALL      = new debug.Style({size: "0.8em"});
		debug.styles.BOLD       = new debug.Style({bold: true});
		debug.styles.ITALIC     = new debug.Style({italic: true});
		debug.styles.UNDERLINED = new debug.Style({underline: true});
		debug.styles.OVERLINED  = new debug.Style({overline: true});
		debug.styles.STRIKED    = new debug.Style({strike: true});
		debug.styles.SPELLCHECK = new debug.Style({
			underline:  true,
			line_style: "wavy",
			line_color: "red"
		});
		
		// Methods
		// Similar to console.log, but allows for custom styles
		debug.log = function(text, style) {
			if(style === undefined) console.log(text);
			else {
				if(!(style instanceof debug.Style)) style = new debug.Style(style);
				console.log("%c" + text, style.toString());
			}
		}
		// Similar to console.info, but allows for custom styles
		debug.info = function(text, style) {
			if(style === undefined) console.info(text);
			else {
				if(!(style instanceof debug.Style)) style = new debug.Style(style);
				console.info("%c" + text, style.toString());
			}
		}
		// Similar to console.warn, but allows for custom styles
		debug.warn = function(text, style) {
			if(style === undefined) console.warn(text);
			else {
				if(!(style instanceof debug.Style)) style = new debug.Style(style);
				console.warn("%c" + text, style.toString());
			}
		}
		// Similar to console.error, but allows for custom styles
		debug.err = function(text, style) {
			if(style === undefined) console.error(text);
			else {
				if(!(style instanceof debug.Style)) style = new debug.Style(style);
				console.error("%c" + text, style.toString());
			}
		}
		
		// Acts like an asynchronous eval using webworkers. Returns a promise
		debug.aval = function(code, abortTime = 60) {
			return new Promise(function(resolve, reject) {
				if(typeof code === "string") code = `(function() {${code}})`;

				let blob = new Blob([`onmessage = function() {postMessage(${code}());}`]);
				let objectURL = URL.createObjectURL(blob);
				let worker = new Worker(objectURL);
				URL.revokeObjectURL(objectURL);
				let timer = setTimeout(function() {
					worker.terminate();
					reject("Abort time reached! Aborting...");
				}, abortTime * 1000);

				worker.onmessage = e => {
					clearTimeout(timer);
					worker.terminate();
					resolve(e.data);
				}
				worker.onerror = e => {
					clearTimeout(timer);
					worker.terminate();
					reject(e.message);
				}
				worker.postMessage("START");
			});
		}
		
		// Runs a function {sampleSize} times, collecting information about
		// the outputs. When complete (or aborted), it logs and returns info
		// about the function. Abort time is in seconds
		debug.testFunction = function(func, sampleSize, args, abortTime = 60) {
			// Stores results
			let results = {};
			// Stores information about results
			let min, max;
			let resultsText = {};
			let totalResults = 0;
			let totalUniqueResults = 0;
			let percent = basics.floor(sampleSize / 100);
			let clearString = Array(100).join("\n");
			let runtime = 0;
			console.clear();
			let before = performance.now();
			// Calls the function {sampleSize} times, tracking the results
			for(let i = 0; i < sampleSize; i++) {
				// Call the function with the given arguments
				let result = func.apply(null, args);
				// If we haven't gotten that result yet, remember we got it once
				if(results[result] === undefined) results[result] = 1;
				else results[result]++;
				totalResults++;
				// If we are n% done (n is every integer)
				if(i % percent === 0) {
					let perc = i / percent;
					// Check if we are past emergency abort time, and break
					if(performance.now() - before > abortTime * 1000) break;
					// Update information in the console
					console.log(clearString);
					console.log(
						`%cTest progress: %c${perc}%`,
						"font-size: 36px; color: #808080",
						"font-size: 36px; font-weight: bold"
					);
					console.log("%c ",
						  `background: linear-gradient(to right, black ${perc}%, rgba(0, 0, 0, 0.5) ${perc}%);`
						+ "padding: 0px 50%;"
						+ "border: 2px solid black;"
					);
				}
			}
			let after = performance.now();
			console.clear();
			
			// loops through results, noting important values and adding percentage information
			for(let key in results) {
				let keyResults = results[key];
				if(min === undefined)		  min = max = key;
				if(keyResults < results[min]) min = key;
				if(keyResults > results[max]) max = key;
				resultsText[key] = `${keyResults} (${((keyResults / sampleSize) * 100).toFixed(2)})%`;
			}
			
			totalUniqueResults = Object.keys(results).length;
			let totalSeconds = (after - before) / 1000;
			let totalTime = "";
			if(totalSeconds >= 60) totalTime += basics.floor(totalSeconds / 60) + " Minutes";
			totalTime += totalSeconds.toFixed(4) % 60 + " Seconds";
			
			// The information to be returned
			let summary = {
				"Function tested": func.toString(),
				"Target sample size": sampleSize,
				"Actual sample size": totalResults,
				"Total unique results": totalUniqueResults,
				"Total time": totalTime,
				// Interesting facts from wikipedia:
				// 1 nanosecond is one billionth of a second, or 0.000000001 seconds
				// 0.33 nanoseconds – The time it takes a common 3.0 GHz CPU to complete a processing cycle
				// ~1.02 nanoseconds - The time it takes light to travel a foot!
				// 1 million nanoseconds - The duration of a camera flash.
				// 350 million nanoseconds - The average human eye blink
				"Average time": (1000000 * (after - before) / totalResults).toFixed(4) + " nanoseconds",
				"Expected frequency (assuming even distribution)": basics.round((totalResults / totalUniqueResults)) + "(" + (100 / totalUniqueResults).toFixed(2) + "%)",
				"Most common": max + ", occuring a whopping " + results[max] + " times (" + ((results[max] / totalResults) * 100).toFixed(2) + "%)",
				"Least common": min + ", occuring only " + results[min] + " times (" + ((results[min] / totalResults) * 100).toFixed(2) + "%)"
			}
			console.table(summary);
			console.groupCollapsed("Results");
			console.table(resultsText);
			console.groupEnd();
			summary["Results"] = resultsText;
			return summary;
		}
		
		debug.summonDebugDoug = function() {
			let debugDougWindow = window.open("", "debugdoug", "width=405 height=380");
			debugDougWindow.document.write("<title>Debug Doug</title>");
			debugDougWindow.document.write(
			"<pre>" +
			"/* * * * * * * * * * * * * * * * * * * * * * * * * * *\\" + "<br />" +
			" *                                                   *" + "<br />" +
			" *  ___      _                ___                _   *" + "<br />" +
			" * |   \\ ___| |__ _  _ __ _  |   \\ ___ _  _ __ _(_)  *" + "<br />" +
			" * | |) / -_| '_ | || / _` | | |) / _ | || / _` |_   *" + "<br />" +
			" * |___/\\___|_.__/\\_,_\\__, | |___/\\___/\\_,_\\__, (_)  *" + "<br />" +
			" *                    |___/                |___/     *" + "<br />" +
			" *                                                   *" + "<br />" +
			" *                                                   *" + "<br />" +
			" *                           ..---..                 *" + "<br />" +
			" *                         .`    _  '.               *" + "<br />" +
			" *                         :    (o)  '..___          *" + "<br />" +
			" *                         ;          __..'          *" + "<br />" +
			" *                          \\       .`               *" + "<br />" +
			" *                ___...---..`      ;                *" + "<br />" +
			" *       ('-. .-~`                   '.              *" + "<br />" +
			" *        '._ '                 ;      '.            *" + "<br />" +
			" *          :       ;       ,,,;:       :            *" + "<br />" +
			" *~~~~~~~~~~'        \"\"\"\"\"\"\"'           /~~~~~~~~~~~~*" + "<br />" +
			" * ~~~       ;                         +   ~~~     ~~*" + "<br />" +
			" *      ~~    \'._                   _.`     ~~~      *" + "<br />" +
			" *  ~~~     ~    \'~---...___....--~`   ~~~           *" + "<br />" +
			" *                                               ~~  *" + "<br />" +
			"\\* * * * * * * * * * * * * * * * * * * * * * * * * * */" +
			"</pre>"
		);
			debugDougWindow.document.write(
				"<style>" +
				"pre {" +
				"position: absolute;" +
				"top: 0;" +
				"left: 0;" +
				"word-wrap: normal;" +
				"white-space: pre-wrap;" +
				"width: 400;" +
				"height: 350;" +
				"}" +
				"</style>"
			);
			debugDougWindow.document.write(
				"<script>" +
				"window.onclick = function() {" +
				"window.resizeTo(421, 446);" +
				"}" +
				"</script>"
			);
		}
		
		logImport("debug");
		return debug;
	})();
	
	/*
	 * [Module name]  crypto
	 * [Version]      v1.0.0
	 * [Dependencies] none.
	 * [Level]        1
	 * [Description]  Cryptographic stuff. While I did try my best, this is
	 *     ***ABSOLUTELY NOT*** a cryptographically secure library. ***DO NOT***
	 *     use this for ANYTHING serious like password storage.
	 * [TODO]
	 *     • None
	 */
	ice.crypto = (function() {
		let crypto = {};
		
		// Methods
		// Secure Hash Algorithm 256
		crypto.sha256 = function(ascii, binary = false) {
			function rightRotate(value, amount) {
				return (value >>> amount) | (value << (32 - amount));
			}
			
			let maxWord = 2 ** 32;
			let result = "";

			let words = [];
			let asciiBitLength = ascii.length * 8;
			
			let hash = [];
			let k = [];
			let primeCounter = 0;

			let isComposite = {};
			for(let candidate = 2; primeCounter < 64; candidate++) {
				if(!isComposite[candidate]) {
					for(let i = 0; i < 313; i += candidate) {
						isComposite[i] = candidate;
					}
					hash[primeCounter] = (basics.sqrt(candidate) * maxWord) | 0;
					k   [primeCounter] = (basics.cbrt(candidate) * maxWord) | 0;
					primeCounter++;
				}
			}

			ascii += "\x80";
			while(ascii.length % 64 - 56) ascii += "\x00";
			for(let i = 0; i < ascii.length; i++) {
				let j = ascii.charCodeAt(i);
				if(j >> 8) return;
				words[i >> 2] |= j << ((3 - i) % 4) * 8;
			}
			words[words.length] = ((asciiBitLength / maxWord) | 0);
			words[words.length] = (asciiBitLength);

			for(let j = 0; j < words.length;) {
				let w = words.slice(j, j += 16);
				let oldHash = hash;

				hash = hash.slice(0, 8);
				
				for(let i = 0; i < 64; i++) {
					let i2 = i + j;

					let w15 = w[i - 15];
					let w2  = w[i - 2];

					let a = hash[0];
					let e = hash[4];
					let temp1 = (
						hash[7] +
						(rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
						((e & hash[5]) ^ ((~e) & hash[6])) +
						k[i] + (
							w[i] = (i < 16) ? w[i] : (
								w[i - 16] +
								(rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
								w[i - 7] +
								(rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
							) | 0
						)
					);

					let temp2 = (
						(rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
						((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]))
					);
					
					hash = [(temp1 + temp2) | 0].concat(hash);
					hash[4] = (hash[4] + temp1) | 0;
				}
				
				for(let i = 0; i < 8; i++) {
					hash[i] = (hash[i] + oldHash[i]) | 0;
				}
			}
			
			for(let i = 0; i < 8; i++) {
				for(let j = 3; j + 1; j--) {
					let b = (hash[i] >> (j * 8)) & 255;
					result += ((b < 16) ? 0 : "") + b.toString(16);
				}
			}

			if(binary) {
				result = result.split("").map(char => {
					bin = parseInt(char, 16).toString(2);
					paddedBin = "0".repeat(4 - bin.length) + bin;
					return paddedBin;
				}).join("");
			}
			return result;
		}
		
		logImport("crypto");
		return crypto;
	})();
	
	/*
	 * [Module name]  math
	 * [Version]      v1.0.2
	 * [Dependencies] none.
	 * [Level]        1
	 * [Description]  Everything math. It's got the basics, like PI, sin(), and
	 *     random(), as well as more advanced stuff like perlin noise.
	 * [TODO]
	 *     • None
	 */
	ice.math = (function() {
		let math = {};
		
		// Private methods
		var clz32 = Math.clz32;
		
		// Constructors
		math.PerlinNoiseMono = function() {
			// Big thanks to Flafla2 for writing this incredibly helpful post on Perlin Noise!
			// https://flafla2.github.io/2014/08/09/perlinnoise.html
			let tile = 0;
			let p = [...Array(256)].map(() => basics.floor(basics.random() * 256));
			for(let i = 0; i < 256; i++) p[i + 256] = (p[i]);
			
			function fade(t) {return t * t * t * (t * (t * 6 - 15) + 10);}
			function lerp(n, a, b) {return a + n * (b - a);}
			function grad(hash, x, y, z) {
				switch(hash & 0xF) {
					case 0x0: return  x + y;
					case 0x1: return -x + y;
					case 0x2: return  x - y;
					case 0x3: return -x - y;
					case 0x4: return  x + z;
					case 0x5: return -x + z;
					case 0x6: return  x - z;
					case 0x7: return -x - z;
					case 0x8: return  y + z;
					case 0x9: return -y + z;
					case 0xA: return  y - z;
					case 0xB: return -y - z;
					case 0xC: return  y + x;
					case 0xD: return -y + z;
					case 0xE: return  y - x;
					case 0xF: return -y - z;
				}
			}
			
			this.noise = function(x = 0, y = 0, z = 0) {
				let xi = basics.floor(x) % 256;
				let yi = basics.floor(y) % 256;
				let zi = basics.floor(z) % 256;
				let xf = x % 1;
				let yf = y % 1;
				let zf = z % 1;
				let u = fade(xf);
				let v = fade(yf);
				let w = fade(zf);
				
				let aaa = p[p[p[xi    ] + yi    ] + zi    ];
				let aab = p[p[p[xi    ] + yi    ] + zi + 1];
				let aba = p[p[p[xi    ] + yi + 1] + zi    ];
				let abb = p[p[p[xi    ] + yi + 1] + zi + 1];
				let baa = p[p[p[xi + 1] + yi    ] + zi    ];
				let bab = p[p[p[xi + 1] + yi    ] + zi + 1];
				let bba = p[p[p[xi + 1] + yi + 1] + zi    ];
				let bbb = p[p[p[xi + 1] + yi + 1] + zi + 1];
				
				let x1, y1, x2, y2;
				x1 = lerp(u, grad(aaa, xf, yf,     zf),     grad(baa, xf - 1, yf,     zf));
				x2 = lerp(u, grad(aba, xf, yf - 1, zf),     grad(bba, xf - 1, yf - 1, zf));
				y1 = lerp(v, x1, x2);
				x1 = lerp(u, grad(aab, xf, yf,     zf - 1), grad(bab, xf - 1, yf,     zf - 1));
				x2 = lerp(u, grad(abb, xf, yf - 1, zf - 1), grad(bbb, xf - 1, yf - 1, zf - 1));
				y2 = lerp(v, x1, x2);
				
				return(lerp(w, y1, y2) + 1) / 2;
			}
		}
		math.PerlinNoise = function(octaves = 8, falloff = 2) {
			// Allows omitting the "new" keyword
			if(new.target === undefined) {
				return new ice.math.PerlinNoise(octaves, falloff);
			}
			
			// Private variables
			let octaveList = [];
			let maxNoise = 0;
			for(let i = 0; i < octaves; i++) {
				octaveList.push(new math.PerlinNoiseMono());
				maxNoise += 1 / (falloff ** i);
			}
			
			// Methods
			this.noise = function(x = 0, y = 0, z = 0) {
				let noise = 0;
				
				for(let i = 0; i < octaves; i++) {
					let scale = falloff ** i;
					noise += octaveList[i].noise(x * scale, y * scale, z * scale) / scale;
				}
				
				return noise / maxNoise;
			}
		}
		
		// Properties
		math.PI    = basics.PI;
		math.TAU   = basics.TAU;
		math.E     = basics.E;
		math.PHI   = (1 + basics.sqrt(5)) / 2;
		math.SQRT2 = basics.SQRT2;
		
		// Methods
		// Translates radians to degrees
		math.deg = function(rad) {
			return basics.deg(rad);
		}
		
		// Translates degrees to radians
		math.rad = function(deg) {
			return basics.rad(deg);
		}
		
		// Returns a random int in the interval [min, max]
		math.randomInt = function(min, max) {
			if(max === undefined) {
				max = (min === undefined) ? 1 : min;
				min = 0;
			}
			let minInt = basics.ceil (min);
			let maxInt = basics.floor(max);
			return basics.floor(basics.random() * (maxInt - minInt + 1) + minInt);
		}
		
		// Returns a random float in the interval [min, max)
		math.randomFloat = function(min, max) {
			if(max === undefined) {
				max = (min === undefined) ? 1 : min;
				min = 0;
			}
			return basics.random() * (max - min) + min;
		}
		
		// Returns a random element from an array or character from a string
		math.randomFrom = function(input) {
			if(typeof input === "string") input = input.split("");
			return input[basics.floor(basics.random() * input.length)];
		}
		
		// Acts like randomFrom if given a string or array, but randomFloat
		// otherwise. Useful as a generic "random" function.
		// NOTE: This does not work on anything other than normal arrays.
		// instances of Uint8Array, for graphics, will not work. In these cases,
		// use randomFrom.
		math.random = function(arg1, arg2) {
			// if we should replicate randomFrom
			if(typeof arg1 === "string") {
				return arg1.split("")[basics.floor(basics.random() * arg1.length)];
			}
			else if(arg1 instanceof Array) {
				return arg1[basics.floor(basics.random() * arg1.length)];
			}
			// if we should replicate randomFloat
			else {
				if(arg2 === undefined) {
					arg2 = (arg1 === undefined) ? 1 : arg1;
					arg1 = 0;
				}
				return basics.random() * (arg2 - arg1) + arg1;
			}
		}
		
		// Returns a random number from a gaussian (normal) distribution, with
		// a given mean and standard deviation.
		math.randomGaussian = (function() {
			let haveExtra = false;
			let extra = null;
			return function(mean = 0, standardDeviation = 1) {
				if(haveExtra) {
					haveExtra = false;
					return extra * standardDeviation + mean;
				}
				let u, v, s;
				do {
					u = 2 * basics.random() - 1;
					v = 2 * basics.random() - 1;
					s = u * u + v * v;
				} while (s >= 1 || s === 0);
				let mul = basics.sqrt(-2 * basics.log(s) / s);
				extra = v * mul;
				haveExtra = true;
				return u * mul * standardDeviation + mean;
			}
		})();
		
		// Returns true {chance} out of 1 times. Examples:
		// chance <= 0	   : never returns true
		// chance = 0.50, 1/2: returns true 50%, or 1/2 the time
		// chance = 0.75, 3/4: returns true 75%, or 3/4 the time
		// chance >= 1	   : always returns true
		math.chance = function(chance) {
			return basics.random() < chance;
		}
		
		// Returns true 50% of the time (like flipping a coin). Can also be
		// thought of as returning a random boolean.
		math.coinFlip = function() {
			return basics.random() < 0.5;
		}
		
		// Returns the length of the hypotenuse from two side lengths
		// a² + b² = c² -> c = √(a² + b²)
		math.pythag = function(a, b) {
			return basics.sqrt(a * a + b * b);
		}
		
		// Returns the length of the hypotenuse squared from two side lengths
		// a² + b² = c² -> c² = a² + b²
		math.pythagSq = function(a, b) {
			return a * a + b * b;
		}
		
		// Returns the distance between two points
		math.dist = function(x1, y1, x2 = 0, y2 = 0) {
			let dx = x1 - x2;
			let dy = y1 - y2;
			return basics.sqrt(dx * dx + dy * dy);
		}
		
		// Returns the square of the distance between two points
		math.distSq = function(x1, y1, x2 = 0, y2 = 0) {
			let dx = x1 - x2;
			let dy = y1 - y2;
			return dx * dx + dy * dy;
		}
		
		// Maps a number linearly from one range to another range
		math.map = function(n, oldMin, oldMax, newMin, newMax, clamp) {
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
			let mapped = (n - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
			if(clamp) mapped = basics.clamp(mapped, newMin, newMax);
			return mapped;
		}
		
		// Returns whether or not a number is prime (negatives, 0, 1,
		// non-integers, and Infinity are not considered prime)
		math.isPrime = function(n) {
			if(n <= 1 || n % 1 > 0 || !isFinite(n)) return false;
			if(n % 2 === 0) return n === 2;
			if(n % 3 === 0) return n === 3;
			for(let i = 5, sqrt = basics.sqrt(n); i <= sqrt; i += 6) {
				if(n % i === 0 || n % (i + 2) === 0) return false;
			}
			return true;
		}
		
		// Returns all positive integers which n is divisible by
		math.factors = function(n) {
			let isEven = n % 2 === 0;
			let inc = isEven ? 1 : 2;
			let factors = [1, n];

			for(let curFactor = isEven ? 2 : 3, sqrtN = basics.sqrt(n); curFactor <= sqrtN; curFactor += inc) {
				if(n % curFactor !== 0) continue;
				factors.push(curFactor);
				let compliment = n / curFactor;
				if(compliment !== curFactor) factors.push(compliment);
			}

			return factors.sort((a, b) => a - b);
		}
		
		// Returns the greatest common divisor (aka gcd or gcf) of a and b
		// TODO make it work with more than 2 numbers
		math.gcd = function(a, b) {
			a = basics.abs(a);
			b = basics.abs(b);
			if(b > a) {
				let temp = a;
				a = b;
				b = temp;
			}
			
			while(true) {
				if(b === 0) return a;
				a %= b;
				if(a === 0) return b;
				b %= a;
			}
		}
		
		// Returns the least common multiple (aka lcm) of a and b
		// TODO make it work with more than 2 numbers
		math.lcm = function(a, b) {
			return basics.abs(a * b) / math.gcd(a, b);
		}
		
		// Returns the nth fibonacci number. The nth fibonacci number is defined
		// as the sum of the two fibonacci numbers before it, with fibonacci(0)
		// defined as 0 and fibonacci (1) defined as 1.
		math.fibonacci = (function() {
			let memory = [0, 1];
			function fibonacci(n) {
				if(memory[n] !== undefined) return memory[n];
				return memory[n] = fibonacci(n - 1) + fibonacci(n - 2);
			}
			return function(n) {
				n = basics.min(basics.floor(n), 1477);
				return fibonacci(n);
			}
		})();
		
		// Returns a number restricted to a given range
		math.clamp = function(x, min, max) {
			return basics.clamp(x, min, max);
		}
		
		// Returns a string representing the number in binary form
		math.binary = function(x, pad = false) {
			let padding = pad ? "0".repeat(clz32(x)) : "";
			return padding + (x >>> 0).toString(2);
		}
		
		// The sigmoid function (https://en.wikipedia.org/wiki/Sigmoid_function)
		math.sigmoid = function(x) {
			return 1 / (1 + E ** -x);
		}
		
		// Math synonyms
		// Misc math functions
		math.abs = basics.abs;
		math.sign = basics.sign;
		math.min = basics.min;
		math.max = basics.max;
		// Rounding functions
		math.round = basics.round;
		math.floor = basics.floor;
		math.ceil = basics.ceil;
		math.trunc = Math.trunc;
		// Exponential functions
		math.sqrt = basics.sqrt;
		math.cbrt = basics.cbrt;
		math.log = basics.log;
		math.log2 = Math.log2;
		math.log10 = Math.log10;
		math.exp = Math.exp;
		math.pow = basics.pow;
		// Floating point functions
		math.fround = Math.fround;
		math.clz32 = Math.clz32;
		// Circle trig functions
		math.sin = basics.sin;
		math.cos = basics.cos;
		math.tan = basics.tan;
		// Inverse circle trig functions
		math.asin  = basics.asin;
		math.acos  = basics.acos;
		math.atan  = basics.atan;
		math.atan2 = Math.atan2;
		// Hyperbolic trig functions
		math.sinh = Math.sinh;
		math.cosh = Math.cosh;
		math.tanh = Math.tanh;
		// Inverse hyperbolic trig functions
		math.asinh = Math.asinh;
		math.acosh = Math.acosh;
		math.atanh = Math.atanh;
		
		logImport("math");
		return math;
	})();
	
	/*
	 * [Module name]  time
	 * [Version]	  v1.0.2
	 * [Dependencies] none.
	 * [Level]        1
	 * [Description]  This module handles timing, with everything from timed
	 *     loops, to time translation, to a really stupid and janky wait
	 *     function that you should ***NEVER EVER USE UNDER ANY CIRCUMSTANCE***
	 * [TODO]
	 *     • Time translation
	 now
	 */
	ice.time = (function() {
		let time = {};
		
		// Constructors
		time.Clock = function(tickRate = 60) {
			// Allows omitting the "new" keyword
			if(new.target === undefined) {
				return new ice.time.Clock(tickRate);
			}
			
			// Private variables
			let interval;
			let ticking = false;
			let then = performance.now();
			
			const MAX_DELTA = 5;
			const TPS_HIST_SIZE = 6;
			let tpsHist = [];
			let currTps = 0;
			let tps = 0;
			
			// Private functions
			// Handles tracking the tps
			function tpsTracker(dt) {
				let thisTps = 1000 / dt;
				let delta = basics.clamp(thisTps - currTps, -MAX_DELTA, MAX_DELTA);
				currTps += delta;
				tpsHist.unshift(currTps);
				if(tpsHist.length > TPS_HIST_SIZE) tpsHist.pop();
				
				tps = 0;
				for(let i = 0; i < tpsHist.length; i++) {
					tps += tpsHist[i];
				}
				tps /= tpsHist.length;
			}
			
			// The actual tick function, which tracks information and calls the
			// user-defined this.tick function. Has to be arrow notation because
			// of scope issues.
			let tick = () => {
				if(ticking) {
					let now = performance.now();
					let dt = now - then;
					then = now;
					tpsTracker(dt);
					this.tick(dt);
				}
			}
			
			// Properties
			this.status = this.statuses.NOT_STARTED;
			
			// Methods
			// Starts clock (technically the same as resume)
			this.start = () => {
				ticking = true;
				this.status = this.statuses.TICKING;
			}
			// Pauses clock
			this.pause = () => {
				ticking = false;
				this.status = this.statuses.PAUSED;
			}
			// Resumes clock
			this.resume = () => {
				ticking = true;
				this.status = this.statuses.TICKING;
			}
			// Sets the tick rate of the clock
			this.tickRate = function(newTickRate) {
				if(newTickRate === undefined) {
					return tickRate;
				}
				tickRate = newTickRate;
				clearInterval(interval);
				interval = setInterval(tick, 1000 / tickRate);
			}
			// Gets the tps (smoothed)
			this.getTps = function() {
				return tps;
			}
			// Gets the raw tps (unsmoothed);
			this.getRawTps = function() {
				return tpsHist[0];
			}
			// The function that gets called every tick. Redefined by the programmer
			this.tick = function(dt) {
				// This is what the programmer gets to define
			}
			// Terminates the clock properly.
			this.kill = () => {
				clearInterval(interval);
				for(let key in this) delete this[key];
				this.status = this.statuses.KILLED;
			}
			
			// Finalization
			interval = setInterval(tick, 1000 / tickRate);
		}
		time.Clock.prototype.statuses = {
			NOT_STARTED: "not started",
			TICKING: "ticking",
			PAUSED: "paused",
			KILLED: "killed"
		}
		
		// Methods
		// setTimeout synonym
		time.delay = function(callback, delay) {
			setTimeout(callback, delay);
		}
		
		// Sleep. should ***NEVER EVER BE USED UNDER ANY CIRCUMSTANCES EVER AT ALL***
		// SERIOUSLY GUY DON'T DO SOMETHING YOU WILL REGRET THIS IS A TERRIBLE IDEA
		// AND IS ONLY HERE FOR FUN!!!
		time.sleep = function(delay) {
			console.warn("WARNING! ice.time.sleep WAS USED! ice.time.sleep SHOULD NEVER BE USED UNDER ANY CIRCUMSTANCES!");
			let start = performance.now();
			while(performance.now() - start < delay) {
				// do nothing. seriously don't use this or you are a horrible person
			}
		}
		
		logImport("time");
		return time;
	})();
	
	/*
	 * [Module name]  colors
	 * [Version]      v1.0.0
	 * [Dependencies] math (1).
	 * [Level]        2
	 * [Description]  This module handles color. It has 12 hues, each with a shade (darker) and tint (lighter), 5 grayscale values,
	 *     and a few misc colors for a total of over 40 colors! It also has color functions, such as lerp, rgba/hex/hsla translation,
	 *     color interpretation, and more.
	 * [TODO]
	 *     • None
	 */
	ice.colors = (function() {
		
		// Private variables
		let colors = {};
		
		// Private methods
		// Translates a hex string into an rgb array
		function hexToRgb(hex) {
			hex = hex.toUpperCase().replace(
				/^#?([A-F\d])([A-F\d])([A-F\d])([A-F\d])?$/i,
				(m, r, g, b, a = "F") => r + r + g + g + b + b + a + a
			);
			let result = /^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})?$/i.exec(hex);
			if(result === null) return [0, 0, 0, 0];
			if(result[4] === undefined) result[4] = "FF";
			return [
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16),
				parseInt(result[4], 16) / 255
			];
		}
		// Translates an rgb color into a hex string
		function rgbToHex(r, g, b, a) {
			// args: ()
			if(r === undefined) return "#00000000";
			// args: (something)
			else if(g === undefined) {
				// args: (string)
				if(typeof r === "string") {
					let rgbaArray = r.replace(/[^\d,.]/g, "").split(",").map(Number);
					return rgbToHex(rgbaArray[0], rgbaArray[1], rgbaArray[2], rgbaArray[3]);
				}
				// args: (array)
				else if(r instanceof Array) return rgbToHex(r[0], r[1], r[2], r[3]);
				// args: (default number)
				else {
					g = r;
					b = r;
				}
			}
			// args: (something, something)
			else if(b === undefined) {
				a = g;
				g = r;
				b = r;
			}
			
			r = basics.round(r).toString(16);
			r = r.length === 1 ? "0" + r : r;
			g = basics.round(g).toString(16);
			g = g.length === 1 ? "0" + g : g;
			b = basics.round(b).toString(16);
			b = b.length === 1 ? "0" + b : b;
			let rgb = "#" + r + g + b;
			if(a !== undefined && a < 1) {
				a = parseInt(a * 255).toString(16);
				a = a.length === 1 ? "0" + a : a;
				rgb += a;
			}
			return rgb.toUpperCase();
	
			
		}
		// Translates an rgb color to an hsl array
		function rgbToHsl(r, g, b, a = 1) {
			// args: ()
			if(r === undefined) return [0, 0, 0, 0];
			// args: (something)
			else if(g === undefined) {
				// args: (string)
				if(typeof r === "string") {
					let rgbaArray = r.replace(/[^\d,.]/g, "").split(",").map(Number);
					return rgbToHsl(rgbaArray[0], rgbaArray[1], rgbaArray[2], rgbaArray[3]);
				}
				// args: (array)
				else if(r instanceof Array) return rgbToHsl(r[0], r[1], r[2], r[3]);
				// args: (default number)
				else {
					g = r;
					b = r;
				}
			}
			// args: (something, something)
			else if(b === undefined) {
				a = g;
				g = r;
				b = r;
			}
			
			r /= 255;
			g /= 255;
			b /= 255;
			let maxBrightness = basics.max(r, g, b);
			let minBrightness = basics.min(r, g, b);
			let l = (maxBrightness + minBrightness) / 2;
			
			// If the color is grayscale, our life is much easier
			if(maxBrightness === minBrightness) return [0, 0, l, a];
			
			// Otherwise, we have to calculate a bunch of stuff
			let d = maxBrightness - minBrightness;
			let h;
			let s = d / (l > 0.5 ? 2 - maxBrightness - minBrightness : maxBrightness + minBrightness);
			if     (maxBrightness === r) h = (g - b) / d + (g < b ? 6 : 0);
			else if(maxBrightness === g) h = (b - r) / d + 2;
			else if(maxBrightness === b) h = (r - g) / d + 4;
			h *= 60;
			
			return [h, s, l, a];
		}
		// Translates an hsl color to an rgb array
		var hslToRgb = (function() {
			// Helper function for hslToRgb
			function hueToRgb(p, q, t) {
				t = (t % 360 + 360) % 360;
				
				if     (t < 60)  return p + (q - p) * t / 60;
				else if(t < 180) return q;
				else if(t < 240) return p + (q - p) * (4 - t / 60);
				else             return p;
			}
			// Actual hslToRgb function
			return function(h, s, l, a = 1) {
				// args: ()
				if(h === undefined) return [0, 0, 0, 0];
				// args: (something)
				else if(s === undefined) {
					// args: (string)
					if(typeof h === "string") {
						// Assume the string looks something like this: "hsl(60, 1, 0.5)"
						let hslaArray = h.replace(/[^\d,.]/g, "").split(",").map(Number);
						return hslToRgb(hslaArray[0], hslaArray[1], hslaArray[2], hslaArray[3]);
					}
					// args: (array)
					else if(h instanceof Array) return hslToRgb(h[0], h[1], h[2], h[3]);
				}
				
				// Set default s and l (can't be done before or we couldn't detect when only one arg is passed)
				if(s === undefined) s = 1;
				if(l === undefined) l = 0.5;
				
				// Grayscale
				if(s === 0) {
					l = basics.round(l * 255);
					return [l, l, l, a];
				}
				
				// Not grayscale
				let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				let p = 2 * l - q;
				let r = basics.round(hueToRgb(p, q, h + 120) * 255);
				let g = basics.round(hueToRgb(p, q, h      ) * 255);
				let b = basics.round(hueToRgb(p, q, h - 120) * 255);
				return [r, g, b, a];
			}
		})();
		// Translates an hsl color to a hex string
		function hslToHex(h, s, l, a) {
			return rgbToHex(hslToRgb(h, s, l, a));
		}
		// Translates a hex color to an hsl array
		function hexToHsl(hex) {
			return rgbToHsl(hexToRgb(hex));
		}
		// Interprets a color from up to four arguments
		function interpretColor(arg1, arg2, arg3, arg4) {
			let rgb, hsl, hex;
			
			// args: ()
			if(arg1 === undefined) {
				rgb = [0, 0, 0, 0];
				hsl = [0, 0, 0, 0];
				hex = "#00000000";
			}
			// args: (something)
			else if(arg2 === undefined) {
				// args: (number)
				if(typeof arg1 === "number") {
					rgb = [arg1, arg1, arg1, 1];
					hsl = rgbToHsl(rgb);
					hex = rgbToHex(rgb);
				}
				// args: (string)
				else if(typeof arg1 === "string") {
					// args: (rgb string)
					if(arg1.includes("rgb")) {
						rgb = arg1.replace(/[^\d,.]/g, "").split(",").map(Number);
						if(rgb.length < 4) rgb.push(1);
						hsl = rgbToHsl(rgb);
						hex = rgbToHex(rgb);
					}
					// args: (hsl string)
					else if(arg1.includes("hsl")) {
						hsl = arg1.replace(/[^\d,.]/g, "").split(",").map(Number);
						if(hsl.length < 4) hsl.push(1);
						rgb = hslToRgb(hsl);
						hex = rgbToHex(rgb);
					}
					// args: (hex string)
					else {
						hex = arg1;
						rgb = hexToRgb(hex);
						hsl = rgbToHsl(rgb);
					}
				}
				// args: (array)
				else if(arg1 instanceof Array) {
					return interpretColor(arg1[0], arg1[1], arg1[2], arg1[3]);
				}
			}
			// args: (something, something)
			else if(arg3 === undefined) {
				rgb = [arg1, arg1, arg1, arg2];
				hsl = rgbToHsl(rgb);
				hex = rgbToHex(rgb);
			}
			// args: (something, something, something)
			else if(arg4 === undefined) {
				rgb = [arg1, arg2, arg3, 1];
				hsl = rgbToHsl(rgb);
				hex = rgbToHex(rgb);
			}
			// args: (something, something, something, something)
			else {
				rgb = [arg1, arg2, arg3, arg4];
				hsl = rgbToHsl(rgb);
				hex = rgbToHex(rgb);
			}
			return [rgb, hsl, hex];
		} 
		
		// Properties
		// Hues
		colors.RED        = "#FF0000";
		colors.ORANGE     = "#FF8000";
		colors.YELLOW     = "#FFFF00";
		colors.CHARTREUSE = "#80FF00";
		colors.GREEN      = "#00FF00";
		colors.MINT       = "#00FF80";
		colors.CYAN       = "#00FFFF";
		colors.CERULEAN   = "#0080FF";
		colors.BLUE       = "#0000FF";
		colors.PURPLE     = "#8000FF";
		colors.MAGENTA    = "#FF00FF";
		colors.PINK       = "#FF0080";
		// Tints
		colors.LIGHT_RED        = colors.SALMON     = "#FF8080";
		colors.LIGHT_ORANGE     = colors.PEACH      = "#FFC080";
		colors.LIGHT_YELLOW     = colors.CANARY     = "#FFFF80";
		colors.LIGHT_CHARTREUSE = colors.KEYLIME	= "#C0FF80";
		colors.LIGHT_GREEN      = colors.SHAMROCK   = "#80FF80";
		colors.LIGHT_MINT       = colors.SEAFOAM	= "#80FFC0";
		colors.LIGHT_CYAN       = colors.SKY        = "#80FFFF";
		colors.LIGHT_CERULEAN   = colors.CORNFLOWER = "#80C0FF";
		colors.LIGHT_BLUE       = colors.PERIWINKLE = "#8080FF";
		colors.LIGHT_PURPLE     = colors.LAVENDER   = "#C080FF";
		colors.LIGHT_MAGENTA    = colors.ORCHID     = "#FF80FF";
		colors.LIGHT_PINK       = colors.CARNATION  = "#FF80C0";
		// Shades
		colors.DARK_RED        = colors.MAROON   = "#800000";
		colors.DARK_ORANGE     = colors.RUST     = "#804000";
		colors.DARK_YELLOW     = colors.OLIVE    = "#808000";
		colors.DARK_CHARTREUSE = colors.BASIL    = "#408000";
		colors.DARK_GREEN      = colors.FOREST   = "#008000";
		colors.DARK_MINT       = colors.PINE     = "#008040";
		colors.DARK_CYAN       = colors.TEAL     = "#008080";
		colors.DARK_CERULEAN   = colors.COBALT   = "#004080";
		colors.DARK_BLUE       = colors.NAVY     = "#000080";
		colors.DARK_PURPLE     = colors.EGGPLANT = "#400080";
		colors.DARK_MAGENTA    = colors.PLUM     = "#800080";
		colors.DARK_PINK       = colors.BEETROOT = "#800040";
		// Grayscale
		colors.WHITE                        = "#FFFFFF";
		colors.LIGHT_GRAY = colors.SILVER   = "#C0C0C0";
		colors.GRAY                         = "#808080";
		colors.DARK_GRAY  = colors.CHARCOAL = "#404040";
		colors.BLACK                        = "#000000";
		// Misc colors
		colors.BROWN = "#402000";
		colors.GOLD  = "#D0B030";
		colors.SEPIA = "#704214";
		colors.CLEAR = "#00000000";
		// Sets
		colors.hues = [
			colors.RED,
			colors.ORANGE,
			colors.YELLOW,
			colors.CHARTREUSE,
			colors.GREEN,
			colors.MINT,
			colors.CYAN,
			colors.CERULEAN,
			colors.BLUE,
			colors.PURPLE,
			colors.MAGENTA,
			colors.PINK
		];
		colors.tints = [
			colors.LIGHT_RED,
			colors.LIGHT_ORANGE,
			colors.LIGHT_YELLOW,
			colors.LIGHT_CHARTREUSE,
			colors.LIGHT_GREEN,
			colors.LIGHT_MINT,
			colors.LIGHT_CYAN,
			colors.LIGHT_CERULEAN,
			colors.LIGHT_BLUE,
			colors.LIGHT_PURPLE,
			colors.LIGHT_MAGENTA,
			colors.LIGHT_PINK
		];
		colors.shades = [
			colors.DARK_RED,
			colors.DARK_ORANGE,
			colors.DARK_YELLOW,
			colors.DARK_CHARTREUSE,
			colors.DARK_GREEN,
			colors.DARK_MINT,
			colors.DARK_CYAN,
			colors.DARK_CERULEAN,
			colors.DARK_BLUE,
			colors.DARK_PURPLE,
			colors.DARK_MAGENTA,
			colors.DARK_PINK
		];
		colors.grayscale = [
			colors.WHITE,
			colors.LIGHT_GRAY,
			colors.GRAY,
			colors.DARK_GRAY,
			colors.BLACK
		];
		colors.misc = [
			colors.BROWN,
			colors.GOLD,
			colors.SEPIA,
			colors.CLEAR
		];
		colors.huesExt = [].concat(colors.hues, colors.tints, colors.shades);
		colors.all     = [].concat(colors.huesExt, colors.grayscale, colors.misc);
		// Duplicates
		colors.GREY        = colors.GRAY;
		colors.LIGHT_GREY  = colors.LIGHT_GRAY;
		colors.DARK_GREY   = colors.DARK_GRAY;
		colors.TRANSPARENT = colors.CLEAR;
		colors.GREYSCALE   = colors.GRAYSCALE;
		
		// Methods
		// Interprets a color from the given inputs (returns an array [rgb, hsl, hex])
		colors.interpret = function(arg1, arg2, arg3, arg4) {
			return interpretColor(arg1, arg2, arg3, arg4);
		}
		// Translates a hex color to an rgb array
		colors.hexToRgb = function(hex) {
			return hexToRgb(hex);
		}
		// Translates an rgb color to a hex string
		colors.rgbToHex = function(r, g, b, a) {
			return rgbToHex(r, g, b, a);
		}
		// Translates an rgb color to an hsl array
		colors.rgbToHsl = function(r, g, b, a) {
			return rgbToHsl(r, g, b, a);
		}
		// Translates an hsl color to an rgb array
		colors.hslToRgb = function(h, s, l, a) {
			return hslToRgb(h, s, l, a);
		}
		// Translates an hsl color to a hex string
		colors.hslToHex = function(h, s, l, a) {
			return hslToHex(h, s, l, a);
		}
		// Translates a hex color to an hsl array
		colors.hexToHsl = function(hex) {
			return hexToHsl(hex);
		}
		// Returns a random color from the given list, or huesExt if no list is specified
		colors.random = function(list = colors.huesExt) {
			return ice.math.randomFrom(list);
		}
		// Linearly interpolates between two given colors (returns the color frac * 100% from color1 to color2 as an rgb array)
		colors.lerp = function(frac, color1, color2) {
			color1Rgb = interpretColor(color1)[0];
			color2Rgb = interpretColor(color2)[0];
			let r = color1Rgb[0] * (1 - frac) + color2Rgb[0] * frac;
			let g = color1Rgb[1] * (1 - frac) + color2Rgb[1] * frac;
			let b = color1Rgb[2] * (1 - frac) + color2Rgb[2] * frac;
			let a = color1Rgb[3] * (1 - frac) + color2Rgb[3] * frac;
			return [r, g, b, a];
		}
		// Inverts a color (does not invert alpha!)
		colors.invert = function(color) {
			colorRgb = interpretColor(color)[0];
			let r = 255 - colorRgb[0];
			let g = 255 - colorRgb[1];
			let b = 255 - colorRgb[2];
			let a =       colorRgb[3];
			return [r, g, b, a];
		}
		
		logImport("colors");
		return colors;
	})();
	
	/*
	 * [Module name]  physics
	 * [Version]      v1.0.1
	 * [Dependencies] math (1).
	 * [Level]        2
	 * [Description]  This modules handles physics. It's primary focus is vectors,
	 *     but it also has collision detection and matrix math.
	 * [TODO]
	 *     • Collision detection
	 *     • Matrix math
	 */
	ice.physics = (function() {
		let physics = {};

		// Private properties
		let origin;
		let unit;
		let oneOne;
		
		// Constructors
		physics.Vector = function(x = 0, y = 0) {
			// Allows omitting the "new" keyword
			if(new.target === undefined) {
				return new ice.physics.Vector(x, y);
			}
			
			// Properties
			this.x = x;
			this.y = y;
		}
		// Vector addition (works with a vector, an xy, or an x and a y)
		physics.Vector.prototype.add = function(x, y = x) {
			this.x += x.x !== undefined ? x.x : x;
			this.y += x.y !== undefined ? x.y : y;
			return this;
		}
		// Vector addition for the x component (works with a vector or an x)
		physics.Vector.prototype.addX = function(x) {
			this.x += x.x !== undefined ? x.x : x;
			return this;
		}
		// Vector addition for the y component (works with a vector or a y)
		physics.Vector.prototype.addY = function(y) {
			this.y += y.x !== undefined ? y.x : y;
			return this;
		}
		// Vector subtraction (works with a vector, an xy, or an x and a y)
		physics.Vector.prototype.sub = function(x, y = x) {
			this.x -= x.x !== undefined ? x.x : x;
			this.y -= x.y !== undefined ? x.y : y;
			return this;
		}
		// Vector subtraction for the x component (works with a vector or an x)
		physics.Vector.prototype.subX = function(x) {
			this.x -= x.x !== undefined ? x.x : x;
			return this;
		}
		// Vector subtraction for the y component (works with a vector or a y)
		physics.Vector.prototype.subY = function(y) {
			this.y -= y.x !== undefined ? y.x : y;
			return this;
		}
		// Vector multiplication (works with a vector, an xy, or an x and a y)
		physics.Vector.prototype.mult = function(x, y = x) {
			this.x *= x.x !== undefined ? x.x : x;
			this.y *= x.y !== undefined ? x.y : y;
			return this;
		}
		// Vector multiplication for the x component (works with a vector or an x)
		physics.Vector.prototype.multX = function(x) {
			this.x *= x.x !== undefined ? x.x : x;
			return this;
		}
		// Vector multiplication for the y component (works with a vector or a y)
		physics.Vector.prototype.multY = function(y) {
			this.y *= y.x !== undefined ? y.x : y;
			return this;
		}
		// Vector division (works with a vector, an xy, or an x and a y)
		physics.Vector.prototype.div = function(x, y = x) {
			this.x /= x.x !== undefined ? x.x : x;
			this.y /= x.y !== undefined ? x.y : y;
			return this;
		}
		// Vector division for the x component (works with a vector or an x)
		physics.Vector.prototype.divX = function(x) {
			this.x /= x.x !== undefined ? x.x : x;
			return this;
		}
		// Vector division for the y component (works with a vector or a y)
		physics.Vector.prototype.divY = function(y) {
			this.y /= y.x !== undefined ? y.x : y;
			return this;
		}
		// Vector modulation (works with a vector, an xy, or an x and a y)
		physics.Vector.prototype.mod = function(x, y = x) {
			this.x %= x.x !== undefined ? x.x : x;
			this.y %= x.y !== undefined ? x.y : y;
			return this;
		}
		// Vector modulation for the x component (works with a vector or an x)
		physics.Vector.prototype.modX = function(x) {
			this.x %= x.x !== undefined ? x.x : x;
			return this;
		}
		// Vector modulation for the y component (works with a vector or a y)
		physics.Vector.prototype.modY = function(y) {
			this.y %= y.x !== undefined ? y.x : y;
			return this;
		}
		// Vector setting (works with a vector, an xy, or an x and a y)
		physics.Vector.prototype.set = function(x, y = x) {
			this.x = x.x !== undefined ? x.x : x;
			this.y = x.y !== undefined ? x.y : y;
			return this;
		}
		// Vector setting for the x component (works with a vector or an x)
		physics.Vector.prototype.setX = function(x) {
			this.x = x.x !== undefined ? x.x : x;
			return this;
		}
		// Vector setting for the y component (works with a vector or a y)
		physics.Vector.prototype.setY = function(y) {
			this.y = y.x !== undefined ? y.x : y;
			return this;
		}
		// Returns a clone of the vector
		physics.Vector.prototype.clone = function() {
			return new this.constructor(this.x, this.y);
		}
		// Returns the magnitude of the vector
		physics.Vector.prototype.mag = function() {
			return basics.sqrt(this.x * this.x + this.y * this.y);
		}
		// Returns the magnitude of the vector squared (faster for comparisons)
		physics.Vector.prototype.magSq = function() {
			return this.x * this.x + this.y * this.y;
		}
		// Returns the dot product of the vector and another vector
		physics.Vector.prototype.dot = function(vec) {
			return this.x * vec.x + this.y * vec.y;
		}
		// Returns the cross product of the vector and another vector
		physics.Vector.prototype.cross = function(vec) {
			return (this.x * vec.y) - (this.y * vec.x);
		}
		// Returns the angular distance between two vectors, in radians
		physics.Vector.prototype.rad = function(vec) {
			let rad = ice.math.atan2(this.y, this.x);
			if(vec !== undefined) rad -= ice.math.atan2(vec.y, vec.x);
			return (rad + basics.TAU) % basics.TAU;
		}
		// Returns the angular distance between two vectors, in degrees
		physics.Vector.prototype.deg = function(vec) {
			return basics.deg(this.rad(vec));
		}
		// Returns the Euclidean distance between the vectors
		physics.Vector.prototype.dist = function(vec = origin) {
			let dx = this.x - vec.x;
			let dy = this.y - vec.y;
			return basics.sqrt(dx * dx + dy * dy);
		}
		// Returns the Euclidean distance between the vectors squared (faster for comparisons)
		physics.Vector.prototype.distSq = function(vec = origin) {
			let dx = this.x - vec.x;
			let dy = this.y - vec.y;
			return dx * dx + dy * dy;
		}
		// Returns the horizontal (x) distance between the vectors
		physics.Vector.prototype.distX = function(vec = origin) {
			return basics.abs(this.x - vec.x);
		}
		// Returns the vertical (y) distance between the vectors
		physics.Vector.prototype.distY = function(vec = origin) {
			return basics.abs(this.y - vec.y);
		}
		// Returns the manhattan distance between the vectors
		physics.Vector.prototype.distManhattan = function(vec = origin) {
			return basics.abs(this.x - vec.x) + basics.abs(this.y - vec.y);
		}
		// Returns whether or not two vectors have the same x and y
		physics.Vector.prototype.equals = function(vec) {
			return this.x === vec.x && this.y === vec.y;
		}
		// Returns the vector as a string
		physics.Vector.prototype.toString = function() {
			return `[object ice.physics.Vector] {x: ${this.x}, y: ${this.y}}`;
		}
		// Returns the vector as an object
		physics.Vector.prototype.toObject = function() {
			return {x: this.x, y: this.y};
		}
		// Returns the vector as an array
		physics.Vector.prototype.toArray = function() {
			return [this.x, this.y];
		}
		// Normalized the vector (sets it's magnitude to 1, angle remains unchanged)
		physics.Vector.prototype.norm = function() {
			let mag = this.mag();
			// Warn the programmer if attempting to normalize a zero vector.
			// This one line could save lots of headaches. YW future me <3
			if(mag === 0) console.warn("ice.physics warning: Attempted to normalize a zero vector!");
			return this.div(mag || 1);
		}
		// Sets the vector's magnitude (angle remains unchanged)
		physics.Vector.prototype.setMag = function(n) {
			return this.norm().mult(n);
		}
		// Moves the vector towards another (by absolute distance)
		physics.Vector.prototype.towards = function(vec, dist) {
			return this.add(vec.clone().sub(this).norm().mult(dist === undefined ? 1 : dist));
		}
		// Moves the vector frac of the way to another (by relative distance)
		physics.Vector.prototype.lerp = function(vec, frac) {
			return this.add(vec.clone().sub(this).mult(frac));
		}
		// Rotates the vector around another by a certain angle (in radians)
		physics.Vector.prototype.rotate = function(ang, center = origin) {
			let cos = basics.cos(ang);
			let sin = basics.sin(ang);
			let x = this.x - center.x;
			let y = this.y - center.y;
			
			this.x = x * cos - y * sin + center.x;
			this.y = x * sin + y * cos + center.y;
			return this;
		}
		// Rotates the vector around another by a certain angle (in degrees)
		physics.Vector.prototype.rotateDeg = function(ang, center) {
			return this.rotate(basics.rad(ang), center);
		}
		// Sets the angle of the vector in radians (magnitude remains unchanged)
		physics.Vector.prototype.setAngle = function(ang) {
			let mag = this.mag();
			this.x = basics.cos(ang) * mag;
			this.y = basics.sin(ang) * mag;
			return this;
		}
		// Sets the angle of the vector in degrees (magnitude remains unchanged)
		physics.Vector.prototype.setDegrees = function(ang) {
			return this.setAngle(basics.rad(ang));
		}
		// Inverts the vector about another (same as rotating 180° around a point)
		physics.Vector.prototype.invert = function(center) {
			if(center === undefined) {
				this.x *= -1;
				this.y *= -1;
			}
			else {
				this.x = ((this.x - center.x) * -1) + center.x;
				this.y = ((this.y - center.y) * -1) + center.y;
			}
			return this;
		}
		// Inverts the vector's x component about another
		physics.Vector.prototype.invertX = function(center) {
			if(center === undefined) this.x *= -1;
			else this.x = ((this.x - center.x) * -1) + center.x;
			return this;
		}
		// Inverts the vector's y component about another
		physics.Vector.prototype.invertY = function(center) {
			if(center === undefined) this.x *= -1;
			else this.x = ((this.x - center.x) * -1) + center.x;
			return this;
		}
		// Clamps the vector to between two others
		physics.Vector.prototype.clamp = function(corner1, corner2 = origin) {
			this.x = basics.clamp(this.x, corner1.x, corner2.x);
			this.y = basics.clamp(this.y, corner1.y, corner2.y);
			return this;
		}
		// Clamps the vector's x component
		physics.Vector.prototype.clampX = function(min, max = 0) {
			this.x = basics.clamp(this.x, min, max);
			return this;
		}
		// Clamps the vector's y component
		physics.Vector.prototype.clampY = function(min, max = 0) {
			this.y = basics.clamp(this.y, min, max);
			return this;
		}
		// Clamps the vector's magnitude
		physics.Vector.prototype.clampMag = function(min, max = 0) {
			let magSq = this.magSq();
			let magSqClamped = basics.clamp(magSq, min * min, max * max);
			// I should be able to avoid this sqrt operation, but it doesn't seem necessary
			if(magSq !== magSqClamped) this.setMag(basics.sqrt(magSqClamped));
			return this;
		}
		// Randomizes the vector (acts like randAng if no args are provided, otherwise randXY)
		physics.Vector.prototype.rand = function(corner1, corner2) {
			if(corner1 === undefined) return this.randAng();
			if(corner2 === undefined) corner2 = origin;
			this.x = basics.random(corner1.x, corner2.x);
			this.y = basics.random(corner1.y, corner2.y);
			return this;
		}
		// Randomizes the vector's angle (magnitude remains unchanced)
		physics.Vector.prototype.randAng = function(min, max) {
			let ang;
			
			// args: ()
			if(min === undefined) ang = ice.math.random(basics.TAU);
			// args: (something, [something])
			else ang = ice.math.random(min, max);
			
			this.x = basics.cos(ang);
			this.y = basics.sin(ang);
			return this;
		}
		// Randomizes the vector's angle in degrees (magnitude remains unchanged)
		physics.Vector.prototype.randDeg = function(min, max) {
			return this.randAng(basics.rad(min), basics.rad(max));
		}
		// Randomizes the vector's x component
		physics.Vector.prototype.randX = function(min, max = 0) {
			this.x = ice.math.random(min, max);
			return this;
		}
		// Randomizes the vector's y component
		physics.Vector.prototype.randY = function(min, max = 0) {
			this.y = ice.math.random(min, max);
			return this;
		}
		// Randomizes the vector's x and y component
		physics.Vector.prototype.randXY = function(corner1 = oneOne, corner2 = origin) {
			this.x = ice.math.random(corner1.x, corner2.x);
			this.y = ice.math.random(corner1.y, corner2.y);
			return this;
		}
		
		// Methods
		// Returns a zero vector
		physics.origin = function() {
			return origin.clone();
		}
		// Returns a unit vector
		physics.unit = function() {
			return unit.clone();
		}
		// Returns a vector with a random angle and magnitude 1
		physics.random = function() {
			let ang = ice.math.random(basics.TAU);
			return new physics.Vector(basics.cos(ang), basics.sin(ang));
		}
		
		// Finalization
		origin = new physics.Vector(0, 0);
		unit   = new physics.Vector(1, 0);
		oneOne = new physics.Vector(1, 1);
		
		logImport("physics");
		return physics;
	})();
	
	/*
	 * [Module name]  dom
	 * [Version]      v1.0.0
	 * [Dependencies] physics (2)
	 * [Level]        3
	 * [Description]  Handles all interactions with the DOM.
	 * [TODO]
	 *     • Event shit
	 *     • Focus shit
	 *     • Popup window shit
	 *     • Style shit
	 *     • show/hide menu
	 a bunch more creates
	 */
	ice.dom = (function() {
		let dom = {};
		
		// Private methods
		// querySelector synonym
		function $(path) {
			return document.querySelector(path);
		}
		// getElementById synonym
		function id(idString) {
			return document.getElementById(idString);
		}
		// createElement synonym
		function create(tagName) {
			return document.createElement(tagName);
		}
		// createTextNode synonym
		function textNode(text) {
			return document.createTextNode(text);
		}
		
		// Constructors
		dom.InputListener = function(elem = document) {
			// Allows omitting the "new" keyword
			if(new.target === undefined) {
				return new ice.dom.InputListener(elem);
			}
			
			// elem MUST be an HTML element or the document
			if(!(elem instanceof HTMLElement) && elem !== document) {
				console.error(
					  "ice.dom error: The ice.dom.InputListener constructor "
					+ "requires an HTML element as it's argument!"
				)
				return undefined;
			}
			// If elem is a canvas element with a negative tab index, change
			// the tab index and warn the user
			if(elem instanceof HTMLCanvasElement && elem.tabIndex < 0) {
				console.warn(
					  "ice.dom warning: The ice.dom.InputListener constructor "
					+ "changed the tabIndex property of ",
					elem,
					  `from ${elem.tabIndex} to 0! see https://stackoverflow.co`
					+ "m/q/12886286 for information on why."
				)
				elem.tabIndex = 0;
			}
			
			// Private variables
			let eventFuncs   = {};
			eventFuncs.key   = {};
			eventFuncs.mouse = {};
			
			eventFuncs.key.press = e => {this.key.press(e, e.key, getModifiers(e));}
			eventFuncs.key.down  = e => {this.key.down (e, e.key, getModifiers(e));}
			eventFuncs.key.up    = e => {this.key.up   (e, e.key, getModifiers(e));}
			
			eventFuncs.mouse.click = e => {
				this.mouse.click(e);
			}
			eventFuncs.mouse.doubleClick = e => {
				this.mouse.doubleClick(e);
			}
			eventFuncs.mouse.down = e => {
				this.mouse.isDown = true;
				this.mouse.down(e, getMouseButton(e.button));
			}
			eventFuncs.mouse.up = e => {
				// TODO breaks with (left down) (right down) (right up), as left
				// is still down but isDown is false. Intended behavior is that
				// isDown is only false if NO keys are down, left, right, or
				// middle.
				this.mouse.isDown = false;
				this.mouse.up(e, getMouseButton(e.button));
			}
			eventFuncs.mouse.move = e => {
				this.mouse.pos.set(e.offsetX, e.offsetY);
				this.mouse.move(e, e.offsetX, e.offsetY, e.movementX, e.movementY);
			}
			eventFuncs.mouse.wheel = e => {
				this.mouse.wheel(e, e.deltaY);
			}
			
			elem.addEventListener("keypress",   eventFuncs.key.press);
			elem.addEventListener("keydown",    eventFuncs.key.down);
			elem.addEventListener("keyup",      eventFuncs.key.up);
			
			elem.addEventListener("click",      eventFuncs.mouse.click);
			elem.addEventListener("dblclick",   eventFuncs.mouse.doubleClick);
			elem.addEventListener("mousedown",  eventFuncs.mouse.down);
			elem.addEventListener("mouseup",    eventFuncs.mouse.up);
			elem.addEventListener("mousemove",  eventFuncs.mouse.move);
			elem.addEventListener("mousewheel", eventFuncs.mouse.wheel);
			
			// Private functions
			function getModifiers(e) {
				return {ctrl: e.ctrlKey, shift: e.shiftKey, meta: e.metaKey};
			}
			function getMouseButton(numCode) {
				return numCode === 1 ? "middle" : numCode === 2 ? "right" : "left";
			}
			
			/*
			TODO
			blur
			change
			contextmenu
			copy
			cut
			drag
				dragenter
				dragend
				dragleave
				dragover
				dragstart
				drop
			focus
			focusin
			focusout
			fullscreenchange
			input
			load
			mouseenter
			mouseleave
			mousemove
			mouseover
			mouseout
			paste
			*/
			
			// Properties
			this.key = {};
			this.mouse = {};
			
			// Called when a key is pressed
			this.key.press = function(e, key, modifiers) {
				// This is what the programmer gets to define
			}
			// Called when a key is pressed
			this.key.down = function(e, key, modifiers) {
				// This is what the programmer gets to define
			}
			// Called when a key is pressed
			this.key.up = function(e, key, modifiers) {
				// This is what the programmer gets to define
			}
			
			// Called when the mouse is clicked
			this.mouse.click = function(e) {
				// This is what the programmer gets to define
			}
			// Called when the mouse is clicked
			this.mouse.doubleClick = function(e) {
				// This is what the programmer gets to define
			}
			// Called when the mouse is down
			this.mouse.down = function(e, type) {
				// This is what the programmer gets to define
			}
			// Called when the mouse released
			this.mouse.up = function(e, type) {
				// This is what the programmer gets to define
			}
			// Whether or not the mouse is down
			this.mouse.isDown = false;
			// Called when the mouse is moved
			this.mouse.move = function(e, x, y, deltaX, deltaY) {
				// This is what the programmer gets to define
			}
			// The current position of the mouse
			this.mouse.pos = new ice.physics.Vector();
			// Called when the mouse wheel is turned
			this.mouse.wheel = function(e, deltaY) {
				// This is what the programmer gets to define
			}
			
			// Methods
			this.kill = function() {
				elem.removeEventListener("keypress",   eventFuncs.key.press);
				elem.removeEventListener("keydown",    eventFuncs.key.down);
				elem.removeEventListener("keyup",      eventFuncs.key.up);
				
				elem.removeEventListener("click",      eventFuncs.mouse.click);
				elem.removeEventListener("dblclick",   eventFuncs.mouse.doubleClick);
				elem.removeEventListener("mousedown",  eventFuncs.mouse.down);
				elem.removeEventListener("mouseup",    eventFuncs.mouse.up);
				elem.removeEventListener("mousemove",  eventFuncs.mouse.move);
				elem.removeEventListener("mousewheel", eventFuncs.mouse.wheel);
			}
		}
		
		// Methods
		// Shortcut for document.querySelector
		dom.$ = function(path) {
			return $(path);
		}
		
		// Shortcut for document.getElementById
		dom.id = function(idString) {
			return id(idString);
		}
		
		// Appends elem as a child of target, or to the body if no target is
		// specified. Elem will be appended as the last child
		dom.append = function(elem, target = document.body) {
			target.appendChild(elem);
			return elem;
		}
		
		// Appends elem as a sibling before target
		dom.appendBefore = function(elem, target) {
			target.parentNode.insertBefore(elem, target);
			return elem;
		}
		
		// Appends elem as a sibling after target
		dom.appendAfter = function(elem, target) {
			target.parentNode.insertBefore(elem, target.nextSibling);
			return elem;
		}
		
		// Removes elem
		dom.remove = function(elem) {
			elem.parentElement.removeChild(elem);
			return elem;
		}
		
		// Returns elem's parent element
		dom.getParent = function(elem) {
			return elem.parentNode;
		}
		
		// Returns all sibling elements of elem (including itself)
		dom.getSiblings = function(elem) {
			return elem.parentNode.children;
		}
		
		// Returns elem's children elements
		dom.getChildren = function(elem) {
			return elem.children;
		}
		
		// Returns the sibling element before elem
		dom.getPrevSibling = function(elem) {
			return elem.previousSibling;
		}
		
		// Returns the sibling element after elem
		dom.getNextSibling = function(elem) {
			return elem.nextSibling;
		}
		
		// Returns the window title (the text on the tab)
		dom.getTitle = function() {
			return document.title;
		}
		
		// Changes the window title (the text on the tab)
		dom.setTitle = function(title) {
			document.title = title;
		}
		
		// Returns the URL
		dom.getURL = function() {
			return document.URL;
		}
		
		// Enters fullscreen
		dom.fullscreen = function(elem = document.documentElement) {
			elem.requestFullscreen();
		}
		
		// Exits fullscreen
		dom.exitFullscreen = function() {
			document.exitFullscreen();
		}
		
		// Returns whether or not we are in fullscreen
		dom.getFullscreen = function() {
			return document.fullscreen;
		}
		
		// Enters pointer lock on elem
		dom.pointerLock = function(elem = document.documentElement) {
			elem.focus();
			elem.requestPointerLock();
		}
		
		// Exits pointer lock
		dom.exitFullscreen = function() {
			document.exitPointerLock();
		}
		
		// Returns whether or not we are in pointer lock
		dom.getPointerLock = function() {
			return document.pointerLockElement !== null;
		}
		
		// Returns the element with pointer lock on (or null if pointer lock is off)
		dom.getPointerLockElem = function() {
			return document.pointerLockElement;
		}
		
		/*
		 * To create:
		 *     • [TODO] embed
		 *     • [TODO] iframe
		 *     • [TODO] input
		 *     • [TODO] label ?
		 *     • [TODO] list shit
		 *     • [TODO] select
		 *     • [TODO] table shit
		 *     • [TODO] video ?
		 *     • [TODO] track ?
		 */
		
		// Generic create function. Not preferable to a specific one (ex. createP)
		dom.create = function(tag) {
			return create(tag);
		}
		
		// Creates an a (link) element
		dom.createA = function(text = "", href, target) {
			/*
			 * Target indicates where the link should open.
			 *     "self": Default. opens in the same frame it was clicked
			 *     "blank": Opens in a new window or tab (decided by browser)
			 *     "parent": Opens in the parent frame (like self, but will open
			 *               in parent frame (useful in an iframe, for graphics)
			 *     "top": Opens in the full body of the window (like parent, but
			 *            opens in the main window (useful for nested frames))
			 */
			let elem = create("a");
			elem.appendChild(textNode(text));
			if(href   !== undefined) elem.href   = href;
			if(target !== undefined) elem.target = target;
			return elem;
		}
		
		// Creates a br (break) element
		dom.createBr = function() {
			return create("br");
		}
		
		// Creates a button element
		dom.createButton = function(text = "", onclick) {
			let elem = create("button");
			elem.type = "button";
			if(onclick !== undefined) elem.onclick = onclick;
			elem.appendChild(textNode(text));
			return elem;
		}
		
		// Creates a canvas element
		dom.createCanvas = function(width, height) {
			if(height === undefined) {
				// args: ()
				if(width === undefined) {
					width = 300;
					height = 150;
				}
				// args: (something)
				else height = width;
			}
			let elem = create("canvas");
			elem.width = width;
			elem.height = height;
			return elem;
		}
		
		// Creates a div element
		dom.createDiv = function() {
			return create("div");
		}
		
		// Creates a h1 element
		dom.createH1 = function(text = "") {
			let elem = create("h1");
			elem.appendChild(textNode(text));
			return elem;
		}
		
		// Creates a h2 element
		dom.createH2 = function(text = "") {
			let elem = create("h2");
			elem.appendChild(textNode(text));
			return elem;
		}
		
		// Creates a h3 element
		dom.createH3 = function(text = "") {
			let elem = create("h3");
			elem.appendChild(textNode(text));
			return elem;
		}
		
		// Creates a h4 element
		dom.createH4 = function(text = "") {
			let elem = create("h4");
			elem.appendChild(textNode(text));
			return elem;
		}
		
		// Creates a h5 element
		dom.createH5 = function(text = "") {
			let elem = create("h5");
			elem.appendChild(textNode(text));
			return elem;
		}
		
		// Creates a h6 element
		dom.createH6 = function(text = "") {
			let elem = create("h6");
			elem.appendChild(textNode(text));
			return elem;
		}
		
		// Creates an img (image) element
		dom.createImg = function(src, width, height, alt) {
			let elem = create("img");
			elem.src = src;
			// I don't even remotely understand this CORS shit, and this seems
			// to work the same (?) with and without this, but I think it's
			// probably better to have this here. idk. Future me,
			// pls fix this mess. ty <3 you
			elem.crossorigin = "anonymous";
			if(width  !== undefined) elem.width  = width;
			if(height !== undefined) elem.height = height;
			if(alt    !== undefined) elem.alt    = alt;
			return elem;
		}
		
		// Creates a paragraph element
		dom.createP = function(text = "") {
			let elem = create("p");
			elem.appendChild(textNode(text));
			return elem;
		}
		
		// Creates a progress element
		dom.createProgress = function(value = 0, max = 100) {
			let elem = create("progress");
			elem.value = value;
			elem.max = max;
			return elem;
		}
		
		// Creates a span element
		dom.createSpan = function() {
			return create("span");
		}
		
		logImport("dom");
		return dom;
	})();
	
	/*
	 * [Module name]  graphics
	 * [Version]      v1.0.2
	 * [Dependencies] physics (2), colors (1), math (1)
	 * [Level]        3
	 * [Description]  This module handles everything related to graphics.
	 *     It has many functions for drawing to a canvas, including
	 *     fill/stroke options, plenty of shapes, text and image
	 *     drawing, and more.
	 * [TODO]
	 *     • None
	 */
	ice.graphics = (function() {
		let graphics = {};

		// Private properties
		let WHITE       = ice.colors.WHITE;
		let BLACK       = ice.colors.BLACK;
		let SILVER      = ice.colors.SILVER;
		let TRANSPARENT = ice.colors.TRANSPARENT;
		
		// Constructors
		graphics.Scene = function(canvas) {
			/*
			 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
			 * IN PROGRESS:
			 *     • none
			 * TODO:
			 *     • measure text
			 *     • maybe shadow stuff
			 *     • curves (bezier, quadratic, arc)
			 *     • globalAlpha/globalCompositeOperation stuff
			 *     • pixel manipulation
			 *     • save/restore (drawing style "stack")
			 *     • css filter stuff
			 *     • charts/graphs
			 *     • Go through and make sure everything is nice and clean
			 *         (ctx vs this.ctx, whitespace, etc)
			 *     • canvas to image (returns an HTMLImageELement)
			 */
			// Allows omitting the "new" keyword
			if(new.target === undefined) {
				return new ice.graphics.Scene(canvas);
			}
			
			if(canvas === undefined) {
				console.error(
					  "ice.graphics error: The ice.graphics.Scene constructor "
					+ "requires a canvas as it's argument!"
				)
				return undefined;
			}
			
			// Private variables
			let ctx = canvas.getContext("2d");
			let settings = {
				bgColor:     WHITE,
				fill:        BLACK,
				stroke:      false,
				strokeWidth: 2,
				colorMode:   "rgb",
				angleMode:   "radians",
				text: {
					font:   "Verdana",
					size:   24,
					align:  "start",
					base:   "alphabetic",
					bold:   false,
					italic: false
				}
			};
			let images = {};
			
			// Private functions
			// Prepares the canvas for filling a certain color
			function prepFill() {
				if(settings.fill) {
					ctx.fillStyle = settings.fill;
					return true;
				}
				return false;
			}
			// Prepares the canvas for stroking a certain color
			function prepStroke() {
				if(settings.stroke) {
					ctx.strokeStyle = settings.stroke;
					ctx.lineWidth = settings.strokeWidth;
					return true;
				}
				return false;
			}
			// Prepares, fills, and strokes the canvas
			function renderPath() {
				if(prepFill()) ctx.fill();
				if(prepStroke()) ctx.stroke();
			}
			
			// Interprets a color from the arguments
			function interpretColor(arg1, arg2, arg3, arg4, defaultColor) {
				// args: ()
				if(arg1 === undefined) return defaultColor === undefined ? WHITE : defaultColor;
				
				let modeIsRGB = settings.colorMode === "rgb";
				let arg1IsNumber = typeof arg1 === "number";
				// args: (something)
				if(arg2 === undefined) {
					// args: (number)
					if(arg1IsNumber) {
						if(modeIsRGB) {
							// interpret as a single grayscale value
							return "rgb(" + arg1 + ", " + arg1 + ", " + arg1 + ")";
						}
						// interpret as a pure hue
						return "hsl(" + arg1 + ", 100%, 50%)";
					}
					// args: (array)
					if(arg1 instanceof Array || arg1 instanceof Uint8ClampedArray) {
						// interpret the array as arguments for another call to interpretColor
						return interpretColor(arg1[0], arg1[1], arg1[2], arg1[3], defaultColor);
					}
					// Assume arg1 is a suitable color (a string, for example)
					return arg1;
				}
				// args: (something, something)
				else if(arg3 === undefined) {
					if(modeIsRGB) {
						// interpret as a grayscale value and an alpha
						return "rgba(" + arg1 + ", " + arg1 + ", " + arg1 + ", " + arg2 + ")";
					}
					// interpret as a pure hue and an alpha
					return "hsla(" + arg1 + ", 100%, 50%, " + arg2 + ")";
				}
				// args: (something, something, something)
				else if(arg4 === undefined) {
					if(modeIsRGB) {
						// Interpret as a red, green, and blue value
						return "rgb(" + arg1 + ", " + arg2 + ", " + arg3 + ")";
					}
					// interpret as a hue, saturation, and lightness value
					let typeofArg2 = typeof arg2;
					let typeofArg3 = typeof arg3;
					if(typeofArg2 === "number" || (typeofArg2 === "string" && !arg2.endsWith("%"))) arg2 += "%";
					if(typeofArg3 === "number" || (typeofArg3 === "string" && !arg3.endsWith("%"))) arg3 += "%";
					return "hsl(" + arg1 + ", " + arg2 + ", " + arg3 + ")";
				}
				// args: (something, something, something, something)
				if(modeIsRGB) {
					// interpret as a red, green, blue, and alpha value
					return "rgba(" + arg1 + ", " + arg2 + ", " + arg3 + ", " + arg4 + ")";
				}
				// interpret as a hue, saturation, lightness, and alpha value
				let typeofArg2 = typeof arg2;
				let typeofArg3 = typeof arg3;
				if(typeofArg2 === "number" || (typeofArg2 === "string" && !arg2.endsWith("%"))) arg2 += "%";
				if(typeofArg3 === "number" || (typeofArg3 === "string" && !arg3.endsWith("%"))) arg3 += "%";
				return "hsla(" + arg1 + ", " + arg2 + ", " + arg3 + ", " + arg4 + ")";
			}
			
			// Concatenates text information
			function getFont(getAsString = false) {
				if(getAsString) {
					let font = "";
					if(settings.text.italic) font += "italic ";
					if(settings.text.bold)   font += "bold ";
					font += settings.text.size + "px ";
					font += settings.text.font;
					return font;
				}
				return [
					settings.text.font,
					settings.text.size,
					settings.text.bold,
					settings.text.italic
				];
			}
			
			// Properties
			this.canvas = canvas;
			this.ctx	= ctx;
			this.width  = canvas.width;
			this.height = canvas.height;
			this.midW   = this.width / 2;
			this.midH   = this.height / 2;
			this.size   = new ice.physics.Vector(this.width, this.height);
			this.middle = new ice.physics.Vector(this.midW, this.midH);
			
			// Methods
			// Clears the canvas
			this.clear = function() {
				ctx.clearRect(0, 0, this.width, this.height);
			}
			
			// Draws a background
			this.background = function(arg1, arg2, arg3, arg4) {
				ctx.fillStyle = interpretColor(arg1, arg2, arg3, arg4, settings.bgColor);
				ctx.fillRect(0, 0, this.width, this.height);
			}
			
			// Sets the default background color
			this.setBackground = function(arg1, arg2, arg3, arg4) {
				return settings.bgColor = interpretColor(
					arg1, arg2, arg3, arg4, settings.bgColor
				);
			}
			
			// Resizes the canvas, and updates variables related to it's size
			this.resize = function(w, h = w) {
				canvas.width  = w;
				canvas.height = h;
				this.width    = w;
				this.height   = h;
				this.midW     = w / 2;
				this.midH     = h / 2;
				this.size.set(w, h);
				this.middle.set(w / 2, h / 2);
			}
			
			// Sets the fill color
			this.fill = function(arg1, arg2, arg3, arg4) {
				return settings.fill = interpretColor(
					arg1, arg2, arg3, arg4, settings.fill
				);
			}
			
			// Sets the stroke color
			this.stroke = function(arg1, arg2, arg3, arg4) {
				return settings.stroke = interpretColor(
					arg1, arg2, arg3, arg4, settings.stroke
				);
			}
			
			// Sets the stroke width (also lineWidth, "thickness", "thiccness")
			this.strokeWidth = function(width = settings.strokeWidth) {
				return settings.strokeWidth = width;
			}
			
			// Disables fill
			this.noFill = function() {
				settings.fill = false;
			}
			
			// Disables stroke
			this.noStroke = function () {
				settings.stroke = false;
			}
			
			// Sets the font family and/or size
			this.font = function(arg1, arg2) {
				if(typeof arg1 === "string") {
					settings.text.font = arg1;
					if(typeof arg2 === "number") {
						settings.text.size = arg2;
					}
				}
				else if(typeof arg1 === "number") {
					settings.text.size = arg1;
					if(typeof arg2 === "string") {
						settings.text.font = arg2;
					}
				}
				return getFont(false);
			}
			
			// Sets the text align
			this.textAlign = function(arg1, arg2) {
				let alignOptions = ["left", "right", "center", "start", "end"];
				let baseOptions  = ["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"];
				
				// If there is only one arg, try splitting it
				if(
					   typeof arg1 === "string" && arg2 === undefined
					&& (arg1.includes(" ") || arg1.includes(","))
				) [arg1, arg2] = arg1.split(/[ ,]+/);
				
				// Figure out which args are align and or base
				if(alignOptions.includes(arg1)) {
					settings.text.align = arg1;
					if(baseOptions.includes(arg2)) settings.text.base = arg2;
				}
				else if(baseOptions.includes(arg1)) {
					settings.text.base = arg1;
					if(alignOptions.includes(arg2)) settings.text.align = arg2;
				}
				return [settings.text.base, settings.text.align];
			}
			
			// Sets whether or not the text is bold
			this.bold = function(bold = settings.text.bold) {
				return settings.text.bold = bold;
			}
			
			// Sets whether or not the text is italic
			this.italic = function(italic = settings.text.italic) {
				return settings.text.italic = italic;
			}
			
			// Sets the color mode (can be "rgb" or "hsl")
			this.colorMode = function(mode) {
				if(typeof mode === "string") mode = mode.toLowerCase();
				if(mode === "rgb" || mode === "hsl") settings.colorMode = mode;
				return settings.colorMode;
			}
			
			// Sets the angle mode (can be "radians" or "degrees")
			this.angleMode = function(mode) {
				if(typeof mode === "string") mode = mode.toLowerCase();
				if(mode === "radians" || mode === "degrees") settings.angleMode = mode;
				return settings.angleMode;
			}
			
			// Saves the current canvas state to the transform stack
			this.push = function() {
				ctx.save();
			}
			
			// Restores the most recent canvas state from the transform stack
			this.pop = function() {
				ctx.restore();
			}
			
			// Sets the transform back to the identity matrix
			this.setTransform = function(scaleX, scaleY, skewX, skewY, moveX, moveY) {
				ctx.setTransform(scaleX, skewX, scaleY, skewY, moveX, moveY);
			}
			
			// Resets the transform back to the identity matrix
			this.resetTransform = function() {
				ctx.resetTransform();
			}
			
			// Translates the origin of the canvas
			this.translate = function(x, y) {
				ctx.translate(x, y);
			}
			
			// Rotates the canvas about a specified point, or the origin
			this.rotate = function(angle, x, y) {
				if(settings.angleMode === "degrees") angle = basics.deg(angle);
				if(y !== undefined) {
					ctx.translate(x, y);
					ctx.rotate(angle);
					ctx.translate(-x, -y);
				}
				else {
					ctx.rotate(angle);
				}
			}
			
			// Scales the canvas from a specified point, or the origin
			this.scale = function(scaleX, scaleY, x, y) {
				if(y !== undefined) {
					ctx.translate(x, y);
					ctx.scale(scaleX, scaleY);
					ctx.translate(-x, -y);
				}
				else {
					ctx.scale(scaleX, scaleY);
				}
			}
			
			// Draws a rectangle with given x, y, width, and height
			// Not to be confused with "rekt"
			this.rect = function(x, y, w, h = w) {
				if(prepFill())   ctx.fillRect  (x, y, w, h);
				if(prepStroke()) ctx.strokeRect(x, y, w, h);
			}
			
			// Draws an ellipse with given x, y, width, height, and rotation
			this.ellipse = function(x, y, w, h = w, rot = 0) {
				if(settings.angleMode === "degrees") rot = basics.deg(rot);
				ctx.beginPath();
				ctx.ellipse(x, y, w / 2, h / 2, rot, 0, basics.TAU);
				renderPath();
			}
			
			// Draws a circle with given x, y, and radius
			this.circle = function(x, y, rad = 8) {
				ctx.beginPath();
				ctx.arc(x, y, rad, 0, basics.TAU);
				renderPath();
			}
			
			// Draws a point (like circle, but expects a physics.Vector object)
			this.point = function(pos, rad = 1) {
				this.circle(pos.x, pos.y, rad);
			}
			
			// Draws a line from (x1, y1) to (x2, y2)
			// Can also accept two physics.Vector objects
			this.line = function(x1, y1, x2, y2) {
				// If there are only two arguments, assume they are physics.Vector objects
				if(x2 === undefined) {
					// The order here is important
					x2 = y1.x;
					y2 = y1.y;
					y1 = x1.y;
					x1 = x1.x;
				}
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				renderPath();
			}
			
			// Draws an equilateral triangle ("normal" triangle) with a center
			// at (x, y), a distance to each vertex dist, and an angle rot
			this.eqTriangle = (function() {
				let SIN_120 = basics.sin(basics.TAU / 3);
				let COS_120 = basics.cos(basics.TAU / 3);
				let SIN_240 = basics.sin(basics.TAU * 2 / 3);
				let COS_240 = basics.cos(basics.TAU * 2 / 3);
				return function(x, y, dist, rot) {
					// If there are only three arguments, assume (x, y) was a
					// physics.Vector object
					if(rot === undefined) {
						// The order here is important
						rot = dist;
						dist = y;
					 	y = x.y;
						x = x.x;
					}
					
					if(settings.angleMode === "degrees") rot = basics.deg(rot);
					
					// Calculate the vertices
					let sinRot = basics.sin(rot);
					let cosRot = basics.cos(rot);
					let x1 = x + cosRot * dist;
					let y1 = y + sinRot * dist;
					let x2 = x + cosRot * COS_120 - sinRot * SIN_120;
					let y2 = y + sinRot * COS_120 + cosRot * SIN_120;
					let x3 = x + cosRot * COS_240 - sinRot * SIN_240;
					let y3 = y + sinRot * COS_240 + cosRot * SIN_240;
					
					// Draw the triangle
					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.lineTo(x3, y3);
					renderPath();
				}
			})();
			
			// Draws an isosceles triangle (pizza slice like) with a "tip" at
			// (x, y), a length len, an angle theta, and an angle rot
			this.isoTriangle = function(x1, y1, len, theta, rot) {
				// Notes lmao: https://imgur.com/a/VpansE4
				// If there are only four arguments, assume (x, y) was a
				// physics.Vector object
				if(rot === undefined) {
					// The order here is important
					rot   = theta;
					theta = len;
					len   = y;
					y     = x.y;
					x     = x.x;
				}
				
				if(settings.angleMode === "degrees") rot = basics.deg(rot);
				
				// Partially solve the triangle
				let alpha = theta / 2;
				let edgeLength = basics.cos(alpha) * len;
				let v2Ang = rot + alpha;
				let v3Ang = rot - alpha;
				
				// Calculate the vertices
				let x2 = x1 + basics.cos(v2Ang) * edgeLength;
				let y2 = y1 + basics.sin(v2Ang) * edgeLength;
				let x3 = x1 + basics.cos(v3Ang) * edgeLength;
				let y3 = y1 + basics.sin(v3Ang) * edgeLength;
				
				// Draw the triangle
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x3, y3);
				renderPath();
			}
			
			// Draws a triangle given it's three vertices
			this.triangle = function(x1, y1, x2, y2, x3, y3) {
				// If there are only three arguments, assume they are physics.Vector objects
				if(v2y === undefined) {
					// The order here is important
					y3 = x2.y;
					x3 = x2.x;
					y2 = y1.y;
					x2 = y1.x;
					y1 = x1.y;
					x1 = x1.x;
				}
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x3, y3);
				renderPath();
			}
			
			// Draws a regular polygon with a center at (x, y), a number of
			// sides sides, a distance to each vertex dist, and an angle rot
			this.regPolygon = function(x, y, sides, dist, rot = 0) {
				sides = basics.floor(sides);
				if(sides <= 1) {
					this.circle(x, y, rad);
					return;
				}
				if(settings.angleMode === "degrees") rot = basics.deg(rot);
				rot -= basics.TAU / 4;
				
				ctx.beginPath();
				ctx.moveTo(x + (basics.cos(rot) * rad), y + (basics.sin(rot) * rad));
				let interiorAng = basics.TAU / sides;
				for(let angle = interiorAng; angle < basics.TAU; angle += interiorAng) {
					ctx.lineTo(
						x + (basics.cos(angle + rot) * rad),
						y + (basics.sin(angle + rot) * rad)
					);
				}
				ctx.closePath();
				renderPath();
			}
			
			// Draws a polygon given an array of vertices (must be physics.Vector objects)
			this.polygon = function(vertices) {
				if(vertices.length <= 1) return;
				ctx.beginPath();
				ctx.moveTo(vertices[0].x, vertices[0].y);
				for(let i = 1; i < vertices.length; i++) {
					ctx.lineTo(vertices[i].x, vertices[i].y);
				}
				ctx.closePath();
				renderPath();
			}
			
			// Draws text at a given location (x, y)
			this.text = function(text, x, y, maxWidth) {
				ctx.font = getFont(true);
				ctx.textAlign = settings.text.align;
				ctx.textBaseline = settings.text.base;
				if(prepFill()) ctx.fillText(text, x, y, maxWidth);
				if(prepStroke()) ctx.strokeText(text, x, y, maxWidth);
			}
			
			// Loads an image for use later
			this.loadImage = function(img, key) {
				// If no key is provided, cry and throw a fit
				if(key === undefined) {
					console.error(
						  "ice.graphics error: The ice.graphics.Scene.loadImage "
						+ "method requires both an image and a key!"
					);
					return;
				}
				// If the img is a source, create an image element
				if(typeof img === "string") {
					let imgElem = document.createElement("img");
					imgElem.src = img;
					// I don't even remotely understand this CORS shit, and this seems
					// to work the same (?) with and without this, but I think it's
					// probably better to have this here. idk. Future me,
					// pls fix this mess. ty <3 you
					imgElem.crossorigin = "anonymous";
					img = imgElem;
				}
				// Make sure img is an instance of HTMLImageElement
				if(!(img instanceof HTMLImageElement)) {
					console.error(
						  "ice.graphics error: The ice.graphics.Scene.loadImage "
						+ "method requires a valid image!"
					);
					return;
				}
				
				images[key] = img;
			}
			
			// Draws image at a given location (Image must be an instance of
			// HTMLImageElement, or a key for an image previously loaded with
			// loadImage)
			this.image = function(img, x, y, width, height, clipX, clipY, clipWidth, clipHeight) {
				// If we have the image loaded
				if(typeof img === "string" && images[img] !== undefined) {
					img = images[img];
				}
				// Ensure that the image is an instance of HTMLImageElement
				if(!(img instanceof HTMLImageElement)) {
					console.error(
						  "ice.graphics error: The ice.graphics.Scene.image "
						+ "method requires a valid image!"
					);
					return;
				}
				
				// Draw the image
				if(clipX === undefined) {
					if(width === undefined) {
						width = img.width;
						height = img.height;
					}
					ctx.drawImage(img, x, y, width, height);
				}
				else ctx.drawImage(img, clipX, clipY, clipWidth, clipHeight, x, y, width, height);
			}
			
			// Pixel editing
			this.pixel = (function(scene) {
				let pixel = {};
				let imgData;
				let open = false;
				
				// Prepares the scene for pixel editing
				pixel.open = function() {
					if(open) {
						console.error(
							  "ice.graphics error: ice.graphics.Scene.pixel.open "
							+ "method called, but the scene was already open for "
							+ "pixel editing!"
						);
						return;
					}
					open = true;
					imgData = ctx.getImageData(0, 0, scene.width, scene.height);
				}
				
				// Stops pixel editing for the scene
				pixel.close = function() {
					if(!open) {
						console.error(
							  "ice.graphics error: ice.graphics.Scene.pixel.close "
							+ "method called, but the scene was already closed to "
							+ "pixel editing!"
						);
						return;
					}
					open = false;
				}
				
				// Applies the pixel data to the scene
				pixel.apply = function() {
					ctx.putImageData(imgData, 0, 0);
				}
				
				// Sets a pixel's r, g, b, and a
				pixel.set = function(x, y, r, g, b, a) {
					let i = (y * scene.width + x) * 4;
					imgData.data[i] = r;
					imgData.data[i + 1] = g;
					imgData.data[i + 2] = b;
					imgData.data[i + 3] = a * 255;
				}
				
				return pixel;
			})(this);
		}
		
		// Properties
		graphics.RGB = "rgb";
		graphics.HSL = "hsl";
		
		logImport("graphics");
		return graphics;
	})();
	
	console.log(
		`%c---- ice.js ${version} Imported Successfully ----`,
		"font-weight: bold; font-size: 24px;"
	);

	return ice;
})();

// Callback for after ice has loaded
if(typeof iceInit !== "undefined" && typeof iceInit === "function") iceInit();