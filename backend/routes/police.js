const express = require('express');
const router = express.Router();
const demoData = require('../utils/demoData');

// Police dashboard
router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      user: demoData.police[0], // Demo police officer
      stats: {
        totalCases: demoData.cases.length,
        myCases: demoData.cases.filter(c => c.assignedOfficer && c.assignedOfficer._id === 'p1').length,
        openCases: demoData.cases.filter(c => c.status !== 'Resolved').length,
        resolvedThisMonth: 2
      },
      recentCases: demoData.cases.slice(0, 5)
    }
  });
});

// Get my cases
router.get('/cases/my', (req, res) => {
  const myCases = demoData.cases.filter(c => c.assignedOfficer && c.assignedOfficer._id === 'p1');
  
  res.json({
    success: true,
    data: {
      cases: myCases,
      total: myCases.length
    }
  });
});

// Get analytics
router.get('/analytics', (req, res) => {
  const stats = {
    casesByType: {
      'Phishing / Social Engineering': demoData.cases.filter(c => c.incidentType === 'Phishing / Social Engineering').length,
      'Financial Fraud': demoData.cases.filter(c => c.incidentType === 'Financial Fraud').length,
      'Data Breach': demoData.cases.filter(c => c.incidentType === 'Data Breach').length,
      'Account Compromise': demoData.cases.filter(c => c.incidentType === 'Account Compromise').length,
      'Ransomware / Malware': demoData.cases.filter(c => c.incidentType === 'Ransomware / Malware').length
    },
    casesByStatus: {
      'Report Submitted': demoData.cases.filter(c => c.status === 'Report Submitted').length,
      'Under Verification': demoData.cases.filter(c => c.status === 'Under Verification').length,
      'Assigned to Cyber Cell': demoData.cases.filter(c => c.status === 'Assigned to Cyber Cell').length,
      'Investigation in Progress': demoData.cases.filter(c => c.status === 'Investigation in Progress').length,
      'Resolved': demoData.cases.filter(c => c.status === 'Resolved').length
    },
    monthlyTrends: [
      { month: 'Jan', cases: 15 },
      { month: 'Feb', cases: 22 },
      { month: 'Mar', cases: 18 },
      { month: 'Apr', cases: 25 },
      { month: 'May', cases: 30 },
      { month: 'Jun', cases: 28 }
    ]
  };

  res.json({
    success: true,
    data: stats
  });
});

// Get all users (police management)
router.get('/users', (req, res) => {
  res.json({
    success: true,
    data: {
      users: demoData.police,
      total: demoData.police.length
    }
  });
});

// Create new user
router.post('/users', (req, res) => {
  const newUser = {
    _id: 'p' + (demoData.police.length + 1),
    ...req.body,
    isActive: true,
    createdAt: new Date()
  };

  demoData.police.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: { user: newUser }
  });
});

// Update user
router.put('/users/:id', (req, res) => {
  const userIndex = demoData.police.findIndex(p => p._id === req.params.id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  demoData.police[userIndex] = { ...demoData.police[userIndex], ...req.body };

  res.json({
    success: true,
    message: 'User updated successfully',
    data: { user: demoData.police[userIndex] }
  });
});

module.exports = router;
