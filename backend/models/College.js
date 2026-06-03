const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ''
  },
  stream: {
    type: String,
    default: 'Engineering'
  },
  image: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    default: '4.5'
  },
  fees: {
    type: String,
    default: ''
  },
  nirf: {
    type: String,
    default: ''
  },
  package: {
    type: String,
    default: ''
  },
  highestPackage: {
    type: String,
    default: ''
  },
  reviews: {
    type: String,
    default: '0 Reviews',
    views: { type: Number, default: 0 }
  },
  description: {
    type: String,
    default: ''
  },
  ownership: {
    type: String,
    default: 'Public'
  },
  approvals: {
    type: [String],
    default: []
  },
  stats: {
    avgFees: String,
    placementRate: String,
    avgPackage: String,
    highestPackage: String,
    facultyRating: String,
    infrastructure: String,
    recruiters: String
  },
  about: {
    type: String,
    default: ''
  },
  whyChoose: [
    {
      title: String,
      desc: String
    }
  ],
  courses: [
    {
      name: String,
      fees: String,
      duration: String,
      eligibility: String
    }
  ],
  recruitersList: [
    {
      name: String,
      logo: String
    }
  ],
  facilities: [
    {
      name: String,
      iconName: String // string identifier of the Lucide icon, e.g. "Building2"
    }
  ],
  reviewsList: [
    {
      name: String,
      course: String,
      rating: Number,
      text: String
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

module.exports = mongoose.model('College', CollegeSchema);
