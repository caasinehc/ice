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

	// Properties

	ice.graphics.defaultCtx = document.querySelector("canvas").getContext("2d");
	ice.graphics.defaultColor = "#000000";

	// Methods

	ice.graphics.setCtx = function(ctx) {
		if(typeof ctx === "string") {
			ice.defaultCtx = document.querySelector(ctx).getContext("2d");
		}
		else if(ctx instanceof HTMLCanvasElement) {
			ice.defaultCtx = ctx.getContext("2d");
		}
		else if(ctx.canvas instanceof HTMLCanvasElement) {
			ice.defaultCtx = ctx;
		}
		else {
			throw new TypeError();
		}
	}

	return ice;
}(ice || {}));
