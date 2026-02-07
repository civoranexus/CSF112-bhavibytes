const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Victim = require('../models/Victim');
const Police = require('../models/Police');
const Case = require('../models/Case');

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cyber-thana');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Victim.deleteMany({});
    await Police.deleteMany({});
    await Case.deleteMany({});
    console.log('Cleared existing data');

    // Create sample victims
    const victims = [
      {
        firstName: 'Rahul',
        lastName: 'Sharma',
        email: 'rahul.sharma@email.com',
        phone: '9876543210',
        password: 'Password123!',
        address: {
          street: '123 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        },
        aadhaarNumber: '123456789012',
        isVerified: true
      },
      {
        firstName: 'Priya',
        lastName: 'Patel',
        email: 'priya.patel@email.com',
        phone: '9876543211',
        password: 'Password123!',
        address: {
          street: '456 Park Avenue',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001'
        },
        isVerified: true
      },
      {
        firstName: 'Amit',
        lastName: 'Kumar',
        email: 'amit.kumar@email.com',
        phone: '9876543212',
        password: 'Password123!',
        address: {
          street: '789 Cross Road',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001'
        },
        isVerified: false
      }
    ];

    const createdVictims = await Victim.create(victims);
    console.log(`Created ${createdVictims.length} victims`);

    // Create sample police officers
    const policeOfficers = [
      {
        badgeId: 'OFC-001',
        firstName: 'Rajesh',
        lastName: 'Singh',
        email: 'rajesh.singh@police.gov',
        phone: '9876543213',
        password: 'Police123!',
        department: 'cyber_cell',
        rank: 'inspector',
        jurisdiction: 'Mumbai City',
        policeStation: 'Cyber Crime Cell, Mumbai',
        isVerified: true,
        permissions: {
          canViewAllCases: true,
          canAssignCases: true,
          canUpdateStatus: true,
          canDeleteCases: true,
          canManageUsers: true,
          canViewAnalytics: true
        }
      },
      {
        badgeId: 'OFC-002',
        firstName: 'Sunita',
        lastName: 'Reddy',
        email: 'sunita.reddy@police.gov',
        phone: '9876543214',
        password: 'Police123!',
        department: 'cyber_cell',
        rank: 'si',
        jurisdiction: 'Mumbai Suburbs',
        policeStation: 'Cyber Crime Cell, Mumbai',
        isVerified: true,
        permissions: {
          canViewAllCases: false,
          canAssignCases: false,
          canUpdateStatus: true,
          canDeleteCases: false,
          canManageUsers: false,
          canViewAnalytics: true
        }
      },
      {
        badgeId: 'OFC-003',
        firstName: 'Vikram',
        lastName: 'Malhotra',
        email: 'vikram.malhotra@police.gov',
        phone: '9876543215',
        password: 'Police123!',
        department: 'investigation',
        rank: 'asi',
        jurisdiction: 'Delhi',
        policeStation: 'Cyber Crime Cell, Delhi',
        isVerified: true,
        permissions: {
          canViewAllCases: false,
          canAssignCases: false,
          canUpdateStatus: true,
          canDeleteCases: false,
          canManageUsers: false,
          canViewAnalytics: true
        }
      }
    ];

    const createdPolice = await Police.create(policeOfficers);
    console.log(`Created ${createdPolice.length} police officers`);

    // Create sample cases
    const cases = [
      {
        caseId: 'CTN-2026847392',
        incidentType: 'Phishing / Social Engineering',
        status: 'Under Verification',
        priority: 'Medium',
        reporterType: 'Registered',
        victimInfo: {
          victimId: createdVictims[0]._id,
          isAnonymous: false
        },
        incidentDetails: {
          description: 'Received suspicious email claiming to be from bank asking for account details and OTP. The email contained fake bank logo and urgent language.',
          incidentDate: new Date('2026-01-14'),
          incidentLocation: 'Mumbai, Maharashtra',
          platform: 'Email',
          platformDetails: 'Gmail account',
          financialLoss: {
            amount: 50000,
            currency: 'INR'
          },
          evidenceAvailable: true
        },
        accusedInfo: {
          name: 'Unknown',
          email: 'fakebank@secure-mail.com',
          knownToVictim: false
        },
        assignedOfficer: createdPolice[1]._id,
        assignedDepartment: 'cyber_cell'
      },
      {
        caseId: 'CTN-2026562891',
        incidentType: 'Financial Fraud',
        status: 'Assigned to Cyber Cell',
        priority: 'High',
        reporterType: 'Anonymous',
        victimInfo: {
          name: 'Anonymous',
          email: 'anon@tempmail.com',
          phone: '9876543216',
          isAnonymous: true
        },
        incidentDetails: {
          description: 'Lost money through online investment scam. Website promised high returns on cryptocurrency investments but disappeared after receiving funds.',
          incidentDate: new Date('2026-01-12'),
          incidentLocation: 'Delhi, Delhi',
          platform: 'Website',
          platformDetails: 'crypto-invest-pro.com',
          financialLoss: {
            amount: 200000,
            currency: 'INR'
          },
          evidenceAvailable: true
        },
        accusedInfo: {
          name: 'Unknown',
          knownToVictim: false
        },
        assignedOfficer: createdPolice[0]._id,
        assignedDepartment: 'cyber_cell'
      },
      {
        caseId: 'CTN-2026934215',
        incidentType: 'Data Breach',
        status: 'Investigation in Progress',
        priority: 'Critical',
        reporterType: 'Registered',
        victimInfo: {
          victimId: createdVictims[1]._id,
          isAnonymous: false
        },
        incidentDetails: {
          description: 'Personal data stolen from e-commerce website. Received notification that my account was compromised and personal information was leaked.',
          incidentDate: new Date('2026-01-10'),
          incidentLocation: 'Bangalore, Karnataka',
          platform: 'Website',
          platformDetails: 'shopkart.com',
          evidenceAvailable: true
        },
        accusedInfo: {
          name: 'Unknown Hacker Group',
          knownToVictim: false
        },
        assignedOfficer: createdPolice[2]._id,
        assignedDepartment: 'investigation'
      },
      {
        caseId: 'CTN-2026123456',
        incidentType: 'Account Compromise',
        status: 'Investigation in Progress',
        priority: 'High',
        reporterType: 'Registered',
        victimInfo: {
          victimId: createdVictims[2]._id,
          isAnonymous: false
        },
        incidentDetails: {
          description: 'Social media account hacked and used to send malicious messages to contacts. Account password was changed and recovery email was modified.',
          incidentDate: new Date('2026-01-08'),
          incidentLocation: 'Bangalore, Karnataka',
          platform: 'Social Media',
          platformDetails: 'Facebook',
          evidenceAvailable: true
        },
        accusedInfo: {
          name: 'Unknown',
          knownToVictim: false
        },
        assignedOfficer: null,
        assignedDepartment: null
      },
      {
        caseId: 'CTN-2026445221',
        incidentType: 'Ransomware / Malware',
        status: 'Report Submitted',
        priority: 'Critical',
        reporterType: 'Anonymous',
        victimInfo: {
          name: 'Anonymous',
          email: 'victim123@tempmail.com',
          isAnonymous: true
        },
        incidentDetails: {
          description: 'Computer infected with ransomware. All files encrypted and ransom demand received for decryption key.',
          incidentDate: new Date('2026-01-16'),
          incidentLocation: 'Mumbai, Maharashtra',
          platform: 'Other',
          platformDetails: 'Windows PC',
          financialLoss: {
            amount: 100000,
            currency: 'INR'
          },
          evidenceAvailable: true
        },
        accusedInfo: {
          name: 'Unknown',
          knownToVictim: false
        },
        assignedOfficer: null,
        assignedDepartment: null
      },
      {
        caseId: 'CTN-2026778901',
        incidentType: 'Phishing / Social Engineering',
        status: 'Resolved',
        priority: 'Low',
        reporterType: 'Registered',
        victimInfo: {
          victimId: createdVictims[0]._id,
          isAnonymous: false
        },
        incidentDetails: {
          description: 'Received fake job offer email with malicious attachment. Did not open attachment and reported immediately.',
          incidentDate: new Date('2026-01-05'),
          incidentLocation: 'Mumbai, Maharashtra',
          platform: 'Email',
          platformDetails: 'Gmail account',
          evidenceAvailable: true
        },
        accusedInfo: {
          name: 'Unknown',
          email: 'hr@fakecompany.com',
          knownToVictim: false
        },
        assignedOfficer: createdPolice[1]._id,
        assignedDepartment: 'cyber_cell',
        resolution: {
          resolvedAt: new Date('2026-01-20'),
          resolvedBy: createdPolice[1]._id,
          resolutionDetails: 'Investigation completed. Sender identified and warned. No financial loss occurred.',
          outcome: 'Case Resolved'
        }
      }
    ];

    const createdCases = await Case.create(cases);
    console.log(`Created ${createdCases.length} cases`);

    console.log('Database seeded successfully!');
    console.log('\nSample Login Credentials:');
    console.log('=========================');
    console.log('Victim Accounts:');
    console.log('Email: rahul.sharma@email.com, Password: Password123!');
    console.log('Email: priya.patel@email.com, Password: Password123!');
    console.log('Email: amit.kumar@email.com, Password: Password123!');
    console.log('\nPolice Accounts:');
    console.log('Badge ID: OFC-001, Password: Police123! (Inspector - Full Access)');
    console.log('Badge ID: OFC-002, Password: Police123! (SI - Limited Access)');
    console.log('Badge ID: OFC-003, Password: Police123! (ASI - Limited Access)');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeding function
seedDatabase();
