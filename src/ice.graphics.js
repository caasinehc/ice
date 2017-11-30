var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("graphics");
	ice.graphics = {};
	ice.graphics.version = "v2.0.0"; // This version of the ice.graphics module
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
	var SEPIA = "#704214";

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
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, width, height);
		ctx.globalCompositeOperation = oldGCO;
	}
	ice.graphics.Scene.prototype.download = function(name) {
		var link = document.createElement("a");
		link.href = canvas.toDataURL();
		link.download = name || "download";
		link.click();
	}
	ice.graphics.Scene.prototype.invert = function() {
		var oldGCO = ctx.globalCompositeOperation;
		var oldFillStyle = ctx.fillStyle;
		ctx.globalCompositeOperation = "difference";
		ctx.fillStyle = WHITE;
		ctx.fillRect(0, 0, width, height);
		ctx.globalCompositeOperation = oldGCO;
		ctx.fillStlye = oldFillStyle;
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
	ice.graphics.Scene.prototype.grayscale = function() {
		this.recolor(WHITE);
	}
	ice.graphics.Scene.prototype.sepia = function() {
		this.recolor(SEPIA);
	}
	ice.graphics.Scene.prototype.saturate = function(percent) {
		percent = percent === undefined ? 100 : percent;
		var oldGCO = ctx.globalCompositeOperation;
		var oldFillStyle = ctx.fillStyle;
		ctx.globalCompositeOperation = "saturation";
		ctx.fillStyle = "hsl(0, " + percent + "%, 50%)";
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
