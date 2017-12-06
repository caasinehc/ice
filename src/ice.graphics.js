var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("graphics");
	ice.graphics = {};
	ice.graphics.version = "v2.1.2"; // This version of the ice.graphics module
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
	}
	var WHITE = "#FFFFFF";
	var BLACK = "#000000";
	function applyCssFilter(ctx, filter, value) {
		var oldFilter = ctx.filter;
		ctx.filter = filter + "(" + value + ")"
		ctx.drawImage(ctx.canvas, 0, 0);
		ctx.filter = oldFilter;
	}

	// Constructors

	ice.graphics.Scene = function(ctxInput, bgColorInput) {
		if(!(this instanceof ice.graphics.Scene)) {
			return new ice.graphics.Scene(ctxInput, bgColorInput);
		}

		this.ctx = interpretCtx(ctxInput);
		this.canvas = this.ctx.canvas;
		this.bgColor = bgColorInput || WHITE;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.midWidth = this.width / 2;
		this.midHeight = this.height / 2;
	}
	ice.graphics.Scene.prototype.clear = function() {
		var oldGCO = this.ctx.globalCompositeOperation;
		var oldFilter = this.ctx.filter;
		this.ctx.globalCompositeOperation = "source-over";
		this.ctx.filter = "none";
		this.ctx.fillStyle = this.bgColor;
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.globalCompositeOperation = oldGCO;
		this.ctx.filter = oldFilter;
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
		var oldGCO = this.ctx.globalCompositeOperation;
		var oldFillStyle = this.ctx.fillStyle;
		this.ctx.globalCompositeOperation = "color";
		this.ctx.fillStyle = color || WHITE;
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.globalCompositeOperation = oldGCO;
		this.ctx.fillStyle = oldFillStyle;
	}
	ice.graphics.Scene.prototype.circle = function(x, y, rad, color) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, rad, 0, TAU);
		this.ctx.fillStyle = color || BLACK;
		this.ctx.fill();
	}
	ice.graphics.Scene.prototype.circleOutline = function(x, y, rad, thickness, color) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, rad, 0, TAU);
		this.ctx.lineWidth = thickness || 1;
		this.ctx.strokeStyle = color || BLACK;
		this.ctx.stroke();
	}
	ice.graphics.Scene.prototype.square = function(x, y, width, color) {
		var midWidth = width / 2;
		this.ctx.fillStyle = color || BLACK;
		this.ctx.fillRect(x - midWidth, y - midWidth, width, width);
	}
	ice.graphics.Scene.prototype.squareOutline = function(x, y, width, thickness, color) {
		var midWidth = width / 2;
		this.ctx.lineWidth = thickness || 1;
		this.ctx.strokeStyle = color || BLACK;
		this.ctx.strokeRect(x - midWidth, y - midWidth, width, width);
	}
	ice.graphics.Scene.prototype.triangle = function(x1, y1, x2, y2, x3, y3, color) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.lineTo(x3, y3);
		this.ctx.fillStyle = color || BLACK;
		this.ctx.fill();
	}
	ice.graphics.Scene.prototype.triangleOutline = function(x1, y1, x2, y2, x3, y3, thickness, color) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.lineTo(x3, y3);
		this.ctx.closePath();
		this.ctx.lineWidth = thickness || 1;
		this.ctx.strokeStyle = color || BLACK;
		this.ctx.stroke();
	}
	ice.graphics.Scene.prototype.rect = function(x, y, width, height, color) {
		this.ctx.fillStyle = color || BLACK;
		this.ctx.fillRect(x, y, width, height);
	}
	ice.graphics.Scene.prototype.rectOutline = function(x, y, width, height, thickness, color) {
		ctx.lineWidth = thickness || 1;
		ctx.strokeStyle = color || BLACK;
		ctx.strokeRect(x, y, width, height);
	}
	ice.graphics.Scene.prototype.line = function(x1, y1, x2, y2, thickness, color, cap) {
		this.ctx.lineWidth = thickness || 1;
		this.ctx.strokeStyle = color || BLACK;
		this.ctx.lineCap = cap || "butt";
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}
	ice.graphics.Scene.prototype.text = function(text, x, y, family, size, color, bold, italic, align, base, maxWidth) {
		this.ctx.fillStyle = color || BLACK;
		this.ctx.font = (italic ? "italic " : "") + (bold ? "bold " : "") + size + "px " + family;
		this.ctx.textAlign = align || "start";
		this.ctx.textBaseline = base || "alphabetic";
		this.ctx.fillText(text, x, y, maxWidth);
	}
	ice.graphics.Scene.prototype.textOutline = function(text, x, y, family, size, thickness, color, bold, italic, align, base, maxWidth) {
		this.ctx.fillStyle = color || BLACK;
		this.ctx.lineWidth = thickness || 1;
		this.ctx.font = (italic ? "italic " : "") + (bold ? "bold " : "") + size + "px " + family;
		this.ctx.textAlign = align || "start";
		this.ctx.textBaseline = base || "alphabetic";
		this.ctx.strokeText(text, x, y, maxWidth);
	}
	ice.graphics.Scene.prototype.image = function(img, x, y, width, height, clipX, clipY, clipWidth, clipHeight, taintCanvas) {
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
	ice.graphics.Scene.prototype.rectangle = ice.graphics.Scene.prototype.rect;
	ice.graphics.Scene.prototype.rectangleOutline = ice.graphics.Scene.prototype.rectOutline;

	// Methods

	return ice;
}(ice || {}));
