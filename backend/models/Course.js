const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  iconName: {
    type: String,
    default: 'Code2'
  },
  duration: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  demand: {
    type: String,
    default: 'High'
  },
  demandColor: {
    type: String,
    default: 'bg-[#0f71cd] text-white border-transparent'
  },
  eligibility: {
    type: String,
    required: true
  },
  jobs: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);
