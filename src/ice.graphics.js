var ice = (function(ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("graphics");
	ice.graphics = {};
	ice.graphics.version = "v2.2.5"; // This version of the ice.graphics module
	console.log("%cice.graphics " + ice.graphics.version + " imported successfully.", "color: #008000");

	/*
	 *	================ Graphics Module ================
	 */

	/*
	 *	TODO:
	 *		pixel, curve
	 *		scale, transform, rotate, and all that unnecessarily complicated bullsh*t
	 *		charts: bar, line, scatter
	 */

	// Private variables/functions

	var TAU = Math.PI * 2;
	var WHITE = "#FFFFFF";
	var BLACK = "#000000";
	var SILVER = "#C0C0C0";
	var TRANSPARENT = "rgba(0, 0, 0, 0)";
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
		if(input === undefined) {
			return document.querySelector("canvas").getContext("2d");
		}
		if(typeof input === "string") {
			var possibleCanvas = document.querySelector(input);
			if(possibleCanvas instanceof HTMLCanvasElement) {
				return possibleCanvas.getContext("2d");
			}
		}
		else if(input instanceof HTMLCanvasElement) {
			return input.getContext("2d");
		}
		return input;
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

		var canvas = this.canvas;
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

		var bufferCanvas = document.createElement("canvas");
		bufferCanvas.width = this.width;
		bufferCanvas.height = this.height;
		var bufferCtx = bufferCanvas.getContext("2d");

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
				if(arg1 instanceof Array || arg1 instanceof Uint8ClampedArray) {
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

		function applyCssFilter(filter, value) {
			ctx.save();
			bufferCtx.drawImage(canvas, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.filter = filter + "(" + value + ")";
			ctx.drawImage(bufferCanvas, 0, 0);
			ctx.restore();
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
		this.charts.pie = function(x, y, rad, dataIn, rotation) {
			rotation = (rotation === undefined ? 0 : rotation) - Math.PI / 2;

			var data = {
				rings: [],
				ringTotal: 0
			};
			var ringsIn = dataIn.rings === undefined ? [{
				slices: dataIn.slices
			}] : dataIn.rings;
			for(var ring of ringsIn) {
				var slices = [];
				var total = 0;
				var lineWidth = 0;
				if(ring.lineWidth !== undefined) lineWidth = ring.lineWidth;
				else if(ring.width !== undefined) lineWidth = ring.width;
				var size = 1;
				if(ring.size !== undefined) size = ring.size;
				else if(ring.value !== undefined) size = ring.value;
				else if(ring.data !== undefined) size = ring.data;
				var slicesIn = ring.slices === undefined ? [] : ring.slices;
				for(var slice of slicesIn) {
					var sliceSize = slice.size === undefined ? 1 : slice.size;
					var color = slice.color === undefined ? typeof slice === "string" ? slice : TRANSPARENT : slice.color;
					var border = slice.border === undefined ? BLACK : slice.border;
					var sliceLineWidth = 0;
					if(slice.lineWidth !== undefined) sliceLineWidth = slice.lineWidth;
					else if(slice.width !== undefined) sliceLineWidth = slice.width;
					slices.push({
						size: sliceSize,
						color: color,
						border: border,
						lineWidth: sliceLineWidth
					});
					total += sliceSize;
				}
				data.rings.push({
					size: size,
					slices: slices,
					lineWidth: lineWidth,
					sliceTotal: total
				});
				data.ringTotal += size;
			}

			var offsetRad = rad;
			bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
			for(var ring of data.rings) {
				var thisRad = rad * (ring.size / data.ringTotal);
				var offsetAngle = rotation;
				for(var slice of ring.slices) {
					var thisAngle = (TAU * slice.size / ring.sliceTotal);
					bufferCtx.beginPath();
					bufferCtx.moveTo(x, y);
					bufferCtx.arc(x, y, offsetRad, offsetAngle, thisAngle + offsetAngle);
					bufferCtx.closePath();
					bufferCtx.fillStyle = slice.color;
					bufferCtx.fill();
					if(slice.lineWidth) {
						bufferCtx.strokeStyle = slice.border;
						bufferCtx.lineWidth = slice.lineWidth;
						bufferCtx.stroke();
					}
					offsetAngle += thisAngle;
				}
				bufferCtx.save();
				if(ring.lineWidth) {
					bufferCtx.beginPath();
					bufferCtx.arc(x, y, offsetRad, 0, TAU);
					bufferCtx.strokeStyle = ring.border;
					bufferCtx.lineWidth = ring.lineWidth;
					bufferCtx.stroke();
				}
				offsetRad -= thisRad;
				if(offsetRad < 0) offsetRad = 0;
				bufferCtx.beginPath();
				bufferCtx.arc(x, y, offsetRad, 0, TAU);
				bufferCtx.globalCompositeOperation = "destination-out";
				bufferCtx.fillStyle = "black";
				bufferCtx.fill();
				bufferCtx.restore();
			}
			ctx.drawImage(bufferCanvas, 0, 0);
		}

		this.charts.presets = {};
		// These are just for the lols
		this.charts.presets.PYRAMID = {
			rings: [
				{
					lineWidth: 1,
					slices: [
						{
							color: "#80C0FF",
							size: 6
						}, // Sky
						{
							color: "#705000",
							size: 1,
							lineWidth: 1
						}, // Shady side
						{
							color: "#FFD060",
							size: 3,
							lineWidth: 1
						}, // Sunny side
						{
							color: "#80C0FF",
							size: 6
						} // Sky
					]
				}
			]
		};
		this.charts.presets.PACMAN = {
			slices: [
				{
					color: "yellow",
					size: 3
				}, // Eyes area (yellow)
				{
					color: "black",
					size: 4
				}, // Mouth
				{
					color: "yellow",
					size: 3
				}, // Chin area (yellow)
				{
					color: "yellow",
					size: 10
				} // Body area (yellow)
			]
		};
		this.charts.presets.PACMAN2 = {
			slices: [
				{
					color: "yellow",
					size: 3
				}, // Eyes area (yellow)
				{
					color: "#FE0000",
					size: 1
				}, // Blinky
				{
					color: "#00CDFF",
					size: 1
				}, // Inky
				{
					color: "#FFA800",
					size: 1
				}, // Clyde
				{
					color: "#FFA7DD",
					size: 1
				}, // Pinky
				{
					color: "yellow",
					size: 3
				}, // Chin area (yellow)
				{
					color: "yellow",
					size: 10
				} // Body area (yellow)
			]
		};
		this.charts.presets.BUTT = {
			rings: [
				{
					slices: [
						{
							color: "#FFCB99",
							size: 50
						}, // Right cheek
						{
							color: "black",
							size: 1
						}, // Crack
						{
							color: "#FFCB99",
							size: 50
						}, // Left cheek
					]
				}
			]
		};
		this.clear = function() {
			ctx.clearRect(0, 0, this.width, this.height);
		}
		this.getPixel = function(x, y) {
			return ctx.getImageData(x, y, 1, 1).data;
		}

		this.setPixels = function(func, x, y, w, h) {
			if(x === undefined) {
				x = 0;
				y = 0;
				w = this.width;
				h = this.height;
			}
			var imageData = ctx.getImageData(x, y, w, h);
			var data = imageData.data;

			for(var i = 0; i < data.length; i += 4) {
				var results = func((i / 4) % w, (i / 4) / w, data[i], data[i + 1], data[i + 2], data[i + 3]);
				data[i] = results[0];
				data[i + 1] = results[1];
				data[i + 2] = results[2];
				data[i + 3] = results[3];
			}

			if(x === 0 && y === 0 && w === this.width && h === this.height) {
				ctx.putImageData(imageData, 0, 0);
			}
			else {
				bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
				bufferCtx.putImageData(imageData, 0, 0);
				ctx.drawImage(bufferCanvas, 0, 0, w, h, x, y, w, h)
			}
		}
		this.download = function(name) {
			/*
			 *	Quick warning: This will NOT work on a "tainted" canvas (ie: one that used an image without CORS approval)
			 *	This is a security issue. It's annoying, but necessary.
			 *	(un)Fortunately, there is no work-around if the canvas has already been tainted.
			 *	For more info, visit: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
			 */
			var link = document.createElement("a");
			link.href = canvas.toDataURL();
			link.download = name || "download";
			link.click();
		}
		this.invert = function(percent) {
			percent = percent === undefined ? "100%" : percent + "%";
			applyCssFilter("invert", percent);
		}
		this.grayscale = function(percent) {
			percent = percent === undefined ? "100%" : percent + "%";
			applyCssFilter("grayscale", percent);
		}
		ice.graphics.Scene.prototype.sepia = function(percent) {
			percent = percent === undefined ? "100%" : percent + "%";
			applyCssFilter("sepia", percent);
		}
		this.brightness = function(percent) {
			percent = percent === undefined ? "100%" : percent + "%";
			applyCssFilter("brightness", percent);
		}
		this.contrast = function(percent) {
			percent = percent === undefined ? "100%" : percent + "%";
			applyCssFilter("contrast", percent);
		}
		this.blur = function(px) {
			px = px === undefined ? "1px" : px + "px";
			applyCssFilter("blur", px);
		}
		this.saturate = function(percent) {
			percent = percent === undefined ? "100%" : percent + "%";
			applyCssFilter("saturate", percent);
		}
		this.opacity = function(percent) {
			percent = percent === undefined ? "100%" : percent + "%";
			applyCssFilter("opacity", percent);
		}
		this.colorshift = function(degrees) {
			degrees = degrees === undefined ? "180deg" : degrees + "deg";
			applyCssFilter("hue-rotate", degrees);
		}
		this.recolor = function(color) {
			ctx.save();
			ctx.globalCompositeOperation = "color";
			ctx.fillStyle = color || this.color;
			ctx.fillRect(0, 0, this.width, this.height);
			ctx.restore();
		}
		this.save = function() {
			return ctx.getImageData(0, 0, this.width, this.height);
		}
		this.restore = function(imageData) {
			ctx.putImageData(imageData, 0, 0);
		}

		// Duplicates

		this.greyscale = ice.graphics.Scene.prototype.grayscale;
	}

	// Methods

	return ice;
}(ice || {}));
