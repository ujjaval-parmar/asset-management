import firestore from '@react-native-firebase/firestore';

export const runSeeder = async () => {
  console.log('🚀 Seeding started with Batch Inserts...');

  try {
    const db = firestore();
    
    // 1. Create Document References mapping
    const empRefs: { [name: string]: any } = {
      "Priyanka Patel": db.collection('employees').doc(),
      "Jaydeep Sosa": db.collection('employees').doc(),
      "Sandip Rathod": db.collection('employees').doc(),
      "Aarti Kushwaha": db.collection('employees').doc(),
      "Vishal Mali": db.collection('employees').doc(),
      "Nimesh Mishra": db.collection('employees').doc(),
      "Anchal Kumari": db.collection('employees').doc(),
      "Ujjaval Parmar": db.collection('employees').doc(),
      "Dolly Sanchaniya": db.collection('employees').doc(),
      "Rahul Thakor": db.collection('employees').doc(),
      "Smit Parmar": db.collection('employees').doc(),
      "Chirag Ramani": db.collection('employees').doc(),
      "Priyal Ghetiya": db.collection('employees').doc(),
      "Jaymin Raval": db.collection('employees').doc(),
      "Shubham Patidar": db.collection('employees').doc(),
      "Parita Shah": db.collection('employees').doc(),
      "Rushik Joshi": db.collection('employees').doc(),
      "Jay Soni": db.collection('employees').doc(),
      "Anjali Mevada": db.collection('employees').doc(),
      "Sanskar Jaiswal": db.collection('employees').doc(),
      "Bhagyesh Bhalodiya": db.collection('employees').doc(),
      "Hiral Patel": db.collection('employees').doc(),
      "Prashant Gohil": db.collection('employees').doc(),
      "Mit Prajapati": db.collection('employees').doc(),
      "Chaitanya Patel": db.collection('employees').doc(),
      "Upasana Bhure": db.collection('employees').doc(),
      "Sujal Prajapati": db.collection('employees').doc(),
      "Radhika Baldaniya": db.collection('employees').doc(),
      "Divya Rojiwadiya": db.collection('employees').doc(),
      "Kartik Jagad": db.collection('employees').doc(),
      "Hardik Jain": db.collection('employees').doc(),
      "Himanshu Patanvadiya": db.collection('employees').doc(),
      "Nilesh Kanzariya": db.collection('employees').doc(),
      "Vrutik Vasoya": db.collection('employees').doc(),
      "Premal Bhatt": db.collection('employees').doc(),
      "Mahesh Parmar": db.collection('employees').doc(),
    };
    const assetRefs: { [tag: string]: any } = {
      "LAP-007": db.collection('assets').doc(),
      "MO-008": db.collection('assets').doc(),
      "HP-001": db.collection('assets').doc(),
      "STD-006": db.collection('assets').doc(),
      "MOB-001": db.collection('assets').doc(),
      "LAP-015": db.collection('assets').doc(),
      "MO-010": db.collection('assets').doc(),
      "STD-001": db.collection('assets').doc(),
      "CHR-011": db.collection('assets').doc(),
      "MO-003": db.collection('assets').doc(),
      "HEA-503": db.collection('assets').doc(),
      "LAP-001": db.collection('assets').doc(),
      "MO-012": db.collection('assets').doc(),
      "HP-003": db.collection('assets').doc(),
      "STD-008": db.collection('assets').doc(),
      "KB-001": db.collection('assets').doc(),
      "LAP-002": db.collection('assets').doc(),
      "MO-006": db.collection('assets').doc(),
      "STD-002": db.collection('assets').doc(),
      "CHR-025": db.collection('assets').doc(),
      "LAP-003": db.collection('assets').doc(),
      "MO-014": db.collection('assets').doc(),
      "ER-004": db.collection('assets').doc(),
      "STD-003": db.collection('assets').doc(),
      "CHR-026": db.collection('assets').doc(),
      "LAP-004": db.collection('assets').doc(),
      "MO-005": db.collection('assets').doc(),
      "HP-012": db.collection('assets').doc(),
      "STD-004": db.collection('assets').doc(),
      "LAP-018": db.collection('assets').doc(),
      "CHR-023": db.collection('assets').doc(),
      "BAG-008": db.collection('assets').doc(),
      "MOB-003": db.collection('assets').doc(),
      "MOB-002": db.collection('assets').doc(),
      "LAP-008": db.collection('assets').doc(),
      "MO-007": db.collection('assets').doc(),
      "HP-005": db.collection('assets').doc(),
      "LAP-026": db.collection('assets').doc(),
      "STD-014": db.collection('assets').doc(),
      "CHR-021": db.collection('assets').doc(),
      "DES-001": db.collection('assets').doc(),
      "MO-015": db.collection('assets').doc(),
      "HP-006": db.collection('assets').doc(),
      "KB-002": db.collection('assets').doc(),
      "MONT-003": db.collection('assets').doc(),
      "MOB-007": db.collection('assets').doc(),
      "MOB-008": db.collection('assets').doc(),
      "MOB-009": db.collection('assets').doc(),
      "LAP-023": db.collection('assets').doc(),
      "MO-001": db.collection('assets').doc(),
      "STD-011": db.collection('assets').doc(),
      "LAP-006": db.collection('assets').doc(),
      "CHR-022": db.collection('assets').doc(),
      "LAP-011": db.collection('assets').doc(),
      "MO-011": db.collection('assets').doc(),
      "MOB-006": db.collection('assets').doc(),
      "MO-019": db.collection('assets').doc(),
      "LAP-017": db.collection('assets').doc(),
      "HP-007": db.collection('assets').doc(),
      "CHR-008": db.collection('assets').doc(),
      "LAP-009": db.collection('assets').doc(),
      "HP-008": db.collection('assets').doc(),
      "STD-009": db.collection('assets').doc(),
      "MOB-004": db.collection('assets').doc(),
      "LAP-022": db.collection('assets').doc(),
      "MO-018": db.collection('assets').doc(),
      "STD-010": db.collection('assets').doc(),
      "CHR-012": db.collection('assets').doc(),
      "LAP-016": db.collection('assets').doc(),
      "MO-020": db.collection('assets').doc(),
      "LAP-027": db.collection('assets').doc(),
      "STD-005": db.collection('assets').doc(),
      "CHR-015": db.collection('assets').doc(),
      "LAP-012": db.collection('assets').doc(),
      "HP-011": db.collection('assets').doc(),
      "STD-012": db.collection('assets').doc(),
      "CHR-014": db.collection('assets').doc(),
      "LAP-019": db.collection('assets').doc(),
      "MO-009": db.collection('assets').doc(),
      "KB-003": db.collection('assets').doc(),
      "MONT-001": db.collection('assets').doc(),
      "CHR-024": db.collection('assets').doc(),
      "LAP-020": db.collection('assets').doc(),
      "MO-024": db.collection('assets').doc(),
      "CHR-009": db.collection('assets').doc(),
      "LAP-021": db.collection('assets').doc(),
      "MO-022": db.collection('assets').doc(),
      "HP-010": db.collection('assets').doc(),
      "STD-013": db.collection('assets').doc(),
      "MO-027": db.collection('assets').doc(),
      "LAP-010": db.collection('assets').doc(),
      "MO-023": db.collection('assets').doc(),
      "CHR-005": db.collection('assets').doc(),
      "LAP-025": db.collection('assets').doc(),
      "MO-026": db.collection('assets').doc(),
      "CHR-016": db.collection('assets').doc(),
      "LAP-029": db.collection('assets').doc(),
      "KB-004": db.collection('assets').doc(),
      "MONT-002": db.collection('assets').doc(),
      "CHR-18": db.collection('assets').doc(),
      "MO-021": db.collection('assets').doc(),
      "LAP-030": db.collection('assets').doc(),
      "MO-025": db.collection('assets').doc(),
      "CHR-013": db.collection('assets').doc(),
      "LAP-024": db.collection('assets').doc(),
      "MO-002": db.collection('assets').doc(),
      "CHR-019": db.collection('assets').doc(),
    };
    const assignmentRefs: { [tag: string]: any } = {
      "LAP-007": db.collection('assignments').doc(),
      "MO-008": db.collection('assignments').doc(),
      "HP-001": db.collection('assignments').doc(),
      "STD-006": db.collection('assignments').doc(),
      "MOB-001": db.collection('assignments').doc(),
      "LAP-015": db.collection('assignments').doc(),
      "MO-010": db.collection('assignments').doc(),
      "STD-001": db.collection('assignments').doc(),
      "CHR-011": db.collection('assignments').doc(),
      "MO-003": db.collection('assignments').doc(),
      "HEA-503": db.collection('assignments').doc(),
      "LAP-001": db.collection('assignments').doc(),
      "MO-012": db.collection('assignments').doc(),
      "HP-003": db.collection('assignments').doc(),
      "STD-008": db.collection('assignments').doc(),
      "KB-001": db.collection('assignments').doc(),
      "LAP-002": db.collection('assignments').doc(),
      "MO-006": db.collection('assignments').doc(),
      "STD-002": db.collection('assignments').doc(),
      "CHR-025": db.collection('assignments').doc(),
      "LAP-003": db.collection('assignments').doc(),
      "MO-014": db.collection('assignments').doc(),
      "ER-004": db.collection('assignments').doc(),
      "STD-003": db.collection('assignments').doc(),
      "CHR-026": db.collection('assignments').doc(),
      "LAP-004": db.collection('assignments').doc(),
      "MO-005": db.collection('assignments').doc(),
      "HP-012": db.collection('assignments').doc(),
      "STD-004": db.collection('assignments').doc(),
      "LAP-018": db.collection('assignments').doc(),
      "CHR-023": db.collection('assignments').doc(),
      "BAG-008": db.collection('assignments').doc(),
      "MOB-002": db.collection('assignments').doc(),
      "LAP-008": db.collection('assignments').doc(),
      "MO-007": db.collection('assignments').doc(),
      "HP-005": db.collection('assignments').doc(),
      "LAP-026": db.collection('assignments').doc(),
      "STD-014": db.collection('assignments').doc(),
      "CHR-021": db.collection('assignments').doc(),
      "DES-001": db.collection('assignments').doc(),
      "MO-015": db.collection('assignments').doc(),
      "HP-006": db.collection('assignments').doc(),
      "KB-002": db.collection('assignments').doc(),
      "MONT-003": db.collection('assignments').doc(),
      "MOB-007": db.collection('assignments').doc(),
      "MOB-008": db.collection('assignments').doc(),
      "MOB-009": db.collection('assignments').doc(),
      "LAP-023": db.collection('assignments').doc(),
      "MO-001": db.collection('assignments').doc(),
      "STD-011": db.collection('assignments').doc(),
      "LAP-006": db.collection('assignments').doc(),
      "CHR-022": db.collection('assignments').doc(),
      "LAP-011": db.collection('assignments').doc(),
      "MO-011": db.collection('assignments').doc(),
      "MOB-006": db.collection('assignments').doc(),
      "MO-019": db.collection('assignments').doc(),
      "LAP-017": db.collection('assignments').doc(),
      "HP-007": db.collection('assignments').doc(),
      "CHR-008": db.collection('assignments').doc(),
      "LAP-009": db.collection('assignments').doc(),
      "HP-008": db.collection('assignments').doc(),
      "STD-009": db.collection('assignments').doc(),
      "MOB-004": db.collection('assignments').doc(),
      "LAP-022": db.collection('assignments').doc(),
      "MO-018": db.collection('assignments').doc(),
      "HP-006": db.collection('assignments').doc(),
      "STD-010": db.collection('assignments').doc(),
      "CHR-012": db.collection('assignments').doc(),
      "LAP-016": db.collection('assignments').doc(),
      "MO-020": db.collection('assignments').doc(),
      "LAP-027": db.collection('assignments').doc(),
      "STD-005": db.collection('assignments').doc(),
      "CHR-015": db.collection('assignments').doc(),
      "LAP-012": db.collection('assignments').doc(),
      "HP-011": db.collection('assignments').doc(),
      "STD-012": db.collection('assignments').doc(),
      "CHR-014": db.collection('assignments').doc(),
      "LAP-019": db.collection('assignments').doc(),
      "MO-009": db.collection('assignments').doc(),
      "KB-003": db.collection('assignments').doc(),
      "MONT-001": db.collection('assignments').doc(),
      "CHR-024": db.collection('assignments').doc(),
      "LAP-020": db.collection('assignments').doc(),
      "MO-024": db.collection('assignments').doc(),
      "CHR-009": db.collection('assignments').doc(),
      "LAP-021": db.collection('assignments').doc(),
      "MO-022": db.collection('assignments').doc(),
      "HP-010": db.collection('assignments').doc(),
      "STD-011": db.collection('assignments').doc(),
      "STD-013": db.collection('assignments').doc(),
      "MO-027": db.collection('assignments').doc(),
      "LAP-010": db.collection('assignments').doc(),
      "MO-023": db.collection('assignments').doc(),
      "CHR-005": db.collection('assignments').doc(),
      "LAP-025": db.collection('assignments').doc(),
      "MO-026": db.collection('assignments').doc(),
      "CHR-016": db.collection('assignments').doc(),
      "LAP-029": db.collection('assignments').doc(),
      "KB-004": db.collection('assignments').doc(),
      "MONT-002": db.collection('assignments').doc(),
      "CHR-18": db.collection('assignments').doc(),
      "MO-021": db.collection('assignments').doc(),
      "LAP-030": db.collection('assignments').doc(),
      "MO-025": db.collection('assignments').doc(),
      "CHR-013": db.collection('assignments').doc(),
      "LAP-024": db.collection('assignments').doc(),
      "MO-002": db.collection('assignments').doc(),
      "CHR-019": db.collection('assignments').doc(),
    };

    const EMPLOYEES_DATA = [
  {
    "name": "Priyanka Patel",
    "joiningDate": new Date('2025-05-25'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-007'].id,
      assetRefs['MO-008'].id,
      assetRefs['HP-001'].id,
      assetRefs['STD-006'].id,
      assetRefs['MOB-001'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Jaydeep Sosa",
    "joiningDate": new Date('2025-02-16'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-015'].id,
      assetRefs['MO-010'].id,
      assetRefs['STD-001'].id,
      assetRefs['CHR-011'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Sandip Rathod",
    "joiningDate": new Date('2025-02-16'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['MO-003'].id,
      assetRefs['HEA-503'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Aarti Kushwaha",
    "joiningDate": new Date('2025-03-04'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-001'].id,
      assetRefs['MO-012'].id,
      assetRefs['HP-003'].id,
      assetRefs['STD-008'].id,
      assetRefs['KB-001'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Vishal Mali",
    "joiningDate": new Date('2024-12-11'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-002'].id,
      assetRefs['MO-006'].id,
      assetRefs['STD-002'].id,
      assetRefs['CHR-025'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Nimesh Mishra",
    "joiningDate": new Date('2024-12-11'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-003'].id,
      assetRefs['MO-014'].id,
      assetRefs['ER-004'].id,
      assetRefs['STD-003'].id,
      assetRefs['CHR-026'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Anchal Kumari",
    "joiningDate": new Date('2024-12-04'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-004'].id,
      assetRefs['MO-005'].id,
      assetRefs['HP-012'].id,
      assetRefs['STD-004'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Ujjaval Parmar",
    "joiningDate": new Date('2024-11-18'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-018'].id,
      assetRefs['CHR-023'].id,
      assetRefs['BAG-008'].id,
      assetRefs['MOB-002'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Dolly Sanchaniya",
    "joiningDate": new Date('2025-02-23'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-008'].id,
      assetRefs['MO-007'].id,
      assetRefs['HP-005'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Rahul Thakor",
    "joiningDate": new Date('2024-11-10'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Smit Parmar",
    "joiningDate": new Date('2025-02-23'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-026'].id,
      assetRefs['STD-014'].id,
      assetRefs['CHR-021'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Chirag Ramani",
    "joiningDate": new Date('2025-01-29'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['DES-001'].id,
      assetRefs['MO-015'].id,
      assetRefs['HP-006'].id,
      assetRefs['KB-002'].id,
      assetRefs['MONT-003'].id,
      assetRefs['MOB-007'].id,
      assetRefs['MOB-008'].id,
      assetRefs['MOB-009'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Priyal Ghetiya",
    "joiningDate": new Date('2025-02-23'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Jaymin Raval",
    "joiningDate": new Date('2025-06-11'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-023'].id,
      assetRefs['MO-001'].id,
      assetRefs['STD-011'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Shubham Patidar",
    "joiningDate": new Date('2025-07-06'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-006'].id,
      assetRefs['CHR-022'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Parita Shah",
    "joiningDate": new Date('2025-07-09'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-011'].id,
      assetRefs['MO-011'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Rushik Joshi",
    "joiningDate": new Date('2025-07-20'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['MOB-006'].id,
      assetRefs['MO-019'].id,
      assetRefs['LAP-017'].id,
      assetRefs['HP-007'].id,
      assetRefs['CHR-008'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Jay Soni",
    "joiningDate": new Date('2025-08-17'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-009'].id,
      assetRefs['HP-008'].id,
      assetRefs['STD-009'].id,
      assetRefs['MOB-004'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Anjali Mevada",
    "joiningDate": new Date('2025-09-14'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-022'].id,
      assetRefs['MO-018'].id,
      assetRefs['HP-006'].id,
      assetRefs['STD-010'].id,
      assetRefs['CHR-012'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Sanskar Jaiswal",
    "joiningDate": new Date('2025-09-24'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-016'].id,
      assetRefs['MO-020'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Bhagyesh Bhalodiya",
    "joiningDate": new Date('2025-10-26'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-027'].id,
      assetRefs['STD-005'].id,
      assetRefs['CHR-015'].id,
      assetRefs['LAP-012'].id,
      assetRefs['HP-011'].id,
      assetRefs['STD-012'].id,
      assetRefs['CHR-014'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Hiral Patel",
    "joiningDate": new Date('2025-10-26'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-019'].id,
      assetRefs['MO-009'].id,
      assetRefs['KB-003'].id,
      assetRefs['MONT-001'].id,
      assetRefs['CHR-024'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Prashant Gohil",
    "joiningDate": new Date('2025-10-26'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-020'].id,
      assetRefs['MO-024'].id,
      assetRefs['CHR-009'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Mit Prajapati",
    "joiningDate": new Date('2025-11-09'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-021'].id,
      assetRefs['MO-022'].id,
      assetRefs['HP-010'].id,
      assetRefs['STD-011'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Chaitanya Patel",
    "joiningDate": new Date('2025-11-23'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['STD-013'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Upasana Bhure",
    "joiningDate": new Date('2025-12-14'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Sujal Prajapati",
    "joiningDate": new Date('2025-12-22'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['MO-027'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Radhika Baldaniya",
    "joiningDate": new Date('2026-01-04'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-010'].id,
      assetRefs['MO-023'].id,
      assetRefs['CHR-005'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Divya Rojiwadiya",
    "joiningDate": new Date('2026-01-04'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-025'].id,
      assetRefs['MO-026'].id,
      assetRefs['CHR-016'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Kartik Jagad",
    "joiningDate": new Date('2026-01-07'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-029'].id,
      assetRefs['KB-004'].id,
      assetRefs['MONT-002'].id,
      assetRefs['CHR-18'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Hardik Jain",
    "joiningDate": new Date('2026-01-18'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['MO-021'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Himanshu Patanvadiya",
    "joiningDate": new Date('2026-01-18'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Nilesh Kanzariya",
    "joiningDate": new Date('2026-01-18'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Vrutik Vasoya",
    "joiningDate": new Date('2026-01-19'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Premal Bhatt",
    "joiningDate": new Date('2026-01-21'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-030'].id,
      assetRefs['MO-025'].id,
      assetRefs['CHR-013'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Mahesh Parmar",
    "joiningDate": new Date('2026-02-11'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [
      assetRefs['LAP-024'].id,
      assetRefs['MO-002'].id,
      assetRefs['CHR-019'].id
    ],
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
];
    const ASSETS_DATA_RAW = [
  {
    "assetTag": "LAP-007",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Priyanka Patel'].id,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": assignmentRefs['LAP-007'].id,
    "purchase": {
      "date": new Date('2025-05-25')
    },
    "properties": {
      "brandModel": "Dell"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-008",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Priyanka Patel'].id,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": assignmentRefs['MO-008'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HP-001",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Priyanka Patel'].id,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": assignmentRefs['HP-001'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-006",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Priyanka Patel'].id,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": assignmentRefs['STD-006'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MOB-001",
    "type": "mobile",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Priyanka Patel'].id,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": assignmentRefs['MOB-001'].id,
    "purchase": {
      "price": 10000,
      "date": new Date('2025-05-25')
    },
    "properties": {
      "brandModel": "Redmi 14C",
      "serialNumber": "60380/X5RT00145",
      "imei1": "860894078647083",
      "imei2": "860894078647091",
      "simNumber": "7383315759"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-015",
    "type": "unknown",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jaydeep Sosa'].id,
      "employeeName": "Jaydeep Sosa"
    },
    "currentAssignmentId": assignmentRefs['LAP-015'].id,
    "purchase": {
      "date": new Date('2025-02-16')
    },
    "properties": {
      "brandModel": "Latitude E5470",
      "serialNumber": "HQCFQC2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-010",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jaydeep Sosa'].id,
      "employeeName": "Jaydeep Sosa"
    },
    "currentAssignmentId": assignmentRefs['MO-010'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-001",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jaydeep Sosa'].id,
      "employeeName": "Jaydeep Sosa"
    },
    "currentAssignmentId": assignmentRefs['STD-001'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-011",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jaydeep Sosa'].id,
      "employeeName": "Jaydeep Sosa"
    },
    "currentAssignmentId": assignmentRefs['CHR-011'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-003",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Sandip Rathod'].id,
      "employeeName": "Sandip Rathod"
    },
    "currentAssignmentId": assignmentRefs['MO-003'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HEA-503",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Sandip Rathod'].id,
      "employeeName": "Sandip Rathod"
    },
    "currentAssignmentId": assignmentRefs['HEA-503'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-001",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Aarti Kushwaha'].id,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": assignmentRefs['LAP-001'].id,
    "purchase": {
      "date": new Date('2025-03-04')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "0272098-001045"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-012",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Aarti Kushwaha'].id,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": assignmentRefs['MO-012'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HP-003",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Aarti Kushwaha'].id,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": assignmentRefs['HP-003'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-008",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Aarti Kushwaha'].id,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": assignmentRefs['STD-008'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "KB-001",
    "type": "keyboard",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Aarti Kushwaha'].id,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": assignmentRefs['KB-001'].id,
    "properties": {
      "accessoryType": "keyboard"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-002",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Vishal Mali'].id,
      "employeeName": "Vishal Mali"
    },
    "currentAssignmentId": assignmentRefs['LAP-002'].id,
    "purchase": {
      "date": new Date('2024-12-11')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "9GSGWD2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-006",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Vishal Mali'].id,
      "employeeName": "Vishal Mali"
    },
    "currentAssignmentId": assignmentRefs['MO-006'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-002",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Vishal Mali'].id,
      "employeeName": "Vishal Mali"
    },
    "currentAssignmentId": assignmentRefs['STD-002'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-025",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Vishal Mali'].id,
      "employeeName": "Vishal Mali"
    },
    "currentAssignmentId": assignmentRefs['CHR-025'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-003",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Nimesh Mishra'].id,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": assignmentRefs['LAP-003'].id,
    "purchase": {
      "date": new Date('2024-12-11')
    },
    "properties": {
      "brandModel": "MacOS",
      "serialNumber": "C02PD3H6G3QC",
      "simNumber": "9653660446"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-014",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Nimesh Mishra'].id,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": assignmentRefs['MO-014'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "ER-004",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Nimesh Mishra'].id,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": assignmentRefs['ER-004'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-003",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Nimesh Mishra'].id,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": assignmentRefs['STD-003'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-026",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Nimesh Mishra'].id,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": assignmentRefs['CHR-026'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-004",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Anchal Kumari'].id,
      "employeeName": "Anchal Kumari"
    },
    "currentAssignmentId": assignmentRefs['LAP-004'].id,
    "purchase": {
      "date": new Date('2024-12-04')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "HFF85M2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-005",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Anchal Kumari'].id,
      "employeeName": "Anchal Kumari"
    },
    "currentAssignmentId": assignmentRefs['MO-005'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HP-012",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Anchal Kumari'].id,
      "employeeName": "Anchal Kumari"
    },
    "currentAssignmentId": assignmentRefs['HP-012'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-004",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Anchal Kumari'].id,
      "employeeName": "Anchal Kumari"
    },
    "currentAssignmentId": assignmentRefs['STD-004'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-018",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Ujjaval Parmar'].id,
      "employeeName": "Ujjaval Parmar"
    },
    "currentAssignmentId": assignmentRefs['LAP-018'].id,
    "purchase": {
      "date": new Date('2024-11-18')
    },
    "properties": {
      "brandModel": "Mac Apple",
      "serialNumber": "CO2D3CVQMD6M"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-023",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Ujjaval Parmar'].id,
      "employeeName": "Ujjaval Parmar"
    },
    "currentAssignmentId": assignmentRefs['CHR-023'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "BAG-008",
    "type": "bag",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Ujjaval Parmar'].id,
      "employeeName": "Ujjaval Parmar"
    },
    "currentAssignmentId": assignmentRefs['BAG-008'].id,
    "properties": {
      "accessoryType": "Bag"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MOB-003",
    "type": "mobile",
    "category": "device",
    "status": "Good",
    "ownership": "office",
    "isAvailable": true,
    "assignedTo": null,
    "currentAssignmentId": null,
    "purchase": {
      "price": 8500
    },
    "properties": {
      "brandModel": "Redmi 8A",
      "serialNumber": "12.5.2.0(QCPINXM)",
      "imei1": "869956044332271",
      "imei2": "869956044332289",
      "simNumber": "9324933964"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MOB-002",
    "type": "mobile",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Ujjaval Parmar'].id,
      "employeeName": "Ujjaval Parmar"
    },
    "currentAssignmentId": assignmentRefs['MOB-002'].id,
    "purchase": {
      "price": 8000,
      "date": new Date('2024-11-18')
    },
    "properties": {
      "brandModel": "Redmi A4 5G",
      "serialNumber": "60363/X4YU08529",
      "imei1": "863298075332227",
      "imei2": "863298075332235",
      "simNumber": "9653660428"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-008",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Dolly Sanchaniya'].id,
      "employeeName": "Dolly Sanchaniya"
    },
    "currentAssignmentId": assignmentRefs['LAP-008'].id,
    "purchase": {
      "date": new Date('2025-02-23')
    },
    "properties": {
      "brandModel": "Dell Latitude 7480",
      "serialNumber": "7ZG6PL2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-007",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Dolly Sanchaniya'].id,
      "employeeName": "Dolly Sanchaniya"
    },
    "currentAssignmentId": assignmentRefs['MO-007'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HP-005",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Dolly Sanchaniya'].id,
      "employeeName": "Dolly Sanchaniya"
    },
    "currentAssignmentId": assignmentRefs['HP-005'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-026",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Smit Parmar'].id,
      "employeeName": "Smit Parmar"
    },
    "currentAssignmentId": assignmentRefs['LAP-026'].id,
    "purchase": {
      "date": new Date('2025-02-23')
    },
    "properties": {
      "brandModel": "Mac",
      "serialNumber": "C02X25HTJHC9"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-014",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Smit Parmar'].id,
      "employeeName": "Smit Parmar"
    },
    "currentAssignmentId": assignmentRefs['STD-014'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-021",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Smit Parmar'].id,
      "employeeName": "Smit Parmar"
    },
    "currentAssignmentId": assignmentRefs['CHR-021'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "DES-001",
    "type": "desktop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Chirag Ramani'].id,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": assignmentRefs['DES-001'].id,
    "purchase": {
      "date": new Date('2025-01-29')
    },
    "properties": {},
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-015",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Chirag Ramani'].id,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": assignmentRefs['MO-015'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HP-006",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Chirag Ramani'].id,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": assignmentRefs['HP-006'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "KB-002",
    "type": "keyboard",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Chirag Ramani'].id,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": assignmentRefs['KB-002'].id,
    "properties": {
      "accessoryType": "keyboard"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MONT-003",
    "type": "monitor",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Chirag Ramani'].id,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": assignmentRefs['MONT-003'].id,
    "properties": {
      "accessoryType": "monitor"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MOB-007",
    "type": "mobile",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Chirag Ramani'].id,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": assignmentRefs['MOB-007'].id,
    "purchase": {
      "date": new Date('2025-01-29')
    },
    "properties": {},
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MOB-008",
    "type": "mobile",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Chirag Ramani'].id,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": assignmentRefs['MOB-008'].id,
    "purchase": {
      "date": new Date('2025-01-29')
    },
    "properties": {},
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MOB-009",
    "type": "mobile",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Chirag Ramani'].id,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": assignmentRefs['MOB-009'].id,
    "purchase": {
      "date": new Date('2025-01-29')
    },
    "properties": {},
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-023",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jaymin Raval'].id,
      "employeeName": "Jaymin Raval"
    },
    "currentAssignmentId": assignmentRefs['LAP-023'].id,
    "purchase": {
      "date": new Date('2025-06-11')
    },
    "properties": {
      "brandModel": "Dell"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-001",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jaymin Raval'].id,
      "employeeName": "Jaymin Raval"
    },
    "currentAssignmentId": assignmentRefs['MO-001'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-011",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jaymin Raval'].id,
      "employeeName": "Jaymin Raval"
    },
    "currentAssignmentId": assignmentRefs['STD-011'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-006",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Shubham Patidar'].id,
      "employeeName": "Shubham Patidar"
    },
    "currentAssignmentId": assignmentRefs['LAP-006'].id,
    "purchase": {
      "date": new Date('2025-07-06')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "C02G232HMD6M"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-022",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Shubham Patidar'].id,
      "employeeName": "Shubham Patidar"
    },
    "currentAssignmentId": assignmentRefs['CHR-022'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-011",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Parita Shah'].id,
      "employeeName": "Parita Shah"
    },
    "currentAssignmentId": assignmentRefs['LAP-011'].id,
    "purchase": {
      "date": new Date('2025-07-09')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "S2BHSGD",
      "simNumber": "9653660428"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-011",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Parita Shah'].id,
      "employeeName": "Parita Shah"
    },
    "currentAssignmentId": assignmentRefs['MO-011'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MOB-006",
    "type": "mobile",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Rushik Joshi'].id,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": assignmentRefs['MOB-006'].id,
    "purchase": {
      "price": 10000,
      "date": new Date('2025-07-20')
    },
    "properties": {
      "brandModel": "Redmi 14C 5G",
      "imei1": "860894078640062"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-019",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Rushik Joshi'].id,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": assignmentRefs['MO-019'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-017",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Rushik Joshi'].id,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": assignmentRefs['LAP-017'].id,
    "purchase": {
      "date": new Date('2025-07-20')
    },
    "properties": {
      "brandModel": "LeNova Ideapad Slim 3",
      "serialNumber": "PF9XB5728334"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HP-007",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Rushik Joshi'].id,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": assignmentRefs['HP-007'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-008",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Rushik Joshi'].id,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": assignmentRefs['CHR-008'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-009",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jay Soni'].id,
      "employeeName": "Jay Soni"
    },
    "currentAssignmentId": assignmentRefs['LAP-009'].id,
    "purchase": {
      "date": new Date('2025-08-17')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "FBS93F3"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HP-008",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jay Soni'].id,
      "employeeName": "Jay Soni"
    },
    "currentAssignmentId": assignmentRefs['HP-008'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-009",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jay Soni'].id,
      "employeeName": "Jay Soni"
    },
    "currentAssignmentId": assignmentRefs['STD-009'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MOB-004",
    "type": "mobile",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Jay Soni'].id,
      "employeeName": "Jay Soni"
    },
    "currentAssignmentId": assignmentRefs['MOB-004'].id,
    "purchase": {
      "price": 8000
    },
    "properties": {
      "brandModel": "Redmi A4 5G",
      "serialNumber": "59186/X5TC03658",
      "imei1": "865767073554063",
      "imei2": "865767073554071",
      "simNumber": "9082140358"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-022",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Anjali Mevada'].id,
      "employeeName": "Anjali Mevada"
    },
    "currentAssignmentId": assignmentRefs['LAP-022'].id,
    "purchase": {
      "date": new Date('2025-09-14')
    },
    "properties": {
      "brandModel": "Latitude 7480",
      "serialNumber": "6PMS8H2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-018",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Anjali Mevada'].id,
      "employeeName": "Anjali Mevada"
    },
    "currentAssignmentId": assignmentRefs['MO-018'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-010",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Anjali Mevada'].id,
      "employeeName": "Anjali Mevada"
    },
    "currentAssignmentId": assignmentRefs['STD-010'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-012",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Anjali Mevada'].id,
      "employeeName": "Anjali Mevada"
    },
    "currentAssignmentId": assignmentRefs['CHR-012'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-016",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Sanskar Jaiswal'].id,
      "employeeName": "Sanskar Jaiswal"
    },
    "currentAssignmentId": assignmentRefs['LAP-016'].id,
    "purchase": {
      "date": new Date('2025-09-24')
    },
    "properties": {
      "brandModel": "Dell 5490",
      "serialNumber": "1KKDPV2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-020",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Sanskar Jaiswal'].id,
      "employeeName": "Sanskar Jaiswal"
    },
    "currentAssignmentId": assignmentRefs['MO-020'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-027",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": assignmentRefs['LAP-027'].id,
    "purchase": {
      "date": new Date('2025-10-26')
    },
    "properties": {
      "brandModel": "Probook"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-005",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": assignmentRefs['STD-005'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-015",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": assignmentRefs['CHR-015'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-012",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": assignmentRefs['LAP-012'].id,
    "purchase": {
      "date": new Date('2025-10-26')
    },
    "properties": {
      "brandModel": "LeNovo Ideapad 3",
      "serialNumber": "PF3AL1N6"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HP-011",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": assignmentRefs['HP-011'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-012",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": assignmentRefs['STD-012'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-014",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": assignmentRefs['CHR-014'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-019",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Hiral Patel'].id,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": assignmentRefs['LAP-019'].id,
    "purchase": {
      "date": new Date('2025-10-26')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "5YQGFH2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-009",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Hiral Patel'].id,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": assignmentRefs['MO-009'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "KB-003",
    "type": "keyboard",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Hiral Patel'].id,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": assignmentRefs['KB-003'].id,
    "properties": {
      "accessoryType": "keyboard"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MONT-001",
    "type": "monitor",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Hiral Patel'].id,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": assignmentRefs['MONT-001'].id,
    "properties": {
      "accessoryType": "monitor"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-024",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Hiral Patel'].id,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": assignmentRefs['CHR-024'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-020",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Prashant Gohil'].id,
      "employeeName": "Prashant Gohil"
    },
    "currentAssignmentId": assignmentRefs['LAP-020'].id,
    "purchase": {
      "date": new Date('2025-10-26')
    },
    "properties": {
      "brandModel": "LeNovo",
      "serialNumber": "PG04K7AW"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-024",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Prashant Gohil'].id,
      "employeeName": "Prashant Gohil"
    },
    "currentAssignmentId": assignmentRefs['MO-024'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-009",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Prashant Gohil'].id,
      "employeeName": "Prashant Gohil"
    },
    "currentAssignmentId": assignmentRefs['CHR-009'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-021",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Mit Prajapati'].id,
      "employeeName": "Mit Prajapati"
    },
    "currentAssignmentId": assignmentRefs['LAP-021'].id,
    "purchase": {
      "date": new Date('2025-11-09')
    },
    "properties": {
      "brandModel": "Dell"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-022",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Mit Prajapati'].id,
      "employeeName": "Mit Prajapati"
    },
    "currentAssignmentId": assignmentRefs['MO-022'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "HP-010",
    "type": "headphone",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Mit Prajapati'].id,
      "employeeName": "Mit Prajapati"
    },
    "currentAssignmentId": assignmentRefs['HP-010'].id,
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "STD-013",
    "type": "stand",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Chaitanya Patel'].id,
      "employeeName": "Chaitanya Patel"
    },
    "currentAssignmentId": assignmentRefs['STD-013'].id,
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-027",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Sujal Prajapati'].id,
      "employeeName": "Sujal Prajapati"
    },
    "currentAssignmentId": assignmentRefs['MO-027'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-010",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Radhika Baldaniya'].id,
      "employeeName": "Radhika Baldaniya"
    },
    "currentAssignmentId": assignmentRefs['LAP-010'].id,
    "purchase": {
      "date": new Date('2026-01-04')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "20505672110"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-023",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Radhika Baldaniya'].id,
      "employeeName": "Radhika Baldaniya"
    },
    "currentAssignmentId": assignmentRefs['MO-023'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-005",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Radhika Baldaniya'].id,
      "employeeName": "Radhika Baldaniya"
    },
    "currentAssignmentId": assignmentRefs['CHR-005'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-025",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Divya Rojiwadiya'].id,
      "employeeName": "Divya Rojiwadiya"
    },
    "currentAssignmentId": assignmentRefs['LAP-025'].id,
    "purchase": {
      "date": new Date('2026-01-04')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "3YYWNV2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-026",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Divya Rojiwadiya'].id,
      "employeeName": "Divya Rojiwadiya"
    },
    "currentAssignmentId": assignmentRefs['MO-026'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-016",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Divya Rojiwadiya'].id,
      "employeeName": "Divya Rojiwadiya"
    },
    "currentAssignmentId": assignmentRefs['CHR-016'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-029",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Kartik Jagad'].id,
      "employeeName": "Kartik Jagad"
    },
    "currentAssignmentId": assignmentRefs['LAP-029'].id,
    "purchase": {
      "date": new Date('2026-01-07')
    },
    "properties": {
      "brandModel": "Dell Ultrabook",
      "serialNumber": "7C565S2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "KB-004",
    "type": "keyboard",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Kartik Jagad'].id,
      "employeeName": "Kartik Jagad"
    },
    "currentAssignmentId": assignmentRefs['KB-004'].id,
    "properties": {
      "accessoryType": "keyboard"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MONT-002",
    "type": "monitor",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Kartik Jagad'].id,
      "employeeName": "Kartik Jagad"
    },
    "currentAssignmentId": assignmentRefs['MONT-002'].id,
    "properties": {
      "accessoryType": "monitor"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-18",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Kartik Jagad'].id,
      "employeeName": "Kartik Jagad"
    },
    "currentAssignmentId": assignmentRefs['CHR-18'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-021",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Hardik Jain'].id,
      "employeeName": "Hardik Jain"
    },
    "currentAssignmentId": assignmentRefs['MO-021'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-030",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Premal Bhatt'].id,
      "employeeName": "Premal Bhatt"
    },
    "currentAssignmentId": assignmentRefs['LAP-030'].id,
    "purchase": {
      "date": new Date('2026-01-21')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "47LVTT2"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-025",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Premal Bhatt'].id,
      "employeeName": "Premal Bhatt"
    },
    "currentAssignmentId": assignmentRefs['MO-025'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-013",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Premal Bhatt'].id,
      "employeeName": "Premal Bhatt"
    },
    "currentAssignmentId": assignmentRefs['CHR-013'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "LAP-024",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Mahesh Parmar'].id,
      "employeeName": "Mahesh Parmar"
    },
    "currentAssignmentId": assignmentRefs['LAP-024'].id,
    "purchase": {
      "date": new Date('2026-02-11')
    },
    "properties": {
      "brandModel": "Dell",
      "serialNumber": "37763607170"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MO-002",
    "type": "mouse",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Mahesh Parmar'].id,
      "employeeName": "Mahesh Parmar"
    },
    "currentAssignmentId": assignmentRefs['MO-002'].id,
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "CHR-019",
    "type": "charger",
    "category": "accessory",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": empRefs['Mahesh Parmar'].id,
      "employeeName": "Mahesh Parmar"
    },
    "currentAssignmentId": assignmentRefs['CHR-019'].id,
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
];
    const ASSIGNMENTS_DATA_RAW = [
  {
    "assetTag": "LAP-007",
    "assetId": assetRefs['LAP-007'].id,
    "employeeId": empRefs['Priyanka Patel'].id,
    "employeeName": "Priyanka Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-008",
    "assetId": assetRefs['MO-008'].id,
    "employeeId": empRefs['Priyanka Patel'].id,
    "employeeName": "Priyanka Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-001",
    "assetId": assetRefs['HP-001'].id,
    "employeeId": empRefs['Priyanka Patel'].id,
    "employeeName": "Priyanka Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-006",
    "assetId": assetRefs['STD-006'].id,
    "employeeId": empRefs['Priyanka Patel'].id,
    "employeeName": "Priyanka Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MOB-001",
    "assetId": assetRefs['MOB-001'].id,
    "employeeId": empRefs['Priyanka Patel'].id,
    "employeeName": "Priyanka Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-015",
    "assetId": assetRefs['LAP-015'].id,
    "employeeId": empRefs['Jaydeep Sosa'].id,
    "employeeName": "Jaydeep Sosa",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-010",
    "assetId": assetRefs['MO-010'].id,
    "employeeId": empRefs['Jaydeep Sosa'].id,
    "employeeName": "Jaydeep Sosa",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-001",
    "assetId": assetRefs['STD-001'].id,
    "employeeId": empRefs['Jaydeep Sosa'].id,
    "employeeName": "Jaydeep Sosa",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-011",
    "assetId": assetRefs['CHR-011'].id,
    "employeeId": empRefs['Jaydeep Sosa'].id,
    "employeeName": "Jaydeep Sosa",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-003",
    "assetId": assetRefs['MO-003'].id,
    "employeeId": empRefs['Sandip Rathod'].id,
    "employeeName": "Sandip Rathod",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HEA-503",
    "assetId": assetRefs['HEA-503'].id,
    "employeeId": empRefs['Sandip Rathod'].id,
    "employeeName": "Sandip Rathod",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-001",
    "assetId": assetRefs['LAP-001'].id,
    "employeeId": empRefs['Aarti Kushwaha'].id,
    "employeeName": "Aarti Kushwaha",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-012",
    "assetId": assetRefs['MO-012'].id,
    "employeeId": empRefs['Aarti Kushwaha'].id,
    "employeeName": "Aarti Kushwaha",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-003",
    "assetId": assetRefs['HP-003'].id,
    "employeeId": empRefs['Aarti Kushwaha'].id,
    "employeeName": "Aarti Kushwaha",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-008",
    "assetId": assetRefs['STD-008'].id,
    "employeeId": empRefs['Aarti Kushwaha'].id,
    "employeeName": "Aarti Kushwaha",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "KB-001",
    "assetId": assetRefs['KB-001'].id,
    "employeeId": empRefs['Aarti Kushwaha'].id,
    "employeeName": "Aarti Kushwaha",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-002",
    "assetId": assetRefs['LAP-002'].id,
    "employeeId": empRefs['Vishal Mali'].id,
    "employeeName": "Vishal Mali",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-006",
    "assetId": assetRefs['MO-006'].id,
    "employeeId": empRefs['Vishal Mali'].id,
    "employeeName": "Vishal Mali",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-002",
    "assetId": assetRefs['STD-002'].id,
    "employeeId": empRefs['Vishal Mali'].id,
    "employeeName": "Vishal Mali",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-025",
    "assetId": assetRefs['CHR-025'].id,
    "employeeId": empRefs['Vishal Mali'].id,
    "employeeName": "Vishal Mali",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-003",
    "assetId": assetRefs['LAP-003'].id,
    "employeeId": empRefs['Nimesh Mishra'].id,
    "employeeName": "Nimesh Mishra",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-014",
    "assetId": assetRefs['MO-014'].id,
    "employeeId": empRefs['Nimesh Mishra'].id,
    "employeeName": "Nimesh Mishra",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "ER-004",
    "assetId": assetRefs['ER-004'].id,
    "employeeId": empRefs['Nimesh Mishra'].id,
    "employeeName": "Nimesh Mishra",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-003",
    "assetId": assetRefs['STD-003'].id,
    "employeeId": empRefs['Nimesh Mishra'].id,
    "employeeName": "Nimesh Mishra",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-026",
    "assetId": assetRefs['CHR-026'].id,
    "employeeId": empRefs['Nimesh Mishra'].id,
    "employeeName": "Nimesh Mishra",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-004",
    "assetId": assetRefs['LAP-004'].id,
    "employeeId": empRefs['Anchal Kumari'].id,
    "employeeName": "Anchal Kumari",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-005",
    "assetId": assetRefs['MO-005'].id,
    "employeeId": empRefs['Anchal Kumari'].id,
    "employeeName": "Anchal Kumari",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-012",
    "assetId": assetRefs['HP-012'].id,
    "employeeId": empRefs['Anchal Kumari'].id,
    "employeeName": "Anchal Kumari",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-004",
    "assetId": assetRefs['STD-004'].id,
    "employeeId": empRefs['Anchal Kumari'].id,
    "employeeName": "Anchal Kumari",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-018",
    "assetId": assetRefs['LAP-018'].id,
    "employeeId": empRefs['Ujjaval Parmar'].id,
    "employeeName": "Ujjaval Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-023",
    "assetId": assetRefs['CHR-023'].id,
    "employeeId": empRefs['Ujjaval Parmar'].id,
    "employeeName": "Ujjaval Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "BAG-008",
    "assetId": assetRefs['BAG-008'].id,
    "employeeId": empRefs['Ujjaval Parmar'].id,
    "employeeName": "Ujjaval Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MOB-002",
    "assetId": assetRefs['MOB-002'].id,
    "employeeId": empRefs['Ujjaval Parmar'].id,
    "employeeName": "Ujjaval Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-008",
    "assetId": assetRefs['LAP-008'].id,
    "employeeId": empRefs['Dolly Sanchaniya'].id,
    "employeeName": "Dolly Sanchaniya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-007",
    "assetId": assetRefs['MO-007'].id,
    "employeeId": empRefs['Dolly Sanchaniya'].id,
    "employeeName": "Dolly Sanchaniya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-005",
    "assetId": assetRefs['HP-005'].id,
    "employeeId": empRefs['Dolly Sanchaniya'].id,
    "employeeName": "Dolly Sanchaniya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-026",
    "assetId": assetRefs['LAP-026'].id,
    "employeeId": empRefs['Smit Parmar'].id,
    "employeeName": "Smit Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-014",
    "assetId": assetRefs['STD-014'].id,
    "employeeId": empRefs['Smit Parmar'].id,
    "employeeName": "Smit Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-021",
    "assetId": assetRefs['CHR-021'].id,
    "employeeId": empRefs['Smit Parmar'].id,
    "employeeName": "Smit Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "DES-001",
    "assetId": assetRefs['DES-001'].id,
    "employeeId": empRefs['Chirag Ramani'].id,
    "employeeName": "Chirag Ramani",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-015",
    "assetId": assetRefs['MO-015'].id,
    "employeeId": empRefs['Chirag Ramani'].id,
    "employeeName": "Chirag Ramani",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-006",
    "assetId": assetRefs['HP-006'].id,
    "employeeId": empRefs['Chirag Ramani'].id,
    "employeeName": "Chirag Ramani",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "KB-002",
    "assetId": assetRefs['KB-002'].id,
    "employeeId": empRefs['Chirag Ramani'].id,
    "employeeName": "Chirag Ramani",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MONT-003",
    "assetId": assetRefs['MONT-003'].id,
    "employeeId": empRefs['Chirag Ramani'].id,
    "employeeName": "Chirag Ramani",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MOB-007",
    "assetId": assetRefs['MOB-007'].id,
    "employeeId": empRefs['Chirag Ramani'].id,
    "employeeName": "Chirag Ramani",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MOB-008",
    "assetId": assetRefs['MOB-008'].id,
    "employeeId": empRefs['Chirag Ramani'].id,
    "employeeName": "Chirag Ramani",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MOB-009",
    "assetId": assetRefs['MOB-009'].id,
    "employeeId": empRefs['Chirag Ramani'].id,
    "employeeName": "Chirag Ramani",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-023",
    "assetId": assetRefs['LAP-023'].id,
    "employeeId": empRefs['Jaymin Raval'].id,
    "employeeName": "Jaymin Raval",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-001",
    "assetId": assetRefs['MO-001'].id,
    "employeeId": empRefs['Jaymin Raval'].id,
    "employeeName": "Jaymin Raval",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-011",
    "assetId": assetRefs['STD-011'].id,
    "employeeId": empRefs['Jaymin Raval'].id,
    "employeeName": "Jaymin Raval",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-006",
    "assetId": assetRefs['LAP-006'].id,
    "employeeId": empRefs['Shubham Patidar'].id,
    "employeeName": "Shubham Patidar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-022",
    "assetId": assetRefs['CHR-022'].id,
    "employeeId": empRefs['Shubham Patidar'].id,
    "employeeName": "Shubham Patidar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-011",
    "assetId": assetRefs['LAP-011'].id,
    "employeeId": empRefs['Parita Shah'].id,
    "employeeName": "Parita Shah",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-011",
    "assetId": assetRefs['MO-011'].id,
    "employeeId": empRefs['Parita Shah'].id,
    "employeeName": "Parita Shah",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MOB-006",
    "assetId": assetRefs['MOB-006'].id,
    "employeeId": empRefs['Rushik Joshi'].id,
    "employeeName": "Rushik Joshi",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-019",
    "assetId": assetRefs['MO-019'].id,
    "employeeId": empRefs['Rushik Joshi'].id,
    "employeeName": "Rushik Joshi",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-017",
    "assetId": assetRefs['LAP-017'].id,
    "employeeId": empRefs['Rushik Joshi'].id,
    "employeeName": "Rushik Joshi",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-007",
    "assetId": assetRefs['HP-007'].id,
    "employeeId": empRefs['Rushik Joshi'].id,
    "employeeName": "Rushik Joshi",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-008",
    "assetId": assetRefs['CHR-008'].id,
    "employeeId": empRefs['Rushik Joshi'].id,
    "employeeName": "Rushik Joshi",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-009",
    "assetId": assetRefs['LAP-009'].id,
    "employeeId": empRefs['Jay Soni'].id,
    "employeeName": "Jay Soni",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-008",
    "assetId": assetRefs['HP-008'].id,
    "employeeId": empRefs['Jay Soni'].id,
    "employeeName": "Jay Soni",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-009",
    "assetId": assetRefs['STD-009'].id,
    "employeeId": empRefs['Jay Soni'].id,
    "employeeName": "Jay Soni",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MOB-004",
    "assetId": assetRefs['MOB-004'].id,
    "employeeId": empRefs['Jay Soni'].id,
    "employeeName": "Jay Soni",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-022",
    "assetId": assetRefs['LAP-022'].id,
    "employeeId": empRefs['Anjali Mevada'].id,
    "employeeName": "Anjali Mevada",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-018",
    "assetId": assetRefs['MO-018'].id,
    "employeeId": empRefs['Anjali Mevada'].id,
    "employeeName": "Anjali Mevada",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-006",
    "assetId": assetRefs['HP-006'].id,
    "employeeId": empRefs['Anjali Mevada'].id,
    "employeeName": "Anjali Mevada",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-010",
    "assetId": assetRefs['STD-010'].id,
    "employeeId": empRefs['Anjali Mevada'].id,
    "employeeName": "Anjali Mevada",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-012",
    "assetId": assetRefs['CHR-012'].id,
    "employeeId": empRefs['Anjali Mevada'].id,
    "employeeName": "Anjali Mevada",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-016",
    "assetId": assetRefs['LAP-016'].id,
    "employeeId": empRefs['Sanskar Jaiswal'].id,
    "employeeName": "Sanskar Jaiswal",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-020",
    "assetId": assetRefs['MO-020'].id,
    "employeeId": empRefs['Sanskar Jaiswal'].id,
    "employeeName": "Sanskar Jaiswal",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-027",
    "assetId": assetRefs['LAP-027'].id,
    "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
    "employeeName": "Bhagyesh Bhalodiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-005",
    "assetId": assetRefs['STD-005'].id,
    "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
    "employeeName": "Bhagyesh Bhalodiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-015",
    "assetId": assetRefs['CHR-015'].id,
    "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
    "employeeName": "Bhagyesh Bhalodiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-012",
    "assetId": assetRefs['LAP-012'].id,
    "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
    "employeeName": "Bhagyesh Bhalodiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-011",
    "assetId": assetRefs['HP-011'].id,
    "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
    "employeeName": "Bhagyesh Bhalodiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-012",
    "assetId": assetRefs['STD-012'].id,
    "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
    "employeeName": "Bhagyesh Bhalodiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-014",
    "assetId": assetRefs['CHR-014'].id,
    "employeeId": empRefs['Bhagyesh Bhalodiya'].id,
    "employeeName": "Bhagyesh Bhalodiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-019",
    "assetId": assetRefs['LAP-019'].id,
    "employeeId": empRefs['Hiral Patel'].id,
    "employeeName": "Hiral Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-009",
    "assetId": assetRefs['MO-009'].id,
    "employeeId": empRefs['Hiral Patel'].id,
    "employeeName": "Hiral Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "KB-003",
    "assetId": assetRefs['KB-003'].id,
    "employeeId": empRefs['Hiral Patel'].id,
    "employeeName": "Hiral Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MONT-001",
    "assetId": assetRefs['MONT-001'].id,
    "employeeId": empRefs['Hiral Patel'].id,
    "employeeName": "Hiral Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-024",
    "assetId": assetRefs['CHR-024'].id,
    "employeeId": empRefs['Hiral Patel'].id,
    "employeeName": "Hiral Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-020",
    "assetId": assetRefs['LAP-020'].id,
    "employeeId": empRefs['Prashant Gohil'].id,
    "employeeName": "Prashant Gohil",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-024",
    "assetId": assetRefs['MO-024'].id,
    "employeeId": empRefs['Prashant Gohil'].id,
    "employeeName": "Prashant Gohil",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-009",
    "assetId": assetRefs['CHR-009'].id,
    "employeeId": empRefs['Prashant Gohil'].id,
    "employeeName": "Prashant Gohil",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-021",
    "assetId": assetRefs['LAP-021'].id,
    "employeeId": empRefs['Mit Prajapati'].id,
    "employeeName": "Mit Prajapati",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-022",
    "assetId": assetRefs['MO-022'].id,
    "employeeId": empRefs['Mit Prajapati'].id,
    "employeeName": "Mit Prajapati",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "HP-010",
    "assetId": assetRefs['HP-010'].id,
    "employeeId": empRefs['Mit Prajapati'].id,
    "employeeName": "Mit Prajapati",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-011",
    "assetId": assetRefs['STD-011'].id,
    "employeeId": empRefs['Mit Prajapati'].id,
    "employeeName": "Mit Prajapati",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "STD-013",
    "assetId": assetRefs['STD-013'].id,
    "employeeId": empRefs['Chaitanya Patel'].id,
    "employeeName": "Chaitanya Patel",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-027",
    "assetId": assetRefs['MO-027'].id,
    "employeeId": empRefs['Sujal Prajapati'].id,
    "employeeName": "Sujal Prajapati",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-010",
    "assetId": assetRefs['LAP-010'].id,
    "employeeId": empRefs['Radhika Baldaniya'].id,
    "employeeName": "Radhika Baldaniya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-023",
    "assetId": assetRefs['MO-023'].id,
    "employeeId": empRefs['Radhika Baldaniya'].id,
    "employeeName": "Radhika Baldaniya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-005",
    "assetId": assetRefs['CHR-005'].id,
    "employeeId": empRefs['Radhika Baldaniya'].id,
    "employeeName": "Radhika Baldaniya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-025",
    "assetId": assetRefs['LAP-025'].id,
    "employeeId": empRefs['Divya Rojiwadiya'].id,
    "employeeName": "Divya Rojiwadiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-026",
    "assetId": assetRefs['MO-026'].id,
    "employeeId": empRefs['Divya Rojiwadiya'].id,
    "employeeName": "Divya Rojiwadiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-016",
    "assetId": assetRefs['CHR-016'].id,
    "employeeId": empRefs['Divya Rojiwadiya'].id,
    "employeeName": "Divya Rojiwadiya",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-029",
    "assetId": assetRefs['LAP-029'].id,
    "employeeId": empRefs['Kartik Jagad'].id,
    "employeeName": "Kartik Jagad",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "KB-004",
    "assetId": assetRefs['KB-004'].id,
    "employeeId": empRefs['Kartik Jagad'].id,
    "employeeName": "Kartik Jagad",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MONT-002",
    "assetId": assetRefs['MONT-002'].id,
    "employeeId": empRefs['Kartik Jagad'].id,
    "employeeName": "Kartik Jagad",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-18",
    "assetId": assetRefs['CHR-18'].id,
    "employeeId": empRefs['Kartik Jagad'].id,
    "employeeName": "Kartik Jagad",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-021",
    "assetId": assetRefs['MO-021'].id,
    "employeeId": empRefs['Hardik Jain'].id,
    "employeeName": "Hardik Jain",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-030",
    "assetId": assetRefs['LAP-030'].id,
    "employeeId": empRefs['Premal Bhatt'].id,
    "employeeName": "Premal Bhatt",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-025",
    "assetId": assetRefs['MO-025'].id,
    "employeeId": empRefs['Premal Bhatt'].id,
    "employeeName": "Premal Bhatt",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-013",
    "assetId": assetRefs['CHR-013'].id,
    "employeeId": empRefs['Premal Bhatt'].id,
    "employeeName": "Premal Bhatt",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "LAP-024",
    "assetId": assetRefs['LAP-024'].id,
    "employeeId": empRefs['Mahesh Parmar'].id,
    "employeeName": "Mahesh Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "MO-002",
    "assetId": assetRefs['MO-002'].id,
    "employeeId": empRefs['Mahesh Parmar'].id,
    "employeeName": "Mahesh Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  },
  {
    "assetTag": "CHR-019",
    "assetId": assetRefs['CHR-019'].id,
    "employeeId": empRefs['Mahesh Parmar'].id,
    "employeeName": "Mahesh Parmar",
    "assignedAt": new Date(),
    "returnedAt": null,
    "status": "active",
    "conditionOut": "Good",
    "conditionIn": null,
    "notes": "Initial assignment"
  }
];

    // 2. We initialize our batch chunks (Firestore limits to 500 ops per batch)
    // Here we have around ~150 rows so 1 batch is usually fine, but let's chunk to be extremely safe.
    let batches = [db.batch()];
    let opCount = 0;

    const commitBatch = () => {
      if (opCount === 490) {
        batches.push(db.batch());
        opCount = 0;
      }
      opCount++;
      return batches[batches.length - 1];
    };

    // 3. Queue Asset Types Operations
    const assetTypes = [
      { id: 'laptop', name: 'Laptop', category: 'device', fields: [{ key: 'brandModel', type: 'text', required: true }, { key: 'serialNumber', type: 'text', required: true }] },
      { id: 'mobile', name: 'Mobile', category: 'device', fields: [{ key: 'brandModel', type: 'text', required: true }, { key: 'imei1', type: 'text', required: true }, { key: 'imei2', type: 'text', required: false }, { key: 'simNumber', type: 'text', required: false }] },
      { id: 'desktop', name: 'Desktop', category: 'device', fields: [{ key: 'brandModel', type: 'text', required: false }] },
      { id: 'monitor', name: 'Monitor', category: 'device', fields: [{ key: 'brandModel', type: 'text', required: false }] },
      { id: 'accessory', name: 'Accessory', category: 'accessory', fields: [{ key: 'accessoryType', type: 'text', required: true }] }
    ];

    assetTypes.forEach((item) => {
      commitBatch().set(db.collection('assetTypes').doc(item.id), {
        name: item.name,
        category: item.category,
        fields: item.fields
      });
    });

    // 4. Queue Employees Operations
    EMPLOYEES_DATA.forEach((emp: any) => {
      commitBatch().set(empRefs[emp.name], emp);
    });

    // 5. Queue Assets Operations
    ASSETS_DATA_RAW.forEach((ass: any) => {
      commitBatch().set(assetRefs[ass.assetTag], ass);
    });

    // 6. Queue Assignments Operations
    ASSIGNMENTS_DATA_RAW.forEach((asg: any) => {
      // Remove the dummy assetTag which we embedded just for reference mapping
      const { assetTag, ...actualAssignmentData } = asg; 
      commitBatch().set(assignmentRefs[assetTag], actualAssignmentData);
    });

    // 7. Commit all batches
    for (const batch of batches) {
      await batch.commit();
    }

    console.log('✅✅ All structured data elegantly committed via Batch Writes safely! ✅✅');
    
  } catch (error) {
    console.error('❌ Seeder failed to run:', error);
  }
};
