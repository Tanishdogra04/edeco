const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const EventRegistration = require('../models/EventRegistration');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get event details by ID
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id.toLowerCase() });

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Public
router.post('/:id/register', async (req, res) => {
  const { name, email, phone } = req.body;
  const eventId = req.params.id.toLowerCase();

  try {
    // Confirm event exists
    const event = await Event.findOne({ id: eventId });
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    // Save registration
    const registration = await EventRegistration.create({
      eventId,
      name,
      email,
      phone
    });

    // Optionally update slots text or seat counts
    if (event.slots && event.slots.includes('seats left')) {
      const seats = parseInt(event.slots.replace(/[^0-9]/g, ''));
      if (!isNaN(seats) && seats > 0) {
        event.slots = `${seats - 1} seats left`;
        await event.save();
      }
    }

    res.status(201).json({
      success: true,
      message: 'Successfully registered for this event',
      registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
