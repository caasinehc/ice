/*	TO ADD

var charts = {};
charts.pie = function(x, y, rad, data, rotation) {

	rotation = (rotation === undefined ? 0 : rotation) - Math.PI / 2;

	if(data.rings === undefined) {
		data.rings = [{slices: data.slices}];
	}

	data._ringTotal = 0;
	for(let ring of data.rings) {
		ring._sliceTotal = 0;
		for(let slice of ring.slices) {
			slice.size = slice.size === undefined ? 1 : slice.size;
			ring._sliceTotal += slice.size;
		}
		ring.size = ring.size === undefined ? 1 : ring.size;
		data._ringTotal += ring.size;
	}

	data.rings.reverse();
	let offsetRad = rad;
	for(let ring of data.rings) {
		let thisRad = rad * (ring.size / data._ringTotal);
		let offsetAngle = rotation;
		for(let slice of ring.slices) {
			let thisAngle = TAU * (slice.size / ring._sliceTotal);
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.arc(x, y, offsetRad, offsetAngle, offsetAngle + thisAngle);
			ctx.fillStyle = slice.color;
			ctx.fill();
			offsetAngle += thisAngle;
		}
		offsetRad -= thisRad;
	}
}

// Usage:
// 	charts.pie(200, 200, 100, {
// 		rings: [
// 			{ // Innermost ring
// 				size: 5,
// 				slices: [
// 					{size: 2, color: colorList[0]},
// 					{size: 8, color: colorList[1]},
// 					{size: 1, color: colorList[2]}
// 				]
// 			},
// 			{ // You can have as many rings as you want
// 				size: 12,
// 				slices: [
// 					{size: 2, color: colorList[3]},
// 					{size: 4, color: colorList[4]},
// 					{size: 4, color: colorList[5]}
// 				]
// 			},
// 			{ // Outer ring
// 				size: 25,
// 				slices: [
// 					{size: 45, color: colorList[6]},
// 					{size: 55, color: colorList[7]}
// 				]
// 			}
// 		]
// 	}, 0);

*/

var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("graphics");
	ice.graphics = {};
	ice.graphics.version = "v2.1.3"; // This version of the ice.graphics module
	console.log("%cice.graphics " + ice.graphics.version + " imported successfully.", "color: #008000");

	/*
	 *	================ Graphics Module ================
	 */

	/*
	 *	TODO:
	 *		draw many shapes (pixel, ellipse, regPoly, polygon, parabola, quadratic curve, bezier curve)
	 *		scale, transform, rotate, and all that unnecessarily complicated bullsh*t
	 */

	// Private variables/functions

	var TAU = Math.PI * 2;
	function interpretCtx(input) {
		if(typeof input === "string") {
			var possibleCanvas = document.querySelector(input);
			if(possibleCanvas instanceof HTMLCanvasElement) {
				return possibleCanvas.getContext("2d");
			}
		}
		else if(input instanceof HTMLCanvasElement) {
			return input.getContext("2d");
		}
		else if(input instanceof HTMLCanvasElement) {
			return input;
		}
		document.querySelector("canvas");
	}
	var WHITE = "#FFFFFF";
	var BLACK = "#000000";
	var SILVER = "#C0C0C0";
	function applyCssFilter(ctx, filter, value) {
		ctx.save();
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.filter = filter + "(" + value + ")"
		ctx.drawImage(ctx.canvas, 0, 0);
		ctx.restore();
	}
	function interpretColor(arg1, arg2, arg3, arg4, defaultColor, modeIsRGB) {
		if(arg1 === undefined) {
			return defaultColor === undefined ? WHITE : defaultColor;
		}
		modeIsRGB = modeIsRGB === undefined ? true : modeIsRGB;
		var arg1IsNumber = typeof arg1 === "number";
		if(arg2 === undefined) {
			if(arg1IsNumber) {
				if(modeIsRGB) {
					return "rgb(" + arg1 + ", " + arg1 + ", " + arg1 + ")";
				}
				return "hsl(" + arg1 + ", 100%, 50%)";
			}
			if(arg1 instanceof Array) {
				return interpretColor(arg1[0], arg1[1], arg1[2], arg1[3], defaultColor, modeIsRGB);
			}
			return arg1;
		}
		else if(arg3 === undefined) {
			if(modeIsRGB) {
				return "rgba(" + arg1 + ", " + arg1 + ", " + arg1 + ", " + arg2 + ")";
			}
			return "hsla(" + arg1 + ", 100%, 50%, " + arg2 + ")";
		}
		else if(arg4 === undefined) {
			if(modeIsRGB) {
				return "rgb(" + arg1 + ", " + arg2 + ", " + arg3 + ")";
			}
			var typeofArg2 = typeof arg2;
			var typeofArg3 = typeof arg3;
			if(typeofArg2 === "number" || (typeofArg2 === "string" && !arg2.endsWith("%"))) arg2 += "%";
			if(typeofArg3 === "number" || (typeofArg3 === "string" && !arg3.endsWith("%"))) arg3 += "%";
			return "hsl(" + arg1 + ", " + arg2 + ", " + arg3 + ")";
		}
		if(modeIsRGB) {
			return "rgba(" + arg1 + ", " + arg2 + ", " + arg3 + ", " + arg4 + ")";
		}
		var typeofArg2 = typeof arg2;
		var typeofArg3 = typeof arg3;
		if(typeofArg2 === "number" || (typeofArg2 === "string" && !arg2.endsWith("%"))) arg2 += "%";
		if(typeofArg3 === "number" || (typeofArg3 === "string" && !arg3.endsWith("%"))) arg3 += "%";
		return "hsla(" + arg1 + ", " + arg2 + ", " + arg3 + ", " + arg4 + ")";
	}

	// Constructors

	ice.graphics.Scene = function(ctxInput) {
		if(!(this instanceof ice.graphics.Scene)) {
			return new ice.graphics.Scene(ctxInput);
		}

		this.ctx = interpretCtx(ctxInput);
		this.canvas = this.ctx.canvas;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.midWidth = this.width / 2;
		this.midHeight = this.height / 2;

		var settings = {};
		settings.bgColor = WHITE;
		settings.fill = SILVER;
		settings.stroke = BLACK;
		settings.lineWidth = 2;
		settings.strokePattern = [];
		settings.fontFamily = "Verdana";
		settings.fontSize = 24;
		settings.textAlign: "start";
		settings.textBaseline = "alphabetic";
		settings.colorMode = "rgb";

		function prepFill() {
			if(settings.fill) {
				this.ctx.fillStyle = settings.fill;
				return true;
			}
			return false;
		}
		function prepStroke() {
			if(settings.stroke) {
				this.ctx.strokeStyle = settings.stroke;
				this.ctx.lineWidth = settings.lineWidth;
				this.ctx.setLineDash(settings.strokePattern);
				return true;
			}
			return false;
		}
		function renderPath() {
			if(prepFill()) {
				this.ctx.fill();
			}
			if(prepStroke) {
				this.ctx.stroke();
			}
		}
	}
	ice.graphics.Scene.prototype.background = function(arg1, arg2, arg3, arg4) {
		this.ctx.fillStyle = interpretColor(arg1, arg2, arg3, arg4, settings.bgColor, settings.colorMode === "rgb");
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
	// YOU JUST STOPPED HERE
	ice.graphics.Scene.prototype.clear = function() {
		this.ctx.save();
		this.ctx.fillStyle = this.bgColor;
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.restore();
	}
	ice.graphics.Scene.prototype.download = function(name) {
		/*
		 *	Quick warning: This will NOT work on a "tainted" canvas (ie: one that used an image without CORS approval)
		 *	This is a security issue. It's annoying, but necessary.
		 *	(un)Fortunately, there is no work-around if the canvas has already been tainted.
		 *	For more info, visit: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
		 */
		var link = document.createElement("a");
		link.href = this.canvas.toDataURL();
		link.download = name || "download";
		link.click();
	}
	ice.graphics.Scene.prototype.move = function(x, y) {
		var content = this.ctx.getImageData(0, 0, this.width, this.height);
		this.clear();
		this.ctx.putImageData(content, x, y);
	}
	ice.graphics.Scene.prototype.invert = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter(this.ctx, "invert", percent);
	}
	ice.graphics.Scene.prototype.grayscale = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter(this.ctx, "grayscale", percent);
	}
	ice.graphics.Scene.prototype.sepia = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter(this.ctx, "sepia", percent);
	}
	ice.graphics.Scene.prototype.brightness = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter(this.ctx, "brightness", percent);
	}
	ice.graphics.Scene.prototype.contrast = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter(this.ctx, "contrast", percent);
	}
	ice.graphics.Scene.prototype.blur = function(px) {
		px = px === undefined ? "1px" : px + "px";
		applyCssFilter(this.ctx, "blur", px);
	}
	ice.graphics.Scene.prototype.saturate = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter(this.ctx, "saturate", percent);
	}
	ice.graphics.Scene.prototype.opacity = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter(this.ctx, "opacity", percent);
	}
	ice.graphics.Scene.prototype.colorshift = function(degrees) {
		degrees = degrees === undefined ? "180deg"  : degrees + "deg";
		applyCssFilter(this.ctx, "hue-rotate", degrees);
	}
	ice.graphics.Scene.prototype.recolor = function(color) {
		this.ctx.save();
		this.ctx.globalCompositeOperation = "color";
		this.ctx.fillStyle = color || this.color;
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.restore();
	}
	ice.graphics.Scene.prototype.drawPoint = function(x, y, color, thickness) {
		thickness = thickness || this.thickness;
		this.ctx.beginPath();
		this.ctx.arc(x, y, thickness, 0, TAU);
		this.ctx.fillStyle = color || this.color;
		this.ctx.fill();
	}
	ice.graphics.Scene.prototype.drawLine = function(x1, y1, x2, y2, color, thickness, cap) {
		this.ctx.lineWidth = thickness || this.thickness;
		this.ctx.strokeStyle = color || this.color;
		this.ctx.lineCap = cap || "butt";
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}
	ice.graphics.Scene.prototype.fillCircle = function(x, y, rad, color) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, rad, 0, TAU);
		this.ctx.fillStyle = color || this.color;
		this.ctx.fill();
	}
	ice.graphics.Scene.prototype.strokeCircle = function(x, y, rad, color, thickness) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, rad, 0, TAU);
		this.ctx.lineWidth = thickness || this.thickness;
		this.ctx.strokeStyle = color || this.color;
		this.ctx.stroke();
	}
	ice.graphics.Scene.prototype.fillRect = function(x, y, width, height, color) {
		this.ctx.fillStyle = color || this.color;
		this.ctx.fillRect(x, y, width, height);
	}
	ice.graphics.Scene.prototype.strokeRect = function(x, y, width, height, color, thickness) {
		ctx.lineWidth = thickness || this.thickness;
		ctx.strokeStyle = color || this.color;
		ctx.strokeRect(x, y, width, height);
	}
	ice.graphics.Scene.prototype.fillPoly = function(points, color) {
		this.ctx.beginPath();
		this.ctx.moveTo(points[0].x, points[0].y);
		for(var i = 1; i < points.length; i++) {
			this.ctx.lineTo(points[i].x, points[i].y);
		}
		this.ctx.fillStyle = color || this.color;
		this.ctx.fill();
	}
	ice.graphics.Scene.prototype.strokePoly = function(points, color, thickness) {
		this.ctx.beginPath();
		this.ctx.moveTo(points[0].x, points[0].y);
		for(var i = 1; i < points.length; i++) {
			this.ctx.lineTo(points[i].x, points[i].y);
		}
		this.ctx.strokeStyle = color || this.color;
		this.ctx.lineWidth = thickness || this.thickness;
		this.ctx.stroke();
	}
	ice.graphics.Scene.prototype.fillText = function(text, x, y, family, size, color, align, bold, italic, base, maxWidth) {
		this.ctx.font = (italic ? "italic " : "") + (bold ? "bold " : "") + size + "px " + family;
		this.ctx.textAlign = align || "start";
		this.ctx.textBaseline = base || "alphabetic";
		this.ctx.fillStyle = color || this.color;
		this.ctx.fillText(text, x, y, maxWidth);
	}
	ice.graphics.Scene.prototype.fillText = function(text, x, y, family, size, color, align, bold, italic, base, maxWidth) {
		this.ctx.font = (italic ? "italic " : "") + (bold ? "bold " : "") + size + "px " + family;
		this.ctx.textAlign = align || "start";
		this.ctx.textBaseline = base || "alphabetic";
		this.ctx.fillStyle = color || this.color;
		this.ctx.lineWidth = thickness || this.thickness;
		this.ctx.strokeText(text, x, y, maxWidth);
	}
	ice.graphics.Scene.prototype.drawImage = function(img, x, y, width, height, clipX, clipY, clipWidth, clipHeight, taintCanvas) {
		if(typeof img === "string") {
			var image = new Image();
			image.src = img;
			if(!taintCanvas) {
				image.crossOrigin = "anonymous";
			}
			image.onload = function(e) {
				this.ctx.drawImage(image, clipX, clipY, clipWidth, clipHeight, x, y, width, height);
			}
		}
		else {
			this.ctx.drawImage(img, clipX, clipY, clipWidth, clipHeight, x, y, width, height);
		}
	}
	ice.graphics.Scene.prototype.save = function() {
		return this.ctx.getImageData(0, 0, this.width, this.height);
	}
	ice.graphics.Scene.prototype.restore = function(imageData) {
		this.ctx.putImageData(imageData, 0, 0);
	}

	// Duplicates

	ice.graphics.Scene.prototype.greyscale = ice.graphics.Scene.prototype.grayscale;

	// Methods

	return ice;
}(ice || {}));
