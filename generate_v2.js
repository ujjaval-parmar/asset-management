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
const assignments = []; // Track assignments for sync

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
      createdAt: 'RAW_NEW_DATE',
      updatedAt: 'RAW_NEW_DATE'
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
  } else if (!assetTag && hwTypeRaw && hwTypeRaw.toLowerCase() !== 'no') {
      // Generate a TBD tag for devices that have a type but no tag
      let cleanType = hwTypeRaw.toLowerCase().replace(/\s/g, '');
      let prefix = cleanType.startsWith('lap') ? 'LAP' : 
                   cleanType.startsWith('mob') ? 'MOB' : 
                   cleanType.startsWith('des') ? 'DES' : 'TBD';
      let identifier = serialNo ? serialNo.replace(/[^A-Z0-9]/gi, '').substring(0, 8).toUpperCase() : (lineIndex + 1);
      tagsToProcess = [`TBD-${prefix}-${identifier}`];
  }

  tagsToProcess.forEach(tag => {
    if (!tag) return;
    let type = hwTypeRaw ? hwTypeRaw.toLowerCase().replace(/\s/g, '') : 'unknown';
    if (type.includes('laptop')) type = 'laptop';
    else if (type.includes('mobile')) type = 'mobile';
    else if (type.includes('desktop')) type = 'desktop';

    const assetId = 'REF_ASSET_' + tag;
    const asset = {
      assetTag: tag,
      type: type,
      category: 'device',
      status: "Good",
      ownership: ownership,
      isAvailable: assignedToRaw ? false : true,
      assignedTo: assignedToRaw ? { employeeId: null, employeeName: assignedToRaw } : null,
      currentAssignmentId: assignedToRaw ? 'REF_ASSIGNMENT_' + tag : null,
      purchase: {},
      properties: {},
      createdAt: 'RAW_NEW_DATE',
      updatedAt: 'RAW_NEW_DATE'
    };

    if (mobileValue) asset.purchase.price = mobileValue;
    if (assignedToRaw && joiningDate) asset.purchase.date = formatDate(joiningDate);
    if (Object.keys(asset.purchase).length === 0) delete asset.purchase;

    if (makeModel) asset.properties.brandModel = makeModel;
    if (serialNo) asset.properties.serialNumber = serialNo;
    if (imei1) asset.properties.imei1 = imei1;
    if (imei2) asset.properties.imei2 = imei2;
    if (sim) asset.properties.simNumber = sim;

    if (!assets.find(a => a.assetTag === tag)) {
        assets.push(asset);
        if (assignedToRaw) {
            assignments.push({
                assetTag: tag,
                employeeName: assignedToRaw,
                status: 'active',
                assignedDate: joiningDate ? formatDate(joiningDate) : 'RAW_NEW_DATE',
                notes: 'Imported from Excel'
            });
        }
    }
  });

  accessoryColMap.forEach(acc => {
    let accRaw = clean(cols[acc.idx]);
    if (!accRaw) return;
    
    let accTag = cleanAssetTag(accRaw);
    if (!accTag.includes('-')) {
        accTag = acc.type.substring(0, 3).toUpperCase() + '-' + String(lineIndex + 500).padStart(3, '0');
    }

    const accessory = {
        assetTag: accTag,
        type: acc.type,
        category: acc.type === 'keyboard' || acc.type === 'monitor' ? 'device' : 'accessory',
        status: "Good",
        ownership: ownership,
        isAvailable: assignedToRaw ? false : true,
        assignedTo: assignedToRaw ? { employeeId: null, employeeName: assignedToRaw } : null,
        currentAssignmentId: assignedToRaw ? 'REF_ASSIGNMENT_' + accTag : null,
        properties: { accessoryType: acc.type },
        createdAt: 'RAW_NEW_DATE',
        updatedAt: 'RAW_NEW_DATE'
    };

    if (!assets.find(a => a.assetTag === accTag)) {
        assets.push(accessory);
        if (assignedToRaw) {
            assignments.push({
                assetTag: accTag,
                employeeName: assignedToRaw,
                status: 'active',
                assignedDate: joiningDate ? formatDate(joiningDate) : 'RAW_NEW_DATE',
                notes: 'Imported from Excel'
            });
        }
    }
  });
});

let employeesJson = JSON.stringify(employees, null, 2);
let assetsJson = JSON.stringify(assets, null, 2);
let assignmentsJson = JSON.stringify(assignments, null, 2);

// Date Replacements
employeesJson = employeesJson.replace(/"RAW_NEW_DATE_([^"]+)"/g, "new Date('$1')").replace(/"RAW_NEW_DATE"/g, "new Date()");
assetsJson = assetsJson.replace(/"RAW_NEW_DATE_([^"]+)"/g, "new Date('$1')").replace(/"RAW_NEW_DATE"/g, "new Date()");
assignmentsJson = assignmentsJson.replace(/"RAW_NEW_DATE_([^"]+)"/g, "new Date('$1')").replace(/"RAW_NEW_DATE"/g, "new Date()");

let syncTsxContent = `import firestore from '@react-native-firebase/firestore';

const EMPLOYEES_DATA = ${employeesJson};
const ASSETS_DATA_RAW = ${assetsJson};
const ASSIGNMENTS_DATA_RAW = ${assignmentsJson};

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
`;

fs.writeFileSync('src/helper/SyncDataToFirebase.tsx', syncTsxContent);
console.log('Done generating SyncDataToFirebase.tsx!');
