var ice = (function(ice) {

	ice.version = "v2.1.10"
	ice.modules = [];
	console.log("%c-------- Importing ice.js " + ice.version + " --------", "font-weight: bold; font-size: 24px");

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
	function importFiles(files) {
		let div = document.createElement("div");
		div.id = "iceLibrary";
		for(let file of files) {
			let script = document.createElement("script");
			script.src = "https://caasinehc.github.io/ice/" + file;
			script.onerror = importError;
			div.appendChild(script);
		}
		let currentScript = document.currentScript;
		if(currentScript) {
			currentScript.parentElement.replaceChild(div, currentScript);
		}
		else {
			document.head.appendChild(script);
		}
	}

	let files = [
		"src/ice.math.js",
		"src/ice.colors.js",
		"src/ice.graphics.js",
		"src/ice.debug.js",
		"src/ice.physics.js",
		"src/ice.dom.js",
		"src/ice.time.js"
	];
	importFiles(files);
})();
