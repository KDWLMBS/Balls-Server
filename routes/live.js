const express = require('express');
const Pattern = require('../model/pattern');
const log4js = require('log4js');
const logger = log4js.getLogger('route:live');
const bridgeService = require('../services/bridge-service');

//create a new router for all the pattern routes
const router = express.Router();

router.post('/', async(req, res) => {
  bridgeService.mode = 'live';
  res.send(bridgeService.positions);
});


module.exports = router;
