/*
 *	debug module
 */
 
ice.debug.version = "v1.0.1"; // This version of the ice.debug module

// Functions
ice.debug.testFunction = function(testFunction, sampleSize, args) {
	// Stores results
	var results = {}
	// Stores info on results
	var min;
	var max;
	var resultsText = {}
	var totalResults = 0;
	// Runs the function [sampleSize] times, incrementing results[(the result)]
	for(var i = 0; i < sampleSize; i++) {
		var result = testFunction.apply(null, args);
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