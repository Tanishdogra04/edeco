const express = require('express');
const router = express.Router();
const City = require('../models/City');

// @desc    Get all cities
// @route   GET /api/cities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const cities = await City.find({}).lean();
    res.json({
      success: true,
      count: cities.length,
      cities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get city details by ID
// @route   GET /api/cities/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findOne({ id: req.params.id.toLowerCase() }).lean();
    
    if (!city) {
      return res.status(404).json({
        success: false,
        error: 'City not found'
      });
    }

    res.json({
      success: true,
      city
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
