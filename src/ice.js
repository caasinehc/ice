var ice = (function (ice) {

	ice.version = "v2.1.1"
	ice.modules = [];

	return ice;
}(ice || {}));

// Import all ice modules

(function() {

	var commitHash = "02588f7b12cefd3ffbee77dca746264f1576916f"

	var urlStart = "https://cdn.rawgit.com/caasinehc/ice/"

	function importFile(file) {
		var script = document.createElement("script");
		script.src = urlStart + commitHash + "/" + file;
		document.head.appendChild(script);
	}

	importFile("src/ice.math.js");
	importFile("src/ice.colors.js");
	// importFile("src/ice.graphics.js");
	importFile("src/ice.debug.js");
	// importFile("src/ice.physics.js");

})();
