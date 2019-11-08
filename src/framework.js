/*
 * framework.js
 * v2.0.2
 * By Isaac Chen
 * Last Updated: 11/8/2019
 */

let canvas, scene, inputListener, clock;
let mouseX, mouseY, prevMouseX, prevMouseY, mousePos, prevMousePos;
var tick, render;
if(typeof tick   !== "function") tick   = function() {};
if(typeof render !== "function") render = function() {};

function iceInit() {
	// Uses this magical shit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
	
	// Globalize the modules
	(function() {
		// ice.crypto can't be globalized, as "crypto" is already a thing in the browser
		({debug, dom, math, time, colors, physics, graphics} = ice);
		
		// Debug
		({
			log, info, warn, err, aval, testFunction, summonDebugDoug
		} = debug);
		
		// Dom
		// Excludes $, because JQuery.
		({
			InputListener, append, appendBefore, appendAfter, remove, getParent,
			getSiblings, getChildren, getPrevSibling, getNextSibling, getTitle,
			setTitle, getURL, fullscreen, exitFullscreen, getFullscreen,
			pointerLock, getPointerLock, getPointerLockElem, create, createA,
			createBr, createButton, createCanvas, createDiv, createH1, createH2,
			createH3, createH4, createH5, createH6, createImg, createP,
			createProgress, createSpan
		} = dom);
		
		// Crypto
		// ice.crypto can't be globalized, as "crypto" is already a thing in the browser
		({
			sha256
		} = ice.crypto);
		
		// Math
		({
			PerlinNoiseMono, PerlinNoise, PI, TAU, E, PHI, SQRT2, deg, rad,
			randomInt, randomFloat, randomFrom, random, randomGaussian, chance,
			coinFlip, pythag, pythagSq, dist, distSq, map, isPrime, factors,
			gcd, lcm, fibonacci, clamp, binary, sigmoid, abs, sign, min, max,
			round, floor, ceil, trunc, sqrt, cbrt, /*log, */log2, log10, exp,
			pow, fround, clz32, sin, cos, tan, asin, acos, atan, sinh, cosh,
			tanh, asinh, acosh, atanh
		} = math);
		
		// Time
		({
			Clock, delay, sleep
		} = time);
		
		// Colors
		({
			RED, ORANGE, YELLOW, CHARTREUSE, GREEN, MINT, CYAN, CERULEAN, BLUE,
			PURPLE, MAGENTA, PINK, SALMON, LIGHT_RED, PEACH, LIGHT_ORANGE,
			CANARY, LIGHT_YELLOW, KEYLIME, LIGHT_CHARTREUSE, SHAMROCK,
			LIGHT_GREEN, SEAFOAM, LIGHT_MINT, SKY, LIGHT_CYAN, CORNFLOWER,
			LIGHT_CERULEAN, PERIWINKLE, LIGHT_BLUE, LAVENDER, LIGHT_PURPLE,
			ORCHID, LIGHT_MAGENTA, CARNATION, LIGHT_PINK, MAROON, DARK_RED,
			RUST, DARK_ORANGE, OLIVE, DARK_YELLOW, BASIL, DARK_CHARTREUSE,
			FOREST, DARK_GREEN, PINE, DARK_MINT, TEAL, DARK_CYAN, COBALT,
			DARK_CERULEAN, NAVY, DARK_BLUE, EGGPLANT, DARK_PURPLE, PLUM,
			DARK_MAGENTA, BEETROOT, DARK_PINK, WHITE, SILVER, LIGHT_GRAY, GRAY,
			CHARCOAL, DARK_GRAY, BLACK, BROWN, GOLD, SEPIA, CLEAR, hues, tints,
			shades, grayscale, /*misc, */huesExt, /*all, */GREY, LIGHT_GREY,
			DARK_GREY, TRANSPARENT, GREYSCALE, /*interpret, */hexToRgb,
			rgbToHex, rgbToHsl, hslToRgb, hslToHex, hexToHsl/*, random, lerp,
			invert*/
		} = colors);
		
		// Physics
		({
			Vector, origin, unit/*, random*/
		} = physics);
		
		// Graphics
		({
			Scene, RGB, HSL
		} = graphics);
	})();
	
	// The main framework stuff
	canvas = append(createCanvas(800, 600));
	canvas.style.border = "4px solid black";
	canvas.style.userSelect = "none";
	canvas.style.outline = "none";
	canvas.addEventListener("contextmenu", function(e) {
		e.preventDefault();
	});
	scene = new Scene(canvas);
	inputListener = new InputListener(canvas);
	clock = new Clock();
	
	// Globalize scene
	({
		ctx, width, height, midW, midH, size, middle, clear, background,
		setBackground, resize, fill, stroke, strokeWidth, noFill, noStroke,
		font, textAlign, bold, italic, colorMode, angleMode, push, pop,
		setTransform, resetTransform, translate, rotate, scale, rect, ellipse,
		circle, point, line, eqTriangle, isoTriangle, triangle, regPolygon,
		polygon, text, loadImage, image, pixel
	} = scene);
	
	// Globalize inputListener
	({
		key, mouse
	} = inputListener);
	
	// Globalize clock
	({
		/*status, */start, pause, resume, tickRate, /*tick,
		kill*/
	} = clock);
	
	// Final initialization
	ice.meta.framework.initialized = true;
	
	clock.tick = function() {
		tick();
		render();
	}
	clock.start();
	
	// Call the init function (user defined)
	if(typeof init !== "undefined") init();
}
// If ice is already loaded (will be the case *most* of the time)
if(typeof ice !== "undefined") iceInit();