const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function createOffice() {
  const officeId = 'EMP-OFFICE-SHARED';
  console.log("Creating/Updating Office Shared Profile...");
  
  await db.collection('employees').doc(officeId).set({
    name: '🏢 Office (Shared Pool)',
    employeeId: 'OFFICE-001',
    designation: 'Shared Resources',
    department: 'Administration',
    email: 'office@company.com',
    phone: 'N/A',
    status: 'Active',
    joiningDate: admin.firestore.FieldValue.serverTimestamp(),
    systemOwner: 'IT Department',
    location: 'Headquarters',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
  
  console.log("✅ Office Employee created successfully! You can now assign shared assets to it.");
}

createOffice().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
