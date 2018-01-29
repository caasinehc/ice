var ice = (function (ice) {

	ice.modules = ice.modules || [];
	ice.modules.push("time");
	ice.time = {};
	ice.time.version = "v1.0.0"; // This version of the ice.time module
	console.log("%cice.time " + ice.time.version + " imported successfully.", "color: #008000");

	/*
	 *	================ Time Module ================
	 */

	// Constructors

	ice.time.Clock = function(tickRate = 60) {
		if(!(this instanceof ice.time.Clock)) {
			return new ice.time.Clock(tickRate);
		}

		let noLoop = false;
		let loop;
		let lastTick = performance.now();

		function tick() {
			if(!noLoop) {
				this.tickCount++;
				updateTime();
				this.tick();
			}
		}
		loop = setInterval(tick, 1000 / this.tps);
		function updateTime() {
			let now = performance.now();
			this.dt = now - lastTick;
			lastTick = now;
			this.mspt = (this.mspt * this.tpsSmoothing) + (this.dt * (1 - this.tpsSmoothing));
			if(this.tickCount % this.tickRate === 0 || this.tickRate === 0) {
				this.tps = Math.floor(1000 / this.mspt);
			}
		}

		this.tickRate = tickRate;
		this.tickCount = 0;
		this.dt = performance.now();
		this.mspt = 1000 / this.tps;
		this.tps = tickRate;
		this.tpsSmoothing = 0.99;

		this.tick = function() {};

		this.setTickRate = function(tickRate = 60) {
			if(tickRate !== this.tickRate) {
				this.tickRate = tickRate;
				clearInterval(loop);
				loop = setInterval(tick, 1000 / tickRate);
			}
		}
		this.loop = function(loop) {
			if(loop === undefined) return !noLoop;
			noLoop = !loop;
		}
	}

	return ice;
}(ice || {}));
