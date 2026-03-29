const fs = require('fs');

const raw = fs.readFileSync('data.txt', 'utf8').split('\n');

const clean = (val) => {
  if (!val) return null;
  val = val.trim();
  if (val.toLowerCase() === 'no' || val.toLowerCase() === 'na' || val === '') return null;
  if (val.toLowerCase() === 'vired earphone') return 'Wired Earphone';
  if (val.toLowerCase() === 'er - 004 (old)') return 'ER-004';
  return val;
};

const cleanAssetTag = (tag) => {
  if (!tag) return null;
  tag = tag.replace(/\s+/g, '');
  if (tag.toLowerCase() === 'no' || tag.toLowerCase() === 'na') return null;
  return tag.toUpperCase();
};

const formatDate = (dateStr) => {
  if (!dateStr || dateStr.toLowerCase() === 'na') return 'RAW_NEW_DATE'; 
  let d = dateStr.replace(/st|nd|rd|th/i, '');
  const parsed = new Date(d);
  if (!isNaN(parsed.getTime())) {
    return 'RAW_NEW_DATE_' + parsed.toISOString().split('T')[0];
  }
  return 'RAW_NEW_DATE';
};

const accessoryColMap = [
  { idx: 11, type: 'mouse' },
  { idx: 12, type: 'headphone' },
  { idx: 13, type: 'stand' },
  { idx: 14, type: 'keyboard' },
  { idx: 15, type: 'monitor' },
  { idx: 16, type: 'charger' }
];

const employees = [];
const assets = [];
const assignments = [];

let lastEmployee = null;
let lastJoiningDate = null;
let lastSystemOwner = null;

raw.forEach((line, lineIndex) => {
  if (!line.trim()) return;
  const cols = line.split('\t');
  if (cols.length < 5) return;

  const srNo = clean(cols[0]);
  let joiningDate = clean(cols[1]);
  let employeeName = clean(cols[2]);
  let sysOwner = clean(cols[3]);

  if (employeeName) lastEmployee = employeeName;
  else employeeName = lastEmployee;

  if (joiningDate) {
      lastJoiningDate = joiningDate;
  } else if (!srNo && lastEmployee === employeeName) {
      joiningDate = lastJoiningDate;
  }

  if (sysOwner) lastSystemOwner = sysOwner;
  else sysOwner = lastSystemOwner;

  const isOffice = employeeName === 'Office Mobile';
  
  if (!isOffice && employeeName && !employees.find(e => e.name === employeeName)) {
    employees.push({
      name: employeeName,
      joiningDate: formatDate(joiningDate),
      systemOwner: sysOwner || "Binary",
      status: "Active",
      currentAssets: [],
      createdAt: 'RAW_NEW_DATE'
    });
  }

  const hwTypeRaw = clean(cols[4]);
  let assetTag = cleanAssetTag(cols[5]);
  const makeModel = clean(cols[6]);
  const serialNo = clean(cols[7]);
  const imei1 = clean(cols[8]);
  const imei2 = clean(cols[9]);
  const sim = clean(cols[10]);
  let mobileValue = clean(cols[17]);
  if (mobileValue) mobileValue = parseFloat(mobileValue.replace(/[^0-9.]/g, ''));

  let ownership = isOffice ? 'office' : 'employee';
  let assignedToRaw = isOffice ? null : employeeName;

  let tagsToProcess = [assetTag];
  if (assetTag && assetTag.includes('MOB-002,003,007,008,009')) {
    tagsToProcess = ['MOB-007', 'MOB-008', 'MOB-009']; 
  }

  tagsToProcess.forEach(tag => {
    if (!tag) return;
    let type = hwTypeRaw ? hwTypeRaw.toLowerCase().replace(/\s/g, '') : 'unknown';
    if (type.includes('laptop')) type = 'laptop';
    else if (type.includes('mobile')) type = 'mobile';
    else if (type.includes('desktop')) type = 'desktop';

    let assignedToObj = assignedToRaw ? { employeeId: null, employeeName: assignedToRaw } : null;

    const asset = {
      assetTag: tag,
      type: type,
      category: 'device',
      status: "Good",
      ownership: ownership,
      isAvailable: assignedToRaw ? false : true,
      assignedTo: assignedToObj,
      currentAssignmentId: null,
      purchase: {},
      properties: {},
      createdAt: 'RAW_NEW_DATE'
    };

    if (mobileValue) asset.purchase.price = mobileValue;
    // Add purchase date as per schema if possible
    if (assignedToRaw && joiningDate) {
       asset.purchase.date = formatDate(joiningDate);
    }

    if (Object.keys(asset.purchase).length === 0) delete asset.purchase;

    if (makeModel) asset.properties.brandModel = makeModel;
    if (serialNo) asset.properties.serialNumber = serialNo;
    if (imei1) asset.properties.imei1 = imei1;
    if (imei2) asset.properties.imei2 = imei2;
    if (sim) asset.properties.simNumber = sim;

    if (!assets.find(a => a.assetTag === tag)) {
       assets.push(asset);
    }

    if (assignedToRaw) {
      assignments.push({
        assetId: 'TEMP_ASSET_ID',
        employeeName: assignedToRaw,
        assignedAt: 'RAW_NEW_DATE',
        returnedAt: null,
        status: 'active',
        notes: 'Initial assignment'
      });
    }
  });

  accessoryColMap.forEach(acc => {
    let accRaw = clean(cols[acc.idx]);
    if (!accRaw) return;
    
    // Properly clean tag
    let accTag = cleanAssetTag(accRaw);
    if (!accTag.includes('-')) {
        accTag = acc.type.substring(0, 3).toUpperCase() + '-' + String(lineIndex + 500).padStart(3, '0');
    }

    let assignedToObj = assignedToRaw ? { employeeId: null, employeeName: assignedToRaw } : null;

    const accessory = {
        assetTag: accTag,
        type: acc.type,
        category: 'accessory',
        status: "Good",
        ownership: ownership,
        isAvailable: assignedToRaw ? false : true,
        assignedTo: assignedToObj,
        currentAssignmentId: null,
        properties: { accessoryType: acc.type },
        createdAt: 'RAW_NEW_DATE'
    };

    if (!assets.find(a => a.assetTag === accTag)) {
        assets.push(accessory);
    }

    if (assignedToRaw) {
      assignments.push({
        assetId: 'TEMP_ASSET_ID',
        employeeName: assignedToRaw,
        assignedAt: 'RAW_NEW_DATE',
        returnedAt: null,
        status: 'active',
        notes: 'Initial assignment'
      });
    }
  });
  
  let bagRaw = clean(cols[18]);
  if (bagRaw && bagRaw.toLowerCase() === 'bag') {
      let bagTag = 'BAG-' + String(lineIndex).padStart(3, '0');
      let assignedToObj = assignedToRaw ? { employeeId: null, employeeName: assignedToRaw } : null;
      assets.push({
          assetTag: bagTag,
          type: 'bag',
          category: 'accessory',
          status: "Good",
          ownership: ownership,
          isAvailable: assignedToRaw ? false : true,
          assignedTo: assignedToObj,
          currentAssignmentId: null,
          properties: { accessoryType: 'Bag' },
          createdAt: 'RAW_NEW_DATE'
      });
      if (assignedToRaw) {
          assignments.push({
            assetId: 'TEMP_ASSET_ID',
            employeeName: assignedToRaw,
            assignedAt: 'RAW_NEW_DATE',
            returnedAt: null,
            status: 'active',
            notes: 'Initial assignment'
          });
      }
  }
});

let employeesJson = JSON.stringify(employees, null, 2);
let assetsJson = JSON.stringify(assets, null, 2);
let assignmentsJson = JSON.stringify(assignments, null, 2);

employeesJson = employeesJson.replace(/"RAW_NEW_DATE_([^"]+)"/g, "new Date('$1')").replace(/"RAW_NEW_DATE"/g, "new Date()");
assetsJson = assetsJson.replace(/"RAW_NEW_DATE_([^"]+)"/g, "new Date('$1')").replace(/"RAW_NEW_DATE"/g, "new Date()");
assignmentsJson = assignmentsJson.replace(/"RAW_NEW_DATE_([^"]+)"/g, "new Date('$1')").replace(/"RAW_NEW_DATE"/g, "new Date()");

let tsxContent = `import firestore from '@react-native-firebase/firestore';

export const seedAssetTypes = async () => {
  try {
    const assetTypes = [
      {
        id: 'laptop',
        data: {
          name: 'Laptop',
          category: 'device',
          fields: [
            { key: 'brandModel', type: 'text', required: true },
            { key: 'serialNumber', type: 'text', required: true },
          ],
        },
      },
      {
        id: 'mobile',
        data: {
          name: 'Mobile',
          category: 'device',
          fields: [
            { key: 'brandModel', type: 'text', required: true },
            { key: 'imei1', type: 'text', required: true },
            { key: 'imei2', type: 'text', required: false },
            { key: 'simNumber', type: 'text', required: false },
          ],
        },
      },
      {
        id: 'accessory',
        data: {
          name: 'Accessory',
          category: 'accessory',
          fields: [
            { key: 'accessoryType', type: 'text', required: true },
          ],
        },
      },
    ];

    for (let item of assetTypes) {
      await firestore().collection('assetTypes').doc(item.id).set(item.data);
    }
    console.log('✅ assetTypes seeded');
  } catch (error) {
    console.log('❌ seedAssetTypes error:', error);
  }
};

export const seedEmployees = async () => {
  try {
    const employees = ${employeesJson};

    for (let emp of employees) {
      await firestore().collection('employees').add(emp);
    }
    console.log('✅ employees seeded');
  } catch (error) {
    console.log('❌ seedEmployees error:', error);
  }
};

export const seedAssets = async () => {
  try {
    const assets = ${assetsJson};

    for (let asset of assets) {
      await firestore().collection('assets').add(asset);
    }
    console.log('✅ assets seeded');
  } catch (error) {
    console.log('❌ seedAssets error:', error);
  }
};

export const seedAssignments = async () => {
  try {
    const assignments = ${assignmentsJson};

    for (let assign of assignments) {
      await firestore().collection('assignments').add(assign);
    }
    console.log('✅ assignments seeded');
  } catch (error) {
    console.log('❌ seedAssignments error:', error);
  }
};

export const runSeeder = async () => {
  console.log('🚀 Seeding started...');
  await seedAssetTypes();
  await seedEmployees();
  await seedAssets();
  await seedAssignments();
  console.log('✅ All data seeded');
};\n`;

fs.writeFileSync('src/helper/AddDataToFirebase.tsx', tsxContent);
