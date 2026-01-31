const jwt = require('jsonwebtoken');
const Victim = require('../models/Victim');
const Police = require('../models/Police');

// Generate JWT Token
const generateToken = (id, userType) => {
  return jwt.sign(
    { id, userType },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Generate Refresh Token
const generateRefreshToken = (id, userType) => {
  return jwt.sign(
    { id, userType, type: 'refresh' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Verify JWT Token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Authentication middleware for protected routes
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = verifyToken(token);
      
      // Find user based on type
      let user;
      if (decoded.userType === 'victim') {
        user = await Victim.findById(decoded.id).select('+password');
      } else if (decoded.userType === 'police') {
        user = await Police.findById(decoded.id).select('+password');
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid token. User not found.'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: 'Account is deactivated.'
        });
      }

      // For police users, check if account is locked
      if (decoded.userType === 'police' && user.isLocked) {
        return res.status(423).json({
          success: false,
          error: 'Account is locked due to multiple failed login attempts.'
        });
      }

      req.user = user;
      req.userType = decoded.userType;
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token.'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during authentication.'
    });
  }
};

// Role-based authorization middleware
const authorize = (...userTypes) => {
  return (req, res, next) => {
    if (!req.userType || !userTypes.includes(req.userType)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Insufficient permissions.'
      });
    }
    next();
  };
};

// Permission-based authorization for police users
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (req.userType !== 'police') {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Police access required.'
      });
    }

    if (!req.user.permissions[permission]) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Missing permission: ${permission}`
      });
    }

    next();
  };
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = verifyToken(token);
        let user;
        
        if (decoded.userType === 'victim') {
          user = await Victim.findById(decoded.id);
        } else if (decoded.userType === 'police') {
          user = await Police.findById(decoded.id);
        }

        if (user && user.isActive) {
          req.user = user;
          req.userType = decoded.userType;
        }
      } catch (jwtError) {
        // Token is invalid, but we continue without authentication
      }
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  authenticate,
  authorize,
  requirePermission,
  optionalAuth
};
