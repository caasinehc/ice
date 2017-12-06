var ice = (function (ice) {

	ice.version = "v2.1.7"
	ice.modules = [];
	console.log("%c-------- Importing ice.js " + ice.version + "--------", "font-weight: bold; font-size: 24px");

	return ice;
}(ice || {}));

// Ensure the document has a head (for importing)

if(document.head === null) {
	if(document.documentElement === null) {
		document.appendChild(document.createElement("html"));
	}
	document.documentElement.appendChild(document.createElement("head"));
}

// Import all ice modules

(function() {
	function getModuleName(src) {
		return src.replace(/^https\:\/\/caasinehc\.github\.io\/ice\/src\/(ice\.\w*)\.js$/, "$1");
	}
	function importError(e) {
		console.log("%c" + getModuleName(e.target.src) + " import failed!", "color: #FF0000");
	}
	function importFile(file) {
		var script = document.createElement("script");
		script.src = "https://caasinehc.github.io/ice/" + file;
		script.onerror = importError;
		document.head.appendChild(script);
	}

	importFile("src/ice.math.js");
	importFile("src/ice.colors.js");
	importFile("src/ice.graphics.js");
	importFile("src/ice.debug.js");
	importFile("src/ice.physics.js");
	importFile("src/ice.dom.js");

})();
