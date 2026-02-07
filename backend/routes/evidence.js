const express = require('express');
const router = express.Router();
const demoData = require('../utils/demoData');

// Get evidence for a case
router.get('/case/:caseId', (req, res) => {
  const caseEvidence = demoData.evidence.filter(e => e.caseId === req.params.caseId);
  
  res.json({
    success: true,
    data: {
      evidence: caseEvidence,
      total: caseEvidence.length
    }
  });
});

// Upload evidence (demo)
router.post('/upload/:caseId', (req, res) => {
  // In demo mode, just return success
  const newEvidence = {
    _id: 'e' + (demoData.evidence.length + 1),
    caseId: req.params.caseId,
    fileName: 'demo_file.pdf',
    originalName: req.body.originalName || 'document.pdf',
    fileSize: 1024576,
    mimeType: 'application/pdf',
    evidenceType: req.body.evidenceType || 'Document',
    uploadedBy: 'demo_user',
    uploadedAt: new Date(),
    isVerified: false,
    description: req.body.description || 'Demo evidence file'
  };

  demoData.evidence.push(newEvidence);

  res.status(201).json({
    success: true,
    message: 'Evidence uploaded successfully',
    data: { evidence: newEvidence }
  });
});

// Download evidence (demo)
router.get('/:id/download', (req, res) => {
  const evidence = demoData.evidence.find(e => e._id === req.params.id);
  
  if (!evidence) {
    return res.status(404).json({
      success: false,
      error: 'Evidence not found'
    });
  }

  // In demo mode, just return file info
  res.json({
    success: true,
    message: 'Download link generated',
    data: {
      fileName: evidence.fileName,
      fileSize: evidence.fileSize,
      downloadUrl: `/downloads/${evidence.fileName}`
    }
  });
});

// Verify evidence
router.put('/:id/verify', (req, res) => {
  const evidenceIndex = demoData.evidence.findIndex(e => e._id === req.params.id);
  
  if (evidenceIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Evidence not found'
    });
  }

  demoData.evidence[evidenceIndex].isVerified = true;
  demoData.evidence[evidenceIndex].verifiedBy = req.body.verifiedBy || 'demo_officer';
  demoData.evidence[evidenceIndex].verifiedAt = new Date();

  res.json({
    success: true,
    message: 'Evidence verified successfully',
    data: { evidence: demoData.evidence[evidenceIndex] }
  });
});

// Delete evidence
router.delete('/:id', (req, res) => {
  const evidenceIndex = demoData.evidence.findIndex(e => e._id === req.params.id);
  
  if (evidenceIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Evidence not found'
    });
  }

  const deletedEvidence = demoData.evidence.splice(evidenceIndex, 1)[0];

  res.json({
    success: true,
    message: 'Evidence deleted successfully',
    data: { evidence: deletedEvidence }
  });
});

module.exports = router;
