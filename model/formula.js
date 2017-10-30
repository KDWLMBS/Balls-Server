const mongoose = require('mongoose');
const connection = require('../persistence');

let schema = new mongoose.Schema({
  name: String,
  lastModified: Date,
  formula: String,
  minX: Number,
  maxX: Number,
  minY: Number,
  maxY: Number,
  shift: Boolean,
  shiftDirection: {
    type: String,
    enum: [
      'LEFT',
      'RIGHT'
    ]
  },
  shiftDuration: Number //in milliseconds
});

module.exports = connection.model('formula', schema, 'formulas');
