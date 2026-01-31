const express = require('express');
const router = express.Router();
const demoData = require('../utils/demoData');

// Victim dashboard
router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      user: demoData.victims[0], // Demo victim
      stats: {
        totalCases: 2,
        activeCases: 1,
        resolvedCases: 1
      },
      recentCases: demoData.cases.filter(c => c.victimInfo.victimId === 'v1').slice(0, 3)
    }
  });
});

// Get victim cases
router.get('/cases', (req, res) => {
  const victimCases = demoData.cases.filter(c => c.victimInfo.victimId === 'v1');
  
  res.json({
    success: true,
    data: {
      cases: victimCases,
      total: victimCases.length
    }
  });
});

// Get single case
router.get('/cases/:id', (req, res) => {
  const caseItem = demoData.cases.find(c => c._id === req.params.id);
  
  if (!caseItem) {
    return res.status(404).json({
      success: false,
      error: 'Case not found'
    });
  }
  
  res.json({
    success: true,
    data: { case: caseItem }
  });
});

// Create new case
router.post('/cases', (req, res) => {
  const newCase = {
    _id: 'c' + (demoData.cases.length + 1),
    caseId: 'CTN-2026-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    ...req.body,
    status: 'Report Submitted',
    reporterType: 'Registered',
    victimInfo: {
      victimId: 'v1',
      name: 'Demo User'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  demoData.cases.push(newCase);

  res.status(201).json({
    success: true,
    message: 'Case created successfully',
    data: { case: newCase }
  });
});

// Update profile
router.put('/profile', (req, res) => {
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: { user: { ...demoData.victims[0], ...req.body } }
  });
});

// Change password
router.post('/change-password', (req, res) => {
  res.json({
    success: true,
    message: 'Password changed successfully'
  });
});

module.exports = router;
