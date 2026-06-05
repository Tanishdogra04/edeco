const express = require('express');
const router = express.Router();
const CounsellingRequest = require('../models/CounsellingRequest');
const { protect, admin } = require('../middleware/auth');
const sendEmail = require('../utils/email');

// @desc    Submit a new admissions counselling request
// @route   POST /api/counselling/request
// @access  Public
router.post('/request', async (req, res) => {
  const { name, phone, email, stream, education, year, exam, score, query } = req.body;

  try {
    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, phone, and email address'
      });
    }

    const request = await CounsellingRequest.create({
      name,
      phone,
      email,
      stream,
      education,
      year,
      exam,
      score,
      query
    });

    // Send admin notification email asynchronously (non-blocking)
    if (sendEmail.sendAdminAlert) {
      sendEmail.sendAdminAlert({
        studentName: name,
        studentPhone: phone,
        studentEmail: email,
        targetExam: exam,
        query: query
      }).catch(err => console.error('Silent admin alert email dispatch error:', err));
    }

    res.status(201).json({
      success: true,
      message: 'Counseling request logged successfully',
      request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get all admissions counselling requests
// @route   GET /api/counselling
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const requests = await CounsellingRequest.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Update a counselling request status
// @route   PUT /api/counselling/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Contacted', 'Resolved', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const request = await CounsellingRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Counselling request not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

