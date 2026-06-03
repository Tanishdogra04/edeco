const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this resource'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'edeco_super_secret_jwt_key_2026');

    // Attach user to req object (excluding password)
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found with this token'
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this resource'
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to access this resource. Admin role required.'
    });
  }
};

module.exports = { protect, admin };
