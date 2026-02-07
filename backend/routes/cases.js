const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const demoData = require('../utils/demoData');

// Get all cases (with filtering and pagination)
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, status, incidentType, search } = req.query;
    
    let filteredCases = [...demoData.cases];
    
    // Apply filters
    if (status) {
      filteredCases = filteredCases.filter(c => c.status === status);
    }
    
    if (incidentType) {
      filteredCases = filteredCases.filter(c => c.incidentType === incidentType);
    }
    
    if (search) {
      filteredCases = filteredCases.filter(c => 
        c.caseId.toLowerCase().includes(search.toLowerCase()) ||
        c.incidentType.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Calculate stats
    const stats = {
      total: demoData.cases.length,
      open: demoData.cases.filter(c => c.status === 'Report Submitted' || c.status === 'Under Verification').length,
      inProgress: demoData.cases.filter(c => c.status === 'Investigation in Progress' || c.status === 'Assigned to Cyber Cell').length,
      resolved: demoData.cases.filter(c => c.status === 'Resolved').length
    };
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedCases = filteredCases.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        cases: paginatedCases,
        stats,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredCases.length / limit),
          totalCases: filteredCases.length,
          hasNext: endIndex < filteredCases.length,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cases',
      message: error.message
    });
  }
});

// Get case by ID
router.get('/:id', (req, res) => {
  try {
    const caseItem = demoData.cases.find(c => c._id === req.params.id || c.caseId === req.params.id);
    
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch case',
      message: error.message
    });
  }
});

// Create new case
router.post('/', [
  body('incidentType').notEmpty().withMessage('Incident type is required'),
  body('priority').isIn(['Low', 'Medium', 'High']).withMessage('Valid priority is required'),
  body('incidentDetails.description').notEmpty().withMessage('Description is required'),
  body('incidentDetails.incidentDate').isISO8601().withMessage('Valid incident date is required'),
  body('incidentDetails.incidentLocation').notEmpty().withMessage('Incident location is required'),
  body('incidentDetails.platform').notEmpty().withMessage('Platform is required'),
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
    const newCase = {
      _id: 'c' + (demoData.cases.length + 1),
      caseId: 'CTN-2026-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      ...req.body,
      status: 'Report Submitted',
      reporterType: 'Registered',
      victimInfo: {
        victimId: 'v1', // Demo victim
        name: 'Demo User'
      },
      assignedOfficer: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to demo data (in real app, save to database)
    demoData.cases.push(newCase);

    res.status(201).json({
      success: true,
      message: 'Case created successfully',
      data: { case: newCase }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create case',
      message: error.message
    });
  }
});

// Update case status
router.put('/:id/status', [
  body('status').notEmpty().withMessage('Status is required'),
  body('comment').optional().isString().withMessage('Comment must be a string'),
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
    const caseIndex = demoData.cases.findIndex(c => c._id === req.params.id);
    
    if (caseIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Case not found'
      });
    }

    // Update case status
    demoData.cases[caseIndex].status = req.body.status;
    demoData.cases[caseIndex].updatedAt = new Date();
    
    if (req.body.comment) {
      demoData.cases[caseIndex].comment = req.body.comment;
    }

    res.json({
      success: true,
      message: 'Case status updated successfully',
      data: { case: demoData.cases[caseIndex] }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update case status',
      message: error.message
    });
  }
});

// Assign case to officer
router.put('/:id/assign', [
  body('officerId').notEmpty().withMessage('Officer ID is required'),
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
    const caseIndex = demoData.cases.findIndex(c => c._id === req.params.id);
    
    if (caseIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Case not found'
      });
    }

    const officer = demoData.police.find(p => p._id === req.body.officerId);
    
    if (!officer) {
      return res.status(404).json({
        success: false,
        error: 'Officer not found'
      });
    }

    // Assign case to officer
    demoData.cases[caseIndex].assignedOfficer = officer;
    demoData.cases[caseIndex].status = 'Assigned to Cyber Cell';
    demoData.cases[caseIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: 'Case assigned successfully',
      data: { case: demoData.cases[caseIndex] }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to assign case',
      message: error.message
    });
  }
});

// Delete case
router.delete('/:id', (req, res) => {
  try {
    const caseIndex = demoData.cases.findIndex(c => c._id === req.params.id);
    
    if (caseIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Case not found'
      });
    }

    // Remove case from demo data
    const deletedCase = demoData.cases.splice(caseIndex, 1)[0];

    res.json({
      success: true,
      message: 'Case deleted successfully',
      data: { case: deletedCase }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete case',
      message: error.message
    });
  }
});

module.exports = router;
