// Intelligent Approval & Scheme Recommendation Engine for Maharashtra
export const DISTRICT_ZONES = {
  // Group A - Developed
  'Mumbai City': 'Group A',
  'Mumbai Suburban': 'Group A',
  'Thane': 'Group A',
  'Pune': 'Group A',
  // Group B - Semi-developed
  'Nashik': 'Group B',
  'Kolhapur': 'Group B',
  'Chhatrapati Sambhajinagar': 'Group B',
  'Solapur': 'Group B',
  // Group C - Developing
  'Raigad': 'Group C',
  'Palghar': 'Group C',
  'Satara': 'Group C',
  'Sangli': 'Group C',
  'Ahmednagar': 'Group C',
  'Jalgaon': 'Group C',
  'Ratnagiri': 'Group C',
  // Group D - Backward
  'Nagpur': 'Group D',
  'Amravati': 'Group D',
  'Nanded': 'Group D',
  'Dhule': 'Group D',
  'Jalna': 'Group D',
  'Latur': 'Group D',
  'Chandrapur': 'Group D',
  // Group D+ - Ultra-backward / Tribal / Aspirant
  'Gadchiroli': 'Group D+',
  'Gondia': 'Group D+',
  'Nandurbar': 'Group D+',
  'Beed': 'Group D+',
  'Dharashiv': 'Group D+',
  'Washim': 'Group D+',
  'Yavatmal': 'Group D+',
  'Bhandara': 'Group D+',
  'Wardha': 'Group D+',
  'Buldhana': 'Group D+',
  'Parbhani': 'Group D+',
  'Hingoli': 'Group D+',
  'Sindhudurg': 'Group D+'
};

export function evaluateApprovals(projectData) {
  const {
    businessName = 'Industrial Enterprise',
    sector = 'Automobile & Electric Vehicles',
    pollutionCategory = 'Orange', // Red, Orange, Green, White
    district = 'Pune',
    isMidc = true,
    investmentCr = 25,
    landAreaSqM = 15000,
    employment = 120,
    hasBoiler = false,
    hasChemicals = false,
    powerKva = 450,
    waterMld = 0.5,
    effluentDischarge = true,
    isWomenLed = false,
    stage = 'Pre-Establishment'
  } = projectData;

  const approvals = [];
  const investment = parseFloat(investmentCr) || 0;
  const power = parseFloat(powerKva) || 0;

  // 1. LAND & TOWN PLANNING
  if (isMidc) {
    approvals.push({
      id: 'app-midc-land',
      code: 'MIDC-AL-01',
      name: 'MIDC Industrial Land Allotment & Provisional Letter',
      department: 'Maharashtra Industrial Development Corporation (MIDC)',
      deptCode: 'MIDC',
      phase: 'Pre-Establishment',
      statutorySlaDays: 15,
      estimatedFee: Math.min(250000, Math.round(landAreaSqM * 12)),
      mandatory: true,
      description: 'Formal allotment order, survey verification, and lease execution for plot inside notified industrial park.',
      requiredDocuments: [
        { name: 'Detailed Project Report (DPR)', type: 'PDF', maxMb: 10, required: true },
        { name: 'Certificate of Incorporation / Partnership Deed', type: 'PDF', maxMb: 5, required: true },
        { name: 'Promoter Net Worth & Bank Solvency Certificate', type: 'PDF', maxMb: 5, required: true },
        { name: 'Plot Layout Master Plan', type: 'PDF/DWG', maxMb: 15, required: true }
      ],
      portal: 'MIDC Single Window Portal',
      prerequisites: []
    });

    approvals.push({
      id: 'app-midc-bp',
      code: 'MIDC-BP-02',
      name: 'MIDC Building Plan Approval & Commencement Certificate',
      department: 'MIDC Engineering & Town Planning Division',
      deptCode: 'MIDC',
      phase: 'Pre-Establishment',
      statutorySlaDays: 21,
      estimatedFee: Math.round(5000 + (landAreaSqM * 2.5)),
      mandatory: true,
      description: 'Sanction of architectural, structural, and civil drawings compliant with MIDC DCR norms.',
      requiredDocuments: [
        { name: 'Architectural Blueprint by Licensed Architect', type: 'PDF', maxMb: 25, required: true },
        { name: 'Structural Stability Certificate', type: 'PDF', maxMb: 5, required: true },
        { name: 'Soil Investigation & Bearing Capacity Report', type: 'PDF', maxMb: 10, required: true }
      ],
      portal: 'MIDC Building Sanction Module',
      prerequisites: ['app-midc-land']
    });
  } else {
    // Non-MIDC requires Revenue Dept Non-Agriculture (NA) & Town Planning
    approvals.push({
      id: 'app-rev-na',
      code: 'REV-NA-01',
      name: 'Revenue Non-Agriculture (NA) Industrial Sanction',
      department: 'Revenue & Forest Department / District Collector',
      deptCode: 'REV',
      phase: 'Pre-Establishment',
      statutorySlaDays: 30,
      estimatedFee: 75000,
      mandatory: true,
      description: 'Conversion of agricultural land parcel to industrial use under Maharashtra Land Revenue Code 1966.',
      requiredDocuments: [
        { name: '7/12 Extract & Mutation Deeds (Ferfar)', type: 'PDF', maxMb: 5, required: true },
        { name: 'Demarcation Map & Mojani Sheet from Dy Dir Land Records', type: 'PDF', maxMb: 10, required: true },
        { name: 'Village Panchayat / Municipal NOC', type: 'PDF', maxMb: 5, required: true }
      ],
      portal: 'Mahabhulekh / Aaple Sarkar',
      prerequisites: []
    });

    approvals.push({
      id: 'app-tp-sanction',
      code: 'TPD-SAN-01',
      name: 'Directorate of Town Planning Building Permission',
      department: 'Town Planning & Valuation Department Maharashtra',
      deptCode: 'TPD',
      phase: 'Pre-Establishment',
      statutorySlaDays: 30,
      estimatedFee: 65000,
      mandatory: true,
      description: 'Zonal compliance verification and layout sanction outside municipal/MIDC belts.',
      requiredDocuments: [
        { name: 'Sanctioned NA Order', type: 'PDF', maxMb: 5, required: true },
        { name: 'Architectural Layout Plans', type: 'PDF', maxMb: 20, required: true }
      ],
      portal: 'BPAMS Urban Portal',
      prerequisites: ['app-rev-na']
    });
  }

  // 2. POLLUTION / ENVIRONMENTAL CLEARANCES (MPCB)
  if (pollutionCategory === 'White') {
    approvals.push({
      id: 'app-mpcb-white',
      code: 'MPCB-WHITE-01',
      name: 'MPCB White Category Self-Declaration Intimation',
      department: 'Maharashtra Pollution Control Board (MPCB)',
      deptCode: 'MPCB',
      phase: 'Pre-Establishment',
      statutorySlaDays: 7,
      estimatedFee: 1000,
      mandatory: true,
      description: 'Instant acknowledgment for non-polluting category without physical inspection prerequisite.',
      requiredDocuments: [
        { name: 'Self-Certification Affidavit on Green Compliance', type: 'PDF', maxMb: 2, required: true },
        { name: 'Brief Process Flow Description', type: 'PDF', maxMb: 5, required: true }
      ],
      portal: 'MPCB e-Consent Portal',
      prerequisites: []
    });
  } else {
    // Red, Orange, Green
    const isRed = pollutionCategory === 'Red';
    const isOrange = pollutionCategory === 'Orange';
    const cteDays = isRed ? 45 : (isOrange ? 30 : 15);
    const cteFee = Math.round(15000 + (investment * 2500));

    approvals.push({
      id: 'app-mpcb-cte',
      code: 'MPCB-CTE-01',
      name: `MPCB Consent to Establish (CTE) - [${pollutionCategory} Category]`,
      department: 'Maharashtra Pollution Control Board (MPCB)',
      deptCode: 'MPCB',
      phase: 'Pre-Establishment',
      statutorySlaDays: cteDays,
      estimatedFee: cteFee,
      mandatory: true,
      description: `Statutory clearance under Water Act 1974 & Air Act 1981 prior to starting on-site construction for ${pollutionCategory} category unit.`,
      requiredDocuments: [
        { name: 'Process Flow Diagram & Material Balance', type: 'PDF', maxMb: 10, required: true },
        { name: 'Effluent Treatment Plant (ETP) / STP Scheme Blueprint', type: 'PDF', maxMb: 15, required: true },
        { name: 'Air Pollution Control Equipment (APCE) Specs', type: 'PDF', maxMb: 10, required: true },
        { name: 'Environmental Management Plan (EMP)', type: 'PDF', maxMb: 15, required: true },
        ...(isRed ? [{ name: 'EIA Study & Risk Hazard Assessment Report', type: 'PDF', maxMb: 35, required: true }] : [])
      ],
      portal: 'MPCB e-Consent System',
      prerequisites: isMidc ? ['app-midc-land'] : ['app-rev-na']
    });

    approvals.push({
      id: 'app-mpcb-cto',
      code: 'MPCB-CTO-02',
      name: `MPCB Consent to Operate (CTO) - [${pollutionCategory} Category]`,
      department: 'Maharashtra Pollution Control Board (MPCB)',
      deptCode: 'MPCB',
      phase: 'Pre-Operation',
      statutorySlaDays: isRed ? 45 : 30,
      estimatedFee: Math.round(cteFee * 1.2),
      mandatory: true,
      description: 'Mandatory operational license issued post joint physical inspection verifying installed ETP, scrubbers, and stack heights.',
      requiredDocuments: [
        { name: 'Consent to Establish (CTE) Compliance Report', type: 'PDF', maxMb: 10, required: true },
        { name: 'Stack Emission & Noise Monitoring Test Report', type: 'PDF', maxMb: 10, required: true },
        { name: 'Hazardous Waste Storage Area Photographs & Manifest', type: 'PDF', maxMb: 10, required: true }
      ],
      portal: 'MPCB e-Consent System',
      prerequisites: ['app-mpcb-cte']
    });
  }

  // 3. FIRE SAFETY APPROVALS
  approvals.push({
    id: 'app-fire-prov',
    code: 'MFS-PROV-01',
    name: 'Provisional Fire Safety NOC',
    department: 'Maharashtra Fire Services / Directorate of Fire Services',
    deptCode: 'FIRE',
    phase: 'Pre-Establishment',
    statutorySlaDays: 14,
    estimatedFee: Math.round(8000 + (landAreaSqM * 1.5)),
    mandatory: true,
    description: 'Scrutiny of fire hydrants, sprinkler network, exits, and riser systems prior to structural erection.',
    requiredDocuments: [
      { name: 'Fire Fighting System Layout Plan by Licensed Fire Consultant', type: 'PDF', maxMb: 20, required: true },
      { name: 'Water Tank Capacity & Pump Flow Calculation Sheet', type: 'PDF', maxMb: 5, required: true }
    ],
    portal: 'Maharashtra Fire Portal (MFS)',
    prerequisites: isMidc ? ['app-midc-bp'] : ['app-tp-sanction']
  });

  approvals.push({
    id: 'app-fire-final',
    code: 'MFS-FINAL-02',
    name: 'Final Fire Safety Occupancy NOC',
    department: 'Maharashtra Fire Services',
    deptCode: 'FIRE',
    phase: 'Pre-Operation',
    statutorySlaDays: 14,
    estimatedFee: 15000,
    mandatory: true,
    description: 'On-site live demonstration and testing of pumps, alarms, foam systems, and emergency exits before unit operation.',
    requiredDocuments: [
      { name: 'Form A/B from Licensed Fire Agency', type: 'PDF', maxMb: 5, required: true },
      { name: 'Fire Mock Drill & Safety Training Certificate', type: 'PDF', maxMb: 5, required: true }
    ],
    portal: 'Maharashtra Fire Portal (MFS)',
    prerequisites: ['app-fire-prov']
  });

  // 4. FACTORY & OCCUPATIONAL HEALTH (DISH)
  approvals.push({
    id: 'app-dish-plan',
    code: 'DISH-FP-01',
    name: 'Factory Building Plan Approval (DISH)',
    department: 'Directorate of Industrial Safety & Health (DISH)',
    deptCode: 'DISH',
    phase: 'Pre-Establishment',
    statutorySlaDays: 20,
    estimatedFee: 12000,
    mandatory: true,
    description: 'Approval of factory layout under Section 6 of Factories Act 1948 ensuring ventilation, lighting, machine spacing, and worker welfare.',
    requiredDocuments: [
      { name: 'Factory Layout Flow Diagram with Machine Positions', type: 'PDF', maxMb: 15, required: true },
      { name: 'Ventilation & Emergency Evacuation Calculations', type: 'PDF', maxMb: 8, required: true }
    ],
    portal: 'DISH Maharashtra e-Services',
    prerequisites: isMidc ? ['app-midc-bp'] : ['app-tp-sanction']
  });

  approvals.push({
    id: 'app-dish-lic',
    code: 'DISH-LIC-02',
    name: 'Factory Registration & Operating License (DISH)',
    department: 'Directorate of Industrial Safety & Health (DISH)',
    deptCode: 'DISH',
    phase: 'Pre-Operation',
    statutorySlaDays: 21,
    estimatedFee: Math.round(5000 + (employment * 75)),
    mandatory: true,
    description: 'Formal license to commence industrial production and employ workforce under Factories Act 1948.',
    requiredDocuments: [
      { name: 'Form 1 Notice of Occupation', type: 'PDF', maxMb: 5, required: true },
      { name: 'Safety Officer Appointment Letter (if employees > 250)', type: 'PDF', maxMb: 5, required: employment > 250 },
      { name: 'Occupational Health Center Layout (if applicable)', type: 'PDF', maxMb: 5, required: false }
    ],
    portal: 'DISH Maharashtra e-Services',
    prerequisites: ['app-dish-plan']
  });

  // 5. ELECTRICITY / POWER (MSEDCL / CEI)
  approvals.push({
    id: 'app-msedcl-power',
    code: 'MSEDCL-PWR-01',
    name: power > 500 ? 'MSEDCL High Tension (HT) Power Substation Sanction' : 'MSEDCL Low Tension (LT) Industrial Power Sanction',
    department: 'Maharashtra State Electricity Distribution Co. Ltd (MSEDCL)',
    deptCode: 'MSEDCL',
    phase: 'Construction & Setup',
    statutorySlaDays: 15,
    estimatedFee: Math.round(power * 250),
    mandatory: true,
    description: `Feasibility clearance, transformer load sanction (${power} kVA), and grid connectivity under RTS.`,
    requiredDocuments: [
      { name: 'Electricity Load Calculation Sheet & Single Line Diagram (SLD)', type: 'PDF', maxMb: 10, required: true },
      { name: 'Ownership / Land Lease Agreement', type: 'PDF', maxMb: 5, required: true },
      ...(power > 500 ? [{ name: 'Chief Electrical Inspector (CEI) Drawing Sanction', type: 'PDF', maxMb: 10, required: true }] : [])
    ],
    portal: 'MSEDCL Urja Single Window',
    prerequisites: isMidc ? ['app-midc-land'] : ['app-rev-na']
  });

  // 6. SECTOR SPECIFIC APPROVALS
  // Food Processing
  if (sector.toLowerCase().includes('food') || sector.toLowerCase().includes('agro')) {
    approvals.push({
      id: 'app-fssai',
      code: 'FDA-FSSAI-01',
      name: 'FSSAI State / Central Manufacturing License',
      department: 'Food & Drugs Administration (FDA) Maharashtra',
      deptCode: 'FDA',
      phase: 'Pre-Operation',
      statutorySlaDays: 30,
      estimatedFee: investment > 20 ? 7500 : 5000,
      mandatory: true,
      description: 'Mandatory Food Safety and Standards Authority of India manufacturing certification and hygiene compliance.',
      requiredDocuments: [
        { name: 'Food Safety Management System (FSMS) Plan', type: 'PDF', maxMb: 10, required: true },
        { name: 'Potable Water Chemical & Bacteriological Test Report', type: 'PDF', maxMb: 5, required: true },
        { name: 'List of Food Product Categories & Formulation Specs', type: 'PDF', maxMb: 5, required: true }
      ],
      portal: 'FoSCoS Portal',
      prerequisites: ['app-dish-plan']
    });
  }

  // Chemicals / Petroleum / Solvents
  if (hasChemicals || sector.toLowerCase().includes('chemical') || sector.toLowerCase().includes('pharma')) {
    approvals.push({
      id: 'app-peso-chem',
      code: 'PESO-EXP-01',
      name: 'PESO Hazardous Chemicals & Solvent Storage Approval',
      department: 'Petroleum and Explosives Safety Organisation (PESO)',
      deptCode: 'PESO',
      phase: 'Construction & Setup',
      statutorySlaDays: 45,
      estimatedFee: 35000,
      mandatory: true,
      description: 'Statutory safety vetting for bulk storage of flammable petroleum products, solvents, and compressed gases.',
      requiredDocuments: [
        { name: 'Explosives Layout Plan & Dike Wall Calculations', type: 'PDF', maxMb: 15, required: true },
        { name: 'HAZOP (Hazard and Operability) Study Report', type: 'PDF', maxMb: 20, required: true }
      ],
      portal: 'PESO Online Portal',
      prerequisites: ['app-fire-prov']
    });
  }

  // Steam Boilers
  if (hasBoiler) {
    approvals.push({
      id: 'app-boiler-reg',
      code: 'BLR-REG-01',
      name: 'Directorate of Steam Boilers Registration & Inspection',
      department: 'Directorate of Steam Boilers Maharashtra',
      deptCode: 'DSB',
      phase: 'Pre-Operation',
      statutorySlaDays: 20,
      estimatedFee: 18000,
      mandatory: true,
      description: 'Registration, hydraulic pressure testing, and steam piping safety clearance under Indian Boilers Act 1923.',
      requiredDocuments: [
        { name: 'Boiler Maker Certificate & Form II/III', type: 'PDF', maxMb: 10, required: true },
        { name: 'Steam Piping Isometric Layout Drawing', type: 'PDF', maxMb: 12, required: true }
      ],
      portal: 'Maharashtra Steam Boilers Portal',
      prerequisites: ['app-dish-plan']
    });
  }

  // 7. WATER SUPPLY & GROUNDWATER (if high water or rural)
  if (waterMld > 0.3 || !isMidc) {
    approvals.push({
      id: 'app-water-noc',
      code: 'GSDA-GW-01',
      name: isMidc ? 'MIDC Industrial Water Pipeline Sanction' : 'GSDA / CGWA Ground Water Extraction NOC',
      department: isMidc ? 'MIDC Water Works Division' : 'Groundwater Surveys and Development Agency (GSDA)',
      deptCode: isMidc ? 'MIDC' : 'GSDA',
      phase: 'Construction & Setup',
      statutorySlaDays: 20,
      estimatedFee: 15000,
      mandatory: true,
      description: isMidc ? 'Sanction of dedicated high-pressure industrial water feeder line and water meter installation.' : 'Statutory clearance for borewell drilling & groundwater extraction with rainwater recharge commitment.',
      requiredDocuments: [
        { name: 'Water Balance Chart & Recycle Ratio Plan', type: 'PDF', maxMb: 5, required: true },
        { name: 'Rainwater Harvesting Pit Design Specs', type: 'PDF', maxMb: 10, required: true }
      ],
      portal: isMidc ? 'MIDC Water Portal' : 'CGWA Portal',
      prerequisites: []
    });
  }

  // 8. FINAL OCCUPANCY (MIDC / LOCAL BODY)
  approvals.push({
    id: 'app-occ-cert',
    code: isMidc ? 'MIDC-BCC-03' : 'LGB-BCC-01',
    name: isMidc ? 'MIDC Building Completion Certificate (BCC) & Occupancy' : 'Local Authority Building Occupancy Certificate',
    department: isMidc ? 'MIDC Engineering & Town Planning' : 'Municipal / Gram Panchayat Authority',
    deptCode: isMidc ? 'MIDC' : 'LGB',
    phase: 'Pre-Operation',
    statutorySlaDays: 15,
    estimatedFee: 8000,
    mandatory: true,
    description: 'Final physical inspection of built factory premises against approved plans prior to power connection energization.',
    requiredDocuments: [
      { name: 'Architect Completion Certificate & As-Built Drawings', type: 'PDF', maxMb: 25, required: true },
      { name: 'Final Fire NOC Copy', type: 'PDF', maxMb: 5, required: true },
      { name: 'Structural Engineer Stability Certificate', type: 'PDF', maxMb: 5, required: true }
    ],
    portal: isMidc ? 'MIDC Single Window' : 'Aaple Sarkar',
    prerequisites: ['app-fire-final']
  });

  // Calculate Aggregates
  const totalApprovals = approvals.length;
  const totalEstimatedFees = approvals.reduce((sum, a) => sum + a.estimatedFee, 0);
  const maxSlaDays = Math.max(...approvals.map(a => a.statutorySlaDays));
  const avgSlaDays = Math.round(approvals.reduce((sum, a) => sum + a.statutorySlaDays, 0) / totalApprovals);

  // Group by Phases
  const phases = {
    'Pre-Establishment': approvals.filter(a => a.phase === 'Pre-Establishment'),
    'Construction & Setup': approvals.filter(a => a.phase === 'Construction & Setup'),
    'Pre-Operation': approvals.filter(a => a.phase === 'Pre-Operation')
  };

  // SCHEMES & INCENTIVES MATCHING
  const zone = DISTRICT_ZONES[district] || 'Group C';
  const eligibleSchemes = evaluateIncentiveSchemes({
    district,
    zone,
    investmentCr: investment,
    employment,
    sector,
    pollutionCategory,
    isWomenLed
  });

  // STATUTORY RENEWALS PREVIEW
  const statutoryRenewals = generateRenewalsCalendar({ pollutionCategory, hasBoiler, employment });

  // JOINT INSPECTION RECOMMENDATION (Central Inspection System - CIS)
  const cisInspections = generateCisInspectionMatrix({ pollutionCategory, hasChemicals, hasBoiler, employment });

  return {
    summary: {
      totalApprovals,
      totalEstimatedFees,
      estimatedTimelineDays: 45, // Concurrent fast-track
      sequentialTimelineDays: approvals.reduce((s, a) => s + a.statutorySlaDays, 0),
      districtZone: zone,
      rtsApplicable: true,
      fastTrackEligible: pollutionCategory === 'Green' || pollutionCategory === 'White' || isMidc
    },
    approvals,
    phases,
    eligibleSchemes,
    statutoryRenewals,
    cisInspections
  };
}

export function evaluateIncentiveSchemes({ district, zone, investmentCr, employment, sector, pollutionCategory = 'Orange', isWomenLed = false }) {
  const schemes = [];
  const inv = parseFloat(investmentCr) || 0;
  const isMega = inv >= 500;
  const isLarge = inv >= 50 && inv < 500;
  const isMsme = inv < 50;

  // 1. MAHARASHTRA PACKAGE SCHEME OF INCENTIVES (PSI 2019/2024)
  let capitalSubsidyPct = 0;
  let sgstRefundPct = 0;
  let stampDutyExemptionPct = 0;
  let powerSubsidy = 0; // Rs per unit
  let interestSubvention = 0; // %

  if (zone === 'Group A') {
    capitalSubsidyPct = 0;
    sgstRefundPct = 30;
    stampDutyExemptionPct = 50;
    powerSubsidy = 0;
    interestSubvention = 0;
  } else if (zone === 'Group B') {
    capitalSubsidyPct = 20;
    sgstRefundPct = 60;
    stampDutyExemptionPct = 75;
    powerSubsidy = 1.0;
    interestSubvention = 3;
  } else if (zone === 'Group C') {
    capitalSubsidyPct = 40;
    sgstRefundPct = 80;
    stampDutyExemptionPct = 100;
    powerSubsidy = 1.5;
    interestSubvention = 5;
  } else if (zone === 'Group D') {
    capitalSubsidyPct = 60;
    sgstRefundPct = 100;
    stampDutyExemptionPct = 100;
    powerSubsidy = 2.0;
    interestSubvention = 5;
  } else if (zone === 'Group D+') {
    capitalSubsidyPct = 80;
    sgstRefundPct = 100;
    stampDutyExemptionPct = 100;
    powerSubsidy = 2.5;
    interestSubvention = 6;
  }

  // Bonus for Women Led Units
  let womenBonusText = '';
  if (isWomenLed) {
    capitalSubsidyPct = Math.min(100, capitalSubsidyPct + 5);
    interestSubvention = Math.min(7, interestSubvention + 1);
    womenBonusText = ' (+5% Women Promoter Special State Incentive)';
  }

  // Scheme 1: PSI Capital Subsidy
  if (capitalSubsidyPct > 0) {
    const estimatedValue = Math.min(inv * (capitalSubsidyPct / 100), 10.0);
    schemes.push({
      id: 'sch-psi-capital',
      name: 'Maharashtra Package Scheme of Incentives (PSI) - Capital Investment Subsidy',
      department: 'Directorate of Industries, Maharashtra',
      category: 'Capital Subsidy',
      benefitValue: `${capitalSubsidyPct}% of Eligible Fixed Capital Investment${womenBonusText}`,
      estimatedBenefitAmount: `₹ ${(estimatedValue).toFixed(2)} Crores`,
      eligibilitySummary: `Applicable for industrial units set up in ${zone} (${district}). Direct grant disbursed over 5-7 fiscal years.`,
      tags: ['State Flagship', zone, 'Direct Benefit'],
      icon: 'BadgePercent'
    });
  }

  // Scheme 2: 100% Stamp Duty Exemption
  schemes.push({
    id: 'sch-stamp-duty',
    name: 'Maharashtra Industrial Stamp Duty Exemption & Concession',
    department: 'Revenue & Registration Department, Maharashtra',
    category: 'Tax & Duty Exemption',
    benefitValue: `${stampDutyExemptionPct}% Waiver on Land & Loan Mortgage Stamp Duty`,
    estimatedBenefitAmount: `₹ ${Math.max(0.15, (inv * 0.03)).toFixed(2)} Crores saved`,
    eligibilitySummary: `Full or partial exemption on stamp duty payable on execution of lease deeds, land purchase, and hypothecation deeds in ${district}.`,
    tags: ['Immediate Saving', 'Land & Loans'],
    icon: 'FileCheck'
  });

  // Scheme 3: SGST Reimbursement
  schemes.push({
    id: 'sch-sgst-refund',
    name: 'Industrial SGST Reimbursement Scheme (10-Year Horizon)',
    department: 'State GST Department, Maharashtra',
    category: 'Fiscal Reimbursement',
    benefitValue: `${sgstRefundPct}% Reimbursement of Net SGST Paid to State`,
    estimatedBenefitAmount: `Up to ₹ ${(inv * 0.8).toFixed(2)} Crores cumulative`,
    eligibilitySummary: `Annual reimbursement of intra-state SGST revenue generated from commercial manufacturing for up to 10 years.`,
    tags: ['10-Year Horizon', 'Cashback'],
    icon: 'TrendingUp'
  });

  // Scheme 4: Power Tariff Rebate & Electricity Duty Waiver
  if (powerSubsidy > 0) {
    schemes.push({
      id: 'sch-power-rebate',
      name: 'Industrial Power Tariff Subsidy & Electricity Duty Exemption',
      department: 'Energy Department & MSEDCL, Maharashtra',
      category: 'Operational Cost Reduction',
      benefitValue: `₹ ${powerSubsidy}/unit rebate + 100% Electricity Duty Exemption for 5 years`,
      estimatedBenefitAmount: `₹ ${(powerSubsidy * 0.45 * 12).toFixed(2)} Lakhs / year approx.`,
      eligibilitySummary: `Subsidized industrial tariff to maintain competitiveness in ${district} (${zone}) manufacturing hubs.`,
      tags: ['Power Subsidy', 'Monthly Benefit'],
      icon: 'Zap'
    });
  }

  // Scheme 5: MSME Interest Subvention
  if (isMsme && interestSubvention > 0) {
    schemes.push({
      id: 'sch-interest-subvention',
      name: 'Dr. Babasaheb Ambedkar / CM Employment Generation Interest Subvention',
      department: 'Directorate of Industries',
      category: 'Finance & Lending',
      benefitValue: `${interestSubvention}% Interest Subsidy on Term Loans for 5 Years`,
      estimatedBenefitAmount: `Up to ₹ 25.0 Lakhs / year`,
      eligibilitySummary: `Lowers cost of capital for term loans availed from scheduled commercial banks / MSFC for plant & machinery.`,
      tags: ['MSME Focus', 'Bank Loans'],
      icon: 'Banknote'
    });
  }

  // Scheme 6: Green / ESG Zero-Liquid Discharge Incentive
  if (pollutionCategory === 'Green' || pollutionCategory === 'White') {
    schemes.push({
      id: 'sch-green-bonus',
      name: 'Maharashtra Green Enterprise Promotion Incentive',
      department: 'Environment & Climate Change Department',
      category: 'Sustainability Grant',
      benefitValue: 'Up to ₹ 50 Lakhs Grant (50% cost of Effluent Recycling / Solar Rooftop)',
      estimatedBenefitAmount: '₹ 50.0 Lakhs Max Grant',
      eligibilitySummary: 'Incentive for adopting zero-liquid discharge, water harvesting, and ISO 14001 environmental sustainability standards.',
      tags: ['Green / ESG', 'Solar & Clean Tech'],
      icon: 'Leaf'
    });
  }

  // Scheme 7: EV / High-Tech Pioneer Bonus
  if (sector.toLowerCase().includes('electric') || sector.toLowerCase().includes('electronics')) {
    schemes.push({
      id: 'sch-ev-policy',
      name: 'Maharashtra EV Policy 2025 - Pioneer Manufacturer Benefit',
      department: 'Industries, Energy and Labour Department',
      category: 'Sector Special',
      benefitValue: '15% Additional Capital Grant + 100% Road Tax Waiver for Vehicles',
      estimatedBenefitAmount: `Up to ₹ ${(inv * 0.15).toFixed(2)} Crores`,
      eligibilitySummary: 'Special incentives for EV component makers, battery pack assemblers, and charging hardware manufacturing in Maharashtra.',
      tags: ['EV Mission', 'Clean Mobility'],
      icon: 'Sparkles'
    });
  }

  return schemes;
}

export function generateRenewalsCalendar({ pollutionCategory, hasBoiler, employment }) {
  const renewals = [
    {
      id: 'ren-fire',
      name: 'Annual Fire Safety Audit & Form B Submission',
      department: 'Maharashtra Fire Services',
      frequency: 'Annual',
      penaltyGracePeriodDays: 30,
      description: 'Submission of Form B signed by licensed fire engineer certifying operational readiness of hydrants, sensors, and pumps.'
    },
    {
      id: 'ren-dish-lic',
      name: 'Factory Operating License Renewal',
      department: 'Directorate of Industrial Safety & Health (DISH)',
      frequency: 'Every 3 Years (or 1 Year)',
      penaltyGracePeriodDays: 45,
      description: 'Renewal of license under Section 6 of Factories Act 1948 based on updated employee roster and safety records.'
    }
  ];

  if (pollutionCategory !== 'White') {
    renewals.push({
      id: 'ren-mpcb-cto',
      name: 'MPCB Consent to Operate (CTO) Renewal',
      department: 'Maharashtra Pollution Control Board (MPCB)',
      frequency: pollutionCategory === 'Red' ? 'Every 5 Years' : 'Every 10 Years',
      penaltyGracePeriodDays: 60,
      description: 'Comprehensive review of stack emissions, hazardous waste manifest, and water balance compliance.'
    });
  }

  if (hasBoiler) {
    renewals.push({
      id: 'ren-boiler',
      name: 'Boiler Annual Hydraulic Inspection & Fitness Certificate',
      department: 'Directorate of Steam Boilers',
      frequency: 'Annual',
      penaltyGracePeriodDays: 15,
      description: 'Physical hydraulic pressure test by Boiler Inspector to detect wall fatigue or corrosion.'
    });
  }

  return renewals;
}

export function generateCisInspectionMatrix({ pollutionCategory, hasChemicals, hasBoiler, employment }) {
  // Maharashtra Central Inspection System (CIS) synchronizes inspections across MPCB, DISH, and Fire Dept
  const isHighRisk = pollutionCategory === 'Red' || hasChemicals;
  const isMediumRisk = pollutionCategory === 'Orange' || hasBoiler || employment > 150;

  return {
    riskTier: isHighRisk ? 'High Risk' : (isMediumRisk ? 'Medium Risk' : 'Low Risk'),
    inspectionType: 'Synchronized Joint Inspection (CIS)',
    participatingDepartments: [
      'Maharashtra Pollution Control Board (MPCB)',
      'Directorate of Industrial Safety & Health (DISH)',
      'Maharashtra Fire Services (MFS)',
      ...(hasBoiler ? ['Directorate of Steam Boilers'] : [])
    ],
    frequency: isHighRisk ? 'Every 6 Months' : (isMediumRisk ? 'Once a Year' : 'Random Sampled (Once in 3 Years)'),
    slaReportUploadHours: 48,
    inspectionNoticeRequirement: 'Automated 72-hour computerized advance notice to unit management',
    keyFocusAreas: [
      'Industrial effluent treatment plant (ETP/STP) live effluent sample collection',
      'Air scrubbers and chimney emission online monitoring linkage (OCEMS)',
      'Machine guarding, emergency stop buttons, PPE compliance on shop floor',
      'Pressurized fire hydrant water head and smoke sensor response test',
      'First-aid center, crèche, and certified occupational medical records'
    ]
  };
}
