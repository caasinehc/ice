var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("graphics");
	ice.graphics = {};
	ice.graphics.version = "v2.2.3"; // This version of the ice.graphics module
	console.log("%cice.graphics " + ice.graphics.version + " imported successfully.", "color: #008000");

	/*
	 *	================ Graphics Module ================
	 */

	/*
	 *	TODO:
	 *		pixel, curve
	 *		scale, transform, rotate, and all that unnecessarily complicated bullsh*t
	 *		Charts
	 */

	// Private variables/functions

	var TAU = Math.PI * 2;
	var WHITE = "#FFFFFF";
	var BLACK = "#000000";
	var SILVER = "#C0C0C0";
	var DEG120 = degToRad(120);
	var DEG240 = degToRad(240);
	var SIN120 = Math.sin(DEG120);
	var COS120 = Math.cos(DEG120);
	var SIN240 = Math.sin(DEG240);
	var COS240 = Math.cos(DEG240);

	function degToRad(n) {
		return n * (Math.PI / 180);
	}
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
		return document.querySelector("canvas").getContext("2d");
	}
	function applyCssFilter(ctx, filter, value) {
		ctx.save();
		var buffer = document.createElement("canvas");
		buffer.width = ctx.canvas.width;
		buffer.height = ctx.canvas.height;
		var bufferCtx = buffer.getContext("2d");
		bufferCtx.drawImage(ctx.canvas, 0, 0);
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.filter = filter + "(" + value + ")"
		ctx.drawImage(buffer, 0, 0);
		ctx.restore();
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

		var ctx = this.ctx;

		var imgMem = {};

		var settings = {};
		settings.bgColor = WHITE;
		settings.fill = SILVER;
		settings.stroke = BLACK;
		settings.lineWidth = 2;
		settings.strokePattern = [];
		settings.fontFamily = "Verdana";
		settings.fontSize = 24;
		settings.textAlign = "start";
		settings.textBaseline = "alphabetic";
		settings.colorMode = "rgb";
		// settings.angleMode = "radians"; // TODO

		function interpretColor(arg1, arg2, arg3, arg4, defaultColor) {
			if(arg1 === undefined) {
				return defaultColor === undefined ? WHITE : defaultColor;
			}
			modeIsRGB = settings.colorMode === "rgb";
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
		function prepFill() {
			if(settings.fill) {
				ctx.fillStyle = settings.fill;
				return true;
			}
			return false;
		}
		function prepStroke() {
			if(settings.stroke) {
				ctx.strokeStyle = settings.stroke;
				ctx.lineWidth = settings.lineWidth;
				ctx.setLineDash(settings.strokePattern);
				return true;
			}
			return false;
		}
		function renderPath() {
			if(prepFill()) {
				ctx.fill();
			}
			if(prepStroke()) {
				ctx.stroke();
			}
		}
		this.background = function(arg1, arg2, arg3, arg4) {
			this.ctx.fillStyle = interpretColor(arg1, arg2, arg3, arg4, settings.bgColor);
			this.ctx.fillRect(0, 0, this.width, this.height);
		}
		this.setBackground = function(arg1, arg2, arg3, arg4) {
			return settings.bgColor = interpretColor(arg1, arg2, arg3, arg4, settings.bgColor);
		}
		this.fill = function(arg1, arg2, arg3, arg4) {
			return settings.fill = interpretColor(arg1, arg2, arg3, arg4, settings.fill);
		}
		this.stroke = function(arg1, arg2, arg3, arg4) {
			return settings.stroke = interpretColor(arg1, arg2, arg3, arg4, settings.stroke);
		}
		this.lineWidth = function(width) {
			return settings.lineWidth = width === undefined ? settings.lineWidth : width;
		}
		this.strokePattern = function(pattern) {
			return settings.strokePattern = pattern === undefined ? settings.strokePattern : pattern;
		}
		this.noFill = function() {
			settings.fill = false;
		}
		this.noStroke = function() {
			settings.stroke = false;
		}
		this.font = function(arg1, arg2) {
			if(typeof arg1 === "string") {
				settings.fontFamily = arg1;
				if(typeof arg2 === "number") {
					settings.fontSize = arg2;
				}
			}
			else if(typeof arg1 === "number") {
				settings.fontSize = arg1;
				if(typeof arg2 === "string") {
					settings.fontFamily = arg2;
				}
			}
			return getFont();
		}
		function getFont() {
			return settings.fontSize + "px " + settings.fontFamily;
		}
		this.textAlign = function(arg1, arg2) {
			if(arg1 === "left" || arg1 === "right" || arg1 === "center" || arg1 === "start" || arg1 === "end") {
				settings.textAlign = arg1;
				if(arg2 === "top" || arg2 === "hanging" || arg2 === "middle" || arg2 === "alpabetic" || arg2 === "ideographic" || arg2 === "bottom") {
					settings.textBaseline = arg2;
				}
			}
			else if(arg1 === "top" || arg1 === "hanging" || arg1 === "middle" || arg1 === "alpabetic" || arg1 === "ideographic" || arg1 === "bottom") {
				settings.textBaseline = arg1;
				if(arg2 === "left" || arg2 === "right" || arg2 === "center" || arg2 === "start" || arg2 === "end") {
					settings.textAlign = arg2;
				}
			}
		}
		this.colorMode = function(mode) {
			mode = mode.toLowerCase();
			if(mode === "rgb" || mode === "hsl") {
				settings.colorMode = mode;
			}
			return mode;
		}
		this.rect = function(x, y, w, h) {
			h = h === undefined ? w : h;
			if(prepFill()) this.ctx.fillRect(x, y, w, h);
			if(prepStroke()) this.ctx.strokeRect(x, y, w, h);
		}
		this.ellipse = function(x, y, w, h, ang) {
			ang = ang === undefined ? 0 : ang;
			h = h === undefined ? w : h;
			this.ctx.beginPath();
			this.ctx.ellipse(x, y, w, h, ang, 0, TAU)
			renderPath();
		}
		this.circle = function(x, y, rad) {
			rad = rad === undefined ? 8 : rad;
			this.ctx.beginPath();
			this.ctx.arc(x, y, rad, 0, TAU);
			renderPath();
		}
		this.point = function(pos, size) {
			size = size === undefined ? 1 : size;
			this.circle(pos.x, pos.y, size);
		}
		this.line = function(x1, y1, x2, y2) {
			this.ctx.beginPath();
			if(x2 === undefined) {
				this.ctx.moveTo(x1.x, x1.y);
				this.ctx.lineTo(y1.x, y1.y);
			}
			else {
				this.ctx.moveTo(x1, y1);
				this.ctx.lineTo(x2, y2);
			}
			renderPath();
		}
		this.triangle = function(cx, cy, v1x, v1y) {
			if(v1y === undefined) {
				v1y = v1x;
				v1x = 0;
			}

			var v2x = v1x * COS120 - v1y * SIN120;
			var v2y = v1x * SIN120 + v1y * COS120;
			var v3x = v1x * COS240 - v1y * SIN240;
			var v3y = v1x * SIN240 + v1y * COS240;

			this.ctx.beginPath();
			this.ctx.moveTo(cx + v1x, cy + v1y);
			this.ctx.lineTo(cx + v2x, cy + v2y);
			this.ctx.lineTo(cx + v3x, cy + v3y);
			this.ctx.closePath();
			renderPath();
		}
		this.regPolygon = function(x, y, sides, rad, rotation) {
			sides = Math.floor(sides);
			if(sides <= 1) {
				this.circle(x, y, rad);
				return;
			}
			rotation = (rotation || 0) - (TAU / 4);
			this.ctx.beginPath();
			this.ctx.moveTo(x + (Math.cos(rotation) * rad), y + (Math.sin(rotation) * rad));
			for(let angle = TAU / sides; angle < TAU; angle += TAU / sides) {
				this.ctx.lineTo(
					x + (Math.cos(angle + rotation) * rad),
					y + (Math.sin(angle + rotation) * rad)
				);
			}
			this.ctx.closePath();
			renderPath();
		}
		this.polygon = function(points) {
			if(!points instanceof Array || points.length <= 0) {
				return;
			}
			if(points.length === 1) {
				this.point(points[0]);
				return;
			}
			this.ctx.beginPath();
			this.ctx.moveTo(points[0].x, points[0].y);
			for(let i = 1; i < points.length; i++) {
				this.ctx.lineTo(points[i].x, points[i].y);
			}
			this.ctx.closePath();
			renderPath();
		}
		this.lines = function(points) {
			if(!points instanceof Array || points.length <= 0) {
				return;
			}
			if(points.length === 1) {
				this.point(points[0]);
				return;
			}
			this.ctx.beginPath();
			this.ctx.moveTo(points[0].x, points[0].y);
			for(let i = 1; i < points.length; i++) {
				this.ctx.lineTo(points[i].x, points[i].y);
			}
			if(prepStroke()) ctx.stroke();
		}
		this.image = function(img, x, y, w, h, sx, sy, sw, sh, taintCanvas) {
			if(typeof img === "string") {
				if(imgMem[img] === undefined) {
					var tempImg = new Image();
					tempImg.src = img;
					if(!taintCanvas) {
						tempImg.crossOrigin = "anonymous";
					}
					tempImg.onload = (e) => {
						imgMem[img] = tempImg;
						console.log("this: ", this);
						this.image(img, x, y, w, h, sx, sy, sw, sh, taintCanvas);
					}
					return;
				}
				img = imgMem[img];
			}
			x = x === undefined ? 0 : x;
			y = y === undefined ? 0 : y;
			w = w === undefined ? this.width : w;
			h = h === undefined ? this.height : h;
			if(sx === undefined) {
				this.ctx.drawImage(img, x, y, w, h);
			}
			else {
				this.ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
			}
		}
		this.charts = {};
		this.charts.pie = function(x, y, rad, data, rotation) {
			rotation = (rotation === undefined ? 0 : rotation) - Math.PI / 2;

			if(data.rings === undefined) {
				data.rings = [{slices: data.slices}];
			}

			data.rings.reverse();

			data._ringTotal = 0;
			for(var ring of data.rings) {
				ring._sliceTotal = 0;
				for(var key of ring.slices.keys()) {
					var slice = ring.slices[key];
					if(typeof slice === "string") {
						ring.slices[key] = {color: slice};
					}
					if(slice.size === undefined) {
						if(slice.data !== undefined) {
							slice.size = slice.data;
						}
						else if(slice.value !== undefined) {
							slice.size = slice.value;
						}
						else {
							slice.size = 1;
						}
					}
					ring._sliceTotal += slice.size;
				}
				ring.size = ring.size === undefined ? 1 : ring.size;
				data._ringTotal += ring.size;
			}

			var offsetRad = rad;
			for(var ring of data.rings) {
				var thisRad = rad * (ring.size / data._ringTotal);
				var offsetAngle = rotation;
				for(var slice of ring.slices) {
					var thisAngle = (TAU * slice.size / ring._sliceTotal);
					var angle2 = thisAngle + offsetAngle;
					ctx.beginPath();
					ctx.moveTo(x, y);
					ctx.arc(x, y, offsetRad, offsetAngle, angle2, false);
					ctx.arc(x, y, offsetRad - thisRad, angle2, offsetAngle, true);
					ctx.fillStyle = slice.color;
					ctx.fill();
					offsetAngle += thisAngle;
				}
				offsetRad -= thisRad;
			}
		}
	}
	// -----------------------------------------------------
	ice.graphics.Scene.prototype.clear = function() {
		this.ctx.clearRect(0, 0, this.width, this.height);
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
