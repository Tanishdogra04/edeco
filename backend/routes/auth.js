const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'edeco_super_secret_jwt_key_2026', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email address already exists.'
      });
    }

    // Determine role (email includes 'admin' or domain is @edeco.com -> admin)
    const role = (email.toLowerCase().includes('admin') || email.toLowerCase().endsWith('@edeco.com')) ? 'admin' : 'user';

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e293b&color=fff`
    });

    if (user) {
      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          estd: user.estd,
          savedColleges: user.savedColleges
        }
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid user data provided'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'No account found with this email address.'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Incorrect password. Please try again.'
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        estd: user.estd,
        savedColleges: user.savedColleges
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get current logged in user
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        estd: user.estd,
        savedColleges: user.savedColleges
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Update user profile details
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.avatar = req.body.avatar || user.avatar;
      
      const updatedUser = await user.save();

      res.json({
        success: true,
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          role: updatedUser.role,
          estd: updatedUser.estd,
          savedColleges: updatedUser.savedColleges
        }
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Toggle saving a college to favorites
// @route   POST /api/auth/saved-colleges/:collegeId
// @access  Private
router.post('/saved-colleges/:collegeId', protect, async (req, res) => {
  const { collegeId } = req.params;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const index = user.savedColleges.indexOf(collegeId);
    if (index >= 0) {
      // Remove it
      user.savedColleges.splice(index, 1);
    } else {
      // Add it
      user.savedColleges.push(collegeId);
    }

    await user.save();

    res.json({
      success: true,
      savedColleges: user.savedColleges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
