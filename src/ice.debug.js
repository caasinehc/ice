var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("debug");
	ice.debug = {};
	ice.debug.version = "v2.1.2"; // This version of the ice.debug module
	console.log("ice.debug " + ice.debug.version + " imported successfully.");

	/*
	 *	================ Debug Module ================
	 */

	// Properties

	ice.debug.styles = {};
	ice.debug.styles.TITLE = {
		bold: true,
		size: "32px",
		underline: true
	};
	ice.debug.styles.LINE_RAINBOW = {
		padding: "0px 50% 0px 50%",
		size: "4px",
		background: "linear-gradient(to right, #F00, #FF0, #0F0, #0FF, #00F, #F0F)",
		type: "hidden"
	};
	ice.debug.styles.LINE = {
		padding: "0px 50% 0px 50%",
		size: "4px",
		background: "#000000",
		type: "hidden"
	};
	ice.debug.styles.WARN = {
		background: "#FFFFC0",
		color: "#404040",
		prefix: "\u26A0 "
	};
	ice.debug.styles.ERR = {
		background: "#FFC0C0",
		color: "#400000",
		prefix: "\u2BBF "
	};
	ice.debug.styles.INFO = {
		background: "#C0C0FF",
		color: "#000040",
		prefix: "\u{1F6C8} "
	};

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
		console.groupCollapsed("Progress");
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
		console.groupEnd();
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
			"Expected frequency (assuming even distribution)": sampleSize / totalResults + "(" + (100 / totalResults).toFixed(2) + "%)",
			"Most common": max + ", occuring a whopping " + results[max] + " times (" + ((results[max] / sampleSize) * 100).toFixed(2) + "%)",
			"Least common": min + ", occuring only " + results[min] + " times (" + ((results[min] / sampleSize) * 100).toFixed(2) + "%)"
		}
		console.table(returnObject);
		console.groupCollapsed("Results");
		console.table(resultsText);
		console.groupEnd();
		returnObject["Results"] = resultsText;
		return returnObject;
	}

	ice.debug.log = function(text, style) {
		if(typeof style === "string") {
			console.log("%c" + text, style);
		}
		else if(typeof style === "object") {
			var css = "";
			if(style.color !== undefined) {css += "color: " + style.color + ";";}
			if(style.bold) {css += "font-weight: bold;";}
			if(style.underline || style.overline || style.strike) {css += "text-decoration:";}
			if(style.underline) {css += " underline";}
			if(style.overline) {css += " overline";}
			if(style.strike) {css += " strike";}
			if(style.underline || style.overline || style.strike) {css += ";";}
			if(style.italic) {css += "font-style: italic;";}
			if(style.line_height !== undefined) {css += "line-height: " + style.line_height + ";";}
			if(style.background !== undefined) {css += "background: " + style.background + ";";}
			if(style.font !== undefined) {css += "font-family: " + style.font + ";";}
			if(style.size !== undefined) {css += "font-size: " + style.size + ";";}
			if(style.border_style === undefined && (
				style.border_width !== undefined ||
				style.border_color !== undefined ||
				style.border_radius !== undefined
			)) {css += "border-style: solid;";}
			else if(style.border_style !== undefined) {css += "border-style: " + style.border_style + ";";}
			if(style.border_width !== undefined) {css += "border-width: " + style.border_width + ";";}
			if(style.border_color !== undefined) {css += "border-color: " + style.border_color + ";";}
			if(style.border_radius !== undefined) {css += "border-radius: " + style.border_radius + ";";}
			if(style.margin !== undefined) {css += "margin: " + style.margin + ";";}
			if(style.padding !== undefined) {css += "padding: " + style.padding + ";";}
			if(style.shadow !== undefined) {css += "text-shadow: " + style.shadow + ";";}
			if(style.prefix !== undefined) {text = style.prefix + text;}
			if(style.suffix !== undefined) {text = text + style.suffix;}

			if(style.type === "error") {
				console.error("%c" + text, css);
			}
			else if(style.type === "warning" || style.type === "warn") {
				console.warn("%c" + text, css);
			}
			else if(style.type === "info") {
				console.info("%c" + text, css);
			}
			else if(style.type === "debug") {
				console.debug("%c" + text, css);
			}
			else if(style.type === "hidden") {
				console.log("%c", css);
			}
			else {
				console.log("%c" + text, css);
			}
		}
	}

	return ice;
}(ice || {}));
