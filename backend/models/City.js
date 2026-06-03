const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  count: {
    type: String,
    default: '0+ Colleges'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('City', CitySchema);
