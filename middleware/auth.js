const jwt = require('jsonwebtoken');
const log4js = require('log4js');
const logger = log4js.getLogger();

module.exports = function isAuthenticated(req, res, next) {
    const token = req.headers ? req.headers.authorization : null;
    if (!token) return res.send('You must supply a token for authorization!');
    try {
      const payload = jwt.verify(token.replace('Bearer ', ''), 'secret');
      req.userId = payload.userId;
      return next();
    } catch (err) {
      return res.send('You are not authorized!');
    }
  }