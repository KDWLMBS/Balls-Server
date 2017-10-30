const express = require('express');
const Formula = require('../model/formula');
const log4js = require('log4js');
const logger = log4js.getLogger('route:formula');
const bridgeService = require('../services/bridge-service');

//create a new router for all the pattern routes
const router = express.Router();


//setup all the CRUD routes (see https://de.wikipedia.org/wiki/CRUD)

router.get('/all', async(req, res) => {
    let formulas = await Formula.find().select('name');
    res.send(formulas);
});

router.get('/:id', async(req, res) => {
    let formula = await Formula.findById(req.params.id);
    res.send(formula);
});

router.delete('/:id', async(req, res) => {
    let status = await Formula.remove({_id: req.params.id});
    res.send(status);
});

router.put('/', async(req, res) => {
    let formula = new Formula(req.body);
    await formula.save();
    res.send(formula);
});


router.post('/:id', async(req, res) => {
    let formula = await Formula.findById(req.params.id);
    formula.formula = req.body.formula;
    formula.shift = req.body.shift;
    formula.shiftDirection = req.body.shiftDirection;
    formula.shiftDuration = req.body.shiftDuration;
    formula.minX = req.body.minX;
    formula.maxX = req.body.maxX;
    formula.minY = req.body.minY;
    formula.maxY = req.body.maxY;
    formula.lastModified = Date.now();
    await formula.save();
    res.send(formula);
});


router.post('/play/:id', async (req, res) => {
	if(req.body && req.body._id) {
		logger.warn('/formula/play was called with a body. this is not needed');
	}
	let formula = await Formula.findById(req.params.id);
	bridgeService.playFormula(formula);
});


module.exports = router;
