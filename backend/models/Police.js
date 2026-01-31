const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const policeSchema = new mongoose.Schema({
  badgeId: {
    type: String,
    required: [true, 'Badge ID is required'],
    unique: true,
    uppercase: true,
    match: [/^OFC-[0-9]{3}$/, 'Badge ID must be in format OFC-XXX']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [
      /^[0-9]{10}$/,
      'Please provide a valid 10-digit phone number'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: {
      values: ['cyber_cell', 'investigation', 'supervisor', 'support'],
      message: 'Please select a valid department'
    }
  },
  rank: {
    type: String,
    required: [true, 'Rank is required'],
    enum: {
      values: ['constable', 'head_constable', 'asi', 'si', 'inspector', 'dsp', 'sp', 'dig', 'igp'],
      message: 'Please select a valid rank'
    }
  },
  jurisdiction: {
    type: String,
    required: [true, 'Jurisdiction is required']
  },
  policeStation: {
    type: String,
    required: [true, 'Police station is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  permissions: {
    canViewAllCases: {
      type: Boolean,
      default: false
    },
    canAssignCases: {
      type: Boolean,
      default: false
    },
    canUpdateStatus: {
      type: Boolean,
      default: true
    },
    canDeleteCases: {
      type: Boolean,
      default: false
    },
    canManageUsers: {
      type: Boolean,
      default: false
    },
    canViewAnalytics: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Virtual for checking if account is locked
policeSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving
policeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
policeSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Increment login attempts and lock account if necessary
policeSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Reset login attempts on successful login
policeSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
    $set: { lastLogin: Date.now() }
  });
};

module.exports = mongoose.model('Police', policeSchema);
