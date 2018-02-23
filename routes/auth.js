const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const log4js = require('log4js');
const logger = log4js.getLogger('route:user');

//create a new router for all the pattern routes
const router = express.Router();

//setup all the routes (see https://de.wikipedia.org/wiki/CRUD)

router.post('/login', async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send({message: `Could not find a user with email: ${req.body.email}`});
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.send({message: `The provided password was not correct, please check your input!`})
    const token = jwt.sign({ userId: user._id }, 'secret');
    res.json({token, user});
});

router.post('/signup', async(req, res) => {
    if (req.body && !req.body.password) return res.sendStatus(503);

    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({...req.body, password}).catch(err => logger.error(err.message));
    if (!user) return res.sendStatus(503);
    const token = jwt.sign({ userId: user._id }, 'secret');
    res.json({token, user});
});

module.exports = router;
