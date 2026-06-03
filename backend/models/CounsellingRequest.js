const mongoose = require('mongoose');

const CounsellingRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  email: {
    type: String,
    required: [true, 'Please add an email address']
  },
  stream: {
    type: String,
    default: ''
  },
  education: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: '2026'
  },
  exam: {
    type: String,
    default: ''
  },
  score: {
    type: String,
    default: ''
  },
  query: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Resolved', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CounsellingRequest', CounsellingRequestSchema);
