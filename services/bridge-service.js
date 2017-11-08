const log4js = require('log4js');
const logger = log4js.getLogger();
const unirest = require('unirest');
const _ = require('underscore');
const fs = require('fs');
const path = require('path');

class BridgeService {
	constructor() {
		setInterval(this.loop.bind(this), 100);
		setInterval(this.multi.bind(this), 1000);
		this.mode = 'live';
		this.frames = [];
		this.currentFrame = 0;
		this.positions = [];
		_.times(30, () => {
			this.positions.push(0);
		});
	}


	loop() {
		//if(this.mode === 'live') {
			this._sendPositions();
		//}
	}

	multi() {
		if(this.mode === 'playPattern') {
			this.currentFrame++;
			if(this.currentFrame === this.frames.length) {
				this.currentFrame = 0;
			}
			this.positions = this.frames[this.currentFrame].positions;
		}
	}

	setPosition(index, position) {
		this.positions[index] = position;
	}

	playPattern(pattern) {
		if(pattern.type === 'SINGLE') {
			this.mode = 'live';
			this.positions = pattern.frames[0].positions;
		} else if(pattern.type === 'MULTIPLE') {
			console.log('multi!');
			console.log('patt', pattern);
			this.mode = 'playPattern';
			this.currentFrame = 0;
			this.frames = pattern.frames;
			this.positions = pattern.frames[0].positions;
			// console.log(this.posi)
		}
	}

	_sendPositions() {
		if(process.env.POSITION_FILE) {
			fs.writeFile(process.env.POSITION_FILE, _.map(this.positions, p => p * 2).join(' '), (err) => {
				if(err) {
					logger.erro('failed to write the pos file', err);
				}
			});
		}
	}

	// playPattern(pattern) {
	// 	this.mode = 'pattern';
	// 	this._playPattern(pattern);
	// }
	//
	// _playPattern(pattern) {
	// 	pattern.frames = _.map(pattern.frames, frame => {
	// 		return [frame.duration, ...frame.positions];
	// 	});
	// 	this._sendCommand('play', [pattern.frames]);
	// }
	//

	// _sendCommand(command, args) {
	// 	logger.info(`sending command ${command} with args ${JSON.stringify(args)}`);
	// }
}


module.exports = new BridgeService();
