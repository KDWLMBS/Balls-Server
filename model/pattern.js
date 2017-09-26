const mongoose = require('mongoose');
const connection = require('../persistence');

let schema = new mongoose.Schema({
  name: String,
  lastModified: Date,
  frames: [{
  	duration: Number,
  	positions: [Number]
  }]
});

module.exports = connection.model('pattern', schema, 'patterns');
