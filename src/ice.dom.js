var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("dom");
	ice.dom = {};
	ice.dom.version = "v1.0.1"; // This version of the ice.dom module
	console.log("ice.dom " + ice.dom.version + " imported successfully.");
	init();

	/*
	 *	================ Dom Module ================
	 */

	// Private variables/functions

	var typeLookup = {
		"script": "js",
		"js": "js",
		"javascript": "js",
		"library": "js",
		"css": "css",
		"style": "css",
		"stylesheet": "css"
	};
	function importErrorJs(e) {
		throw "Failed to import script \"" + e.target.src + "\"!";
	}
	function importErrorCss(e) {
		throw "Failed to import stylesheet \"" + e.target.href + "\"!";
	}

	// Properties

	ice.dom.styles = {};

	// Methods

	ice.dom.import = function(src, type, onload) {
		if(typeLookup[type] === "css") {
			var stylesheet = document.createElement("link");
			stylesheet.rel = "stylesheet";
			stylesheet.href = src;
			stylesheet.onerror = importErrorCss;
			if(typeof onload === "function") {
				stylesheet.onload = onload;
			}
			document.head.appendChild(stylesheet);
		}
		else {
			var script = document.createElement("script");
			script.src = src;
			script.onerror = importErrorJs;
			if(typeof onload === "function") {
				script.onload = onload;
			}
			document.head.appendChild(script);
		}
	}

	// Init

	function init() {
		// Ensure the document has a head (for ice.dom.import)
		if(document.head === null) {
			if(document.documentElement === null) {
				document.appendChild(document.createElement("html"));
			}
			document.documentElement.appendChild(document.createElement("head"));
		}
	}

	return ice;
}(ice || {}));
