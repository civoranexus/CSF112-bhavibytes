const AuditLog = require('../models/AuditLog');

// Audit logging middleware
const auditLog = (action, resource) => {
  return async (req, res, next) => {
    // Store original res.json function
    const originalJson = res.json;
    
    // Override res.json to capture response
    res.json = function(data) {
      // Log the action after response is sent
      setImmediate(async () => {
        try {
          if (req.user && req.userType) {
            const auditData = {
              user: req.user._id,
              userType: req.userType,
              action,
              resource,
              resourceId: req.params.id || req.body._id || req.user._id,
              details: {
                method: req.method,
                url: req.originalUrl,
                body: req.body,
                query: req.query,
                params: req.params,
                response: data.success ? 'Success' : 'Failed'
              },
              ipAddress: req.ip || req.connection.remoteAddress,
              userAgent: req.get('User-Agent'),
              success: data.success || false,
              errorMessage: data.error || null,
              sessionId: req.sessionID
            };

            // Try to get location information (optional)
            try {
              const geoip = require('geoip-lite');
              const geo = geoip.lookup(req.ip);
              if (geo) {
                auditData.location = {
                  country: geo.country,
                  region: geo.region,
                  city: geo.city
                };
              }
            } catch (geoError) {
              // Ignore geo location errors
            }

            await AuditLog.create(auditData);
          }
        } catch (error) {
          console.error('Audit logging error:', error);
          // Don't fail the request if audit logging fails
        }
      });
      
      // Call original json function
      originalJson.call(this, data);
    };
    
    next();
  };
};

// Get client IP address
const getClientIP = (req) => {
  return req.ip || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-client-ip'] ||
         req.headers['x-real-ip'] ||
         '127.0.0.1';
};

// Rate limiting for sensitive operations
const sensitiveOperationLimiter = require('express-rate-limit')({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many sensitive operations. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Password strength validation
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return 'Password must be at least 8 characters long';
  }
  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!hasLowerCase) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!hasNumbers) {
    return 'Password must contain at least one number';
  }
  if (!hasSpecialChar) {
    return 'Password must contain at least one special character';
  }

  return null; // Password is valid
};

// Sanitize input data
const sanitizeInput = (req, res, next) => {
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };

  const sanitizeObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    const sanitized = {};
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        sanitized[key] = sanitizeString(obj[key]);
      } else if (typeof obj[key] === 'object') {
        sanitized[key] = sanitizeObject(obj[key]);
      } else {
        sanitized[key] = obj[key];
      }
    }
    return sanitized;
  };

  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

module.exports = {
  auditLog,
  getClientIP,
  sensitiveOperationLimiter,
  validatePassword,
  sanitizeInput
};
