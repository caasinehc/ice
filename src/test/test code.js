let copyCat = mouse.pos.clone();

function init() {
	// canvas.style.cursor = "none";
	
	// tickRate(60);
}
if(typeof ice !== "undefined" && ice.meta.framework.initialized) init();

function render() {
	background();
	
	fill(BLACK);
	point(mouse.pos, 10);
	
	fill(RED);
	point(copyCat, 5);
}

function tick(dt) {
	console.log(dt);
	
	copyCat.set(mouse.pos);
}