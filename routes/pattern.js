const express = require('express');
const Pattern = require('../model/pattern');

//create a new router for all the pattern routes
const router = express.Router();


//setup all the CRUD routes (see https://de.wikipedia.org/wiki/CRUD)

router.get('/all', async(req, res) => {
    let patterns = await Pattern.find().select('name');
    res.send(patterns);
});

router.get('/:id', async(req, res) => {
    let pattern = await Pattern.findById(req.params.id);
    res.send(pattern);
});

router.delete('/:id', async(req, res) => {
    let status = await Pattern.remove({_id: req.params.id});
    res.send(status);
});

router.put('/', async(req, res) => {
    let pattern = new Pattern(req.body);
    await pattern.save();
    res.send(pattern);
});


module.exports = router;