const mongoose = require('mongoose');
const log4js = require('log4js');
const Promise = require('bluebird');
require('mongoose').Promise = Promise;

const logger = log4js.getLogger('peristence');


logger.info(`connecting`);
let url = process.env.MONGODB_URL || 'mongodb://localhost:27017/kdwlmbs';
logger.info('connecting to ' + url);
let connection = mongoose.createConnection(url, {server: {poolSize: 4}});

connection.on('error', err => {
    logger.error('connection error', err);
});
connection.on('open', () => {
    logger.info('connected');
});
connection.on('reconnected', () => {
    logger.info('reconnected');
});
connection.on('disconnected', () => {
    logger.info('disconnected');
    //TODO handle disconnect?
});

module.exports = connection;

