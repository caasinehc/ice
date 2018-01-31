if(typeof ice === "undefined") {
	ice = {};
	ice.modules = [];
}
(function() {
	if(!ice.modules.includes("time")) ice.modules.push("time");
	ice.time = {};
	ice.time.version = "v1.0.2"; // This version of the ice.time module
	console.log("%cice.time " + ice.time.version + " imported successfully.", "color: #008000");

	/*
	 *	================ Time Module ================
	 */

	// Constructors

	ice.time.Clock = function(tickRate = 60) {
		if(!(this instanceof ice.time.Clock)) {
			return new ice.time.Clock(tickRate);
		}

		this.tickRate = tickRate;
		this.memorySize = tickRate;
		this.smoothTps = true;

		this.tps = tickRate;
		this.mspt = 1000 / this.tps;
		this.dt = performance.now();
		this.tickCount = 0;
		this.tpsHistory = [];

		let noLoop = false;
		let loop;
		let lastTick = performance.now();
		let dtMem = [];

		let tick = () => {
			if(!noLoop) {
				updateTime();
				this.tick();
			}
		}
		let updateTime = () => {
			this.tickCount++;
			let now = performance.now();
			this.dt = now - lastTick;
			lastTick = now;

			dtMem.unshift(this.dt); // Add this dt to dtMem (at start of array)
			dtMem = dtMem.slice(0, this.memorySize); // cut off any extra entries from the end of the array
			this.mspt = 0;
			if(this.smoothTps) {
				for(let i = dtMem.length - 1; i >= 0; i--) {
					this.mspt += dtMem[i];
					this.mspt /= 2;
				}
			}
			else {
				for(let i = 0; i < dtMem.length; i++) {
					this.mspt += dtMem[i];
				}
				this.mspt /= dtMem.length;
			}
			this.mspt = Math.round(this.mspt);
			this.tps = +(1000 / this.mspt).toFixed(2);

			this.tpsHistory.unshift(this.tps); // Add this dt to dtMem (at start of array)
			this.tpsHistory = this.tpsHistory.slice(0, this.memorySize); // cut off any extra entries from the end of the array
		}

		this.tick = function() {};

		this.setTickRate = (tickRate = 60) => {
			if(tickRate !== this.tickRate) {
				this.tickRate = tickRate;
				clearInterval(loop);
				loop = setInterval(tick, 1000 / tickRate);
			}
		}
		this.loop = (loop) => {
			if(loop === undefined) return !noLoop;
			noLoop = !loop;
		}

		loop = setInterval(tick, 1000 / this.tps);
	}
})();
