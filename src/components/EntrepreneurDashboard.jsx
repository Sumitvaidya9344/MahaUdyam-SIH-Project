import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Upload, 
  HelpCircle, 
  Calendar, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  Send, 
  Check, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EntrepreneurDashboard({ onNewApplicationClick, selectedAppId }) {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, queries, inspections, renewals, schemes, grievance
  const [renewals, setRenewals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reply to Query State
  const [replyText, setReplyText] = useState('');
  const [replyingQueryId, setReplyingQueryId] = useState(null);
  const [attachedFile, setAttachedFile] = useState('Rectified_Supporting_Document.pdf');

  // Grievance Form State
  const [grievanceForm, setGrievanceForm] = useState({
    title: '',
    category: 'RTS SLA Breach',
    description: ''
  });
  const [grievanceSuccess, setGrievanceSuccess] = useState(null);

  // Fetch applications and renewals
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, renRes] = await Promise.all([
        fetch('/api/applications'),
        fetch('/api/renewals')
      ]);
      const appData = await appRes.json();
      const renData = await renRes.json();

      if (appData.success && appData.data.length > 0) {
        setApplications(appData.data);
        if (selectedAppId) {
          const match = appData.data.find(a => a.id.toLowerCase() === selectedAppId.toLowerCase());
          setSelectedApp(match || appData.data[0]);
        } else {
          setSelectedApp(appData.data[0]);
        }
      }
      if (renData.success) {
        setRenewals(renData.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyQuery = async (queryId) => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch(`/api/applications/${selectedApp.id}/queries/${queryId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          replyText,
          attachedDoc: attachedFile
        })
      });
      const data = await res.json();
      if (data.success) {
        // Refresh local data
        setReplyText('');
        setReplyingQueryId(null);
        fetchData();
      }
    } catch (err) {
      console.error('Failed to submit query reply:', err);
    }
  };

  const handleRenewItem = async (renewalId) => {
    try {
      const res = await fetch(`/api/renewals/${renewalId}/renew`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        confetti({ particleCount: 60, spread: 60 });
        fetchData();
      }
    } catch (err) {
      console.error('Error submitting renewal:', err);
    }
  };

  const handleLodgeGrievance = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/grievances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: grievanceForm.title,
          category: grievanceForm.category,
          description: grievanceForm.description,
          applicationId: selectedApp?.id || 'N/A',
          applicantName: selectedApp?.entrepreneurName || 'Nitin Suryavanshi',
          businessName: selectedApp?.businessName || 'Sahyadri Mobility',
          department: selectedApp?.assignedDept || 'MIDC'
        })
      });
      const data = await res.json();
      if (data.success) {
        setGrievanceSuccess(data.data);
        setGrievanceForm({ title: '', category: 'RTS SLA Breach', description: '' });
      }
    } catch (err) {
      console.error('Failed to lodge grievance:', err);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading your MahaUdyam industrial profile...</p>
      </div>
    );
  }

  const pendingQueriesCount = (selectedApp?.queries || []).filter(q => q.status === 'Awaiting Entrepreneur Response').length;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Top Profile Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
            <span className="badge badge-saffron">Entrepreneur Single Window Desk</span>
            <span className="badge badge-emerald">UDYAM Verified</span>
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>
            {selectedApp?.businessName || 'Industrial Enterprise'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Lead Promoter: <strong style={{ color: 'var(--text-highlight)' }}>{selectedApp?.entrepreneurName}</strong> • {selectedApp?.location}, {selectedApp?.district}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Application Selector */}
          <select 
            style={{ width: 'auto', minWidth: '220px', fontSize: '0.85rem' }}
            value={selectedApp?.id}
            onChange={(e) => {
              const app = applications.find(a => a.id === e.target.value);
              if (app) setSelectedApp(app);
            }}
          >
            {applications.map(a => (
              <option key={a.id} value={a.id}>{a.id} — {a.businessName}</option>
            ))}
          </select>

          <button className="btn btn-primary btn-sm" onClick={onNewApplicationClick}>
            <span>New Project Application</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2" style={{
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: '0.5rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'overview', label: 'Application Status & RTS Tracker' },
          { id: 'queries', label: `Pending Queries (${pendingQueriesCount})`, highlight: pendingQueriesCount > 0 },
          { id: 'inspections', label: `Joint CIS Inspections (${(selectedApp?.inspections || []).length})` },
          { id: 'renewals', label: `Compliance Calendar (${renewals.length})` },
          { id: 'schemes', label: 'Eligible State Subsidies' },
          { id: 'grievance', label: 'RTS Grievance Support' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '0.65rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: '600',
              color: activeTab === t.id ? '#ffffff' : 'var(--text-secondary)',
              background: activeTab === t.id ? 'rgba(255,255,255,0.08)' : 'transparent',
              borderBottom: activeTab === t.id ? '2px solid var(--saffron)' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              position: 'relative'
            }}
          >
            <span>{t.label}</span>
            {t.highlight && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--crimson)'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & RTS TRACKER */}
      {activeTab === 'overview' && (
        <div>
          {/* Key Metrics */}
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '2.5rem' }}>
            <div className="card">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Tracking ID</span>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginTop: '0.2rem' }}>
                {selectedApp?.id}
              </div>
              <span className="badge badge-saffron" style={{ fontSize: '0.68rem', marginTop: '0.4rem' }}>
                Submitted: {new Date(selectedApp?.submittedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="card">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Current Scrutiny Stage</span>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: selectedApp?.status === 'Approved' ? 'var(--emerald)' : 'var(--saffron)', marginTop: '0.2rem' }}>
                {selectedApp?.status}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Assigned Authority: {selectedApp?.assignedDept} ({selectedApp?.assignedOfficer})
              </p>
            </div>

            <div className="card">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>RTS SLA Countdown</span>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: selectedApp?.slaRemainingDays <= 5 ? 'var(--crimson)' : 'var(--emerald)', marginTop: '0.2rem' }}>
                {selectedApp?.status === 'Approved' ? '0 Days (Disposed)' : `${selectedApp?.slaRemainingDays} Days Remaining`}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Total Statutory SLA: {selectedApp?.statutorySlaTotalDays} Days
              </p>
            </div>

            <div className="card">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Pre-Validation Status</span>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--emerald)', marginTop: '0.2rem' }}>
                98% Passed
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                {(selectedApp?.documents || []).length} Documents digitally verified
              </p>
            </div>
          </div>

          {/* Visual Milestone Progress Tracker */}
          <div className="card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>End-to-End Clearance Milestones</h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              position: 'relative'
            }}>
              {[
                { step: 1, title: 'Single Window Form', desc: 'CAF submitted & fees paid', done: true },
                { step: 2, title: 'Pre-Validation & Scrutiny', desc: 'AI OCR & Document sanity', done: true },
                { step: 3, title: 'Department Scrutiny', desc: 'MIDC, MPCB, Fire & DISH', done: selectedApp?.status !== 'Under Scrutiny' || pendingQueriesCount === 0 },
                { step: 4, title: 'Synchronized Inspection', desc: 'Central Inspection System (CIS)', done: selectedApp?.status === 'Approved' || selectedApp?.status === 'Inspection Scheduled' },
                { step: 5, title: 'Statutory Clearance', desc: 'Digitally signed NOCs issued', done: selectedApp?.status === 'Approved' }
              ].map((m, idx) => (
                <div key={idx} style={{
                  padding: '1.2rem',
                  borderRadius: 'var(--radius-md)',
                  background: m.done ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)',
                  border: m.done ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--bg-card-border)',
                  position: 'relative'
                }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>0{m.step}</span>
                    {m.done ? (
                      <CheckCircle2 size={18} style={{ color: 'var(--emerald)' }} />
                    ) : (
                      <Clock size={16} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem', color: m.done ? '#ffffff' : 'var(--text-secondary)' }}>
                    {m.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Uploaded Documents Scrutiny Table */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Digitally Submitted Documents</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Pre-validated against Maharashtra Single Window standard schema
                </p>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Document Title</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Size</th>
                    <th style={{ padding: '0.75rem 1rem' }}>AI Pre-Validation</th>
                    <th style={{ padding: '0.75rem 1rem' }}>OCR Verification Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedApp?.documents || []).map(doc => (
                    <tr key={doc.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '600', color: 'var(--text-highlight)' }}>
                        <div className="flex items-center gap-2">
                          <FileText size={16} style={{ color: 'var(--saffron)' }} />
                          <span>{doc.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>{doc.category}</td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{doc.fileSize}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className="badge badge-emerald">
                          {doc.validationStatus} ({doc.validationScore}%)
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        {doc.aiRemarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PENDING QUERIES */}
      {activeTab === 'queries' && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>Departmental Queries & Clarifications</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Under the Maharashtra Right to Public Services Act 2015, responding to queries resumes your SLA clearance timer.
            </p>
          </div>

          {(selectedApp?.queries || []).length === 0 ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <CheckCircle2 size={40} style={{ color: 'var(--emerald)', margin: '0 auto 1rem auto' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>No Active Queries</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                All departments have approved your submissions without queries. Your file is proceeding smoothly.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {selectedApp?.queries.map(q => (
                <div key={q.id} className="card" style={{ padding: '1.75rem' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-saffron">{q.fromDepartment}</span>
                      <span className="badge badge-blue">Officer: {q.officerName}</span>
                    </div>
                    <span className={`badge ${q.status === 'Resolved' ? 'badge-emerald' : 'badge-crimson'}`}>
                      {q.status}
                    </span>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Official Scrutiny Query:</div>
                    <p style={{ fontSize: '0.95rem', color: '#ffffff', margin: 0, fontWeight: '500' }}>
                      "{q.question}"
                    </p>
                  </div>

                  {q.reply ? (
                    <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: '700' }}>Your Submitted Response:</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {new Date(q.reply.repliedAt).toLocaleString()}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-highlight)', margin: 0 }}>
                        {q.reply.replyText}
                      </p>
                      {q.reply.attachedDoc && (
                        <div className="flex items-center gap-1.5" style={{ fontSize: '0.78rem', color: 'var(--emerald)', marginTop: '0.5rem' }}>
                          <FileText size={14} />
                          <span>Attached: {q.reply.attachedDoc}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {replyingQueryId === q.id ? (
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                            Your Written Clarification & Reference Documents:
                          </label>
                          <textarea 
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="State technical details, revised specifications, or clarify compliance..."
                            style={{ marginBottom: '0.75rem' }}
                          />

                          <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                            <div className="flex items-center gap-2" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              <FileCheck size={14} style={{ color: 'var(--emerald)' }} />
                              <span>Attaching: {attachedFile}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => setReplyingQueryId(null)}
                              >
                                Cancel
                              </button>
                              <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => handleReplyQuery(q.id)}
                              >
                                <Send size={14} />
                                <span>Submit Response & Unfreeze SLA</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setReplyingQueryId(q.id);
                            setReplyText('');
                          }}
                        >
                          <Send size={14} />
                          <span>Reply to Department Officer</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: JOINT CIS INSPECTIONS */}
      {activeTab === 'inspections' && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
              Central Inspection System (CIS)
            </span>
            <h3 style={{ fontSize: '1.4rem' }}>Synchronized Joint Site Inspections</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Maharashtra CIS unifies MPCB, DISH, and Fire visits into a single synchronized inspection to prevent enterprise disruption.
            </p>
          </div>

          {(selectedApp?.inspections || []).length === 0 ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <ShieldCheck size={40} style={{ color: 'var(--blue)', margin: '0 auto 1rem auto' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>No Inspection Pending</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Inspection will be auto-scheduled by the CIS system once preliminary drawing scrutiny concludes.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {selectedApp?.inspections.map(insp => (
                <div key={insp.id} className="card" style={{ padding: '1.75rem' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-gold">{insp.type}</span>
                      <span className="badge badge-emerald">Scheduled: {insp.scheduledDate}</span>
                    </div>
                    <span className="badge badge-blue">{insp.status}</span>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                    Lead Officer: {insp.leadOfficer}
                  </h4>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                    background: 'rgba(255,255,255,0.02)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Assigned Inspection Team:</div>
                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                        {insp.teamMembers.map((m, idx) => (
                          <li key={idx}>{m}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Inspection Audit Checklist:</div>
                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                        {insp.focusChecklist.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {insp.reportNotes && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                      <strong style={{ color: 'var(--emerald)' }}>Joint Inspection Report Findings: </strong>
                      <span style={{ color: 'var(--text-secondary)' }}>{insp.reportNotes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: COMPLIANCE & RENEWALS CALENDAR */}
      {activeTab === 'renewals' && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>
              Statutory Compliance Calendar
            </span>
            <h3 style={{ fontSize: '1.4rem' }}>Unified Statutory Renewals & Audits</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Avoid statutory closure notices and fines. System alerts 60 and 30 days prior to expiry with 1-click renewal.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {renewals.map(ren => (
              <div key={ren.id} className="card flex items-center justify-between" style={{ padding: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ maxWidth: '600px' }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
                    <span className="badge badge-saffron" style={{ fontSize: '0.7rem' }}>{ren.department}</span>
                    <span className={`badge ${ren.daysRemaining < 10 ? 'badge-crimson' : (ren.daysRemaining < 30 ? 'badge-gold' : 'badge-emerald')}`} style={{ fontSize: '0.7rem' }}>
                      {ren.daysRemaining} Days Remaining
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{ren.approvalName}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Unit: {ren.unitName} • Due Date: <strong style={{ color: '#ffffff' }}>{ren.dueDate}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    className="btn btn-emerald btn-sm"
                    onClick={() => handleRenewItem(ren.id)}
                  >
                    <CheckCircle2 size={15} />
                    <span>File 1-Click Renewal</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ELIGIBLE STATE SUBSIDIES */}
      {activeTab === 'schemes' && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.35rem' }}>
              Maharashtra Package Scheme of Incentives (PSI 2019/2024)
            </span>
            <h3 style={{ fontSize: '1.4rem' }}>Eligible State Subsidies & Grants</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Direct cash incentives, stamp duty waivers, and power tariff rebates sanctioned for your enterprise.
            </p>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {(selectedApp?.eligibleSchemes || []).map(sch => (
              <div key={sch.id} className="card flex flex-col justify-between" style={{ padding: '1.5rem' }}>
                <div>
                  <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>{sch.status}</span>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{sch.name}</h4>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                    {sch.amount}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Governed by Directorate of Industries, Govt of Maharashtra.
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => alert(`Incentive claim initiated for ${sch.name}. Disbursement file forwarded to DIC.`)}
                  >
                    <span>Download Eligibility Sanction Letter</span>
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: RTS GRIEVANCE SUPPORT */}
      {activeTab === 'grievance' && (
        <div style={{ maxWidth: '720px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-crimson" style={{ marginBottom: '0.35rem' }}>
              Statutory Grievance Redressal
            </span>
            <h3 style={{ fontSize: '1.4rem' }}>Lodge Time-Bound Grievance (RTS Act)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Under Maharashtra RTS Act 2015, unresolved grievances automatically escalate to the District Collector and First Appellate Authority within 48 hours.
            </p>
          </div>

          {grievanceSuccess && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid var(--emerald)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem'
            }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--emerald)', fontWeight: '700', marginBottom: '0.25rem' }}>
                <CheckCircle2 size={18} />
                <span>Grievance Logged: Token #{grievanceSuccess.id}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Assigned to Appellate Authority (District Collector). Target resolution window: 48 hours.
              </p>
            </div>
          )}

          <form onSubmit={handleLodgeGrievance} className="card" style={{ padding: '2rem' }}>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                  Grievance Category <span style={{ color: 'var(--saffron)' }}>*</span>
                </label>
                <select 
                  value={grievanceForm.category}
                  onChange={(e) => setGrievanceForm(p => ({ ...p, category: e.target.value }))}
                >
                  <option value="RTS SLA Breach">RTS Statutory SLA Deadline Breached</option>
                  <option value="Unlawful Document Demand">Demand for Documents Outside Gazette Checklist</option>
                  <option value="Inspection Irregularity">Central Inspection (CIS) Protocol Non-Compliance</option>
                  <option value="Fee Discrepancy">Fee Overcharge / Discrepancy</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                  Grievance Summary Title <span style={{ color: 'var(--saffron)' }}>*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Fire Provisional NOC pending beyond 14 days statutory RTS SLA"
                  value={grievanceForm.title}
                  onChange={(e) => setGrievanceForm(p => ({ ...p, title: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                  Detailed Description of Delay / Issue <span style={{ color: 'var(--saffron)' }}>*</span>
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Provide application number, officer interaction details, and requested redressal..."
                  value={grievanceForm.description}
                  onChange={(e) => setGrievanceForm(p => ({ ...p, description: e.target.value }))}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Send size={15} />
                <span>Submit Grievance to Appellate Authority</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
