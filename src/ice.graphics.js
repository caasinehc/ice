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

	ice.graphics.property = "property";

	// Methods

	ice.graphics.method = function() {
		// code
	}

	return ice;
}(ice || {}));
