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
  }

  tagsToProcess.forEach(tag => {
    if (!tag) return;
    let type = hwTypeRaw ? hwTypeRaw.toLowerCase().replace(/\s/g, '') : 'unknown';
    if (type.includes('laptop')) type = 'laptop';
    else if (type.includes('mobile')) type = 'mobile';
    else if (type.includes('desktop')) type = 'desktop';

    const asset = {
      assetTag: tag,
      type: type,
      category: 'device',
      status: "Good",
      ownership: ownership,
      isAvailable: assignedToRaw ? false : true,
      assignedTo: assignedToRaw ? { employeeId: 'REF_EMPLOYEE_' + assignedToRaw, employeeName: assignedToRaw } : null,
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

    if (!assets.find(a => a.assetTag === tag)) assets.push(asset);

    if (assignedToRaw) {
      assignments.push({
        assetTag: tag, // For lookup later
        assetId: 'REF_ASSET_' + tag,
        employeeId: 'REF_EMPLOYEE_' + assignedToRaw,
        employeeName: assignedToRaw,
        assignedAt: 'RAW_NEW_DATE',
        returnedAt: null,
        status: 'active',
        conditionOut: 'Good',
        conditionIn: null,
        notes: 'Initial assignment'
      });
      // also push to employee's currentAssets lookup
      let emp = employees.find(e => e.name === assignedToRaw);
      if (emp) emp.currentAssets.push('REF_ASSET_' + tag);
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
        category: 'accessory',
        status: "Good",
        ownership: ownership,
        isAvailable: assignedToRaw ? false : true,
        assignedTo: assignedToRaw ? { employeeId: 'REF_EMPLOYEE_' + assignedToRaw, employeeName: assignedToRaw } : null,
        currentAssignmentId: assignedToRaw ? 'REF_ASSIGNMENT_' + accTag : null,
        properties: { accessoryType: acc.type },
        createdAt: 'RAW_NEW_DATE',
        updatedAt: 'RAW_NEW_DATE'
    };

    if (!assets.find(a => a.assetTag === accTag)) assets.push(accessory);

    if (assignedToRaw) {
      assignments.push({
        assetTag: accTag,
        assetId: 'REF_ASSET_' + accTag,
        employeeId: 'REF_EMPLOYEE_' + assignedToRaw,
        employeeName: assignedToRaw,
        assignedAt: 'RAW_NEW_DATE',
        returnedAt: null,
        status: 'active',
        conditionOut: 'Good',
        conditionIn: null,
        notes: 'Initial assignment'
      });
      let emp = employees.find(e => e.name === assignedToRaw);
      if (emp) emp.currentAssets.push('REF_ASSET_' + accTag);
    }
  });
  
  let bagRaw = clean(cols[18]);
  if (bagRaw && bagRaw.toLowerCase() === 'bag') {
      let bagTag = 'BAG-' + String(lineIndex).padStart(3, '0');
      assets.push({
          assetTag: bagTag,
          type: 'bag',
          category: 'accessory',
          status: "Good",
          ownership: ownership,
          isAvailable: assignedToRaw ? false : true,
          assignedTo: assignedToRaw ? { employeeId: 'REF_EMPLOYEE_' + assignedToRaw, employeeName: assignedToRaw } : null,
          currentAssignmentId: assignedToRaw ? 'REF_ASSIGNMENT_' + bagTag : null,
          properties: { accessoryType: 'Bag' },
          createdAt: 'RAW_NEW_DATE',
          updatedAt: 'RAW_NEW_DATE'
      });
      if (assignedToRaw) {
          assignments.push({
            assetTag: bagTag,
            assetId: 'REF_ASSET_' + bagTag,
            employeeId: 'REF_EMPLOYEE_' + assignedToRaw,
            employeeName: assignedToRaw,
            assignedAt: 'RAW_NEW_DATE',
            returnedAt: null,
            status: 'active',
            conditionOut: 'Good',
            conditionIn: null,
            notes: 'Initial assignment'
          });
          let emp = employees.find(e => e.name === assignedToRaw);
          if (emp) emp.currentAssets.push('REF_ASSET_' + bagTag);
      }
  }
});

let employeesJson = JSON.stringify(employees, null, 2);
let assetsJson = JSON.stringify(assets, null, 2);
let assignmentsJson = JSON.stringify(assignments, null, 2);

// Date Replacements
employeesJson = employeesJson.replace(/"RAW_NEW_DATE_([^"]+)"/g, "new Date('$1')").replace(/"RAW_NEW_DATE"/g, "new Date()");
assetsJson = assetsJson.replace(/"RAW_NEW_DATE_([^"]+)"/g, "new Date('$1')").replace(/"RAW_NEW_DATE"/g, "new Date()");
assignmentsJson = assignmentsJson.replace(/"RAW_NEW_DATE_([^"]+)"/g, "new Date('$1')").replace(/"RAW_NEW_DATE"/g, "new Date()");

// Ref Replacements
// We map these to actual variables in the TSX file
employeesJson = employeesJson.replace(/"REF_ASSET_([^"]+)"/g, "assetRefs['$1'].id");
assetsJson = assetsJson.replace(/"REF_EMPLOYEE_([^"]+)"/g, "empRefs['$1'].id");
assetsJson = assetsJson.replace(/"REF_ASSIGNMENT_([^"]+)"/g, "assignmentRefs['$1'].id");
assignmentsJson = assignmentsJson.replace(/"REF_ASSET_([^"]+)"/g, "assetRefs['$1'].id");
assignmentsJson = assignmentsJson.replace(/"REF_EMPLOYEE_([^"]+)"/g, "empRefs['$1'].id");


let tsxContent = `import firestore from '@react-native-firebase/firestore';

export const runSeeder = async () => {
  console.log('🚀 Seeding started with Batch Inserts...');

  try {
    const db = firestore();
    
    // 1. Create Document References mapping
    const empRefs: { [name: string]: any } = {
`;
employees.forEach(emp => tsxContent += `      "${emp.name}": db.collection('employees').doc(),\n`);
tsxContent += `    };
    const assetRefs: { [tag: string]: any } = {
`;
assets.forEach(ass => tsxContent += `      "${ass.assetTag}": db.collection('assets').doc(),\n`);
tsxContent += `    };
    const assignmentRefs: { [tag: string]: any } = {
`;
assignments.forEach(asg => tsxContent += `      "${asg.assetTag}": db.collection('assignments').doc(),\n`);
tsxContent += `    };

    const EMPLOYEES_DATA = ${employeesJson};
    const ASSETS_DATA_RAW = ${assetsJson};
    const ASSIGNMENTS_DATA_RAW = ${assignmentsJson};

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
`;

fs.writeFileSync('src/helper/AddDataToFirebase.tsx', tsxContent);
console.log('Done mapping cleanly to refs!');
