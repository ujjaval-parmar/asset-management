const fs = require('fs');

const raw = fs.readFileSync('data.txt', 'utf8').split('\n');

const out = {
  employees: [],
  assets: [],
  accessories: [],
  assignments: []
};

const clean = (val) => {
  if (!val) return null;
  val = val.trim();
  if (val.toLowerCase() === 'no' || val.toLowerCase() === 'na' || val === '') return null;
  return val;
};

const cleanAssetTag = (tag) => {
  if (!tag) return null;
  tag = tag.replace(/\s+/g, '');
  if (tag.toLowerCase() === 'no' || tag.toLowerCase() === 'na') return null;
  return tag;
};

const accessoryColMap = [
  { idx: 11, type: 'Mouse' },
  { idx: 12, type: 'Headphone' },
  { idx: 13, type: 'Stand' },
  { idx: 14, type: 'Keyboard' },
  { idx: 15, type: 'Monitor' },
  { idx: 16, type: 'Charger' }
];

let lastEmployee = null;
let lastJoiningDate = null;
let lastSystemOwner = null;

raw.forEach(line => {
  if (!line.trim()) return;
  const cols = line.split('\t');
  if (cols.length < 5) return;

  const srNo = clean(cols[0]);
  let joiningDate = clean(cols[1]);
  let employeeName = clean(cols[2]);
  let sysOwner = clean(cols[3]);

  if (employeeName) {
    lastEmployee = employeeName;
  } else {
    employeeName = lastEmployee;
  }

  if (joiningDate) {
    lastJoiningDate = joiningDate;
  } else {
    // only carry over if the srNo is empty (meaning it's a sub-row for the same employee)
    if (!srNo && lastEmployee === employeeName) {
      joiningDate = lastJoiningDate;
    }
  }

  if (sysOwner) {
    lastSystemOwner = sysOwner;
  } else {
    sysOwner = lastSystemOwner;
  }

  const isOffice = employeeName === 'Office Mobile';
  
  // if not office, add to employees list if new
  if (!isOffice && employeeName && !out.employees.find(e => e.name === employeeName)) {
    out.employees.push({
      name: employeeName,
      joiningDate: joiningDate || "N/A",
      systemOwner: sysOwner || "Binary",
      status: "Active"
    });
  }

  // Parse Asset
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
  let assignedTo = isOffice ? null : employeeName;

  if (hwTypeRaw && assetTag) {
    let type = hwTypeRaw.toLowerCase().replace(/\s/g, '');
    if (type.includes('laptop')) type = 'laptop';
    else if (type.includes('mobile')) type = 'mobile';
    else if (type.includes('desktop')) type = 'desktop';

    if (assetTag.includes('MOB-002,003')) assetTag = 'MOB-VARIOUS'; // handles Chirag Ramani edge case

    const asset = {
      assetTag: assetTag,
      type: type,
      category: 'device',
      status: "Good",
      ownership: ownership,
      assignedTo: assignedTo,
      properties: {}
    };

    if (makeModel) asset.properties.brandModel = makeModel;
    if (serialNo) asset.properties.serialNumber = serialNo;
    if (imei1) asset.properties.imei1 = imei1;
    if (imei2) asset.properties.imei2 = imei2;
    if (sim) asset.properties.simNumber = sim;

    if (mobileValue) {
      asset.purchase = { price: mobileValue };
    }

    // prevent duplicate assets (if we accidentally read same line twice)
    if (!out.assets.find(a => a.assetTag === assetTag)) {
       out.assets.push(asset);
    }

    if (assignedTo) {
      out.assignments.push({
        employeeName: assignedTo,
        assetTag: assetTag,
        status: 'active'
      });
    }
  }

  // Accessories
  accessoryColMap.forEach(acc => {
    let accRaw = clean(cols[acc.idx]);
    if (!accRaw) return;
    
    // Sometimes it says "ER - 004 (OLD)", "Vired EarPhone" -> clean it
    let tagMatch = accRaw.match(/([A-Z]+)\s*-\s*(\d+)/i);
    let accTag = tagMatch ? `${tagMatch[1].toUpperCase()}-${tagMatch[2]}` : null;

    if (!accTag) {
      // If it doesn't match standard MO-001 format but has text, maybe ignore or make it a dummy tag
      // e.g. "Vired EarPhone" -> assign a dummy tag
      accTag = 'UNKNOWN-' + accRaw.substring(0, 4).toUpperCase();
    }

    const accessory = {
      assetTag: accTag,
      type: 'accessory',
      ownership: ownership,
      assignedTo: assignedTo,
      properties: { accessoryType: acc.type }
    };
    
    // store original text if unknown format
    if (!tagMatch) {
      accessory.properties.note = accRaw;
    }

    if (!out.accessories.find(a => a.assetTag === accTag)) {
      out.accessories.push(accessory);
    }

    if (assignedTo) {
      out.assignments.push({
        employeeName: assignedTo,
        assetTag: accTag,
        status: 'active'
      });
    }
  });

});

fs.writeFileSync('output.json', JSON.stringify(out, null, 2));
console.log('✅ Generated output.json successfully with ' + out.employees.length + ' employees.');
