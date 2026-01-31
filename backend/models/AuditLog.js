const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'userType',
    required: [true, 'User information is required']
  },
  userType: {
    type: String,
    enum: ['Victim', 'Police'],
    required: true
  },
  action: {
    type: String,
    required: [true, 'Action is required'],
    enum: {
      values: [
        'LOGIN',
        'LOGOUT',
        'CREATE_CASE',
        'UPDATE_CASE',
        'DELETE_CASE',
        'VIEW_CASE',
        'ASSIGN_CASE',
        'UPLOAD_EVIDENCE',
        'DOWNLOAD_EVIDENCE',
        'UPDATE_STATUS',
        'CREATE_USER',
        'UPDATE_USER',
        'DELETE_USER',
        'VIEW_REPORT',
        'EXPORT_DATA',
        'FAILED_LOGIN',
        'PASSWORD_CHANGE',
        'PASSWORD_RESET'
      ],
      message: 'Please select a valid action'
    }
  },
  resource: {
    type: String,
    required: [true, 'Resource is required']
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Resource ID is required']
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  ipAddress: {
    type: String,
    required: [true, 'IP address is required']
  },
  userAgent: {
    type: String,
    required: [true, 'User agent is required']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  success: {
    type: Boolean,
    default: true
  },
  errorMessage: String,
  sessionId: String,
  location: {
    country: String,
    region: String,
    city: String
  }
}, {
  timestamps: true
});

// Index for better query performance
auditLogSchema.index({ user: 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ resource: 1 });
auditLogSchema.index({ timestamp: -1 });
auditLogSchema.index({ ipAddress: 1 });

// TTL index to automatically delete logs after 1 year
auditLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 365 * 24 * 60 * 60 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
