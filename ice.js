/*
 * Declaring the ice object and various modules
 */
var ice = {} // Main ice object
ice.math = {} // Everything mathmatical or number related
ice.graphics = {} // Everything graphics or GUI related
ice.physics = {} // Everything physics related
ice.colors = {} // Everything color related
ice.debug = {} // Everything debugging related

/*
 *  Meta information
 */
ice.version = "a1.0.0"; // This version of the ice library

/*
 *  math module
 */
// Variables
ice.math.PI = Math.PI; // The constant Pi. The ratio of a circle's circumference to its diameter
ice.math.TAU = ice.math.PI * 2; // The constant Tau. The number of radians in a circle

// Functions
ice.math.randomInt = function(min, max) { // returns a random int from min (inclusive) to max (inclusive)
  var minInt = Math.ceil(min);
  var maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1) + min);
}
ice.math.randomIntExcl = function(min, max) { // returns a random int from min (inclusive) to max (exclusive)
  var minInt = Math.ceil(min);
  var maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt) + min);
}
ice.math.randomFloat = function(min, max) { // returns a random float from min (inclusive) to max (exclusive)
  return Math.random() * (max - min) + min;
}
ice.math.chance = function(chance) { // returns true [chance] out of 1 times ([1] always returns true, [0.50] returns true 50% of the time, etc.)
  return chance > Math.random();
}
ice.math.percentChance = function(chance) { // returns true [chance] percent of the time
  return chance > Math.random() * 100;
}
ice.math.coinFlip = function() { // returns true 50% of the time
  return 0.50 > Math.random();
}
ice.math.pythag = function(a, b) { // returns the length of the hypotenuse from the two other side lengths
  return Math.sqrt(a * a + b * b);
}
ice.math.getDist = function(aX, aY, bX, bY) { // returns the distance between two points
  var a = aX < bX ? bX - aX : aX - bX;
  var b = aY < bY ? bY - aY : aY - bY;
  return Math.sqrt(a * a + b * b);
}

/*
 *  colors module
 */
// Variables
// Hues
ice.colors.RED =                                      "#FF0000";
ice.colors.ORANGE =                                   "#FF8000";
ice.colors.YELLOW =                                   "#FFFF00";
ice.colors.CHARTREUSE =                               "#80FF00";
ice.colors.LIME =                                     "#00FF00";
ice.colors.MINT =                                     "#00FF80";
ice.colors.CYAN =                                     "#00FFFF";
ice.colors.CERULEAN =                                 "#0080FF";
ice.colors.BLUE =                                     "#0000FF";
ice.colors.PURPLE =                                   "#8000FF";
ice.colors.MAGENTA =                                  "#FF00FF";
ice.colors.PINK =                                     "#FF0080";
// Tints
ice.colors.LIGHT_RED =        ice.colors.SALMON =     "#FF8080";
ice.colors.LIGHT_ORANGE =     ice.colors.PEACH =      "#FFC080";
ice.colors.LIGHT_YELLOW =     ice.colors.CANARY =     "#FFFF80";
ice.colors.LIGHT_CHARTREUSE = ice.colors.KEYLIME =    "#C0FF80";
ice.colors.LIGHT_GREEN =      ice.colors.SHAMROCK =   "#80FF80";
ice.colors.LIGHT_MINT =       ice.colors.SEAFOAM =    "#80FFC0";
ice.colors.LIGHT_CYAN =       ice.colors.SKY =        "#80FFFF";
ice.colors.LIGHT_CERULEAN =   ice.colors.CORNFLOWER = "#80C0FF";
ice.colors.LIGHT_BLUE =       ice.colors.INDIGO =     "#8080FF";
ice.colors.LIGHT_PURPLE =     ice.colors.LAVENDER =   "#C080FF";
ice.colors.LIGHT_MAGENTA =    ice.colors.ORCHID =     "#800080";
ice.colors.LIGHT_PINK =       ice.colors.CARNATION =  "#FF80C0";
// Shades
ice.colors.DARK_RED =         ice.colors.MAROON =     "#800000";
ice.colors.DARK_ORANGE =      ice.colors.RUST =       "#804000";
ice.colors.DARK_YELLOW =      ice.colors.OLIVE =      "#808000";
ice.colors.DARK_CHARTREUSE =  ice.colors.BASIL =      "#408000";
ice.colors.DARK_GREEN =       ice.colors.GREEN =      "#008000";
ice.colors.DARK_MINT =        ice.colors.PINE =       "#008040";
ice.colors.DARK_CYAN =        ice.colors.TEAL =       "#008080";
ice.colors.DARK_CERULEAN =    ice.colors.COBALT =     "#004080";
ice.colors.DARK_BLUE =        ice.colors.NAVY =       "#000080";
ice.colors.DARK_PURPLE =      ice.colors.EGGPLANT =   "#400080";
ice.colors.DARK_MAGENTA =     ice.colors.PLUM =       "#800080";
ice.colors.DARK_PINK =        ice.colors.BEETROOT =   "#800040";
// Grayscale
ice.colors.WHITE =                                    "#FFFFFF";
ice.colors.LIGHT_GRAY =       ice.colors.SILVER =     "#C0C0C0";
ice.colors.GRAY =                                     "#808080";
ice.colors.DARK_GRAY =        ice.colors.CHARCOAL =   "#404040";
ice.colors.BLACK =                                    "#000000";
// Misc colors
ice.colors.BROWN =                                    "#804020";
ice.colors.GOLD =                                     "#D0B030";
// Duplicates
ice.colors.AQUA =             ice.colors.CYAN;
ice.colors.VIOLET =           ice.colors.PURPLE;
ice.colors.FUCHSIA =          ice.colors.MAGENTA;
ice.colors.GREY =             ice.colors.GRAY;
ice.colors.LIGHT_AQUA =       ice.colors.LIGHT_CYAN;
ice.colors.LIGHT_VIOLET =     ice.colors.LIGHT_PURPLE;
ice.colors.LIGHT_FUCHSIA =    ice.colors.LIGHT_MAGENTA;
ice.colors.LIGHT_GREY =       ice.colors.LIGHT_GRAY;
ice.colors.DARK_AQUA =        ice.colors.DARK_CYAN;
ice.colors.DARK_VIOLET =      ice.colors.DARK_PURPLE;
ice.colors.DARK_FUCHSIA =     ice.colors.DARK_MAGENTA;
ice.colors.DARK_GREY =        ice.colors.DARK_GRAY;

/*
 *  debug module
 */
// Functions
ice.debug.testFunction = function(testFunction, sampleSize, arguments) {
  // Stores results
  var results = {}
  // Stores info on results
  var min;
  var max;
  var resultsText = {}
  var totalResults = 0;
  // Runs the function [sampleSize] times, incrementing results[(the result)]
  for(var i = 0; i < sampleSize; i++) {
    var result = testFunction.apply(null, arguments);
    if(typeof results[result] === "undefined") {
      results[result] = 1;
    }
    else {
      results[result]++;
    }
  }
  // loops through results, noting important values and adding percentage information
  for(var key in results) {
    if(typeof min === "undefined") {min = key; max = key}
    if(results[key] < results[min]) {min = key;}
    if(results[key] > results[max]) {max = key;}
    totalResults++;
    resultsText[key] = results[key] + " (" + ((results[key] / sampleSize) * 100).toFixed(2) + "%)";
  }
  // The information to be returned
  var returnObject = {
    "Function tested": testFunction.toString(),
    "Sample size": sampleSize,
    "Total unique results": totalResults,
    "Expected mean (assuming even distribution)": sampleSize / totalResults + "(" + (100 / totalResults).toFixed(2) + "%)",
    "Most common": max + ", occuring a whopping " + results[max] + " times (" + ((results[max] / sampleSize) * 100).toFixed(2) + "%)",
    "Least common": min + ", occuring only " + results[min] + " times (" + ((results[min] / sampleSize) * 100).toFixed(2) + "%)",
    "Results": resultsText
  }
  return returnObject;
}