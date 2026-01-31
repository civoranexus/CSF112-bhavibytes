const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: [true, 'Case ID is required']
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'uploaderType',
    required: [true, 'Uploader information is required']
  },
  uploaderType: {
    type: String,
    enum: ['Victim', 'Police'],
    required: true
  },
  fileName: {
    type: String,
    required: [true, 'File name is required']
  },
  originalName: {
    type: String,
    required: [true, 'Original file name is required']
  },
  mimeType: {
    type: String,
    required: [true, 'MIME type is required']
  },
  fileSize: {
    type: Number,
    required: [true, 'File size is required']
  },
  filePath: {
    type: String,
    required: [true, 'File path is required']
  },
  fileHash: {
    type: String,
    required: [true, 'File hash is required'],
    unique: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  evidenceType: {
    type: String,
    required: [true, 'Evidence type is required'],
    enum: {
      values: [
        'Screenshot',
        'Document',
        'Email',
        'Chat Log',
        'Audio Recording',
        'Video',
        'Image',
        'Bank Statement',
        'Transaction Record',
        'Other'
      ],
      message: 'Please select a valid evidence type'
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Police'
  },
  verifiedAt: Date,
  verificationNotes: String,
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [String],
  metadata: {
    deviceInfo: String,
    ipAddress: String,
    location: String,
    extractionDate: Date,
    chainOfCustody: [{
      holder: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'holderType'
      },
      holderType: {
        type: String,
        enum: ['Victim', 'Police']
      },
      receivedAt: {
        type: Date,
        default: Date.now
      },
      notes: String
    }]
  }
}, {
  timestamps: true
});

// Index for better query performance
evidenceSchema.index({ caseId: 1 });
evidenceSchema.index({ uploadedBy: 1 });
evidenceSchema.index({ fileHash: 1 });
evidenceSchema.index({ evidenceType: 1 });
evidenceSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Evidence', evidenceSchema);
