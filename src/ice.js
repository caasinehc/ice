var ice = (function (ice) {

	ice.version = "v2.1.3"
	ice.modules = [];
	console.log("ice " + ice.version + " imported successfully.");
	console.log("Importing all modules...");

	return ice;
}(ice || {}));

// Import all ice modules

(function() {
	function importFile(file) {
		var script = document.createElement("script");
		script.src = "https://caasinehc.github.io/ice/" + file;
		document.head.appendChild(script);
	}

	importFile("src/ice.math.js");
	importFile("src/ice.colors.js");
	// importFile("src/ice.graphics.js");
	importFile("src/ice.debug.js");
	importFile("src/ice.physics.js");

})();
