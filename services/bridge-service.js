const log4js = require('log4js');
const logger = log4js.getLogger();
const unirest = require('unirest');
const _ = require('underscore');
const fs = require('fs');
const path = require('path');

class BridgeService {
	constructor() {
		setInterval(this.loop.bind(this), 100);
		this.mode = 'live';
		this.frames = [];
		this.currentFrame = 0;
		this.positions = [];
		_.times(30, () => {
			this.positions.push(0);
		});
	}


	loop() {
		if(this.mode === 'live') {
			console.log('loop')
			this._sendPositions();
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
			this.mode = 'playPattern';
			this.currentFrame = 0;
			this.frames = frames;
		}
	}

	_sendPositions() {
		fs.writeFile(path.join(__dirname, 'pos'), this.positions.join(','));
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
