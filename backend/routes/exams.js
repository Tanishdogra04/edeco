const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const { protect, admin } = require('../middleware/auth');

// @desc    Get all exams
// @route   GET /api/exams
// @access  Public
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find({}).lean();
    res.json({
      success: true,
      count: exams.length,
      exams
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get exam details by ID
// @route   GET /api/exams/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findOne({ id: req.params.id.toLowerCase() }).lean();

    if (!exam) {
      return res.status(404).json({
        success: false,
        error: 'Exam not found'
      });
    }

    res.json({
      success: true,
      exam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Create a new exam
// @route   POST /api/exams
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  const {
    name,
    fullTitle,
    category,
    level,
    mode,
    applicants,
    duration,
    conductingBody,
    frequency,
    logo,
    overview,
    highlights,
    process,
    syllabus,
    dates,
    tips,
    cutoffs,
    papers,
    faqs
  } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least the exam name'
      });
    }

    // Generate unique ID from name (e.g. "JEE Main" -> "jee-main")
    let baseId = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    // Check if ID already exists, if so append unique suffix
    let uniqueId = baseId;
    let count = 1;
    while (await Exam.findOne({ id: uniqueId }).lean()) {
      uniqueId = `${baseId}-${count}`;
      count++;
    }

    const exam = await Exam.create({
      id: uniqueId,
      name,
      fullTitle: fullTitle || name,
      category: category || 'Engineering',
      level: level || 'National',
      mode: mode || 'Online / CBT',
      applicants: applicants || '',
      duration: duration || '',
      conductingBody: conductingBody || '',
      frequency: frequency || '',
      logo: logo || name.split(' ').map(w => w.charAt(0)).join('').toUpperCase(),
      overview: overview || '',
      highlights: highlights || [],
      process: process || [],
      syllabus: syllabus || [],
      dates: dates || [],
      tips: tips || [],
      cutoffs: cutoffs || [],
      papers: papers || [],
      faqs: faqs || []
    });

    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      exam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
