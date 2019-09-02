let pos;

function init() {
	pos = middle.clone();
	init = undefined;
}
if(typeof ice !== "undefined" && ice.meta.framework.initialized) init();

function tick() {
	pos.lerp(mouse.pos, 0.1);
}

function render() {
	background(SALMON);
	
	fill(SILVER);
	stroke(BLACK);
	strokeWidth(4);
	point(pos, 32);
}