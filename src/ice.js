var ice = (function (ice) {

	ice.version = "v2.1.0"
	ice.modules = [];

	return ice;
}(ice || {}));

// Import all ice modules

(function() {

	var commitHash = "c46a0273e1f0a58cc937f8d3c44c1a616437a961"

	var urlStart = "https://cdn.rawgit.com/caasinehc/ice/"

	function importFile(file) {
		var script = document.createElement("script");
		script.src = urlStart + commitHash + file;
		document.head.appendChild(script);
	}

	importFile("src/ice.math.js");
	importFile("src/ice.colors.js");
	// importFile("src/ice.graphics.js");
	importFile("src/ice.debug.js");
	// importFile("src/ice.physics.js");

})();
