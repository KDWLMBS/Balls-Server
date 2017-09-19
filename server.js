const log4js = require('log4js');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

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
app.set('port', process.env.PORT || 8080);
app.set('www-dir', path.join(__dirname, '..', 'www'));

//setup routes
app.use('/', express.static(app.get('www-dir')));
app.use('/api/pattern', require('./routes/pattern'));

//start the server
app.listen(app.get('port'), () => {
    logger.info(`the server is now listening on port ${app.get('port')}`);
});
