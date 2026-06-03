const mongoose = require('mongoose');

const EventRegistrationSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email address']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EventRegistration', EventRegistrationSchema);
