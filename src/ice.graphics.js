var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("graphics");
	ice.graphics = {};
	ice.graphics.version = "v2.1.1"; // This version of the ice.graphics module
	console.log("ice.graphics " + ice.graphics.version + " imported successfully.");

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
	function applyCssFilter(filter, value) {
		var oldFilter = ctx.filter;
		ctx.filter = filter + "(" + value + ")"
		ctx.drawImage(canvas, 0, 0);
		ctx.filter = oldFilter;
	}

	// Constructors

	ice.graphics.Scene = function(ctxInput, bgColorInput) {
		if(!(this instanceof ice.graphics.Scene)) {
			return new ice.graphics.Scene(ctxInput, bgColorInput);
		}

		ctx = interpretCtx(ctxInput);
		canvas = ctx.canvas;
		bgColor = bgColorInput || WHITE;
		width = canvas.width;
		height = canvas.height;
	}
	ice.graphics.Scene.prototype.setBgColor = function(newBgColor) {
		bgColor = newBgColor || bgColor;
	}
	ice.graphics.Scene.prototype.clear = function() {
		var oldGCO = ctx.globalCompositeOperation;
		var oldFilter = ctx.filter;
		ctx.globalCompositeOperation = "source-over";
		ctx.filter = "none";
		ctx.fillStyle = bgColor;
		ctx.clearRect(0, 0, width, height);
		ctx.fillRect(0, 0, width, height);
		ctx.globalCompositeOperation = oldGCO;
		ctx.filter = oldFilter;
	}
	ice.graphics.Scene.prototype.download = function(name) {
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
	ice.graphics.Scene.prototype.invert = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter("invert", percent);
	}
	ice.graphics.Scene.prototype.grayscale = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter("grayscale", percent);
	}
	ice.graphics.Scene.prototype.sepia = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter("sepia", percent);
	}
	ice.graphics.Scene.prototype.brightness = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter("brightness", percent);
	}
	ice.graphics.Scene.prototype.contrast = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter("contrast", percent);
	}
	ice.graphics.Scene.prototype.blur = function(px) {
		px = px === undefined ? "1px" : px + "px";
		applyCssFilter("blur", px);
	}
	ice.graphics.Scene.prototype.saturate = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter("saturate", percent);
	}
	ice.graphics.Scene.prototype.opacity = function(percent) {
		percent = percent === undefined ? "100%"  : percent + "%";
		applyCssFilter("opacity", percent);
	}
	ice.graphics.Scene.prototype.colorshift = function(degrees) {
		degrees = degrees === undefined ? "180deg"  : degrees + "deg";
		applyCssFilter("hue-rotate", degrees);
	}
	ice.graphics.Scene.prototype.recolor = function(color) {
		var oldGCO = ctx.globalCompositeOperation;
		var oldFillStyle = ctx.fillStyle;
		ctx.globalCompositeOperation = "color";
		ctx.fillStyle = color || WHITE;
		ctx.fillRect(0, 0, width, height);
		ctx.globalCompositeOperation = oldGCO;
		ctx.fillStyle = oldFillStyle;
	}
	ice.graphics.Scene.prototype.circle = function(x, y, rad, color) {
		ctx.beginPath();
		ctx.arc(x, y, rad, 0, TAU);
		ctx.fillStyle = color || BLACK;
		ctx.fill();
	}
	ice.graphics.Scene.prototype.circleOutline = function(x, y, rad, thickness, color) {
		ctx.beginPath();
		ctx.arc(x, y, rad, 0, TAU);
		ctx.lineWidth = thickness || 1;
		ctx.strokeStyle = color || BLACK;
		ctx.stroke();
	}
	ice.graphics.Scene.prototype.square = function(x, y, width, color) {
		var midWidth = width / 2;
		ctx.fillStyle = color || BLACK;
		ctx.fillRect(x - midWidth, y - midWidth, width, width);
	}
	ice.graphics.Scene.prototype.squareOutline = function(x, y, width, thickness, color) {
		var midWidth = width / 2;
		ctx.lineWidth = thickness || 1;
		ctx.strokeStyle = color || BLACK;
		ctx.strokeRect(x - midWidth, y - midWidth, width, width);
	}
	ice.graphics.Scene.prototype.triangle = function(x1, y1, x2, y2, x3, y3, color) {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.fillStyle = color || BLACK;
		ctx.fill();
	}
	ice.graphics.Scene.prototype.triangleOutline = function(x1, y1, x2, y2, x3, y3, thickness, color) {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.closePath();
		ctx.lineWidth = thickness || 1;
		ctx.strokeStyle = color || BLACK;
		ctx.stroke();
	}
	ice.graphics.Scene.prototype.rect = function(x, y, width, height, color) {
		ctx.fillStyle = color || BLACK;
		ctx.fillRect(x - width / 2, y - height / 2, width, height);
	}
	ice.graphics.Scene.prototype.rectOutline = function(x, y, width, height, thickness, color) {
		ctx.lineWidth = thickness || 1;
		ctx.strokeStyle = color || BLACK;
		ctx.strokeRect(x - width / 2, y - height / 2, width, height);
	}
	ice.graphics.Scene.prototype.line = function(x1, y1, x2, y2, thickness, color, cap) {
		ctx.lineWidth = thickness || 1;
		ctx.strokeStyle = color || BLACK;
		ctx.lineCap = cap || "butt";
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
	ice.graphics.Scene.prototype.text = function(text, x, y, family, size, color, bold, italic, align, base, maxWidth) {
		ctx.fillStyle = color || BLACK;
		ctx.font = (italic ? "italic " : "") + (bold ? "bold " : "") + size + "px " + family;
		ctx.textAlign = align || "start";
		ctx.textBaseline = base || "alphabetic";
		ctx.fillText(text, x, y, maxWidth);
	}
	ice.graphics.Scene.prototype.textOutline = function(text, x, y, family, size, thickness, color, bold, italic, align, base, maxWidth) {
		ctx.fillStyle = color || BLACK;
		ctx.lineWidth = thickness || 1;
		ctx.font = (italic ? "italic " : "") + (bold ? "bold " : "") + size + "px " + family;
		ctx.textAlign = align || "start";
		ctx.textBaseline = base || "alphabetic";
		ctx.strokeText(text, x, y, maxWidth);
	}
	ice.graphics.Scene.prototype.image = function(img, x, y, width, height, clipX, clipY, clipWidth, clipHeight, taintCanvas) {
		if(typeof img === "string") {
			var image = new Image();
			image.src = img;
			if(!taintCanvas) {
				image.crossOrigin = "anonymous";
			}
			image.onload = function(e) {
				ctx.drawImage(image, clipX, clipY, clipWidth, clipHeight, x, y, width, height);
			}
		}
		else {
			ctx.drawImage(img, clipX, clipY, clipWidth, clipHeight, x, y, width, height);
		}
	}
	ice.graphics.Scene.prototype.save = function() {
		return ctx.getImageData(0, 0, width, height);
	}
	ice.graphics.Scene.prototype.restore = function(imageData) {
		ctx.putImageData(imageData, 0, 0);
	}

	// Duplicates

	ice.graphics.Scene.prototype.greyscale = ice.graphics.Scene.prototype.grayscale;
	ice.graphics.Scene.prototype.rectangle = ice.graphics.Scene.prototype.rect;
	ice.graphics.Scene.prototype.rectangleOutline = ice.graphics.Scene.prototype.rectOutline;

	// Methods

	ice.graphics.method = function() {

	}

	return ice;
}(ice || {}));
