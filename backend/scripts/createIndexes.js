const mongoose = require('mongoose');
require('dotenv').config();

const createIndexes = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cyber-thana');
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    // Create indexes for Victim collection
    const victimCollection = db.collection('victims');
    await victimCollection.createIndex({ email: 1 }, { unique: true });
    await victimCollection.createIndex({ phone: 1 }, { unique: true });
    await victimCollection.createIndex({ isActive: 1 });
    console.log('Created indexes for Victim collection');

    // Create indexes for Police collection
    const policeCollection = db.collection('police');
    await policeCollection.createIndex({ badgeId: 1 }, { unique: true });
    await policeCollection.createIndex({ email: 1 }, { unique: true });
    await policeCollection.createIndex({ phone: 1 }, { unique: true });
    await policeCollection.createIndex({ department: 1 });
    await policeCollection.createIndex({ isActive: 1 });
    console.log('Created indexes for Police collection');

    // Create indexes for Case collection
    const caseCollection = db.collection('cases');
    await caseCollection.createIndex({ caseId: 1 }, { unique: true });
    await caseCollection.createIndex({ status: 1 });
    await caseCollection.createIndex({ incidentType: 1 });
    await caseCollection.createIndex({ priority: 1 });
    await caseCollection.createIndex({ 'victimInfo.victimId': 1 });
    await caseCollection.createIndex({ assignedOfficer: 1 });
    await caseCollection.createIndex({ createdAt: -1 });
    await caseCollection.createIndex({ reporterType: 1 });
    // Compound index for common queries
    await caseCollection.createIndex({ status: 1, priority: 1 });
    await caseCollection.createIndex({ assignedOfficer: 1, status: 1 });
    console.log('Created indexes for Case collection');

    // Create indexes for Evidence collection
    const evidenceCollection = db.collection('evidence');
    await evidenceCollection.createIndex({ caseId: 1 });
    await evidenceCollection.createIndex({ uploadedBy: 1 });
    await evidenceCollection.createIndex({ fileHash: 1 }, { unique: true });
    await evidenceCollection.createIndex({ evidenceType: 1 });
    await evidenceCollection.createIndex({ createdAt: -1 });
    await evidenceCollection.createIndex({ isVerified: 1 });
    console.log('Created indexes for Evidence collection');

    // Create indexes for AuditLog collection
    const auditLogCollection = db.collection('auditlogs');
    await auditLogCollection.createIndex({ user: 1 });
    await auditLogCollection.createIndex({ action: 1 });
    await auditLogCollection.createIndex({ resource: 1 });
    await auditLogCollection.createIndex({ timestamp: -1 });
    await auditLogCollection.createIndex({ ipAddress: 1 });
    await auditLogCollection.createIndex({ userType: 1 });
    // TTL index to automatically delete logs after 1 year
    await auditLogCollection.createIndex({ timestamp: 1 }, { expireAfterSeconds: 365 * 24 * 60 * 60 });
    console.log('Created indexes for AuditLog collection');

    console.log('\nAll database indexes created successfully!');
    console.log('Index creation completed.');

  } catch (error) {
    console.error('Error creating indexes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the index creation function
createIndexes();
