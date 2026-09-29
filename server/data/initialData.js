// Pre-seeded Realistic Industrial Data for Maharashtra MahaUdyam Platform
import { evaluateApprovals } from '../engine/rulesEngine.js';

export const INITIAL_DEPARTMENTS = [
  {
    id: 'dept-mpcb',
    code: 'MPCB',
    name: 'Maharashtra Pollution Control Board',
    minister: 'Environment & Climate Change Department',
    headquarters: 'Kalpataru Point, Sion Circle, Mumbai',
    officerCount: 42,
    activeApplications: 148,
    avgClearanceDays: 24,
    slaTargetDays: 30,
    rtsCompliancePct: 96.2,
    icon: 'Leaf'
  },
  {
    id: 'dept-midc',
    code: 'MIDC',
    name: 'Maharashtra Industrial Development Corporation',
    minister: 'Industries Department, Govt of Maharashtra',
    headquarters: 'Udyog Bhavan, Ballard Estate, Mumbai',
    officerCount: 68,
    activeApplications: 215,
    avgClearanceDays: 14,
    slaTargetDays: 21,
    rtsCompliancePct: 98.7,
    icon: 'Building2'
  },
  {
    id: 'dept-dish',
    code: 'DISH',
    name: 'Directorate of Industrial Safety & Health',
    minister: 'Labour Department, Govt of Maharashtra',
    headquarters: 'Kamgar Bhavan, Bandra-Kurla Complex, Mumbai',
    officerCount: 35,
    activeApplications: 89,
    avgClearanceDays: 18,
    slaTargetDays: 20,
    rtsCompliancePct: 94.8,
    icon: 'ShieldAlert'
  },
  {
    id: 'dept-fire',
    code: 'FIRE',
    name: 'Maharashtra Fire Services',
    minister: 'Urban Development Department',
    headquarters: 'State Fire Academy, Kalina, Santacruz, Mumbai',
    officerCount: 29,
    activeApplications: 112,
    avgClearanceDays: 13,
    slaTargetDays: 14,
    rtsCompliancePct: 97.4,
    icon: 'Flame'
  },
  {
    id: 'dept-msedcl',
    code: 'MSEDCL',
    name: 'Maharashtra State Electricity Distribution Co. Ltd',
    minister: 'Energy Department, Govt of Maharashtra',
    headquarters: 'Prakashgad, Bandra East, Mumbai',
    officerCount: 52,
    activeApplications: 176,
    avgClearanceDays: 11,
    slaTargetDays: 15,
    rtsCompliancePct: 99.1,
    icon: 'Zap'
  },
  {
    id: 'dept-fda',
    code: 'FDA',
    name: 'Food & Drugs Administration (FDA) Maharashtra',
    minister: 'Medical Education & Drugs Department',
    headquarters: 'Survey No. 341, Bandra Kurla Complex, Mumbai',
    officerCount: 24,
    activeApplications: 64,
    avgClearanceDays: 22,
    slaTargetDays: 30,
    rtsCompliancePct: 95.0,
    icon: 'Utensils'
  }
];

export const INITIAL_OFFICERS = [
  {
    id: 'off-1',
    name: 'Dr. Rajesh Deshmukh, IAS',
    role: 'Regional Scrutiny Officer',
    department: 'Maharashtra Pollution Control Board',
    deptCode: 'MPCB',
    email: 'rajesh.deshmukh@mpcb.gov.in',
    region: 'Pune & Chakan Industrial Zone',
    avatar: 'RD'
  },
  {
    id: 'off-2',
    name: 'Smt. Priya Patil',
    role: 'Executive Engineer (Town Planning)',
    department: 'Maharashtra Industrial Development Corporation (MIDC)',
    deptCode: 'MIDC',
    email: 'priya.patil@midcindia.org',
    region: 'Thane & Raigad Industrial Belt',
    avatar: 'PP'
  },
  {
    id: 'off-3',
    name: 'Shri Vikram Shinde',
    role: 'Joint Director of Industrial Safety',
    department: 'Directorate of Industrial Safety & Health (DISH)',
    deptCode: 'DISH',
    email: 'vikram.shinde@maharashtra.gov.in',
    region: 'Nashik & Chhatrapati Sambhajinagar',
    avatar: 'VS'
  },
  {
    id: 'off-4',
    name: 'Chief Fire Officer Anand Kulkarni',
    role: 'Divisional Fire Officer & Safety Auditor',
    department: 'Maharashtra Fire Services',
    deptCode: 'FIRE',
    email: 'anand.kulkarni@fireservices.mah.gov.in',
    region: 'Nagpur & Vidarbha Division',
    avatar: 'AK'
  }
];

// Pre-seeded Applications representing realistic Maharashtra cases
export const INITIAL_APPLICATIONS = [
  {
    id: 'MH-2026-IND-9421',
    businessName: 'Sahyadri Electric Mobility Solutions Pvt Ltd',
    entrepreneurName: 'Nitin V. Suryavanshi',
    email: 'nitin@sahyadrimobility.com',
    phone: '+91 98220 14892',
    businessType: 'Private Limited Company',
    udyamNumber: 'UDYAM-MH-26-0049120',
    sector: 'Automobile & Electric Vehicles',
    pollutionCategory: 'Orange',
    productDescription: 'Electric two-wheeler and three-wheeler powertrain components & lithium battery packs',
    manufacturingType: 'Advanced Manufacturing & Assembly',
    district: 'Pune',
    location: 'Chakan Industrial Area, Phase II, MIDC Plot A-42',
    isMidc: true,
    investmentCr: 48.5,
    landAreaSqM: 18500,
    employment: 240,
    powerKva: 750,
    waterMld: 0.15,
    hasBoiler: false,
    hasChemicals: false,
    isWomenLed: false,
    status: 'Under Scrutiny',
    submittedAt: '2026-09-24T10:15:00Z',
    slaRemainingDays: 14,
    statutorySlaTotalDays: 21,
    assignedDept: 'MIDC',
    assignedOfficer: 'Smt. Priya Patil',
    documents: [
      {
        id: 'doc-1',
        title: 'Detailed Project Report (DPR)',
        category: 'Business & Financial',
        fileName: 'DPR_Sahyadri_Mobility_v2.pdf',
        fileSize: '4.2 MB',
        uploadedAt: '2026-09-24T10:20:00Z',
        validationStatus: 'Passed',
        validationScore: 98,
        aiRemarks: 'All financial ratios verified. Promoter equity exceeds 30%. Zonal layout verified against MIDC DCR.'
      },
      {
        id: 'doc-2',
        title: 'Certificate of Incorporation (ROC)',
        category: 'Legal',
        fileName: 'ROC_CIN_Sahyadri_Pvt_Ltd.pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2026-09-24T10:21:00Z',
        validationStatus: 'Passed',
        validationScore: 99,
        aiRemarks: 'MCA21 Database sync verified. Active company status in Maharashtra ROC.'
      },
      {
        id: 'doc-3',
        title: 'Architectural Blueprint & Layout',
        category: 'Engineering',
        fileName: 'Chakan_Plot_A42_Architectural_Drawings.pdf',
        fileSize: '14.8 MB',
        uploadedAt: '2026-09-24T10:25:00Z',
        validationStatus: 'Passed',
        validationScore: 94,
        aiRemarks: 'Front setback 12m, side margins 6m verified. Internal truck turnaround radius compliant.'
      }
    ],
    queries: [
      {
        id: 'qry-1',
        fromDepartment: 'MIDC Engineering & Town Planning Division',
        officerName: 'Smt. Priya Patil',
        question: 'Please submit the revised solar rooftop installation declaration as mandated under Maharashtra Green Industrial Guidelines for plots > 10,000 sq.m.',
        status: 'Awaiting Entrepreneur Response',
        raisedAt: '2026-09-26T14:30:00Z',
        slaFreezeActive: true,
        reply: null
      }
    ],
    inspections: [],
    eligibleSchemes: [
      {
        id: 'sch-psi-capital',
        name: 'Maharashtra Package Scheme of Incentives (PSI 2019/2024)',
        amount: '₹ 9.70 Crores',
        status: 'Pre-Approved Eligibility'
      },
      {
        id: 'sch-stamp-duty',
        name: '100% Industrial Stamp Duty Exemption',
        amount: '₹ 1.45 Crores saved',
        status: 'Ready for Issuance'
      }
    ]
  },
  {
    id: 'MH-2026-IND-8812',
    businessName: 'Konkan Bio-Pharmaceuticals & Active Ingredients',
    entrepreneurName: 'Dr. Sunita K. Ranade',
    email: 'sunita.ranade@konkanbiopharm.in',
    phone: '+91 97631 88921',
    businessType: 'Private Limited Company',
    udyamNumber: 'UDYAM-MH-19-0012984',
    sector: 'Pharmaceuticals & Chemicals',
    pollutionCategory: 'Red',
    productDescription: 'API synthesis, intermediate bulk pharmaceutical powders, sterile formulation',
    manufacturingType: 'Continuous Chemical Processing',
    district: 'Raigad',
    location: 'Roha Industrial Estate, MIDC Sector 4',
    isMidc: true,
    investmentCr: 85.0,
    landAreaSqM: 32000,
    employment: 310,
    powerKva: 1200,
    waterMld: 1.2,
    hasBoiler: true,
    hasChemicals: true,
    isWomenLed: true,
    status: 'Inspection Scheduled',
    submittedAt: '2026-09-18T09:00:00Z',
    slaRemainingDays: 8,
    statutorySlaTotalDays: 45,
    assignedDept: 'MPCB',
    assignedOfficer: 'Dr. Rajesh Deshmukh, IAS',
    documents: [
      {
        id: 'doc-10',
        title: 'Zero Liquid Discharge (ZLD) Blueprint & ETP Scheme',
        category: 'Environmental',
        fileName: 'ZLD_RO_Evaporator_Specs_Roha.pdf',
        fileSize: '12.4 MB',
        uploadedAt: '2026-09-18T09:12:00Z',
        validationStatus: 'Passed',
        validationScore: 97,
        aiRemarks: 'Multi-Effect Evaporator (MEE) capacity of 500 KLD matches plant mass balance.'
      },
      {
        id: 'doc-11',
        title: 'HAZOP & Quantitative Risk Assessment (QRA)',
        category: 'Industrial Safety',
        fileName: 'HAZOP_Report_KonkanBioPharm.pdf',
        fileSize: '18.1 MB',
        uploadedAt: '2026-09-18T09:15:00Z',
        validationStatus: 'Passed',
        validationScore: 96,
        aiRemarks: 'Solvent recovery loops and fire deluge systems meet OISD-150 standards.'
      }
    ],
    queries: [
      {
        id: 'qry-101',
        fromDepartment: 'Maharashtra Pollution Control Board (MPCB)',
        officerName: 'Dr. Rajesh Deshmukh, IAS',
        question: 'Confirm whether boiler fuel will be biomass briquettes or piped natural gas (PNG) as per Raigad air zone norms.',
        status: 'Resolved',
        raisedAt: '2026-09-20T11:00:00Z',
        slaFreezeActive: false,
        reply: {
          replyText: 'We confirm 100% biomass briquettes sourcing contract with local cooperatives. Agreement copy attached.',
          repliedAt: '2026-09-21T16:20:00Z',
          attachedDoc: 'Biomass_Fuel_Supply_Agreement_Raigad.pdf'
        }
      }
    ],
    inspections: [
      {
        id: 'insp-101',
        type: 'Synchronized Joint Inspection (CIS)',
        scheduledDate: '2026-10-04',
        leadOfficer: 'Dr. Rajesh Deshmukh, IAS (MPCB)',
        teamMembers: [
          'Dr. Rajesh Deshmukh, Regional Officer (MPCB)',
          'Shri Vikram Shinde, Dy Director (DISH)',
          'Divisional Fire Officer Anand Kulkarni (Fire)'
        ],
        status: 'Upcoming',
        focusChecklist: [
          'ETP equalization tank aeration and secondary clarifier inspection',
          'Boiler stack height (32m) and continuous emission monitoring connection',
          'Emergency cyanide/solvent containment sump and eye-wash showers'
        ]
      }
    ],
    eligibleSchemes: [
      {
        id: 'sch-psi-capital',
        name: 'PSI 2019/2024 Group C + 5% Women Entrepreneur Incentive',
        amount: '₹ 10.00 Crores (Max Cap)',
        status: 'Approved & Sanctioned'
      },
      {
        id: 'sch-sgst-refund',
        name: '100% SGST Reimbursement for 10 Years',
        amount: 'Estimated ₹ 45.0 Crores',
        status: 'Sanction Letter Active'
      }
    ]
  },
  {
    id: 'MH-2026-IND-7319',
    businessName: 'Godavari Agro Fresh & Cold Chain Cluster',
    entrepreneurName: 'Amol R. Thorat',
    email: 'amol.thorat@godavariagro.co.in',
    phone: '+91 94222 39014',
    businessType: 'Partnership Enterprise',
    udyamNumber: 'UDYAM-MH-20-0081239',
    sector: 'Food Processing & Agro-tech',
    pollutionCategory: 'Orange',
    productDescription: 'Individual Quick Freezing (IQF) fruit pulping, grape cold storage & dehydrated onion flakes',
    manufacturingType: 'Agro-Processing & Cold Chain',
    district: 'Nashik',
    location: 'Dindori Food Processing Park, MIDC Plot C-12',
    isMidc: true,
    investmentCr: 16.5,
    landAreaSqM: 12000,
    employment: 180,
    powerKva: 380,
    waterMld: 0.35,
    hasBoiler: false,
    hasChemicals: false,
    isWomenLed: false,
    status: 'Approved',
    submittedAt: '2026-09-08T11:30:00Z',
    slaRemainingDays: 0,
    statutorySlaTotalDays: 20,
    assignedDept: 'FDA',
    assignedOfficer: 'Shri Vikram Shinde',
    documents: [
      {
        id: 'doc-20',
        title: 'FSSAI Food Safety Plan & HACCP Blueprint',
        category: 'Food Safety',
        fileName: 'FSSAI_HACCP_Godavari_Agro.pdf',
        fileSize: '5.6 MB',
        uploadedAt: '2026-09-08T11:40:00Z',
        validationStatus: 'Passed',
        validationScore: 99,
        aiRemarks: 'Pest control barriers, sanitary floor drainage slopes and stainless steel 316 contact surfaces verified.'
      }
    ],
    queries: [],
    inspections: [
      {
        id: 'insp-99',
        type: 'Joint CIS Pre-Operation Clearance',
        scheduledDate: '2026-09-22',
        leadOfficer: 'Joint Inspection Team (MPCB + FDA)',
        teamMembers: ['FDA Food Inspector Patil', 'MPCB Sub-Regional Officer Shinde'],
        status: 'Completed - Satisfactory',
        reportNotes: 'Refrigerant ammonia sensors operational. Water potability certificate confirmed by NABL lab.'
      }
    ],
    eligibleSchemes: [
      {
        id: 'sch-psi-capital',
        name: 'PSI Group B - Agro-Processing Capital Grant (30%)',
        amount: '₹ 4.95 Crores',
        status: 'Disbursement Phase 1 Cleared'
      }
    ]
  },
  {
    id: 'MH-2026-IND-6105',
    businessName: 'Vidarbha Solar Tech & Silicon Wafer Systems',
    entrepreneurName: 'Prateek S. Agrawal',
    email: 'p.agrawal@vidarbhasolar.in',
    phone: '+91 99231 66100',
    businessType: 'Public Limited Company',
    udyamNumber: 'UDYAM-MH-14-0099412',
    sector: 'Renewable Energy & Green Hydrogen',
    pollutionCategory: 'White',
    productDescription: 'Mono-perc solar photovoltaic panel assembly and clean power micro-inverters',
    manufacturingType: 'Green Tech Assembly',
    district: 'Nagpur',
    location: 'MIHAN SEZ / Butibori Industrial Zone, Nagpur',
    isMidc: true,
    investmentCr: 120.0,
    landAreaSqM: 45000,
    employment: 420,
    powerKva: 900,
    waterMld: 0.1,
    hasBoiler: false,
    hasChemicals: false,
    isWomenLed: false,
    status: 'Approved',
    submittedAt: '2026-09-01T14:00:00Z',
    slaRemainingDays: 0,
    statutorySlaTotalDays: 14,
    assignedDept: 'MIDC',
    assignedOfficer: 'Chief Fire Officer Anand Kulkarni',
    documents: [],
    queries: [],
    inspections: [],
    eligibleSchemes: [
      {
        id: 'sch-psi-capital',
        name: 'Vidarbha Group D Mega Capital Incentive (80%)',
        amount: '₹ 10.00 Crores (Max Cap)',
        status: 'Sanction Letter Active'
      },
      {
        id: 'sch-power-rebate',
        name: 'Vidarbha & Marathwada Power Subsidy (₹ 2.50/unit)',
        amount: '₹ 42.0 Lakhs / yr',
        status: 'Active on MSEDCL Bill'
      }
    ]
  }
];

export const INITIAL_RENEWALS = [
  {
    id: 'ren-101',
    applicationId: 'MH-2026-IND-7319',
    unitName: 'Godavari Agro Fresh & Cold Chain Cluster',
    approvalName: 'Annual Fire Safety Audit (Form B Certification)',
    department: 'Maharashtra Fire Services',
    dueDate: '2026-11-15',
    daysRemaining: 47,
    status: 'Upcoming Safe',
    riskLevel: 'Low',
    lastRenewalDate: '2025-11-15',
    officerContact: 'fire.audit@fireservices.mah.gov.in'
  },
  {
    id: 'ren-102',
    applicationId: 'MH-2026-IND-6105',
    unitName: 'Vidarbha Solar Tech & Silicon Wafer Systems',
    approvalName: 'DISH Factory Operating License Renewal',
    department: 'Directorate of Industrial Safety & Health',
    dueDate: '2026-10-18',
    daysRemaining: 19,
    status: 'Expiring Soon - Action Required',
    riskLevel: 'Medium',
    lastRenewalDate: '2023-10-18',
    officerContact: 'dish.nagpur@maharashtra.gov.in'
  },
  {
    id: 'ren-103',
    applicationId: 'MH-2026-IND-8812',
    unitName: 'Konkan Bio-Pharmaceuticals & Active Ingredients',
    approvalName: 'MPCB Consent to Operate (CTO) Environmental Compliance Renewal',
    department: 'Maharashtra Pollution Control Board',
    dueDate: '2026-10-05',
    daysRemaining: 6,
    status: 'Critical - Overdue Warning (6 Days Left)',
    riskLevel: 'High',
    lastRenewalDate: '2021-10-05',
    officerContact: 'ro.raigad@mpcb.gov.in'
  }
];

export const INITIAL_GRIEVANCES = [
  {
    id: 'GRV-2026-881',
    applicationId: 'MH-2026-IND-9421',
    title: 'Delay in Electrical Inspector Substation Drawing Clearance',
    applicantName: 'Nitin V. Suryavanshi',
    businessName: 'Sahyadri Electric Mobility Solutions Pvt Ltd',
    department: 'MSEDCL / Chief Electrical Inspector',
    category: 'RTS SLA Breach',
    filedAt: '2026-09-25T11:00:00Z',
    status: 'Escalated to District Collector',
    rtsBreachedDays: 4,
    description: 'CEI drawing approval for 750 kVA transformer pending for 19 days against statutory 15 days SLA under Maharashtra RTS Act.',
    resolutionNotes: 'Chief Electrical Inspector notified. Expedited file review scheduled for tomorrow.'
  },
  {
    id: 'GRV-2026-792',
    applicationId: 'MH-2026-IND-8812',
    title: 'Duplicate Document Request by Local Fire Officer',
    applicantName: 'Dr. Sunita K. Ranade',
    businessName: 'Konkan Bio-Pharmaceuticals',
    department: 'Maharashtra Fire Services',
    category: 'Unlawful Document Demand',
    filedAt: '2026-09-21T09:30:00Z',
    status: 'Resolved',
    rtsBreachedDays: 0,
    description: 'Local sub-station demanded physical paper blueprint copy despite digital submission on MahaUdyam.',
    resolutionNotes: 'State Fire Headquarters issued circular enforcing digital scrutiny. Physical paper demand annulled.'
  }
];

export const INITIAL_ADMIN_RULES = {
  rtsDefaultGraceDays: 3,
  strictSlaFreezeOnQuery: true,
  autoEscalationHours: 48,
  highRiskInspectionFrequencyMonths: 6,
  allowFastTrackWhiteCategory: true,
  departmentSlas: {
    'MPCB_CTE_RED': 45,
    'MPCB_CTE_ORANGE': 30,
    'MPCB_CTE_GREEN': 15,
    'MPCB_WHITE': 7,
    'MIDC_LAND': 15,
    'MIDC_BUILDING_PLAN': 21,
    'FIRE_PROVISIONAL': 14,
    'FIRE_FINAL': 14,
    'DISH_FACTORY_PLAN': 20,
    'DISH_FACTORY_LICENSE': 21,
    'MSEDCL_POWER': 15,
    'FDA_FSSAI': 30
  }
};
