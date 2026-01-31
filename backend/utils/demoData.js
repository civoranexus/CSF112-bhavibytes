// Demo data for CyberThana application
const jwt = require('jsonwebtoken');

// Demo users
const demoVictims = [
  {
    _id: 'v1',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@email.com',
    phone: '9876543210',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    address: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    }
  },
  {
    _id: 'v2',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@email.com',
    phone: '9876543211',
    isActive: true,
    createdAt: new Date('2024-01-12'),
    address: {
      street: '456 Park Ave',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    }
  },
  {
    _id: 'v3',
    firstName: 'Amit',
    lastName: 'Kumar',
    email: 'amit.kumar@email.com',
    phone: '9876543212',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    address: {
      street: '789 Gandhi Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    }
  }
];

const demoPolice = [
  {
    _id: 'p1',
    badgeId: 'OFC-001',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@police.gov',
    phone: '9876543220',
    department: 'cyber_cell',
    rank: 'Inspector',
    isActive: true,
    permissions: ['full_access'],
    createdAt: new Date('2024-01-01')
  },
  {
    _id: 'p2',
    badgeId: 'OFC-002',
    firstName: 'Sunita',
    lastName: 'Devi',
    email: 'sunita.devi@police.gov',
    phone: '9876543221',
    department: 'cyber_cell',
    rank: 'Sub-Inspector',
    isActive: true,
    permissions: ['limited_access'],
    createdAt: new Date('2024-01-02')
  },
  {
    _id: 'p3',
    badgeId: 'OFC-003',
    firstName: 'Amit',
    lastName: 'Singh',
    email: 'amit.singh@police.gov',
    phone: '9876543222',
    department: 'cyber_cell',
    rank: 'ASI',
    isActive: true,
    permissions: ['limited_access'],
    createdAt: new Date('2024-01-03')
  }
];

const demoCases = [
  {
    _id: 'c1',
    caseId: 'CTN-2026-847392',
    incidentType: 'Phishing / Social Engineering',
    status: 'Under Verification',
    priority: 'Medium',
    reporterType: 'Registered',
    victimInfo: {
      victimId: 'v1',
      name: 'Rahul Sharma'
    },
    assignedOfficer: demoPolice[1],
    incidentDetails: {
      description: 'Received suspicious email claiming to be from bank asking for account details',
      incidentDate: new Date('2026-01-14'),
      incidentLocation: 'Mumbai',
      platform: 'Email'
    },
    createdAt: new Date('2026-01-14'),
    updatedAt: new Date('2026-01-14')
  },
  {
    _id: 'c2',
    caseId: 'CTN-2026-562891',
    incidentType: 'Financial Fraud',
    status: 'Investigation in Progress',
    priority: 'High',
    reporterType: 'Anonymous',
    victimInfo: {
      victimId: null,
      name: 'Anonymous'
    },
    assignedOfficer: demoPolice[0],
    incidentDetails: {
      description: 'Online shopping fraud - paid for goods but never received',
      incidentDate: new Date('2026-01-12'),
      incidentLocation: 'Delhi',
      platform: 'E-commerce Website'
    },
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-13')
  },
  {
    _id: 'c3',
    caseId: 'CTN-2026-934215',
    incidentType: 'Data Breach',
    status: 'Resolved',
    priority: 'High',
    reporterType: 'Registered',
    victimInfo: {
      victimId: 'v2',
      name: 'Priya Patel'
    },
    assignedOfficer: demoPolice[2],
    incidentDetails: {
      description: 'Personal data leaked from company database',
      incidentDate: new Date('2026-01-10'),
      incidentLocation: 'Bangalore',
      platform: 'Company Server'
    },
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-16')
  },
  {
    _id: 'c4',
    caseId: 'CTN-2026-123456',
    incidentType: 'Account Compromise',
    status: 'Assigned to Cyber Cell',
    priority: 'Medium',
    reporterType: 'Registered',
    victimInfo: {
      victimId: 'v3',
      name: 'Amit Kumar'
    },
    assignedOfficer: null,
    incidentDetails: {
      description: 'Social media account hacked and misused',
      incidentDate: new Date('2026-01-08'),
      incidentLocation: 'Bangalore',
      platform: 'Social Media'
    },
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-09')
  },
  {
    _id: 'c5',
    caseId: 'CTN-2026-445221',
    incidentType: 'Ransomware / Malware',
    status: 'Report Submitted',
    priority: 'High',
    reporterType: 'Anonymous',
    victimInfo: {
      victimId: null,
      name: 'Anonymous'
    },
    assignedOfficer: null,
    incidentDetails: {
      description: 'Computer infected with ransomware demanding payment',
      incidentDate: new Date('2026-01-16'),
      incidentLocation: 'Mumbai',
      platform: 'Personal Computer'
    },
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-16')
  }
];

const demoEvidence = [
  {
    _id: 'e1',
    caseId: 'c1',
    fileName: 'phishing_email.png',
    originalName: 'suspicious_email.png',
    fileSize: 1024576,
    mimeType: 'image/png',
    evidenceType: 'Screenshot',
    uploadedBy: 'v1',
    uploadedAt: new Date('2026-01-14'),
    isVerified: true,
    description: 'Screenshot of the phishing email received'
  },
  {
    _id: 'e2',
    caseId: 'c2',
    fileName: 'payment_receipt.pdf',
    originalName: 'payment_confirmation.pdf',
    fileSize: 2048576,
    mimeType: 'application/pdf',
    evidenceType: 'Document',
    uploadedBy: 'anonymous',
    uploadedAt: new Date('2026-01-12'),
    isVerified: false,
    description: 'Payment receipt showing the fraudulent transaction'
  }
];

// JWT token generation
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'demo-secret-key', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Demo authentication functions
const demoAuth = {
  victimLogin: (email, password) => {
    const victim = demoVictims.find(v => v.email === email);
    if (victim && password === 'Password123!') {
      return {
        success: true,
        data: {
          token: generateToken({ id: victim._id, type: 'victim' }),
          victim: victim
        }
      };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  policeLogin: (badgeId, password) => {
    const police = demoPolice.find(p => p.badgeId === badgeId);
    if (police && password === 'Police123!') {
      return {
        success: true,
        data: {
          token: generateToken({ id: police._id, type: 'police' }),
          police: police
        }
      };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  getCurrentUser: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret-key');
      if (decoded.type === 'victim') {
        const victim = demoVictims.find(v => v._id === decoded.id);
        return { success: true, data: { user: victim, userType: 'victim' } };
      } else if (decoded.type === 'police') {
        const police = demoPolice.find(p => p._id === decoded.id);
        return { success: true, data: { user: police, userType: 'police' } };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: 'Invalid token' };
    }
  }
};

// Demo data functions
const demoData = {
  victims: demoVictims,
  police: demoPolice,
  cases: demoCases,
  evidence: demoEvidence,
  auth: demoAuth
};

module.exports = demoData;
