import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  FileCheck, 
  Upload, 
  AlertCircle, 
  Calendar, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Award, 
  Eye, 
  FileText, 
  Check, 
  X,
  Zap,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const MAHARASHTRA_DISTRICTS = [
  { name: 'Pune', zone: 'Group A', hub: 'Automobile & IT Hub' },
  { name: 'Thane', zone: 'Group A', hub: 'Heavy Engineering & Logistics' },
  { name: 'Mumbai Suburban', zone: 'Group A', hub: 'Financial & Services' },
  { name: 'Mumbai City', zone: 'Group A', hub: 'Commercial Capital' },
  { name: 'Nashik', zone: 'Group B', hub: 'Defense, Agro & Auto' },
  { name: 'Kolhapur', zone: 'Group B', hub: 'Foundry & Sugar Hub' },
  { name: 'Chhatrapati Sambhajinagar', zone: 'Group B', hub: 'AURIC DMIC Smart City' },
  { name: 'Solapur', zone: 'Group B', hub: 'Textiles & Power Equipment' },
  { name: 'Raigad', zone: 'Group C', hub: 'Chemical, Petrochem & Ports' },
  { name: 'Palghar', zone: 'Group C', hub: 'Plastics, Pharma & Packaging' },
  { name: 'Satara', zone: 'Group C', hub: 'Food Processing & Precision Eng' },
  { name: 'Sangli', zone: 'Group C', hub: 'Turmeric, Raisins & Dairy' },
  { name: 'Ahmednagar', zone: 'Group C', hub: 'Agro Machinery & Electronics' },
  { name: 'Jalgaon', zone: 'Group C', hub: 'PVC Pipes, Pulses & Gold' },
  { name: 'Ratnagiri', zone: 'Group C', hub: 'Fisheries & Marine Processing' },
  { name: 'Nagpur', zone: 'Group D', hub: 'MIHAN Logistics & Green Tech' },
  { name: 'Amravati', zone: 'Group D', hub: 'Textile Mega Park' },
  { name: 'Nanded', zone: 'Group D', hub: 'Seed Tech & Cotton' },
  { name: 'Dhule', zone: 'Group D', hub: 'Renewable Power & Logistics' },
  { name: 'Jalna', zone: 'Group D', hub: 'Steel Rolling Mills & Seeds' },
  { name: 'Latur', zone: 'Group D', hub: 'Soybean & Oil Extraction' },
  { name: 'Chandrapur', zone: 'Group D', hub: 'Cement, Minerals & Paper' },
  { name: 'Gadchiroli', zone: 'Group D+', hub: 'Tribal Mining & Metallurgy' },
  { name: 'Gondia', zone: 'Group D+', hub: 'Rice Processing Cluster' },
  { name: 'Nandurbar', zone: 'Group D+', hub: 'Solar & Wind Corridors' },
  { name: 'Beed', zone: 'Group D+', hub: 'Bio-Fuels & Solar Tech' },
  { name: 'Dharashiv', zone: 'Group D+', hub: 'Wind Energy & Sugar' },
  { name: 'Washim', zone: 'Group D+', hub: 'Agro Storage' },
  { name: 'Yavatmal', zone: 'Group D+', hub: 'Organic Cotton Processing' }
];

const SECTORS = [
  'Automobile & Electric Vehicles',
  'Pharmaceuticals & Chemicals',
  'Food Processing & Agro-tech',
  'Renewable Energy & Green Hydrogen',
  'IT / ITeS / Electronics Hardware',
  'Textiles & Technical Garments',
  'Aerospace & Defense Components',
  'Heavy Engineering & Metallurgy',
  'Logistics & Mega Warehousing'
];

export default function OnboardingWizard({ initialSector, onApplicationSubmitted, onCancel }) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [roadmap, setRoadmap] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState('All');
  const [submitting, setSubmitting] = useState(false);
  const [preValidationModal, setPreValidationModal] = useState(null);
  const [uploadedSimDocs, setUploadedSimDocs] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Business Information
    businessName: '',
    entrepreneurName: '',
    email: '',
    phone: '',
    businessType: 'Private Limited Company',
    udyamNumber: '',

    // Step 2: Industry Details
    sector: initialSector || 'Automobile & Electric Vehicles',
    pollutionCategory: 'Orange',
    productDescription: '',
    manufacturingType: 'Manufacturing & Assembly',

    // Step 3: Project Details
    district: 'Pune',
    location: '',
    isMidc: true,
    investmentCr: 25,
    landAreaSqM: 15000,
    employment: 120,
    projectStage: 'Greenfield New Unit',

    // Step 4: Operational Details
    businessStatus: 'New Enterprise',
    implementationStage: 'Phase 1: Pre-Establishment & Approvals',
    productionCapacity: '15,000 Units / Month',
    powerKva: 450,
    waterMld: 0.25,
    hasBoiler: false,
    hasChemicals: false,
    effluentDischarge: true,
    isWomenLed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      triggerRoadmapGeneration();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const triggerRoadmapGeneration = async () => {
    setIsGenerating(true);
    setGenerationStep(1);

    // Simulated progress steps for wow factor
    const steps = [
      'Classifying CPCB/MPCB environmental parameters...',
      'Mapping MIDC building codes and RTS Act 2015 SLA schedules...',
      'Evaluating Maharashtra Package Scheme of Incentives (PSI 2019/2024)...',
      'Configuring Central Inspection System (CIS) risk matrix...',
      'Synthesizing personalized statutory clearance roadmap...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(i + 1);
      await new Promise(r => setTimeout(r, 450));
    }

    try {
      const response = await fetch('/api/onboarding/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setRoadmap(data.data);
      }
    } catch (err) {
      console.error('Failed to evaluate roadmap via API, fallback to local', err);
    } finally {
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Pre-validate document simulation
  const handlePreValidateDoc = (doc) => {
    setPreValidationModal({
      doc,
      isScanning: true,
      result: null
    });

    setTimeout(() => {
      const score = Math.floor(94 + Math.random() * 6);
      setPreValidationModal(prev => ({
        ...prev,
        isScanning: false,
        result: {
          score,
          status: 'Passed',
          checks: [
            { name: 'Valid PDF/CAD file structure & size', passed: true },
            { name: 'Authorized Signatory Digital Stamp Detected', passed: true },
            { name: 'PAN / Udyam / Survey number match confirmed', passed: true },
            { name: 'Meets RTS Act Scrutiny Standard 2026', passed: true }
          ]
        }
      }));
      setUploadedSimDocs(prev => ({ ...prev, [doc.name]: true }));
    }, 1200);
  };

  // Submit Application
  const handleSubmitApplication = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
        onApplicationSubmitted(data.data);
      }
    } catch (err) {
      console.error('Error submitting application:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // If Road Map has been generated, render the personalized checklist view!
  if (roadmap) {
    const filteredApprovals = selectedPhase === 'All' 
      ? roadmap.approvals 
      : roadmap.approvals.filter(a => a.phase === selectedPhase);

    return (
      <div className="container" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
        {/* Success Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(17, 28, 51, 0.95) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.5rem',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-emerald-glow)'
        }}>
          <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                <span className="badge badge-emerald">
                  <CheckCircle2 size={13} /> Roadmap Generated Successfully
                </span>
                <span className="badge badge-saffron">
                  {formData.district} ({roadmap.summary.districtZone})
                </span>
              </div>
              <h2 style={{ fontSize: '2.1rem', marginBottom: '0.35rem' }}>
                {formData.businessName || 'Your Industrial Enterprise'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                {formData.sector} • {formData.pollutionCategory} Pollution Category • ₹{formData.investmentCr} Cr Investment
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                className="btn btn-secondary" 
                onClick={() => setRoadmap(null)}
              >
                Modify Parameters
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSubmitApplication}
                disabled={submitting}
                style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
              >
                {submitting ? 'Submitting Single Window Application...' : 'Submit Consolidated Application'}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '3rem' }}>
          <div className="card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Statutory Clearances Required</span>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--saffron)', marginTop: '0.2rem' }}>
              {roadmap.summary.totalApprovals} Approvals
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
              Across MPCB, MIDC, DISH, Fire & MSEDCL
            </p>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Concurrent Fast-Track SLA</span>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--emerald)', marginTop: '0.2rem' }}>
              {roadmap.summary.estimatedTimelineDays} Days
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
              Sequential SLA would take {roadmap.summary.sequentialTimelineDays} days
            </p>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Estimated Statutory Fees</span>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--blue)', marginTop: '0.2rem' }}>
              ₹ {(roadmap.summary.totalEstimatedFees).toLocaleString('en-IN')}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
              Transparent govt fees per fee schedule
            </p>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>State Subsidy Eligibility</span>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--gold)', marginTop: '0.2rem' }}>
              {roadmap.eligibleSchemes.length} Schemes
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
              Maharashtra PSI 2019/2024 & Stamp Duty
            </p>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>Personalized Statutory Clearances</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              All clearances are legally governed by the Maharashtra Right to Public Services Act 2015
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Pre-Establishment', 'Construction & Setup', 'Pre-Operation'].map(phase => (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase)}
                className={`btn btn-sm ${selectedPhase === phase ? 'btn-primary' : 'btn-secondary'}`}
              >
                {phase}
              </button>
            ))}
          </div>
        </div>

        {/* Approval Cards List */}
        <div className="flex flex-col gap-4" style={{ marginBottom: '3.5rem' }}>
          {filteredApprovals.map((app, idx) => (
            <div key={app.id} className="card" style={{ padding: '1.5rem' }}>
              <div className="flex items-start justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                    <span className="badge badge-saffron" style={{ fontSize: '0.72rem' }}>{app.deptCode}</span>
                    <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>{app.phase}</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                      <Clock size={12} /> SLA: {app.statutorySlaDays} Days (RTS)
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>{app.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Issuing Authority: <strong style={{ color: 'var(--text-secondary)' }}>{app.department}</strong> • Portal: {app.portal}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {app.description}
                  </p>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Fee:</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>
                      ₹ {app.estimatedFee.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handlePreValidateDoc(app.requiredDocuments[0])}
                    >
                      <Upload size={14} style={{ color: 'var(--saffron)' }} />
                      <span>{uploadedSimDocs[app.requiredDocuments[0]?.name] ? 'Re-Validate Doc' : 'Pre-Validate Doc'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Required Documents Pill Preview */}
              <div style={{
                marginTop: '1.2rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  Mandatory Documents ({app.requiredDocuments.length}):
                </span>
                {app.requiredDocuments.map((doc, dIdx) => (
                  <span 
                    key={dIdx} 
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      background: uploadedSimDocs[doc.name] ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.04)',
                      border: uploadedSimDocs[doc.name] ? '1px solid var(--emerald)' : '1px solid rgba(255,255,255,0.08)',
                      color: uploadedSimDocs[doc.name] ? 'var(--emerald)' : 'var(--text-secondary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    {uploadedSimDocs[doc.name] ? <Check size={12} /> : <FileText size={12} />}
                    {doc.name} ({doc.type})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Matched Government Schemes & Incentives */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
              State Incentives & Subsidies (PSI 2019/2024)
            </span>
            <h3 style={{ fontSize: '1.6rem' }}>Eligible Fiscal Incentives for Your Project</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Calculated based on {formData.district} ({roadmap.summary.districtZone}) development tier and ₹{formData.investmentCr} Cr investment
            </p>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {roadmap.eligibleSchemes.map(sch => (
              <div key={sch.id} className="card" style={{ padding: '1.5rem' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                  <span className="badge badge-emerald">{sch.category}</span>
                  <Award size={18} style={{ color: 'var(--gold)' }} />
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{sch.name}</h4>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                  {sch.estimatedBenefitAmount}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {sch.eligibilitySummary}
                </p>
                <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
                  {sch.tags.map((t, idx) => (
                    <span key={idx} className="badge badge-blue" style={{ fontSize: '0.68rem' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Inspection System (CIS) Synchronized Matrix */}
        <div className="card" style={{ padding: '2rem', background: 'rgba(17, 28, 51, 0.6)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>Central Inspection System (CIS)</span>
              <h3 style={{ fontSize: '1.35rem' }}>Single Synchronized Joint Inspection</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Risk Tier: <strong style={{ color: 'var(--saffron)' }}>{roadmap.cisInspections.riskTier}</strong> • Frequency: {roadmap.cisInspections.frequency}
              </p>
            </div>
            <span className="badge badge-gold" style={{ padding: '0.4rem 0.8rem' }}>
              72h Advance Digital Notice Guaranteed
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
            background: 'rgba(0,0,0,0.2)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Joint Inspecting Authorities</div>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {roadmap.cisInspections.participatingDepartments.map((dept, i) => (
                  <li key={i}>{dept}</li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Key Compliance Audit Checks</div>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {roadmap.cisInspections.keyFocusAreas.slice(0, 3).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Online inspection report upload within {roadmap.cisInspections.slaReportUploadHours} hours with GPS geo-tagged inspection photos.
            </span>
            <button 
              className="btn btn-primary"
              onClick={handleSubmitApplication}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Proceed to Consolidated Submission'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Pre-Validation Modal */}
        {preValidationModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ padding: '2rem' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '1.2rem' }}>
                <div className="flex items-center gap-2">
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(249, 115, 22, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saffron)'
                  }}>
                    <FileCheck size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>AI Document Pre-Validation Engine</h3>
                </div>
                <button 
                  onClick={() => setPreValidationModal(null)}
                  style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scrutinizing Document:</div>
                <div style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-highlight)' }}>
                  {preValidationModal.doc?.name} ({preValidationModal.doc?.type}, Max {preValidationModal.doc?.maxMb}MB)
                </div>
              </div>

              {preValidationModal.isScanning ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                  <div className="animate-pulse-glow" style={{
                    width: '60px',
                    height: '60px',
                    margin: '0 auto 1.5rem auto',
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saffron)'
                  }}>
                    <Sparkles size={30} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Performing OCR & Statutory Compliance Scan...</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Matching document against Maharashtra State Single Window standards...
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--emerald)', fontWeight: '600' }}>Pre-Validation Status</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>100% Passed</div>
                    </div>
                    <div style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--emerald)',
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: '0.9rem'
                    }}>
                      Confidence Score: {preValidationModal.result?.score}%
                    </div>
                  </div>

                  <div className="flex flex-col gap-2" style={{ marginBottom: '1.5rem' }}>
                    {preValidationModal.result?.checks.map((chk, i) => (
                      <div key={i} className="flex items-center gap-2" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--emerald)' }} />
                        <span>{chk.name}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => setPreValidationModal(null)}
                  >
                    Confirm & Attach to Application
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // If calculating animation is active
  if (isGenerating) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', minHeight: '60vh' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <div className="animate-pulse-glow" style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 2rem auto',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 8px 30px rgba(249, 115, 22, 0.4)'
          }}>
            <Sparkles size={40} />
          </div>

          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>
            Generating your personalized approval roadmap…
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2.5rem' }}>
            Rule-based intelligence engine is scrutinizing your project parameters across Maharashtra statutory databases.
          </p>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--bg-card-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            textAlign: 'left'
          }}>
            <div className="flex flex-col gap-3">
              {[
                'Classifying CPCB/MPCB environmental parameters...',
                'Mapping MIDC building codes and RTS Act 2015 SLA schedules...',
                'Evaluating Maharashtra Package Scheme of Incentives (PSI 2019/2024)...',
                'Configuring Central Inspection System (CIS) risk matrix...',
                'Synthesizing personalized statutory clearance roadmap...'
              ].map((txt, idx) => {
                const isDone = generationStep > idx + 1;
                const isCurrent = generationStep === idx + 1;
                return (
                  <div key={idx} className="flex items-center gap-3" style={{ fontSize: '0.9rem' }}>
                    {isDone ? (
                      <CheckCircle2 size={18} style={{ color: 'var(--emerald)' }} />
                    ) : isCurrent ? (
                      <div className="animate-spin" style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid var(--saffron)',
                        borderTopColor: 'transparent',
                        borderRadius: '50%'
                      }} />
                    ) : (
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                    )}
                    <span style={{ color: isDone ? 'var(--text-primary)' : (isCurrent ? 'var(--saffron)' : 'var(--text-muted)') }}>
                      {txt}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Wizard Step Stepper
  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Header and Step Indicators */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <span className="badge badge-saffron" style={{ marginBottom: '0.5rem' }}>
            4-Step Entrepreneur Onboarding Wizard
          </span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
            Configure Your Industrial Project
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Provide basic project parameters to dynamically generate your exact required approvals, timeline, and subsidies.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          marginBottom: '2.5rem'
        }}>
          {[
            { num: 1, label: 'Business Info' },
            { num: 2, label: 'Industry & Sector' },
            { num: 3, label: 'Project Location' },
            { num: 4, label: 'Operational Specs' }
          ].map(s => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div 
                key={s.num} 
                style={{
                  borderTop: isCompleted ? '3px solid var(--emerald)' : (isCurrent ? '3px solid var(--saffron)' : '3px solid rgba(255,255,255,0.1)'),
                  paddingTop: '0.75rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: isCurrent ? 'var(--saffron)' : 'var(--text-muted)', fontWeight: '600' }}>
                  STEP 0{s.num}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: isCurrent ? '#ffffff' : 'var(--text-secondary)' }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <form onSubmit={handleNextStep} className="card" style={{ padding: '2.5rem' }}>
          {/* STEP 1: Business Information */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>Step 1 — Business Information</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                Enter primary enterprise credentials and promoter contact information.
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Proposed Business / Enterprise Name <span style={{ color: 'var(--saffron)' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Sahyadri Mobility & Clean Power Pvt Ltd"
                    required
                  />
                </div>

                <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Entrepreneur / Lead Promoter Name <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <input 
                      type="text"
                      name="entrepreneurName"
                      value={formData.entrepreneurName}
                      onChange={handleChange}
                      placeholder="e.g. Nitin Suryavanshi"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Constitution / Business Type <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <select name="businessType" value={formData.businessType} onChange={handleChange}>
                      <option value="Private Limited Company">Private Limited Company</option>
                      <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                      <option value="Partnership Enterprise">Partnership Enterprise</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="Public Limited Company">Public Limited Company</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Official Email Address <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@sahyadrimobility.com"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Mobile Number (Aadhaar / OTP Linked) <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98220 12345"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Existing Udyam Registration Number (Optional)
                  </label>
                  <input 
                    type="text"
                    name="udyamNumber"
                    value={formData.udyamNumber}
                    onChange={handleChange}
                    placeholder="UDYAM-MH-26-0012345"
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    If not yet registered, MahaUdyam will auto-initiate your MSME registration.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Industry Details */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>Step 2 — Industry & Environmental Category</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                Select industry classification and CPCB/MPCB environmental pollution category.
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Target Industrial Sector <span style={{ color: 'var(--saffron)' }}>*</span>
                  </label>
                  <select name="sector" value={formData.sector} onChange={handleChange}>
                    {SECTORS.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Pollution Category Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.6rem' }}>
                    CPCB / MPCB Pollution Category <span style={{ color: 'var(--saffron)' }}>*</span>
                  </label>
                  <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
                    {[
                      { cat: 'Red', label: 'Red Category', desc: 'Heavy pollution (PI > 60). Requires strict ETP & EIA.', border: 'rgba(244, 63, 94, 0.4)' },
                      { cat: 'Orange', label: 'Orange Category', desc: 'Moderate pollution (PI 41-59). MPCB CTE/CTO mandatory.', border: 'rgba(249, 115, 22, 0.4)' },
                      { cat: 'Green', label: 'Green Category', desc: 'Low pollution (PI 21-40). Fast-track 15-day clearance.', border: 'rgba(16, 185, 129, 0.4)' },
                      { cat: 'White', label: 'White Category', desc: 'Non-polluting (PI < 20). Exempt from consent (intimation only).', border: 'rgba(255, 255, 255, 0.4)' }
                    ].map(item => {
                      const isSelected = formData.pollutionCategory === item.cat;
                      return (
                        <div
                          key={item.cat}
                          onClick={() => setFormData(p => ({ ...p, pollutionCategory: item.cat }))}
                          style={{
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                            border: isSelected ? `2px solid var(--saffron)` : '1px solid var(--bg-card-border)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem' }}>
                            <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{item.label}</span>
                            {isSelected && <CheckCircle2 size={16} style={{ color: 'var(--saffron)' }} />}
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                            {item.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Specific Product / Service Description <span style={{ color: 'var(--saffron)' }}>*</span>
                  </label>
                  <textarea 
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe main raw materials, production process, and finished goods..."
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Manufacturing / Processing Type
                  </label>
                  <select name="manufacturingType" value={formData.manufacturingType} onChange={handleChange}>
                    <option value="Continuous Manufacturing">Continuous Chemical / Bulk Manufacturing</option>
                    <option value="Advanced Manufacturing & Assembly">Discrete Parts Assembly & Precision Machining</option>
                    <option value="Agro-Processing & Cold Chain">Agro Processing, Freezing & Packaging</option>
                    <option value="High-Tech Cleanroom Fabrication">Cleanroom Electronics / Pharma API</option>
                    <option value="Logistics & Warehousing">Storage, Grading & Cold Chain</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Project Details */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>Step 3 — Project Location & Capital Investment</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                Determine district group zoning for Maharashtra Package Scheme of Incentives (PSI).
              </p>

              <div className="flex flex-col gap-4">
                <div className="grid gap-4" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Maharashtra District <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <select name="district" value={formData.district} onChange={handleChange}>
                      {MAHARASHTRA_DISTRICTS.map((d, idx) => (
                        <option key={idx} value={d.name}>{d.name} ({d.zone}) — {d.hub}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Industrial Zone Classification <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <select 
                      name="isMidc" 
                      value={formData.isMidc} 
                      onChange={(e) => setFormData(p => ({ ...p, isMidc: e.target.value === 'true' }))}
                    >
                      <option value="true">Inside MIDC Notified Industrial Area</option>
                      <option value="false">Outside MIDC (Private Land / Non-Agricultural)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Specific Site Location / Plot Address
                  </label>
                  <input 
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. MIDC Chakan Phase II, Plot B-14, Pune"
                  />
                </div>

                <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Total Investment (₹ Crores) <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <input 
                      type="number"
                      name="investmentCr"
                      value={formData.investmentCr}
                      onChange={handleChange}
                      min="0.1"
                      step="0.5"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Land Area (Sq. Meters) <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <input 
                      type="number"
                      name="landAreaSqM"
                      value={formData.landAreaSqM}
                      onChange={handleChange}
                      min="100"
                      step="500"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Expected Direct Employment <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <input 
                      type="number"
                      name="employment"
                      value={formData.employment}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Project Stage
                  </label>
                  <select name="projectStage" value={formData.projectStage} onChange={handleChange}>
                    <option value="Greenfield New Unit">Greenfield (Completely New Industrial Unit)</option>
                    <option value="Brownfield Expansion">Brownfield Expansion of Existing Operational Unit</option>
                    <option value="Modernization & Diversification">Modernization / Product Line Diversification</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Operational Details */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>Step 4 — Operational & Utility Requirements</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                Define power, water, steam boiler, hazardous chemical storage, and promoter incentives.
              </p>

              <div className="flex flex-col gap-4">
                <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Connected Power Load (kVA) <span style={{ color: 'var(--saffron)' }}>*</span>
                    </label>
                    <input 
                      type="number"
                      name="powerKva"
                      value={formData.powerKva}
                      onChange={handleChange}
                      placeholder="e.g. 500"
                      required
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Loads &gt; 500 kVA require Chief Electrical Inspector (CEI) approval.
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                      Water Requirement (MLD - Million Liters/Day)
                    </label>
                    <input 
                      type="number"
                      name="waterMld"
                      value={formData.waterMld}
                      onChange={handleChange}
                      step="0.05"
                      placeholder="e.g. 0.25"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    Expected Annual Production Capacity
                  </label>
                  <input 
                    type="text"
                    name="productionCapacity"
                    value={formData.productionCapacity}
                    onChange={handleChange}
                    placeholder="e.g. 24,000 Metric Tonnes per Annum"
                  />
                </div>

                {/* Special Triggers & Checkboxes */}
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--bg-card-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}>
                  <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '0.9rem' }}>
                    <input 
                      type="checkbox"
                      name="hasBoiler"
                      checked={formData.hasBoiler}
                      onChange={handleChange}
                      style={{ width: 'auto' }}
                    />
                    <span>Unit will install <strong>Industrial Steam Boilers / High Pressure Vessels</strong> (Indian Boilers Act 1923)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '0.9rem' }}>
                    <input 
                      type="checkbox"
                      name="hasChemicals"
                      checked={formData.hasChemicals}
                      onChange={handleChange}
                      style={{ width: 'auto' }}
                    />
                    <span>Unit handles <strong>Solvents, Compressed Gases or Hazardous Chemicals</strong> (PESO Approval)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '0.9rem' }}>
                    <input 
                      type="checkbox"
                      name="effluentDischarge"
                      checked={formData.effluentDischarge}
                      onChange={handleChange}
                      style={{ width: 'auto' }}
                    />
                    <span>Plant generates trade effluent (ETP / CETP linkage required)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '0.9rem', color: 'var(--gold)' }}>
                    <input 
                      type="checkbox"
                      name="isWomenLed"
                      checked={formData.isWomenLed}
                      onChange={handleChange}
                      style={{ width: 'auto' }}
                    />
                    <span><strong>Women Entrepreneur Promoted Unit (&gt;51% equity)</strong> — unlocks +5% bonus state capital subsidy!</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Form Action Controls */}
          <div className="flex items-center justify-between" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              {step > 1 ? (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handlePrevStep}
                >
                  <ArrowLeft size={16} />
                  <span>Previous Step</span>
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
            >
              <span>{step === 4 ? 'Generate Intelligent Roadmap' : 'Next Step'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
