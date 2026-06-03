const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    default: '5 Min Read'
  },
  views: {
    type: String,
    default: '0 Views'
  },
  author: {
    name: String,
    role: String,
    avatar: String
  },
  image: {
    type: String,
    default: ''
  },
  content: {
    type: [mongoose.Schema.Types.Mixed], // Supports dynamic block types: h2, p, quote, highlight
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', NewsSchema);
