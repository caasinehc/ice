var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("dom");
	ice.dom = {};
	ice.dom.version = "v1.0.4"; // This version of the ice.dom module
	console.log("%cice.dom " + ice.dom.version + " imported successfully.", "color: #008000");
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

	function getDownButtonsList() {
		return {
			"left": false,
			"right": false,
			"middle": false
		};
	}
	function getDownKeysList() {
		return {
			"Digit1": false,
			"Digit2": false,
			"Digit3": false,
			"Digit4": false,
			"Digit5": false,
			"Digit6": false,
			"Digit7": false,
			"Digit8": false,
			"Digit9": false,
			"Digit0": false,
			"KeyA": false,
			"KeyB": false,
			"KeyC": false,
			"KeyD": false,
			"KeyE": false,
			"KeyF": false,
			"KeyG": false,
			"KeyH": false,
			"KeyI": false,
			"KeyJ": false,
			"KeyK": false,
			"KeyL": false,
			"KeyM": false,
			"KeyN": false,
			"KeyO": false,
			"KeyP": false,
			"KeyQ": false,
			"KeyR": false,
			"KeyS": false,
			"KeyT": false,
			"KeyU": false,
			"KeyV": false,
			"KeyW": false,
			"KeyX": false,
			"KeyY": false,
			"KeyZ": false,
			"Comma": false,
			"Period": false,
			"Semicolon": false,
			"Quote": false,
			"BracketLeft": false,
			"BracketRight": false,
			"Backquote": false,
			"Backslash": false,
			"Minus": false,
			"Equal": false,
			"AltLeft": false,
			"AltRight": false,
			"CapsLock": false,
			"ControlLeft": false,
			"ControlRight": false,
			"MetaLeft": false,
			"MetaRight": false,
			"ShiftLeft": false,
			"ShiftRight": false,
			"ContextMenu": false,
			"Enter": false,
			"Space": false,
			"Tab": false,
			"Delete": false,
			"End": false,
			"Help": false,
			"Home": false,
			"Insert": false,
			"PageDown": false,
			"PageUp": false,
			"ArrowDown": false,
			"ArrowLeft": false,
			"ArrowRight": false,
			"ArrowUp": false,
			"Escape": false,
			"PrintScreen": false,
			"ScrollLock": false,
			"Pause": false,
			"F1": false,
			"F2": false,
			"F3": false,
			"F4": false,
			"F5": false,
			"F6": false,
			"F7": false,
			"F8": false,
			"F9": false,
			"F10": false,
			"F11": false,
			"F12": false,
			"F13": false,
			"F14": false,
			"F15": false,
			"F16": false,
			"F17": false,
			"F18": false,
			"F19": false,
			"F20": false,
			"F21": false,
			"F22": false,
			"F23": false,
			"F24": false,
			"NumLock": false,
			"Numpad0": false,
			"Numpad1": false,
			"Numpad2": false,
			"Numpad3": false,
			"Numpad4": false,
			"Numpad5": false,
			"Numpad6": false,
			"Numpad7": false,
			"Numpad8": false,
			"Numpad9": false,
			"NumpadAdd": false,
			"NumpadComma": false,
			"NumpadDecimal": false,
			"NumpadDivide": false,
			"NumpadEnter": false,
			"NumpadEqual": false,
			"NumpadMultiply": false,
			"NumpadSubtract": false
		};
	}
	var keyEncoder = {
		"1": "Digit1",
		"2": "Digit2",
		"3": "Digit3",
		"4": "Digit4",
		"5": "Digit5",
		"6": "Digit6",
		"7": "Digit7",
		"8": "Digit8",
		"9": "Digit9",
		"0": "Digit0",
		"a": "KeyA",
		"b": "KeyB",
		"c": "KeyC",
		"d": "KeyD",
		"e": "KeyE",
		"f": "KeyF",
		"g": "KeyG",
		"h": "KeyH",
		"i": "KeyI",
		"j": "KeyJ",
		"k": "KeyK",
		"l": "KeyL",
		"m": "KeyM",
		"n": "KeyN",
		"o": "KeyO",
		"p": "KeyP",
		"q": "KeyQ",
		"r": "KeyR",
		"s": "KeyS",
		"t": "KeyT",
		"u": "KeyU",
		"v": "KeyV",
		"w": "KeyW",
		"x": "KeyX",
		"y": "KeyY",
		"z": "KeyZ",
		",": "Comma",
		"<": "Comma",
		".": "Period",
		">": "Period",
		";": "Semicolon",
		":": "Semicolon",
		"\'": "Quote",
		"\"": "Quote",
		"quote": "Quote",
		"[": "BracketLeft",
		"]": "BracketRight",
		"`": "Backquote",
		"\\": "Backslash",
		"backslash": "Backslash",
		"-": "Minus",
		"=": "Equal",
		"lalt": "AltLeft",
		"ralt": "AltRight",
		"capslock": "CapsLock",
		"caps": "CapsLock",
		"lctrl": "ControlLeft",
		"rctrl": "ControlRight",
		"lmeta": "MetaLeft",
		"rmeta": "MetaRight",
		"lshift": "ShiftLeft",
		"rshift": "ShiftRight",
		"menu": "ContextMenu",
		"enter": "Enter",
		"return": "Enter",
		"space": "Space",
		" ": "Space",
		"tab": "Tab",
		"	": "Tab",
		"delete": "Delete",
		"del": "Delete",
		"end": "End",
		"help": "Help",
		"home": "Home",
		"insert": "Insert",
		"pagedown": "PageDown",
		"pageup": "PageUp",
		"down": "ArrowDown",
		"downarrow": "ArrowDown",
		"left": "ArrowLeft",
		"leftarrow": "ArrowLeft",
		"right": "ArrowRight",
		"rightarrow": "ArrowRight",
		"up": "ArrowUp",
		"uparrow": "ArrowUp",
		"esc": "Escape",
		"escape": "Escape",
		"printscreen": "PrintScreen",
		"scrolllock": "ScrollLock",
		"pause": "Pause",
		"f1": "F1",
		"f2": "F2",
		"f3": "F3",
		"f4": "F4",
		"f5": "F5",
		"f6": "F6",
		"f7": "F7",
		"f8": "F8",
		"f9": "F9",
		"f10": "F10",
		"f11": "F11",
		"f12": "F12",
		"f13": "F13",
		"f14": "F14",
		"f15": "F15",
		"f16": "F16",
		"f17": "F17",
		"f18": "F18",
		"f19": "F19",
		"f20": "F20",
		"f21": "F21",
		"f22": "F22",
		"f23": "F23",
		"f24": "F24",
		"numlock": "NumLock",
		"numpad0": "Numpad0",
		"numpad1": "Numpad1",
		"numpad2": "Numpad2",
		"numpad3": "Numpad3",
		"numpad4": "Numpad4",
		"numpad5": "Numpad5",
		"numpad6": "Numpad6",
		"numpad7": "Numpad7",
		"numpad8": "Numpad8",
		"numpad9": "Numpad9",
		"numpadadd": "NumpadAdd",
		"numpad+": "NumpadAdd",
		"numpadcomma": "NumpadComma",
		"numpad,": "NumpadComma",
		"numpaddelete": "NumpadDecimal",
		"numpaddel": "NumpadDecimal",
		"numpadperiod": "NumpadDecimal",
		"numpad.": "NumpadDecimal",
		"numpaddivide": "NumpadDivide",
		"numpad/": "NumpadDivide",
		"numpadslash": "NumpadDivide",
		"numpadforwardslash": "NumpadDivide",
		"numpadenter": "NumpadEnter",
		"numpadreturn": "NumpadEnter",
		"numpadequal": "NumpadEqual",
		"numpad=": "NumpadEqual",
		"numpadmult": "NumpadMultiply",
		"numpadmultiply": "NumpadMultiply",
		"numpad*": "NumpadMultiply",
		"numpadsub": "NumpadSubtract",
		"numpadsubtract": "NumpadSubtract",
		"numpad-": "NumpadSubtract"
	};

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

	function stop(e) {
		e.preventDefault();
		return false;
	}
	ice.dom.showMenu = function(elem, show) {
		if(show === undefined) {
			if(elem instanceof HTMLElement) {
				show = true;
			}
			else if(typeof elem === "boolean") {
				show = elem;
				elem = document;
			}
			else {
				elem = document;
				show = true;
			}
		}
		if(show) {
			elem.removeEventListener("contextmenu", stop);
		}
		else {
			elem.addEventListener("contextmenu", stop);
		}
	}

	// Constructors

	ice.dom.InputListener = function(elem = document) {
		if(!(this instanceof ice.dom.InputListener)) {
			return new ice.dom.InputListener(elem);
		}
		if(!(elem instanceof HTMLElement)) {
			elem = document.querySelector(elem);
		}

		let downKeys = getDownKeysList();
		let downButtons = getDownButtonsList();
		function setKey(key, down) {
			downKeys[key] = down;
		}
		function getButton(which) {
			return (
				which === 1 ? "left" :
				which === 2 ? "middle" :
				which === 3 ? "right" :
				which
			);
		}

		this.elem = elem;
		this.mouseX = 0;
		this.mouseY = 0;
		this.prevMouseX = 0;
		this.prevMouseY = 0;

		this.isDown = function(key) {
			if(key === "mouse" || key === "click") {
				return (
					downButtons["left"] ||
					downButtons["middle"] ||
					downButtons["right"]
				);
			}
			if(key === "leftClick" || key === "leftMouse") {
				return downButtons["left"];
			}
			if(key === "middleClick" || key === "middleMouse") {
				return downButtons["middle"];
			}
			if(key === "rightClick" || key === "rightMouse") {
				return downButtons["right"];
			}

			if(key === "alt" || key === "ctrl" || key === "meta" || key === "shift") {
				return this.isDown("l" + key) || this.isDown("r" + key);
			}
			return downKeys[keyEncoder[key]];
		}

		this.mouseDown = function(e, button) {};
		this.elem.addEventListener("mousedown", (e) => {
			let button = getButton(e.which);
			downButtons[button] = true;
			this.mouseDown(e, button);
		});
		this.mouseUp = function(e, button) {};
		this.click = function(e, button) {};
		this.elem.addEventListener("mouseup", (e) => {
			let button = getButton(e.which);
			let downBefore = downButtons[button];
			downButtons[button] = false;
			this.mouseUp(e, button);
			if(downBefore) this.click(e, button);
		});
		this.mouseMove = function(e) {};
		this.elem.addEventListener("mousemove", (e) => {
			this.prevMouseX = this.mouseX;
			this.prevMouseY = this.mouseY;
			this.mouseX = e.offsetX;
			this.mouseY = e.offsetY;
			this.mouseMove(e);
		});
		this.wheel = function() {};
		this.elem.addEventListener("wheel", (e) => {
			this.wheel(e, e.deltaY);
		}, {
			passive: true
		});
		this.keyDown = function() {};
		this.elem.addEventListener("keydown", (e) => {
			setKey(e.code, true);
			this.keyDown(e, e.key);
		});
		this.keyUp = function() {};
		this.elem.addEventListener("keyup", (e) => {
			setKey(e.code, false);
			this.keyUp(e, e.key);
		});
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
