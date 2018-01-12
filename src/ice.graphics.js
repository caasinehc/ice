var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("graphics");
	ice.graphics = {};
	ice.graphics.version = "v2.1.4"; // This version of the ice.graphics module
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
		return document.querySelector("canvas");
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

		this.color = BLACK;
		this.thickness = 1;
	}
	ice.graphics.Scene.prototype.clear = function() {
		ctx.save();
		this.ctx.fillStyle = this.bgColor;
		this.ctx.fillRect(0, 0, this.width, this.height);
		ctx.restore();
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
