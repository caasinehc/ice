var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("colors");
	ice.colors = {};
	ice.colors.version = "v2.0.2"; // This version of the ice.colors module
	console.log("ice.colors " + ice.colors.version + " imported successfully.");

	/*
	 *	================ Colors Module ================
	 */

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
	ice.colors.LIGHT_MAGENTA = 		ice.colors.ORCHID = 		"#800080";
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

	return ice;
}(ice || {}));
