var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("debug");
	ice.debug = {};
	ice.debug.version = "v2.0.0"; // This version of the ice.debug module

	/*
	 *	================ Debug Module ================
	 */

	// Methods

	ice.debug.testFunction = function(func, sampleSize, args) {
		// Stores results
		var results = {};
		// Stores info on results
		var min;
		var max;
		var resultsText = {};
		var totalResults = 0;
		var percent = Math.floor(sampleSize / 100);
		var before = performance.now();
		// Runs the function [sampleSize] times, incrementing results[(the result)]
		for(var i = 0; i < sampleSize; i++) {
			var result = func.apply(null, args);
			if(typeof results[result] === "undefined") {
				results[result] = 1;
			}
			else {
				results[result]++;
			}
			if(i % percent === 0) {
				console.log("Test progress: " + Math.floor(i / percent) + "%");
			}
		}
		var after = performance.now();
		// loops through results, noting important values and adding percentage information
		for(var key in results) {
			if(typeof min === "undefined") {min = key; max = key}
			if(results[key] < results[min]) {min = key;}
			if(results[key] > results[max]) {max = key;}
			totalResults++;
			resultsText[key] = results[key] + " (" + ((results[key] / sampleSize) * 100).toFixed(2) + "%)";
		}
		var totalSeconds = (after - before) / 1000;
		var totalTime = "";
		if(totalSeconds >= 60) {
			totalTime += Math.floor(totalSeconds / 60) + " Minutes, ";
		}
		totalTime += totalSeconds % 60 + " Seconds";
		// The information to be returned
		var returnObject = {
			"Function tested": func.toString(),
			"Sample size": sampleSize,
			"Total unique results": totalResults,
			"Total time": totalTime,
			"Average time": ((after - before) / sampleSize) + " milliseconds",
			"Total unique results": totalResults,
			"Expected mean (assuming even distribution)": sampleSize / totalResults + "(" + (100 / totalResults).toFixed(2) + "%)",
			"Most common": max + ", occuring a whopping " + results[max] + " times (" + ((results[max] / sampleSize) * 100).toFixed(2) + "%)",
			"Least common": min + ", occuring only " + results[min] + " times (" + ((results[min] / sampleSize) * 100).toFixed(2) + "%)",
			"Results": resultsText
		}
		return returnObject;
	}

	return ice;
}(ice || {}));
