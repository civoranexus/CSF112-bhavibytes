const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    match: [/^CTN-[0-9]{6}$/, 'Case ID must be in format CTN-XXXXXX']
  },
  incidentType: {
    type: String,
    required: [true, 'Incident type is required'],
    enum: {
      values: [
        'Phishing / Social Engineering',
        'Financial Fraud',
        'Data Breach',
        'Account Compromise',
        'Ransomware / Malware',
        'Online Harassment',
        'Identity Theft',
        'Cyber Stalking',
        'Other'
      ],
      message: 'Please select a valid incident type'
    }
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: [
        'Report Submitted',
        'Under Verification',
        'Assigned to Cyber Cell',
        'Investigation in Progress',
        'Resolved',
        'Closed',
        'Rejected'
      ],
      message: 'Please select a valid status'
    },
    default: 'Report Submitted'
  },
  priority: {
    type: String,
    required: true,
    enum: {
      values: ['Low', 'Medium', 'High', 'Critical'],
      message: 'Please select a valid priority'
    },
    default: 'Medium'
  },
  reporterType: {
    type: String,
    required: true,
    enum: {
      values: ['Registered', 'Anonymous'],
      message: 'Please select a valid reporter type'
    }
  },
  victimInfo: {
    // For registered victims
    victimId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Victim'
    },
    // For anonymous reporters
    name: String,
    email: String,
    phone: String,
    isAnonymous: {
      type: Boolean,
      default: false
    }
  },
  incidentDetails: {
    description: {
      type: String,
      required: [true, 'Incident description is required'],
      maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    incidentDate: {
      type: Date,
      required: [true, 'Incident date is required']
    },
    incidentLocation: {
      type: String,
      required: [true, 'Incident location is required']
    },
    platform: {
      type: String,
      enum: [
        'Email',
        'Social Media',
        'Website',
        'Mobile App',
        'Phone Call',
        'SMS',
        'Other'
      ]
    },
    platformDetails: String,
    financialLoss: {
      amount: {
        type: Number,
        min: 0
      },
      currency: {
        type: String,
        default: 'INR'
      }
    },
    evidenceAvailable: {
      type: Boolean,
      default: false
    }
  },
  accusedInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    knownToVictim: {
      type: Boolean,
      default: false
    },
    relationship: String
  },
  assignedOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Police'
  },
  assignedDepartment: {
    type: String,
    enum: ['cyber_cell', 'investigation', 'supervisor', 'support']
  },
  investigation: {
    notes: [{
      officer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Police'
      },
      note: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    evidence: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evidence'
    }],
    actions: [{
      action: String,
      officer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Police'
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },
  statusHistory: [{
    status: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'statusModel'
    },
    statusModel: {
      type: String,
      enum: ['Victim', 'Police']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    comment: String
  }],
  resolution: {
    resolvedAt: Date,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Police'
    },
    resolutionDetails: String,
    outcome: {
      type: String,
      enum: [
        'Case Resolved',
        'Accused Arrested',
        'Financial Recovery',
        'Compensation Granted',
        'Warning Issued',
        'Case Dismissed'
      ]
    }
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
caseSchema.index({ caseId: 1 });
caseSchema.index({ status: 1 });
caseSchema.index({ incidentType: 1 });
caseSchema.index({ 'victimInfo.victimId': 1 });
caseSchema.index({ assignedOfficer: 1 });
caseSchema.index({ createdAt: -1 });

// Generate unique case ID
caseSchema.pre('save', async function(next) {
  if (this.isNew && !this.caseId) {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    this.caseId = `CTN-${random}`;
  }
  next();
});

// Update status history when status changes
caseSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      changedBy: this.assignedOfficer,
      statusModel: 'Police',
      timestamp: new Date()
    });
  }
  next();
});

module.exports = mongoose.model('Case', caseSchema);
