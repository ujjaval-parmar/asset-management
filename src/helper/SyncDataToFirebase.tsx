import firestore from '@react-native-firebase/firestore';

const EMPLOYEES_DATA = [
  {
    "name": "Priyanka Patel",
    "joiningDate": new Date('2025-05-25'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Jaydeep Sosa",
    "joiningDate": new Date('2025-02-16'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Sandip Rathod",
    "joiningDate": new Date('2025-02-16'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Aarti Kushwaha",
    "joiningDate": new Date('2025-03-04'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Vishal Mali",
    "joiningDate": new Date('2024-12-11'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Nimesh Mishra",
    "joiningDate": new Date('2024-12-11'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Anchal Kumari",
    "joiningDate": new Date('2024-12-04'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Ujjaval Parmar",
    "joiningDate": new Date('2024-11-18'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Dolly Sanchaniya",
    "joiningDate": new Date('2025-02-23'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
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
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Chirag Ramani",
    "joiningDate": new Date('2025-01-29'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
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
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Shubham Patidar",
    "joiningDate": new Date('2025-07-06'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Parita Shah",
    "joiningDate": new Date('2025-07-09'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Rushik Joshi",
    "joiningDate": new Date('2025-07-20'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Jay Soni",
    "joiningDate": new Date('2025-08-17'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Anjali Mevada",
    "joiningDate": new Date('2025-09-14'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Sanskar Jaiswal",
    "joiningDate": new Date('2025-09-24'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Bhagyesh Bhalodiya",
    "joiningDate": new Date('2025-10-26'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Hiral Patel",
    "joiningDate": new Date('2025-10-26'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Prashant Gohil",
    "joiningDate": new Date('2025-10-26'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Mit Prajapati",
    "joiningDate": new Date('2025-11-09'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Chaitanya Patel",
    "joiningDate": new Date('2025-11-23'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
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
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Radhika Baldaniya",
    "joiningDate": new Date('2026-01-04'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Divya Rojiwadiya",
    "joiningDate": new Date('2026-01-04'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Kartik Jagad",
    "joiningDate": new Date('2026-01-07'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Hardik Jain",
    "joiningDate": new Date('2026-01-18'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
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
    "currentAssets": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Mahesh Parmar",
    "joiningDate": new Date('2026-02-11'),
    "systemOwner": "Binary",
    "status": "Active",
    "currentAssets": [],
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
      "employeeId": null,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-007",
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
      "employeeId": null,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-008",
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
      "employeeId": null,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HP-001",
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
      "employeeId": null,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-006",
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
      "employeeId": null,
      "employeeName": "Priyanka Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MOB-001",
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
      "employeeId": null,
      "employeeName": "Jaydeep Sosa"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-015",
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
      "employeeId": null,
      "employeeName": "Jaydeep Sosa"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-010",
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
      "employeeId": null,
      "employeeName": "Jaydeep Sosa"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-001",
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
      "employeeId": null,
      "employeeName": "Jaydeep Sosa"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-011",
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
      "employeeId": null,
      "employeeName": "Sandip Rathod"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-003",
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
      "employeeId": null,
      "employeeName": "Sandip Rathod"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HEA-503",
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
      "employeeId": null,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-001",
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
      "employeeId": null,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-012",
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
      "employeeId": null,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HP-003",
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
      "employeeId": null,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-008",
    "properties": {
      "accessoryType": "stand"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "KB-001",
    "type": "keyboard",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": null,
      "employeeName": "Aarti Kushwaha"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_KB-001",
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
      "employeeId": null,
      "employeeName": "Vishal Mali"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-002",
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
      "employeeId": null,
      "employeeName": "Vishal Mali"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-006",
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
      "employeeId": null,
      "employeeName": "Vishal Mali"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-002",
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
      "employeeId": null,
      "employeeName": "Vishal Mali"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-025",
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
      "employeeId": null,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-003",
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
      "employeeId": null,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-014",
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
      "employeeId": null,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_ER-004",
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
      "employeeId": null,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-003",
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
      "employeeId": null,
      "employeeName": "Nimesh Mishra"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-026",
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
      "employeeId": null,
      "employeeName": "Anchal Kumari"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-004",
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
      "employeeId": null,
      "employeeName": "Anchal Kumari"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-005",
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
      "employeeId": null,
      "employeeName": "Anchal Kumari"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HP-012",
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
      "employeeId": null,
      "employeeName": "Anchal Kumari"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-004",
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
      "employeeId": null,
      "employeeName": "Ujjaval Parmar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-018",
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
      "employeeId": null,
      "employeeName": "Ujjaval Parmar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-023",
    "properties": {
      "accessoryType": "charger"
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
      "employeeId": null,
      "employeeName": "Ujjaval Parmar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MOB-002",
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
      "employeeId": null,
      "employeeName": "Dolly Sanchaniya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-008",
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
      "employeeId": null,
      "employeeName": "Dolly Sanchaniya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-007",
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
      "employeeId": null,
      "employeeName": "Dolly Sanchaniya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HP-005",
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
      "employeeId": null,
      "employeeName": "Smit Parmar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-026",
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
      "employeeId": null,
      "employeeName": "Smit Parmar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-014",
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
      "employeeId": null,
      "employeeName": "Smit Parmar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-021",
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
      "employeeId": null,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_DES-001",
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
      "employeeId": null,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-015",
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
      "employeeId": null,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HP-006",
    "properties": {
      "accessoryType": "headphone"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "KB-002",
    "type": "keyboard",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": null,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_KB-002",
    "properties": {
      "accessoryType": "keyboard"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MONT-003",
    "type": "monitor",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": null,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MONT-003",
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
      "employeeId": null,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MOB-007",
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
      "employeeId": null,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MOB-008",
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
      "employeeId": null,
      "employeeName": "Chirag Ramani"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MOB-009",
    "purchase": {
      "date": new Date('2025-01-29')
    },
    "properties": {},
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "TBD-LAP-GL7S8H2",
    "type": "laptop",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": null,
      "employeeName": "Priyal Ghetiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_TBD-LAP-GL7S8H2",
    "purchase": {
      "date": new Date('2025-02-23')
    },
    "properties": {
      "brandModel": "Latitude 5480",
      "serialNumber": "GL7S8H2"
    },
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
      "employeeId": null,
      "employeeName": "Jaymin Raval"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-023",
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
      "employeeId": null,
      "employeeName": "Jaymin Raval"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-001",
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
      "employeeId": null,
      "employeeName": "Jaymin Raval"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-011",
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
      "employeeId": null,
      "employeeName": "Shubham Patidar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-006",
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
      "employeeId": null,
      "employeeName": "Shubham Patidar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-022",
    "properties": {
      "accessoryType": "charger"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "TBD-MOB-SSHYINU8",
    "type": "mobile",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": null,
      "employeeName": "Shubham Patidar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_TBD-MOB-SSHYINU8",
    "purchase": {
      "price": 18999,
      "date": new Date('2025-07-06')
    },
    "properties": {
      "brandModel": "One Plus Node Ce2",
      "serialNumber": "SSHYINU875ZTCADA",
      "imei1": "860218061726417",
      "imei2": "860218061726409"
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
      "employeeId": null,
      "employeeName": "Parita Shah"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-011",
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
      "employeeId": null,
      "employeeName": "Parita Shah"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-011",
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
      "employeeId": null,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MOB-006",
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
      "employeeId": null,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-019",
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
      "employeeId": null,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-017",
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
      "employeeId": null,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HP-007",
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
      "employeeId": null,
      "employeeName": "Rushik Joshi"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-008",
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
      "employeeId": null,
      "employeeName": "Jay Soni"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-009",
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
      "employeeId": null,
      "employeeName": "Jay Soni"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HP-008",
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
      "employeeId": null,
      "employeeName": "Jay Soni"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-009",
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
      "employeeId": null,
      "employeeName": "Jay Soni"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MOB-004",
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
      "employeeId": null,
      "employeeName": "Anjali Mevada"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-022",
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
      "employeeId": null,
      "employeeName": "Anjali Mevada"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-018",
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
      "employeeId": null,
      "employeeName": "Anjali Mevada"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-010",
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
      "employeeId": null,
      "employeeName": "Anjali Mevada"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-012",
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
      "employeeId": null,
      "employeeName": "Sanskar Jaiswal"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-016",
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
      "employeeId": null,
      "employeeName": "Sanskar Jaiswal"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-020",
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
      "employeeId": null,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-027",
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
      "employeeId": null,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-005",
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
      "employeeId": null,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-015",
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
      "employeeId": null,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-012",
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
      "employeeId": null,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HP-011",
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
      "employeeId": null,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-012",
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
      "employeeId": null,
      "employeeName": "Bhagyesh Bhalodiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-014",
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
      "employeeId": null,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-019",
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
      "employeeId": null,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-009",
    "properties": {
      "accessoryType": "mouse"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "KB-003",
    "type": "keyboard",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": null,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_KB-003",
    "properties": {
      "accessoryType": "keyboard"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MONT-001",
    "type": "monitor",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": null,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MONT-001",
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
      "employeeId": null,
      "employeeName": "Hiral Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-024",
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
      "employeeId": null,
      "employeeName": "Prashant Gohil"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-020",
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
      "employeeId": null,
      "employeeName": "Prashant Gohil"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-024",
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
      "employeeId": null,
      "employeeName": "Prashant Gohil"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-009",
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
      "employeeId": null,
      "employeeName": "Mit Prajapati"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-021",
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
      "employeeId": null,
      "employeeName": "Mit Prajapati"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-022",
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
      "employeeId": null,
      "employeeName": "Mit Prajapati"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_HP-010",
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
      "employeeId": null,
      "employeeName": "Chaitanya Patel"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_STD-013",
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
      "employeeId": null,
      "employeeName": "Sujal Prajapati"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-027",
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
      "employeeId": null,
      "employeeName": "Radhika Baldaniya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-010",
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
      "employeeId": null,
      "employeeName": "Radhika Baldaniya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-023",
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
      "employeeId": null,
      "employeeName": "Radhika Baldaniya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-005",
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
      "employeeId": null,
      "employeeName": "Divya Rojiwadiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-025",
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
      "employeeId": null,
      "employeeName": "Divya Rojiwadiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-026",
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
      "employeeId": null,
      "employeeName": "Divya Rojiwadiya"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-016",
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
      "employeeId": null,
      "employeeName": "Kartik Jagad"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-029",
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
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": null,
      "employeeName": "Kartik Jagad"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_KB-004",
    "properties": {
      "accessoryType": "keyboard"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "assetTag": "MONT-002",
    "type": "monitor",
    "category": "device",
    "status": "Good",
    "ownership": "employee",
    "isAvailable": false,
    "assignedTo": {
      "employeeId": null,
      "employeeName": "Kartik Jagad"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MONT-002",
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
      "employeeId": null,
      "employeeName": "Kartik Jagad"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-18",
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
      "employeeId": null,
      "employeeName": "Hardik Jain"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-021",
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
      "employeeId": null,
      "employeeName": "Premal Bhatt"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-030",
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
      "employeeId": null,
      "employeeName": "Premal Bhatt"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-025",
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
      "employeeId": null,
      "employeeName": "Premal Bhatt"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-013",
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
      "employeeId": null,
      "employeeName": "Mahesh Parmar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_LAP-024",
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
      "employeeId": null,
      "employeeName": "Mahesh Parmar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_MO-002",
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
      "employeeId": null,
      "employeeName": "Mahesh Parmar"
    },
    "currentAssignmentId": "REF_ASSIGNMENT_CHR-019",
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
    "employeeName": "Priyanka Patel",
    "status": "active",
    "assignedDate": new Date('2025-05-25'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-008",
    "employeeName": "Priyanka Patel",
    "status": "active",
    "assignedDate": new Date('2025-05-25'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HP-001",
    "employeeName": "Priyanka Patel",
    "status": "active",
    "assignedDate": new Date('2025-05-25'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-006",
    "employeeName": "Priyanka Patel",
    "status": "active",
    "assignedDate": new Date('2025-05-25'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MOB-001",
    "employeeName": "Priyanka Patel",
    "status": "active",
    "assignedDate": new Date('2025-05-25'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-015",
    "employeeName": "Jaydeep Sosa",
    "status": "active",
    "assignedDate": new Date('2025-02-16'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-010",
    "employeeName": "Jaydeep Sosa",
    "status": "active",
    "assignedDate": new Date('2025-02-16'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-001",
    "employeeName": "Jaydeep Sosa",
    "status": "active",
    "assignedDate": new Date('2025-02-16'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-011",
    "employeeName": "Jaydeep Sosa",
    "status": "active",
    "assignedDate": new Date('2025-02-16'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-003",
    "employeeName": "Sandip Rathod",
    "status": "active",
    "assignedDate": new Date('2025-02-16'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HEA-503",
    "employeeName": "Sandip Rathod",
    "status": "active",
    "assignedDate": new Date('2025-02-16'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-001",
    "employeeName": "Aarti Kushwaha",
    "status": "active",
    "assignedDate": new Date('2025-03-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-012",
    "employeeName": "Aarti Kushwaha",
    "status": "active",
    "assignedDate": new Date('2025-03-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HP-003",
    "employeeName": "Aarti Kushwaha",
    "status": "active",
    "assignedDate": new Date('2025-03-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-008",
    "employeeName": "Aarti Kushwaha",
    "status": "active",
    "assignedDate": new Date('2025-03-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "KB-001",
    "employeeName": "Aarti Kushwaha",
    "status": "active",
    "assignedDate": new Date('2025-03-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-002",
    "employeeName": "Vishal Mali",
    "status": "active",
    "assignedDate": new Date('2024-12-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-006",
    "employeeName": "Vishal Mali",
    "status": "active",
    "assignedDate": new Date('2024-12-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-002",
    "employeeName": "Vishal Mali",
    "status": "active",
    "assignedDate": new Date('2024-12-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-025",
    "employeeName": "Vishal Mali",
    "status": "active",
    "assignedDate": new Date('2024-12-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-003",
    "employeeName": "Nimesh Mishra",
    "status": "active",
    "assignedDate": new Date('2024-12-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-014",
    "employeeName": "Nimesh Mishra",
    "status": "active",
    "assignedDate": new Date('2024-12-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "ER-004",
    "employeeName": "Nimesh Mishra",
    "status": "active",
    "assignedDate": new Date('2024-12-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-003",
    "employeeName": "Nimesh Mishra",
    "status": "active",
    "assignedDate": new Date('2024-12-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-026",
    "employeeName": "Nimesh Mishra",
    "status": "active",
    "assignedDate": new Date('2024-12-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-004",
    "employeeName": "Anchal Kumari",
    "status": "active",
    "assignedDate": new Date('2024-12-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-005",
    "employeeName": "Anchal Kumari",
    "status": "active",
    "assignedDate": new Date('2024-12-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HP-012",
    "employeeName": "Anchal Kumari",
    "status": "active",
    "assignedDate": new Date('2024-12-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-004",
    "employeeName": "Anchal Kumari",
    "status": "active",
    "assignedDate": new Date('2024-12-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-018",
    "employeeName": "Ujjaval Parmar",
    "status": "active",
    "assignedDate": new Date('2024-11-18'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-023",
    "employeeName": "Ujjaval Parmar",
    "status": "active",
    "assignedDate": new Date('2024-11-18'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MOB-002",
    "employeeName": "Ujjaval Parmar",
    "status": "active",
    "assignedDate": new Date('2024-11-18'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-008",
    "employeeName": "Dolly Sanchaniya",
    "status": "active",
    "assignedDate": new Date('2025-02-23'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-007",
    "employeeName": "Dolly Sanchaniya",
    "status": "active",
    "assignedDate": new Date('2025-02-23'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HP-005",
    "employeeName": "Dolly Sanchaniya",
    "status": "active",
    "assignedDate": new Date('2025-02-23'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-026",
    "employeeName": "Smit Parmar",
    "status": "active",
    "assignedDate": new Date('2025-02-23'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-014",
    "employeeName": "Smit Parmar",
    "status": "active",
    "assignedDate": new Date('2025-02-23'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-021",
    "employeeName": "Smit Parmar",
    "status": "active",
    "assignedDate": new Date('2025-02-23'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "DES-001",
    "employeeName": "Chirag Ramani",
    "status": "active",
    "assignedDate": new Date('2025-01-29'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-015",
    "employeeName": "Chirag Ramani",
    "status": "active",
    "assignedDate": new Date('2025-01-29'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HP-006",
    "employeeName": "Chirag Ramani",
    "status": "active",
    "assignedDate": new Date('2025-01-29'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "KB-002",
    "employeeName": "Chirag Ramani",
    "status": "active",
    "assignedDate": new Date('2025-01-29'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MONT-003",
    "employeeName": "Chirag Ramani",
    "status": "active",
    "assignedDate": new Date('2025-01-29'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MOB-007",
    "employeeName": "Chirag Ramani",
    "status": "active",
    "assignedDate": new Date('2025-01-29'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MOB-008",
    "employeeName": "Chirag Ramani",
    "status": "active",
    "assignedDate": new Date('2025-01-29'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MOB-009",
    "employeeName": "Chirag Ramani",
    "status": "active",
    "assignedDate": new Date('2025-01-29'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "TBD-LAP-GL7S8H2",
    "employeeName": "Priyal Ghetiya",
    "status": "active",
    "assignedDate": new Date('2025-02-23'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-023",
    "employeeName": "Jaymin Raval",
    "status": "active",
    "assignedDate": new Date('2025-06-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-001",
    "employeeName": "Jaymin Raval",
    "status": "active",
    "assignedDate": new Date('2025-06-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-011",
    "employeeName": "Jaymin Raval",
    "status": "active",
    "assignedDate": new Date('2025-06-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-006",
    "employeeName": "Shubham Patidar",
    "status": "active",
    "assignedDate": new Date('2025-07-06'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-022",
    "employeeName": "Shubham Patidar",
    "status": "active",
    "assignedDate": new Date('2025-07-06'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "TBD-MOB-SSHYINU8",
    "employeeName": "Shubham Patidar",
    "status": "active",
    "assignedDate": new Date('2025-07-06'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-011",
    "employeeName": "Parita Shah",
    "status": "active",
    "assignedDate": new Date('2025-07-09'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-011",
    "employeeName": "Parita Shah",
    "status": "active",
    "assignedDate": new Date('2025-07-09'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MOB-006",
    "employeeName": "Rushik Joshi",
    "status": "active",
    "assignedDate": new Date('2025-07-20'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-019",
    "employeeName": "Rushik Joshi",
    "status": "active",
    "assignedDate": new Date('2025-07-20'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-017",
    "employeeName": "Rushik Joshi",
    "status": "active",
    "assignedDate": new Date('2025-07-20'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HP-007",
    "employeeName": "Rushik Joshi",
    "status": "active",
    "assignedDate": new Date('2025-07-20'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-008",
    "employeeName": "Rushik Joshi",
    "status": "active",
    "assignedDate": new Date('2025-07-20'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-009",
    "employeeName": "Jay Soni",
    "status": "active",
    "assignedDate": new Date('2025-08-17'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HP-008",
    "employeeName": "Jay Soni",
    "status": "active",
    "assignedDate": new Date('2025-08-17'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-009",
    "employeeName": "Jay Soni",
    "status": "active",
    "assignedDate": new Date('2025-08-17'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MOB-004",
    "employeeName": "Jay Soni",
    "status": "active",
    "assignedDate": new Date(),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-022",
    "employeeName": "Anjali Mevada",
    "status": "active",
    "assignedDate": new Date('2025-09-14'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-018",
    "employeeName": "Anjali Mevada",
    "status": "active",
    "assignedDate": new Date('2025-09-14'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-010",
    "employeeName": "Anjali Mevada",
    "status": "active",
    "assignedDate": new Date('2025-09-14'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-012",
    "employeeName": "Anjali Mevada",
    "status": "active",
    "assignedDate": new Date('2025-09-14'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-016",
    "employeeName": "Sanskar Jaiswal",
    "status": "active",
    "assignedDate": new Date('2025-09-24'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-020",
    "employeeName": "Sanskar Jaiswal",
    "status": "active",
    "assignedDate": new Date('2025-09-24'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-027",
    "employeeName": "Bhagyesh Bhalodiya",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-005",
    "employeeName": "Bhagyesh Bhalodiya",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-015",
    "employeeName": "Bhagyesh Bhalodiya",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-012",
    "employeeName": "Bhagyesh Bhalodiya",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HP-011",
    "employeeName": "Bhagyesh Bhalodiya",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-012",
    "employeeName": "Bhagyesh Bhalodiya",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-014",
    "employeeName": "Bhagyesh Bhalodiya",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-019",
    "employeeName": "Hiral Patel",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-009",
    "employeeName": "Hiral Patel",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "KB-003",
    "employeeName": "Hiral Patel",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MONT-001",
    "employeeName": "Hiral Patel",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-024",
    "employeeName": "Hiral Patel",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-020",
    "employeeName": "Prashant Gohil",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-024",
    "employeeName": "Prashant Gohil",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-009",
    "employeeName": "Prashant Gohil",
    "status": "active",
    "assignedDate": new Date('2025-10-26'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-021",
    "employeeName": "Mit Prajapati",
    "status": "active",
    "assignedDate": new Date('2025-11-09'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-022",
    "employeeName": "Mit Prajapati",
    "status": "active",
    "assignedDate": new Date('2025-11-09'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "HP-010",
    "employeeName": "Mit Prajapati",
    "status": "active",
    "assignedDate": new Date('2025-11-09'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "STD-013",
    "employeeName": "Chaitanya Patel",
    "status": "active",
    "assignedDate": new Date('2025-11-23'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-027",
    "employeeName": "Sujal Prajapati",
    "status": "active",
    "assignedDate": new Date('2025-12-22'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-010",
    "employeeName": "Radhika Baldaniya",
    "status": "active",
    "assignedDate": new Date('2026-01-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-023",
    "employeeName": "Radhika Baldaniya",
    "status": "active",
    "assignedDate": new Date('2026-01-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-005",
    "employeeName": "Radhika Baldaniya",
    "status": "active",
    "assignedDate": new Date('2026-01-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-025",
    "employeeName": "Divya Rojiwadiya",
    "status": "active",
    "assignedDate": new Date('2026-01-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-026",
    "employeeName": "Divya Rojiwadiya",
    "status": "active",
    "assignedDate": new Date('2026-01-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-016",
    "employeeName": "Divya Rojiwadiya",
    "status": "active",
    "assignedDate": new Date('2026-01-04'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-029",
    "employeeName": "Kartik Jagad",
    "status": "active",
    "assignedDate": new Date('2026-01-07'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "KB-004",
    "employeeName": "Kartik Jagad",
    "status": "active",
    "assignedDate": new Date('2026-01-07'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MONT-002",
    "employeeName": "Kartik Jagad",
    "status": "active",
    "assignedDate": new Date('2026-01-07'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-18",
    "employeeName": "Kartik Jagad",
    "status": "active",
    "assignedDate": new Date('2026-01-07'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-021",
    "employeeName": "Hardik Jain",
    "status": "active",
    "assignedDate": new Date('2026-01-18'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-030",
    "employeeName": "Premal Bhatt",
    "status": "active",
    "assignedDate": new Date('2026-01-21'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-025",
    "employeeName": "Premal Bhatt",
    "status": "active",
    "assignedDate": new Date('2026-01-21'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-013",
    "employeeName": "Premal Bhatt",
    "status": "active",
    "assignedDate": new Date('2026-01-21'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "LAP-024",
    "employeeName": "Mahesh Parmar",
    "status": "active",
    "assignedDate": new Date('2026-02-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "MO-002",
    "employeeName": "Mahesh Parmar",
    "status": "active",
    "assignedDate": new Date('2026-02-11'),
    "notes": "Imported from Excel"
  },
  {
    "assetTag": "CHR-019",
    "employeeName": "Mahesh Parmar",
    "status": "active",
    "assignedDate": new Date('2026-02-11'),
    "notes": "Imported from Excel"
  }
];

export const runSync = async () => {
  console.log('🔄 Synchronization started...');
  try {
    const db = firestore();
    let batch = db.batch();
    let opCount = 0;

    const commitAndReset = async () => {
      await batch.commit();
      batch = db.batch();
      opCount = 0;
    };

    const commitIfFull = async () => {
      if (opCount >= 450) {
        await commitAndReset();
      }
    };

    // 1. Sync Asset Types
    const assetTypes = [
      { id: 'laptop', name: 'Laptop', category: 'device' },
      { id: 'mobile', name: 'Mobile', category: 'device' },
      { id: 'desktop', name: 'Desktop', category: 'device' },
      { id: 'monitor', name: 'Monitor', category: 'device' },
      { id: 'keyboard', name: 'Keyboard', category: 'device' },
      { id: 'charger', name: 'Charger', category: 'accessory' },
      { id: 'mouse', name: 'Mouse', category: 'accessory' },
      { id: 'headphone', name: 'Headphone', category: 'accessory' },
      { id: 'stand', name: 'Stand', category: 'accessory' },
      { id: 'accessory', name: 'Accessory', category: 'accessory' }
    ];

    for (const type of assetTypes) {
      batch.set(db.collection('assetTypes').doc(type.id), type, { merge: true });
      opCount++;
    }
    await commitIfFull();

    // 2. Fetch existing maps
    const existingEmps = await db.collection('employees').get();
    const empMap: { [name: string]: string } = {};
    existingEmps.forEach(doc => empMap[doc.data().name] = doc.id);

    const existingAssets = await db.collection('assets').get();
    const assetMap: { [tag: string]: string } = {};
    existingAssets.forEach(doc => {
      if (doc.data().assetTag) assetMap[doc.data().assetTag] = doc.id;
    });

    const activeAsgSnapshot = await db.collection('assignments').where('status', '==', 'active').get();
    const activeAsgMap: { [assetId: string]: string } = {};
    activeAsgSnapshot.forEach(doc => activeAsgMap[doc.data().assetId] = doc.id);

    // 3. Sync Employees
    console.log('Syncing employees...');
    for (const emp of EMPLOYEES_DATA) {
      let ref;
      if (empMap[emp.name]) {
        ref = db.collection('employees').doc(empMap[emp.name]);
      } else {
        ref = db.collection('employees').doc();
        empMap[emp.name] = ref.id;
      }
      batch.set(ref, emp, { merge: true });
      opCount++;
      await commitIfFull();
    }

    // 4. Sync Assets & Assignments
    console.log('Syncing assets and assignments...');
    const asgRefs: { [tag: string]: string } = {};

    // 4a. Prepare Assignments first to get IDs
    for (const asg of ASSIGNMENTS_DATA_RAW) {
        const empId = empMap[asg.employeeName];
        const assetId = assetMap[asg.assetTag];

        if (empId && assetId) {
            // Check if active assignment exists for this asset
            if (!activeAsgMap[assetId]) {
                const asgRef = db.collection('assignments').doc();
                batch.set(asgRef, {
                    assetId,
                    employeeId: empId,
                    employeeName: asg.employeeName,
                    assignedDate: asg.assignedDate,
                    status: 'active',
                    conditionOut: 'Good',
                    notes: asg.notes
                });
                asgRefs[asg.assetTag] = asgRef.id;
                opCount++;
                await commitIfFull();
            } else {
                asgRefs[asg.assetTag] = activeAsgMap[assetId];
            }
        }
    }

    // 4b. Sync Assets with ref IDs
    for (const ass of ASSETS_DATA_RAW) {
      let ref;
      if (assetMap[ass.assetTag]) {
        ref = db.collection('assets').doc(assetMap[ass.assetTag]);
      } else {
        ref = db.collection('assets').doc();
        assetMap[ass.assetTag] = ref.id;
      }

      // Resolve references
      if (ass.assignedTo && ass.assignedTo.employeeName) {
        (ass.assignedTo as any).employeeId = empMap[ass.assignedTo.employeeName] || null;
      }
      (ass as any).currentAssignmentId = (asgRefs as any)[ass.assetTag] || null;

      batch.set(ref, ass, { merge: true });
      opCount++;
      await commitIfFull();
    }

    if (opCount > 0) await batch.commit();
    console.log('✅✅ Synchronization complete! ✅✅');
    return { success: true, count: ASSETS_DATA_RAW.length };
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error;
  }
};
