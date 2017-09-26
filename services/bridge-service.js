const log4js = require('log4js');
const logger = log4js.getLogger('bridge-service');
const unirest = require('unirest');
const _ = require('underscore');

class BridgeService {
	play(pattern) {
		pattern.frames = _.map(pattern.frames, frame => {
			return [frame.duration, ...frame.positions];
		});
		this._sendCommand('play', [pattern.frames]);
	}

	setPosition(index, position) {
		this._sendCommand('setPosition', [index, position]);
	}

	_sendCommand(command, args) {
		logger.info(`sending command ${command} with args ${JSON.stringify(args)}`);
	}
}


module.exports = new BridgeService();