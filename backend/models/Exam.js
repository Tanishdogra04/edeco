const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  fullTitle: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: ''
  },
  applicants: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  conductingBody: {
    type: String,
    default: ''
  },
  frequency: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  },
  overview: {
    type: String,
    default: ''
  },
  highlights: [
    {
      label: String,
      value: String
    }
  ],
  process: [
    {
      title: String,
      desc: String
    }
  ],
  syllabus: [
    {
      subject: String,
      topics: [String]
    }
  ],
  dates: [
    {
      event: String,
      date: String,
      status: String // 'completed', 'active', 'upcoming'
    }
  ],
  tips: [
    {
      title: String,
      desc: String
    }
  ],
  cutoffs: [
    {
      college: String,
      cat: String,
      percentile: String
    }
  ],
  papers: [
    {
      year: String,
      size: String
    }
  ],
  faqs: [
    {
      q: String,
      a: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exam', ExamSchema);
