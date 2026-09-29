import express from 'express';
import cors from 'cors';
import { evaluateApprovals } from './engine/rulesEngine.js';
import {
  INITIAL_DEPARTMENTS,
  INITIAL_OFFICERS,
  INITIAL_APPLICATIONS,
  INITIAL_RENEWALS,
  INITIAL_GRIEVANCES,
  INITIAL_ADMIN_RULES
} from './data/initialData.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));

// In-Memory Data Store (Mutable state with seeded data)
let departments = [...INITIAL_DEPARTMENTS];
let officers = [...INITIAL_OFFICERS];
let applications = [...INITIAL_APPLICATIONS];
let renewals = [...INITIAL_RENEWALS];
let grievances = [...INITIAL_GRIEVANCES];
let adminRules = { ...INITIAL_ADMIN_RULES };

// -------------------------------------------------------------
// HEALTH CHECK
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'MahaUdyam – Unified Industrial Approval & Compliance Platform',
    version: '2.4.0',
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------
// INTELLIGENT APPROVAL ENGINE: EVALUATE ROADMAP
// -------------------------------------------------------------
app.post('/api/onboarding/evaluate', (req, res) => {
  try {
    const projectData = req.body;
    const roadmap = evaluateApprovals(projectData);
    res.json({
      success: true,
      data: roadmap
    });
  } catch (error) {
    console.error('Error evaluating roadmap:', error);
    res.status(500).json({ success: false, message: 'Failed to evaluate approvals roadmap', error: error.message });
  }
});

// -------------------------------------------------------------
// APPLICATIONS API
// -------------------------------------------------------------
// 1. Get all applications with optional query filters
app.get('/api/applications', (req, res) => {
  const { dept, status, search, district } = req.query;
  let filtered = [...applications];

  if (dept) {
    filtered = filtered.filter(app => app.assignedDept === dept || app.assignedDept?.toLowerCase() === dept.toLowerCase());
  }
  if (status) {
    filtered = filtered.filter(app => app.status.toLowerCase() === status.toLowerCase());
  }
  if (district) {
    filtered = filtered.filter(app => app.district.toLowerCase() === district.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(app =>
      app.id.toLowerCase().includes(q) ||
      app.businessName.toLowerCase().includes(q) ||
      app.entrepreneurName.toLowerCase().includes(q) ||
      app.sector.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

// 2. Get single application by ID
app.get('/api/applications/:id', (req, res) => {
  const app = applications.find(a => a.id.toLowerCase() === req.params.id.toLowerCase());
  if (!app) {
    return res.status(404).json({ success: false, message: `Application ${req.params.id} not found.` });
  }
  res.json({ success: true, data: app });
});

// 3. Submit new application (from Entrepreneur Wizard)
app.post('/api/applications', (req, res) => {
  try {
    const body = req.body;
    const serial = Math.floor(1000 + Math.random() * 9000);
    const newId = `MH-2026-IND-${serial}`;

    // Run rules engine to attach dynamic approvals and schemes
    const evaluation = evaluateApprovals(body);

    const newApplication = {
      id: newId,
      businessName: body.businessName || 'Industrial Unit',
      entrepreneurName: body.entrepreneurName || 'Promoter',
      email: body.email || 'applicant@mah-enterprises.gov.in',
      phone: body.phone || '+91 98000 00000',
      businessType: body.businessType || 'Private Limited Company',
      udyamNumber: body.udyamNumber || `UDYAM-MH-${Math.floor(10 + Math.random() * 89)}-${Math.floor(100000 + Math.random() * 899999)}`,
      sector: body.sector || 'Automobile & Electric Vehicles',
      pollutionCategory: body.pollutionCategory || 'Orange',
      productDescription: body.productDescription || 'Industrial production & assembly',
      manufacturingType: body.manufacturingType || 'Manufacturing',
      district: body.district || 'Pune',
      location: body.location || `${body.district} Industrial Zone`,
      isMidc: body.isMidc !== undefined ? Boolean(body.isMidc) : true,
      investmentCr: parseFloat(body.investmentCr) || 10,
      landAreaSqM: parseFloat(body.landAreaSqM) || 10000,
      employment: parseInt(body.employment) || 50,
      powerKva: parseFloat(body.powerKva) || 300,
      waterMld: parseFloat(body.waterMld) || 0.2,
      hasBoiler: Boolean(body.hasBoiler),
      hasChemicals: Boolean(body.hasChemicals),
      isWomenLed: Boolean(body.isWomenLed),
      status: 'Under Scrutiny',
      submittedAt: new Date().toISOString(),
      slaRemainingDays: evaluation.summary.fastTrackEligible ? 14 : 21,
      statutorySlaTotalDays: 21,
      assignedDept: body.isMidc ? 'MIDC' : 'REV',
      assignedOfficer: body.isMidc ? 'Smt. Priya Patil' : 'Shri Vikram Shinde',
      documents: body.documents || [
        {
          id: `doc-${Date.now()}-1`,
          title: 'Detailed Project Report (DPR)',
          category: 'Business & Financial',
          fileName: 'DPR_Executive_Summary.pdf',
          fileSize: '3.8 MB',
          uploadedAt: new Date().toISOString(),
          validationStatus: 'Passed',
          validationScore: 97,
          aiRemarks: 'Comprehensive feasibility plan and capital expenditure schedule validated.'
        },
        {
          id: `doc-${Date.now()}-2`,
          title: 'Proof of Business Registration',
          category: 'Legal',
          fileName: 'ROC_COI_Certificate.pdf',
          fileSize: '1.2 MB',
          uploadedAt: new Date().toISOString(),
          validationStatus: 'Passed',
          validationScore: 99,
          aiRemarks: 'MCA21 incorporation seal and corporate identification number verified.'
        }
      ],
      queries: [],
      inspections: [],
      evaluationSummary: evaluation.summary,
      approvalsRoadmap: evaluation.approvals,
      eligibleSchemes: evaluation.eligibleSchemes.map(s => ({
        id: s.id,
        name: s.name,
        amount: s.estimatedBenefitAmount,
        status: 'Eligible - Ready to Claim'
      }))
    };

    applications.unshift(newApplication);

    res.status(201).json({
      success: true,
      message: 'Application registered and dispatched to respective departments under RTS Act.',
      data: newApplication
    });
  } catch (error) {
    console.error('Failed to submit application:', error);
    res.status(500).json({ success: false, message: 'Submission failed', error: error.message });
  }
});

// 4. Update Application Status (Approve / Reject / Assign)
app.patch('/api/applications/:id/status', (req, res) => {
  const appIndex = applications.findIndex(a => a.id.toLowerCase() === req.params.id.toLowerCase());
  if (appIndex === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const { status, remarks, officerName, approvalLetterNumber } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required' });
  }

  applications[appIndex].status = status;
  applications[appIndex].lastAction = {
    action: status,
    timestamp: new Date().toISOString(),
    remarks: remarks || `Status transitioned to ${status}`,
    officer: officerName || 'Departmental Officer',
    approvalLetterNumber: approvalLetterNumber || (status === 'Approved' ? `MAH/IND/NOC/${Date.now().toString().slice(-6)}` : null)
  };

  if (status === 'Approved') {
    applications[appIndex].slaRemainingDays = 0;
  }

  res.json({
    success: true,
    message: `Application status updated to ${status}`,
    data: applications[appIndex]
  });
});

// 5. Upload Document with AI Pre-Validation Simulation
app.post('/api/applications/:id/documents', (req, res) => {
  const appIndex = applications.findIndex(a => a.id.toLowerCase() === req.params.id.toLowerCase());
  if (appIndex === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const { title, category, fileName, fileSize = '2.4 MB' } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Document title is required' });
  }

  // AI Pre-Validation Simulation Logic
  const score = Math.floor(94 + Math.random() * 6);
  const isValidFormat = fileName ? (fileName.endsWith('.pdf') || fileName.endsWith('.dwg') || fileName.endsWith('.jpg')) : true;

  const newDoc = {
    id: `doc-${Date.now()}`,
    title,
    category: category || 'Statutory Compliance',
    fileName: fileName || `${title.replace(/\s+/g, '_')}.pdf`,
    fileSize,
    uploadedAt: new Date().toISOString(),
    validationStatus: isValidFormat ? 'Passed' : 'Warning',
    validationScore: isValidFormat ? score : 68,
    aiRemarks: isValidFormat
      ? `AI Pre-Validation Passed (Score: ${score}%). Signatory stamp and statutory format verified. Zero discrepancies found.`
      : 'File format requires verification. Recommend high-resolution PDF with digital signature.'
  };

  if (!applications[appIndex].documents) {
    applications[appIndex].documents = [];
  }
  applications[appIndex].documents.push(newDoc);

  res.status(201).json({
    success: true,
    message: 'Document uploaded and pre-validated successfully.',
    data: newDoc
  });
});

// 6. Officer Raises Query (Freezes SLA timer under RTS Act)
app.post('/api/applications/:id/queries', (req, res) => {
  const appIndex = applications.findIndex(a => a.id.toLowerCase() === req.params.id.toLowerCase());
  if (appIndex === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const { question, department, officerName } = req.body;
  if (!question) {
    return res.status(400).json({ success: false, message: 'Query description is required' });
  }

  const newQuery = {
    id: `qry-${Date.now()}`,
    fromDepartment: department || applications[appIndex].assignedDept || 'Department Scrutiny Cell',
    officerName: officerName || applications[appIndex].assignedOfficer || 'Scrutiny Officer',
    question,
    status: 'Awaiting Entrepreneur Response',
    raisedAt: new Date().toISOString(),
    slaFreezeActive: true,
    reply: null
  };

  if (!applications[appIndex].queries) {
    applications[appIndex].queries = [];
  }
  applications[appIndex].queries.push(newQuery);
  applications[appIndex].status = 'Query Raised';

  res.status(201).json({
    success: true,
    message: 'Formal query dispatched to applicant. Statutory RTS SLA clock paused.',
    data: newQuery
  });
});

// 7. Entrepreneur Replies to Query (Unfreezes SLA)
app.post('/api/applications/:id/queries/:queryId/reply', (req, res) => {
  const appIndex = applications.findIndex(a => a.id.toLowerCase() === req.params.id.toLowerCase());
  if (appIndex === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const appItem = applications[appIndex];
  const queryIndex = (appItem.queries || []).findIndex(q => q.id === req.params.queryId);
  if (queryIndex === -1) {
    return res.status(404).json({ success: false, message: 'Query not found' });
  }

  const { replyText, attachedDoc } = req.body;
  if (!replyText) {
    return res.status(400).json({ success: false, message: 'Reply text is required' });
  }

  appItem.queries[queryIndex].status = 'Resolved';
  appItem.queries[queryIndex].slaFreezeActive = false;
  appItem.queries[queryIndex].reply = {
    replyText,
    attachedDoc: attachedDoc || null,
    repliedAt: new Date().toISOString()
  };

  // If no other queries pending, return to Under Scrutiny
  const hasPendingQueries = appItem.queries.some(q => q.status === 'Awaiting Entrepreneur Response');
  if (!hasPendingQueries) {
    appItem.status = 'Under Scrutiny';
  }

  res.json({
    success: true,
    message: 'Response recorded. Officer notified and RTS SLA timer resumed.',
    data: appItem.queries[queryIndex]
  });
});

// -------------------------------------------------------------
// CENTRAL INSPECTION SYSTEM (CIS) API
// -------------------------------------------------------------
app.get('/api/inspections', (req, res) => {
  const allInspections = [];
  applications.forEach(a => {
    (a.inspections || []).forEach(insp => {
      allInspections.push({
        ...insp,
        applicationId: a.id,
        businessName: a.businessName,
        district: a.district,
        sector: a.sector
      });
    });
  });
  res.json({ success: true, count: allInspections.length, data: allInspections });
});

app.post('/api/inspections', (req, res) => {
  const { applicationId, scheduledDate, leadOfficer, teamMembers, focusChecklist } = req.body;
  const appIndex = applications.findIndex(a => a.id.toLowerCase() === applicationId?.toLowerCase());
  if (appIndex === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const newInspection = {
    id: `insp-${Date.now()}`,
    type: 'Synchronized Joint Inspection (CIS)',
    scheduledDate: scheduledDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    leadOfficer: leadOfficer || 'Joint Inspection Cell Leader',
    teamMembers: teamMembers || [
      'MPCB Regional Officer',
      'DISH Safety Officer',
      'Maharashtra Fire Services Inspector'
    ],
    status: 'Upcoming',
    focusChecklist: focusChecklist || [
      'Site boundary and setback measurement against approved layout',
      'ETP/STP connection readiness and zero liquid discharge setup',
      'Fire pump house hydraulic pressure and emergency exit corridors'
    ]
  };

  if (!applications[appIndex].inspections) {
    applications[appIndex].inspections = [];
  }
  applications[appIndex].inspections.push(newInspection);
  applications[appIndex].status = 'Inspection Scheduled';

  res.status(201).json({
    success: true,
    message: 'Joint inspection scheduled under Central Inspection System (CIS). 72h notice dispatched.',
    data: newInspection
  });
});

app.patch('/api/inspections/:id', (req, res) => {
  let found = false;
  let updatedInspection = null;

  applications.forEach(a => {
    (a.inspections || []).forEach(insp => {
      if (insp.id === req.params.id) {
        found = true;
        insp.status = req.body.status || 'Completed - Satisfactory';
        insp.reportNotes = req.body.reportNotes || 'Inspection concluded with satisfactory compliance scores.';
        insp.completedAt = new Date().toISOString();
        updatedInspection = insp;
      }
    });
  });

  if (!found) {
    return res.status(404).json({ success: false, message: 'Inspection record not found' });
  }

  res.json({ success: true, message: 'Inspection report updated', data: updatedInspection });
});

// -------------------------------------------------------------
// COMPLIANCE & STATUTORY RENEWALS API
// -------------------------------------------------------------
app.get('/api/renewals', (req, res) => {
  res.json({ success: true, count: renewals.length, data: renewals });
});

app.post('/api/renewals/:id/renew', (req, res) => {
  const index = renewals.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Renewal record not found' });
  }

  renewals[index].status = 'Renewal Filed & Under Verification';
  renewals[index].lastRenewalDate = new Date().toISOString().split('T')[0];
  renewals[index].daysRemaining = 365;

  res.json({
    success: true,
    message: 'Renewal application filed successfully under simplified paperless mode.',
    data: renewals[index]
  });
});

// -------------------------------------------------------------
// GRIEVANCES & SLA ESCALATION API
// -------------------------------------------------------------
app.get('/api/grievances', (req, res) => {
  res.json({ success: true, count: grievances.length, data: grievances });
});

app.post('/api/grievances', (req, res) => {
  const { title, applicationId, applicantName, businessName, department, category, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'Title and description are required' });
  }

  const newGrievance = {
    id: `GRV-2026-${Math.floor(100 + Math.random() * 900)}`,
    applicationId: applicationId || 'N/A',
    title,
    applicantName: applicantName || 'Entrepreneur',
    businessName: businessName || 'Industrial Unit',
    department: department || 'General Single Window Cell',
    category: category || 'RTS SLA Breach',
    filedAt: new Date().toISOString(),
    status: 'Assigned to Appellate Authority (Collector)',
    rtsBreachedDays: 2,
    description,
    resolutionNotes: 'Complaint logged. Auto-escalated to District Single Window Monitoring Committee.'
  };

  grievances.unshift(newGrievance);

  res.status(201).json({
    success: true,
    message: 'Grievance lodged successfully. Tracking token generated with 48-hour resolution SLA.',
    data: newGrievance
  });
});

app.patch('/api/grievances/:id/resolve', (req, res) => {
  const index = grievances.findIndex(g => g.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Grievance record not found' });
  }

  const { resolutionNotes } = req.body;
  grievances[index].status = 'Resolved';
  grievances[index].resolvedAt = new Date().toISOString();
  grievances[index].resolutionNotes = resolutionNotes || 'Issue redressed by Appellate Authority.';

  res.json({
    success: true,
    message: 'Grievance resolved and archived',
    data: grievances[index]
  });
});

// -------------------------------------------------------------
// DEPARTMENTS & OFFICERS API
// -------------------------------------------------------------
app.get('/api/departments', (req, res) => {
  res.json({ success: true, count: departments.length, data: departments });
});

app.get('/api/officers', (req, res) => {
  res.json({ success: true, count: officers.length, data: officers });
});

// -------------------------------------------------------------
// ADMIN RULES & SLA CONFIGURATION API
// -------------------------------------------------------------
app.get('/api/admin/rules', (req, res) => {
  res.json({ success: true, data: adminRules });
});

app.patch('/api/admin/rules', (req, res) => {
  adminRules = {
    ...adminRules,
    ...req.body
  };
  res.json({ success: true, message: 'SLA and regulatory parameters updated successfully', data: adminRules });
});

// -------------------------------------------------------------
// ANALYTICS & BOTTLENECK RADAR API
// -------------------------------------------------------------
app.get('/api/analytics', (req, res) => {
  const totalInvestmentCr = applications.reduce((sum, a) => sum + (parseFloat(a.investmentCr) || 0), 0);
  const totalJobs = applications.reduce((sum, a) => sum + (parseInt(a.employment) || 0), 0);
  const totalApplications = applications.length;
  const approvedCount = applications.filter(a => a.status === 'Approved').length;
  const pendingCount = applications.filter(a => a.status === 'Under Scrutiny' || a.status === 'Inspection Scheduled').length;
  const queryCount = applications.filter(a => a.status === 'Query Raised').length;

  // Departmental Bottleneck breakdown
  const departmentBottlenecks = departments.map(d => {
    const deptApps = applications.filter(a => a.assignedDept === d.code);
    const overdueCount = deptApps.filter(a => a.slaRemainingDays <= 2 && a.status !== 'Approved').length;
    const bottleneckIndex = Math.min(100, Math.round((d.avgClearanceDays / d.slaTargetDays) * 85 + (overdueCount * 4)));

    return {
      department: d.name,
      code: d.code,
      activeLoad: d.activeApplications,
      avgClearanceDays: d.avgClearanceDays,
      slaTargetDays: d.slaTargetDays,
      rtsCompliancePct: d.rtsCompliancePct,
      overdueCount,
      bottleneckIndex, // > 80 is warning, > 90 is critical
      status: bottleneckIndex > 90 ? 'Critical Backlog' : (bottleneckIndex > 80 ? 'Moderate Delay' : 'Optimal Flow')
    };
  });

  // District Wise Investment Distribution
  const districtStats = {};
  applications.forEach(a => {
    if (!districtStats[a.district]) {
      districtStats[a.district] = { count: 0, investmentCr: 0, jobs: 0 };
    }
    districtStats[a.district].count += 1;
    districtStats[a.district].investmentCr += (parseFloat(a.investmentCr) || 0);
    districtStats[a.district].jobs += (parseInt(a.employment) || 0);
  });

  res.json({
    success: true,
    data: {
      kpis: {
        totalInvestmentCr: (totalInvestmentCr + 48200).toFixed(1), // Base historical + live
        totalJobs: totalJobs + 184000,
        totalApplications: totalApplications + 14200,
        rtsCompliancePct: 98.4,
        avgApprovalDays: 14.2,
        approvedCount,
        pendingCount,
        queryCount
      },
      departmentBottlenecks,
      districtStats
    }
  });
});

// Serve static client bundle if built
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`[MahaUdyam Backend] Server active on port ${PORT}`);
  console.log(`[MahaUdyam Backend] API Base: http://localhost:${PORT}/api`);
});

