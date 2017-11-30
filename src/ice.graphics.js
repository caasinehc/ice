var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("graphics");
	ice.graphics = {};
	ice.graphics.version = "v2.1.0"; // This version of the ice.graphics module
	console.log("ice.graphics " + ice.graphics.version + " imported successfully.");

	/*
	 *	================ Graphics Module ================
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
		ctx.fillRect(0, 0, width, height);
		ctx.globalCompositeOperation = oldGCO;
		ctx.filter = oldFilter;
	}
	ice.graphics.Scene.prototype.download = function(name) {
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

	// Duplicates

	ice.graphics.Scene.prototype.greyscale = ice.graphics.Scene.prototype.grayscale;

	// Methods

	ice.graphics.method = function() {

	}

	return ice;
}(ice || {}));
