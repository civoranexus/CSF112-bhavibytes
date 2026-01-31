const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const demoData = require('../utils/demoData');

// Victim registration
router.post('/victim/register', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').isMobilePhone('en-IN').withMessage('Valid phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.pincode').isPostalCode('IN').withMessage('Valid pincode is required'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errors.array().map(err => err.msg)
    });
  }

  try {
    // Check if email already exists
    const existingVictim = demoData.victims.find(v => v.email === req.body.email);
    if (existingVictim) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Create new victim (in demo mode, just return success)
    const newVictim = {
      _id: 'v' + (demoData.victims.length + 1),
      ...req.body,
      isActive: true,
      createdAt: new Date()
    };

    // Generate token
    const token = demoData.auth.generateToken({ id: newVictim._id, type: 'victim' });

    res.status(201).json({
      success: true,
      message: 'Victim registered successfully',
      data: {
        token,
        victim: newVictim
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      message: error.message
    });
  }
});

// Victim login
router.post('/victim/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errors.array().map(err => err.msg)
    });
  }

  try {
    const { email, password } = req.body;
    const result = demoData.auth.victimLogin(email, password);

    if (result.success) {
      res.json({
        success: true,
        message: 'Login successful',
        data: result.data
      });
    } else {
      res.status(401).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: error.message
    });
  }
});

// Police login
router.post('/police/login', [
  body('badgeId').trim().notEmpty().withMessage('Badge ID is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('department').isIn(['cyber_cell', 'investigation', 'supervisor', 'support']).withMessage('Valid department is required'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errors.array().map(err => err.msg)
    });
  }

  try {
    const { badgeId, password, department } = req.body;
    const result = demoData.auth.policeLogin(badgeId, password);

    if (result.success) {
      res.json({
        success: true,
        message: 'Login successful',
        data: result.data
      });
    } else {
      res.status(401).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: error.message
    });
  }
});

// Get current user
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    const result = demoData.auth.getCurrentUser(token);
    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(401).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get user',
      message: error.message
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Refresh token
router.post('/refresh', [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errors.array().map(err => err.msg)
    });
  }

  try {
    const { refreshToken } = req.body;
    const result = demoData.auth.getCurrentUser(refreshToken);

    if (result.success) {
      // Generate new token
      const token = demoData.auth.generateToken({ id: result.data.user._id, type: result.data.userType });
      
      res.json({
        success: true,
        data: { token }
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Token refresh failed',
      message: error.message
    });
  }
});

module.exports = router;
