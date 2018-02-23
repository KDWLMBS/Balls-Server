const mongoose = require('mongoose');
const connection = require('../persistence');

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },  
  password: {
    type: String,
    required: true
  }
});

module.exports = connection.model('user', schema, 'users');
