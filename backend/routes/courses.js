const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect, admin } = require('../middleware/auth');

// @desc    Get all professional courses
// @route   GET /api/courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({}).lean();
    res.json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Create a new professional course
// @route   POST /api/courses
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  const {
    name,
    category,
    iconName,
    duration,
    salary,
    demand,
    demandColor,
    eligibility,
    jobs
  } = req.body;

  try {
    if (!name || !category || !duration || !salary || !eligibility || !jobs) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, category, duration, salary, eligibility, and jobs'
      });
    }

    const course = await Course.create({
      name,
      category,
      iconName: iconName || 'Code2',
      duration,
      salary,
      demand: demand || 'High',
      demandColor: demandColor || 'bg-[#0f71cd] text-white border-transparent',
      eligibility,
      jobs
    });

    res.status(201).json({
      success: true,
      message: 'Professional course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
