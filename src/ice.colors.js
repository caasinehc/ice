var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("colors");
	ice.colors = {};
	ice.colors.version = "v2.1.0"; // This version of the ice.colors module
	console.log("%cice.colors " + ice.colors.version + " imported successfully.", "color: #008000");

	/*
	 *	================ Colors Module ================
	 */

	// Private variables/functions

	function randomIntExcl(min, max) {
		var minInt = Math.ceil(min);
		var maxInt = Math.floor(max);
		return Math.floor(Math.random() * (maxInt - minInt) + min);
	}

	// Properties

	// Hues
	ice.colors.RED = 											"#FF0000";
	ice.colors.ORANGE = 										"#FF8000";
	ice.colors.YELLOW = 										"#FFFF00";
	ice.colors.CHARTREUSE = 									"#80FF00";
	ice.colors.LIME = 											"#00FF00";
	ice.colors.MINT = 											"#00FF80";
	ice.colors.CYAN = 											"#00FFFF";
	ice.colors.CERULEAN = 										"#0080FF";
	ice.colors.BLUE = 											"#0000FF";
	ice.colors.PURPLE = 										"#8000FF";
	ice.colors.MAGENTA = 										"#FF00FF";
	ice.colors.PINK = 											"#FF0080";
	// Tints
	ice.colors.LIGHT_RED = 			ice.colors.SALMON = 		"#FF8080";
	ice.colors.LIGHT_ORANGE = 		ice.colors.PEACH = 			"#FFC080";
	ice.colors.LIGHT_YELLOW = 		ice.colors.CANARY = 		"#FFFF80";
	ice.colors.LIGHT_CHARTREUSE = 	ice.colors.KEYLIME = 		"#C0FF80";
	ice.colors.LIGHT_LIME = 		ice.colors.SHAMROCK = 		"#80FF80";
	ice.colors.LIGHT_MINT = 		ice.colors.SEAFOAM = 		"#80FFC0";
	ice.colors.LIGHT_CYAN = 		ice.colors.SKY = 			"#80FFFF";
	ice.colors.LIGHT_CERULEAN = 	ice.colors.CORNFLOWER = 	"#80C0FF";
	ice.colors.LIGHT_BLUE = 		ice.colors.PERIWINKLE = 	"#8080FF";
	ice.colors.LIGHT_PURPLE = 		ice.colors.LAVENDER = 		"#C080FF";
	ice.colors.LIGHT_MAGENTA = 		ice.colors.ORCHID = 		"#C000C0";
	ice.colors.LIGHT_PINK = 		ice.colors.CARNATION = 		"#FF80C0";
	// Shades
	ice.colors.DARK_RED = 			ice.colors.MAROON = 		"#800000";
	ice.colors.DARK_ORANGE = 		ice.colors.RUST = 			"#804000";
	ice.colors.DARK_YELLOW = 		ice.colors.OLIVE = 			"#808000";
	ice.colors.DARK_CHARTREUSE = 	ice.colors.BASIL = 			"#408000";
	ice.colors.DARK_LIME = 			ice.colors.GREEN = 			"#008000";
	ice.colors.DARK_MINT = 			ice.colors.PINE = 			"#008040";
	ice.colors.DARK_CYAN = 			ice.colors.TEAL = 			"#008080";
	ice.colors.DARK_CERULEAN = 		ice.colors.COBALT = 		"#004080";
	ice.colors.DARK_BLUE = 			ice.colors.NAVY = 			"#000080";
	ice.colors.DARK_PURPLE = 		ice.colors.EGGPLANT = 		"#400080";
	ice.colors.DARK_MAGENTA = 		ice.colors.PLUM = 			"#800080";
	ice.colors.DARK_PINK = 			ice.colors.BEETROOT = 		"#800040";
	// Grayscale
	ice.colors.WHITE = 											"#FFFFFF";
	ice.colors.LIGHT_GRAY = 		ice.colors.SILVER =			"#C0C0C0";
	ice.colors.GRAY = 											"#808080";
	ice.colors.DARK_GRAY = 			ice.colors.CHARCOAL = 		"#404040";
	ice.colors.BLACK = 											"#000000";
	// Misc colors
	ice.colors.BROWN = 											"#402000";
	ice.colors.GOLD = 											"#D0B030";
	ice.colors.SEPIA =											"#704214";
	// Duplicates
	ice.colors.AQUA = 				ice.colors.CYAN;
	ice.colors.VIOLET = 			ice.colors.PURPLE;
	ice.colors.FUCHSIA = 			ice.colors.MAGENTA;
	ice.colors.GREY = 				ice.colors.GRAY;
	ice.colors.LIGHT_AQUA = 		ice.colors.LIGHT_CYAN;
	ice.colors.LIGHT_VIOLET = 		ice.colors.LIGHT_PURPLE;
	ice.colors.LIGHT_FUCHSIA = 		ice.colors.LIGHT_MAGENTA;
	ice.colors.LIGHT_GREY = 		ice.colors.LIGHT_GRAY;
	ice.colors.DARK_AQUA = 			ice.colors.DARK_CYAN;
	ice.colors.DARK_VIOLET = 		ice.colors.DARK_PURPLE;
	ice.colors.DARK_FUCHSIA = 		ice.colors.DARK_MAGENTA;
	ice.colors.DARK_GREY = 			ice.colors.DARK_GRAY;

	ice.colors.hues = [
		ice.colors.RED,
		ice.colors.ORANGE,
		ice.colors.YELLOW,
		ice.colors.CHARTREUSE,
		ice.colors.LIME,
		ice.colors.MINT,
		ice.colors.CYAN,
		ice.colors.CERULEAN,
		ice.colors.BLUE,
		ice.colors.PURPLE,
		ice.colors.MAGENTA,
		ice.colors.PINK
	];
	ice.colors.tints = [
		ice.colors.SALMON,
		ice.colors.PEACH,
		ice.colors.CANARY,
		ice.colors.KEYLIME,
		ice.colors.SHAMROCK,
		ice.colors.SEAFOAM,
		ice.colors.SKY,
		ice.colors.CORNFLOWER,
		ice.colors.PERIWINKLE,
		ice.colors.LAVENDER,
		ice.colors.ORCHID,
		ice.colors.CARNATION
	];
	ice.colors.shades = [
		ice.colors.MAROON,
		ice.colors.RUST,
		ice.colors.OLIVE,
		ice.colors.BASIL,
		ice.colors.GREEN,
		ice.colors.PINE,
		ice.colors.TEAL,
		ice.colors.COBALT,
		ice.colors.NAVY,
		ice.colors.EGGPLANT,
		ice.colors.PLUM,
		ice.colors.BEETROOT
	];
	ice.colors.grayscale = [
		ice.colors.WHITE,
		ice.colors.SILVER,
		ice.colors.GRAY,
		ice.colors.CHARCOAL,
		ice.colors.BLACK
	];
	ice.colors.greyscale = ice.colors.grayscale;
	ice.colors.misc = [
		ice.colors.BROWN,
		ice.colors.GOLD,
		ice.colors.SEPIA
	];
	ice.colors.miscellaneous = ice.colors.misc;
	ice.colors.other = ice.colors.misc;
	ice.colors.huesExt = [].concat(ice.colors.hues, ice.colors.tints, ice.colors.shades);
	ice.colors.all = [].concat(ice.colors.huesExt, ice.colors.grayscale, ice.colors.misc);
	ice.colors.random = function(set) {
		set = set || ice.colors.huesExt;
		return set[randomIntExcl(0, set.length)];
	}

	return ice;
}(ice || {}));
