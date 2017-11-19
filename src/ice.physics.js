/*
 *	physics module
 */
 
ice.physics.version = "v1.0.0"; // This version of the ice.physics module

// Functions
ice.physics.circleInCircle = function(x1, y1, r1, x2, y2, r2) { // returns whether or not two circles are colliding
	var distX = x1 - x2;
	var distY = y1 - y2;
	var radSum = r1 + r2;
	return distX * distX + distY * distY <= radSum * radSum;
}
ice.physics.pointInCircle = function(x1, y1, x2, y2, r2) { // returns whether or not a point is in a circle
	var distX = x1 - x2;
	var distY = y1 - y2;
	var radSum = r1 + r2;
	return distX * distX + distY * distY <= radSum * radSum;
}