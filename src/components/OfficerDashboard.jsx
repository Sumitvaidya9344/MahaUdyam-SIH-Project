import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Send, 
  Check, 
  X, 
  Eye, 
  Award, 
  ChevronRight,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const DEPARTMENTS = [
  { code: 'ALL', name: 'All Departments' },
  { code: 'MPCB', name: 'Maharashtra Pollution Control Board' },
  { code: 'MIDC', name: 'Maharashtra Industrial Development Corp' },
  { code: 'DISH', name: 'Directorate of Industrial Safety & Health' },
  { code: 'FIRE', name: 'Maharashtra Fire Services' },
  { code: 'MSEDCL', name: 'Electricity Distribution Co (MSEDCL)' },
  { code: 'FDA', name: 'Food & Drugs Administration' }
];

export default function OfficerDashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeOfficer, setActiveOfficer] = useState({
    name: 'Dr. Rajesh Deshmukh, IAS',
    role: 'Regional Scrutiny Officer',
    department: 'MPCB / Single Window Scrutiny Cell'
  });

  // Modal Action States
  const [actionModal, setActionModal] = useState(null); // 'approve', 'query', 'inspect', 'reject'
  const [queryText, setQueryText] = useState('');
  const [inspectionDate, setInspectionDate] = useState(new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (err) {
      console.error('Error fetching applications for officer:', err);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesDept = selectedDept === 'ALL' || app.assignedDept === selectedDept;
    const matchesSearch = searchQuery === '' || 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Handle Approve Action
  const handleApprove = async () => {
    if (!selectedApp) return;
    try {
      const res = await fetch(`/api/applications/${selectedApp.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Approved',
          remarks: 'All statutory compliances, engineering drawings, and environmental standards verified.',
          officerName: activeOfficer.name
        })
      });
      const data = await res.json();
      if (data.success) {
        confetti({ particleCount: 80, spread: 60 });
        setActionSuccessMsg(`Application ${selectedApp.id} Approved. Digitally signed clearance issued.`);
        setActionModal(null);
        fetchApplications();
        setSelectedApp(data.data);
      }
    } catch (err) {
      console.error('Approve failed:', err);
    }
  };

  // Handle Raise Query Action (Freezes RTS clock)
  const handleRaiseQuery = async () => {
    if (!selectedApp || !queryText.trim()) return;
    try {
      const res = await fetch(`/api/applications/${selectedApp.id}/queries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: queryText,
          department: activeOfficer.department,
          officerName: activeOfficer.name
        })
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg(`Formal query dispatched. Statutory RTS SLA clock paused for ${selectedApp.id}.`);
        setQueryText('');
        setActionModal(null);
        fetchApplications();
      }
    } catch (err) {
      console.error('Raise query failed:', err);
    }
  };

  // Handle Schedule CIS Inspection
  const handleScheduleInspection = async () => {
    if (!selectedApp) return;
    try {
      const res = await fetch('/api/inspections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: selectedApp.id,
          scheduledDate: inspectionDate,
          leadOfficer: activeOfficer.name
        })
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg(`Joint Inspection scheduled under CIS for ${inspectionDate}. 72-hour notice dispatched.`);
        setActionModal(null);
        fetchApplications();
      }
    } catch (err) {
      console.error('Schedule inspection failed:', err);
    }
  };

  // Handle Reject Action
  const handleReject = async () => {
    if (!selectedApp || !rejectionReason.trim()) return;
    try {
      const res = await fetch(`/api/applications/${selectedApp.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Rejected',
          remarks: rejectionReason,
          officerName: activeOfficer.name
        })
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg(`Application ${selectedApp.id} rejected with recorded statutory grounds.`);
        setRejectionReason('');
        setActionModal(null);
        fetchApplications();
      }
    } catch (err) {
      console.error('Reject failed:', err);
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Officer Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(17, 28, 51, 0.95) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        padding: '1.75rem 2rem',
        marginBottom: '2rem'
      }}>
        <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
              <span className="badge badge-blue">Official Scrutiny Terminal</span>
              <span className="badge badge-emerald">RTS SLA Clock Active</span>
            </div>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '0.25rem' }}>
              Government Department Scrutiny Console
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
              Logged in as: <strong style={{ color: '#ffffff' }}>{activeOfficer.name}</strong> • {activeOfficer.department}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge badge-gold" style={{ padding: '0.5rem 1rem' }}>
              Digital Signature Card (DSC) Active
            </span>
          </div>
        </div>
      </div>

      {actionSuccessMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid var(--emerald)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--emerald)'
        }}>
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 size={18} />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg('')} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="flex items-center gap-2" style={{ overflowX: 'auto', paddingBottom: '0.3rem' }}>
          {DEPARTMENTS.map(d => (
            <button
              key={d.code}
              onClick={() => setSelectedDept(d.code)}
              className={`btn btn-sm ${selectedDept === d.code ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem' }}
            >
              {d.code}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text"
            placeholder="Search by ID, Company or District..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.4rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Applications Scrutiny Table */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Assigned Scrutiny Queue ({filteredApps.length})</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Governed by Maharashtra RTS Act 2015 Timelines
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Application ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Enterprise & Promoter</th>
                <th style={{ padding: '0.75rem 1rem' }}>Sector & District</th>
                <th style={{ padding: '0.75rem 1rem' }}>Dept / Officer</th>
                <th style={{ padding: '0.75rem 1rem' }}>RTS SLA</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Scrutiny Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map(app => {
                const isOverdue = app.slaRemainingDays <= 2 && app.status !== 'Approved';
                return (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--saffron)' }}>
                      {app.id}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600', color: '#ffffff' }}>{app.businessName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {app.entrepreneurName} • {app.phone}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div>{app.sector}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {app.district} ({app.isMidc ? 'MIDC Zone' : 'Non-MIDC'})
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-blue">{app.assignedDept}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {app.assignedOfficer}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${isOverdue ? 'badge-crimson' : (app.status === 'Approved' ? 'badge-emerald' : 'badge-gold')}`}>
                        {app.status === 'Approved' ? 'Completed' : `${app.slaRemainingDays}d Left`}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${app.status === 'Approved' ? 'badge-emerald' : (app.status === 'Query Raised' ? 'badge-crimson' : 'badge-saffron')}`}>
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedApp(app)}
                      >
                        <Eye size={14} />
                        <span>Inspect File</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Application Deep Scrutiny Drawer / Modal */}
      {selectedApp && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '880px', padding: '2.5rem' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
              <div>
                <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                  <span className="badge badge-saffron">{selectedApp.id}</span>
                  <span className="badge badge-blue">{selectedApp.sector}</span>
                  <span className="badge badge-emerald">Category: {selectedApp.pollutionCategory}</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', margin: 0 }}>{selectedApp.businessName}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                  Promoter: {selectedApp.entrepreneurName} • Contact: {selectedApp.email} • {selectedApp.phone}
                </p>
              </div>

              <button 
                onClick={() => setSelectedApp(null)}
                style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Project Parameters Card */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              fontSize: '0.85rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Capital Investment:</span>
                <div style={{ fontWeight: '700', color: '#fff', fontSize: '1.1rem' }}>₹ {selectedApp.investmentCr} Cr</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Land Requirement:</span>
                <div style={{ fontWeight: '700', color: '#fff', fontSize: '1.1rem' }}>{selectedApp.landAreaSqM} sq.m</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Direct Employment:</span>
                <div style={{ fontWeight: '700', color: '#fff', fontSize: '1.1rem' }}>{selectedApp.employment} Persons</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Connected Power:</span>
                <div style={{ fontWeight: '700', color: '#fff', fontSize: '1.1rem' }}>{selectedApp.powerKva} kVA</div>
              </div>
            </div>

            {/* Uploaded Documents Scrutiny with AI Verification */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                Uploaded Documents & AI Pre-Validation Status
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(selectedApp.documents || []).map(doc => (
                  <div 
                    key={doc.id} 
                    className="flex items-center justify-between"
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={16} style={{ color: 'var(--saffron)' }} />
                      <span style={{ fontWeight: '600' }}>{doc.title}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({doc.fileSize})</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="badge badge-emerald">
                        Passed ({doc.validationScore}%)
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {doc.aiRemarks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Action Bar */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                RTS SLA Time Remaining: <strong style={{ color: 'var(--saffron)' }}>{selectedApp.slaRemainingDays} Days</strong>
              </span>

              <div className="flex items-center gap-3">
                <button 
                  className="btn btn-secondary btn-sm"
                  style={{ color: 'var(--crimson)' }}
                  onClick={() => setActionModal('reject')}
                >
                  <X size={14} />
                  <span>Reject</span>
                </button>

                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActionModal('query')}
                >
                  <Send size={14} style={{ color: 'var(--gold)' }} />
                  <span>Raise Formal Query (Freeze RTS)</span>
                </button>

                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActionModal('inspect')}
                >
                  <Calendar size={14} style={{ color: 'var(--blue)' }} />
                  <span>Schedule Joint CIS Inspection</span>
                </button>

                <button 
                  className="btn btn-emerald btn-sm"
                  onClick={() => setActionModal('approve')}
                >
                  <CheckCircle2 size={14} />
                  <span>Approve & Issue NOC</span>
                </button>
              </div>
            </div>

            {/* Sub-Modals for Actions */}
            {actionModal === 'approve' && (
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--emerald)', marginBottom: '0.35rem' }}>Confirm Approval & Digital Signing</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  This will issue a digitally signed NOC with barcode verification under Maharashtra RTS Act 2015.
                </p>
                <div className="flex items-center gap-2">
                  <button className="btn btn-emerald btn-sm" onClick={handleApprove}>
                    Confirm Digital Sign & Issue Clearance
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActionModal(null)}>Cancel</button>
                </div>
              </div>
            )}

            {actionModal === 'query' && (
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--gold)', marginBottom: '0.35rem' }}>Raise Formal Query</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Raising a query legally pauses the RTS SLA countdown until the applicant responds.
                </p>
                <textarea 
                  rows={3} 
                  placeholder="Detail the technical discrepancy or required document re-upload..."
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  style={{ marginBottom: '0.75rem' }}
                />
                <div className="flex items-center gap-2">
                  <button className="btn btn-primary btn-sm" onClick={handleRaiseQuery}>
                    Dispatch Official Query
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActionModal(null)}>Cancel</button>
                </div>
              </div>
            )}

            {actionModal === 'inspect' && (
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--blue)', marginBottom: '0.35rem' }}>Central Inspection System (CIS) Joint Scheduling</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Assign synchronized visit date with MPCB, DISH, and Fire Department inspectors.
                </p>
                <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Inspection Date:</label>
                  <input 
                    type="date"
                    value={inspectionDate}
                    onChange={(e) => setInspectionDate(e.target.value)}
                    style={{ width: 'auto' }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-primary btn-sm" onClick={handleScheduleInspection}>
                    Confirm CIS Joint Inspection
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActionModal(null)}>Cancel</button>
                </div>
              </div>
            )}

            {actionModal === 'reject' && (
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--crimson)', marginBottom: '0.35rem' }}>Formal Application Rejection</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Under the RTS Act, clear statutory reasoning must be cited in writing.
                </p>
                <textarea 
                  rows={3} 
                  placeholder="Cite statutory violation, zoning restriction or regulatory breach..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  style={{ marginBottom: '0.75rem' }}
                />
                <div className="flex items-center gap-2">
                  <button className="btn btn-primary btn-sm" style={{ background: 'var(--crimson)' }} onClick={handleReject}>
                    Confirm Statutory Rejection
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActionModal(null)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
