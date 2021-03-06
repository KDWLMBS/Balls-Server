const log4js = require('log4js');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const io = require('socket.io');
const cors = require('cors');
const bridgeService = require('./services/bridge-service');
const isAuthenticated = require('./middleware/auth')

const jwt = require('jsonwebtoken');

//setup log4js (affects log4js globally)
log4js.configure({
    appenders: {default: {type: 'console'}},
    categories: {default: {appenders: ['default'], level: 'debug'}}
});

//create a logger for logging
const logger = log4js.getLogger();

//create a new express router
const app = express();

//setup all the express middleware and config
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 9090);
app.set('www-dir', path.join(__dirname, '..', 'www'));

//setup routes
app.use('/', express.static(app.get('www-dir')));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pattern', isAuthenticated, require('./routes/pattern'));
app.use('/api/formula', isAuthenticated, require('./routes/formula'));
app.use('/api/live', isAuthenticated, require('./routes/live'));


//start the server
let server = app.listen(app.get('port'), () => {
    logger.info(`the server is now listening on port ${app.get('port')}`);
});

let socket = io(server);
socket.on('connection', connection => {
	logger.info('client connected');
  connection.on('setPosition', (index, position) => {
    bridgeService.setPosition(index, position);
  });
});
