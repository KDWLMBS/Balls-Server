const mongoose = require('mongoose');
const connection = require('../persistence');

let schema = new mongoose.Schema({
  name: String,
  lastModified: Date,
  type: {
    type: String,
    enum: ['SINGLE', 'MULTIPLE']
  },
  frames: [{
  	duration: Number, //duration is only used for multiple mode
  	positions: [Number]
  }],
  //shift-related stuff is only used for single
  shift: {
    type: Boolean,
    default: null
  },
  shiftDirection: {
    type: String,
    default: null,
    enum: [
      null,
      'LEFT',
      'RIGHT'
    ]
  },
  shiftDuration: {  //in milliseconds
    type: Number,
    default: null
  }
});

module.exports = connection.model('pattern', schema, 'patterns');
