const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    default: 'India'
  },
  studyLevel: {
    type: String,
    default: 'Undergraduate'
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: ''
  },
  speaker: {
    name: String,
    role: String,
    avatar: String
  },
  slots: {
    type: String,
    default: 'Filling fast'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);
