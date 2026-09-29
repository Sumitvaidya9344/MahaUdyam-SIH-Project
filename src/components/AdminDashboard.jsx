import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Sliders, 
  Save, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Award,
  Zap,
  Leaf,
  Flame,
  Utensils
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [rules, setRules] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('bottlenecks'); // bottlenecks, rules, grievances, departments

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [anaRes, ruleRes, deptRes, grvRes] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/admin/rules'),
        fetch('/api/departments'),
        fetch('/api/grievances')
      ]);

      const anaData = await anaRes.json();
      const ruleData = await ruleRes.json();
      const deptData = await deptRes.json();
      const grvData = await grvRes.json();

      if (anaData.success) setAnalytics(anaData.data);
      if (ruleData.success) setRules(ruleData.data);
      if (deptData.success) setDepartments(deptData.data);
      if (grvData.success) setGrievances(grvData.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  const handleSaveRules = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/rules', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rules)
      });
      const data = await res.json();
      if (data.success) {
        confetti({ particleCount: 50, spread: 50 });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Save rules failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleResolveGrievance = async (id) => {
    try {
      const res = await fetch(`/api/grievances/${id}/resolve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolutionNotes: 'Redressed by State Single Window Apex Committee.' })
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error('Resolve grievance failed:', err);
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* State Executive Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.12) 0%, rgba(17, 28, 51, 0.95) 100%)',
        border: '1px solid rgba(129, 140, 248, 0.3)',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
              <span className="badge badge-purple">State Level Control Tower</span>
              <span className="badge badge-emerald">Cabinet Secretariat View</span>
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>
              MahaUdyam Apex Administration & SLA Radar
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Monitoring 36 Districts • 6 Major Regulators • Maharashtra Right to Public Services Act 2015
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge badge-gold" style={{ padding: '0.5rem 1rem' }}>
              Apex SLA Governance Mode
            </span>
          </div>
        </div>
      </div>

      {/* State Macro KPIs */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '2.5rem' }}>
        <div className="card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Total Investment Facilitated</span>
          <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#ffffff', marginTop: '0.2rem' }}>
            ₹ {analytics?.kpis?.totalInvestmentCr} Cr
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--emerald)', margin: '0.2rem 0 0 0' }}>
            Across MIDC & Non-MIDC Belts
          </p>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Industrial Employment Enabled</span>
          <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--blue)', marginTop: '0.2rem' }}>
            {(analytics?.kpis?.totalJobs || 0).toLocaleString()} Jobs
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
            Direct shop floor + allied supply chain
          </p>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Statewide RTS SLA Compliance</span>
          <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--emerald)', marginTop: '0.2rem' }}>
            {analytics?.kpis?.rtsCompliancePct}%
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
            Statutory turnaround guaranteed
          </p>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Average Turnaround Time</span>
          <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--saffron)', marginTop: '0.2rem' }}>
            {analytics?.kpis?.avgApprovalDays} Days
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
            Down from 92 days statutory max
          </p>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-2" style={{
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: '0.5rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'bottlenecks', label: 'Bottleneck Radar & Department Heatmap' },
          { id: 'rules', label: 'RTS SLA & Regulatory Configurator' },
          { id: 'grievances', label: `Appellate Grievances (${grievances.length})` },
          { id: 'departments', label: `Participating Departments (${departments.length})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveAdminTab(t.id)}
            style={{
              padding: '0.65rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: '600',
              color: activeAdminTab === t.id ? '#ffffff' : 'var(--text-secondary)',
              background: activeAdminTab === t.id ? 'rgba(255,255,255,0.08)' : 'transparent',
              borderBottom: activeAdminTab === t.id ? '2px solid var(--purple)' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: BOTTLENECK RADAR & HEATMAP */}
      {activeAdminTab === 'bottlenecks' && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>Departmental Scrutiny Bottleneck Radar</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Algorithmic detection of processing delays, workload backlogs, and overdue files by department.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Department</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Active Load</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Avg Days / SLA Target</th>
                    <th style={{ padding: '0.75rem 1rem' }}>RTS Compliance</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Overdue Files</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Bottleneck Index</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Flow Health</th>
                  </tr>
                </thead>
                <tbody>
                  {(analytics?.departmentBottlenecks || []).map(b => (
                    <tr key={b.code} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '1rem', fontWeight: '700', color: '#ffffff' }}>
                        <div className="flex items-center gap-2">
                          <span className="badge badge-saffron" style={{ fontSize: '0.7rem' }}>{b.code}</span>
                          <span>{b.department}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                        {b.activeLoad} files
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ fontWeight: '700', color: b.avgClearanceDays > b.slaTargetDays ? 'var(--crimson)' : '#fff' }}>
                          {b.avgClearanceDays} days
                        </span> / {b.slaTargetDays}d SLA
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ color: 'var(--emerald)', fontWeight: '600' }}>
                          {b.rtsCompliancePct}%
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${b.overdueCount > 0 ? 'badge-crimson' : 'badge-emerald'}`}>
                          {b.overdueCount} Overdue
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            flex: 1,
                            height: '8px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            minWidth: '60px'
                          }}>
                            <div style={{
                              width: `${b.bottleneckIndex}%`,
                              height: '100%',
                              background: b.bottleneckIndex > 85 ? 'var(--crimson)' : (b.bottleneckIndex > 75 ? 'var(--gold)' : 'var(--emerald)')
                            }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>{b.bottleneckIndex}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${b.status === 'Optimal Flow' ? 'badge-emerald' : (b.status === 'Moderate Delay' ? 'badge-gold' : 'badge-crimson')}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RTS SLA & REGULATORY CONFIGURATOR */}
      {activeAdminTab === 'rules' && rules && (
        <div style={{ maxWidth: '840px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>RTS SLA & Regulatory Configurator</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Adjust statutory clearance timeframes under Maharashtra Right to Public Services Act 2015.
            </p>
          </div>

          {saveSuccess && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid var(--emerald)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--emerald)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle2 size={18} />
              <span>SLA and regulatory policies updated statewide. Engine re-calibrated.</span>
            </div>
          )}

          <div className="card" style={{ padding: '2rem' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Department Statutory SLA Days (RTS Act)</h4>

            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  MPCB Consent to Establish (Red Category)
                </label>
                <input 
                  type="number" 
                  value={rules.departmentSlas?.MPCB_CTE_RED || 45}
                  onChange={(e) => setRules(p => ({
                    ...p,
                    departmentSlas: { ...p.departmentSlas, MPCB_CTE_RED: parseInt(e.target.value) || 45 }
                  }))}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  MPCB Consent to Establish (Orange Category)
                </label>
                <input 
                  type="number" 
                  value={rules.departmentSlas?.MPCB_CTE_ORANGE || 30}
                  onChange={(e) => setRules(p => ({
                    ...p,
                    departmentSlas: { ...p.departmentSlas, MPCB_CTE_ORANGE: parseInt(e.target.value) || 30 }
                  }))}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  MIDC Industrial Land Allotment
                </label>
                <input 
                  type="number" 
                  value={rules.departmentSlas?.MIDC_LAND || 15}
                  onChange={(e) => setRules(p => ({
                    ...p,
                    departmentSlas: { ...p.departmentSlas, MIDC_LAND: parseInt(e.target.value) || 15 }
                  }))}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  MIDC Building Plan Approval
                </label>
                <input 
                  type="number" 
                  value={rules.departmentSlas?.MIDC_BUILDING_PLAN || 21}
                  onChange={(e) => setRules(p => ({
                    ...p,
                    departmentSlas: { ...p.departmentSlas, MIDC_BUILDING_PLAN: parseInt(e.target.value) || 21 }
                  }))}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  Provisional Fire Safety NOC
                </label>
                <input 
                  type="number" 
                  value={rules.departmentSlas?.FIRE_PROVISIONAL || 14}
                  onChange={(e) => setRules(p => ({
                    ...p,
                    departmentSlas: { ...p.departmentSlas, FIRE_PROVISIONAL: parseInt(e.target.value) || 14 }
                  }))}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  DISH Factory Operating License
                </label>
                <input 
                  type="number" 
                  value={rules.departmentSlas?.DISH_FACTORY_LICENSE || 21}
                  onChange={(e) => setRules(p => ({
                    ...p,
                    departmentSlas: { ...p.departmentSlas, DISH_FACTORY_LICENSE: parseInt(e.target.value) || 21 }
                  }))}
                />
              </div>
            </div>

            <h4 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Automated Governance Policies</h4>

            <div className="flex flex-col gap-3" style={{ marginBottom: '2rem' }}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  style={{ width: 'auto' }}
                  checked={rules.strictSlaFreezeOnQuery}
                  onChange={(e) => setRules(p => ({ ...p, strictSlaFreezeOnQuery: e.target.checked }))}
                />
                <span style={{ fontSize: '0.9rem' }}>
                  <strong>Freeze Statutory RTS Clock on Formal Query:</strong> Clock automatically pauses until applicant replies with revised documents.
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  style={{ width: 'auto' }}
                  checked={rules.allowFastTrackWhiteCategory}
                  onChange={(e) => setRules(p => ({ ...p, allowFastTrackWhiteCategory: e.target.checked }))}
                />
                <span style={{ fontSize: '0.9rem' }}>
                  <strong>Instant Self-Declaration for White Category:</strong> Exempt non-polluting units from physical inspection prior to operation.
                </span>
              </label>
            </div>

            <button 
              className="btn btn-primary"
              onClick={handleSaveRules}
              disabled={saving}
            >
              <Save size={16} />
              <span>{saving ? 'Updating Rules...' : 'Save & Propagate Rules'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: APPELLATE GRIEVANCES */}
      {activeAdminTab === 'grievances' && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>Appellate RTS Grievance Redressal</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Citizen complaints escalated to District Collector / Joint Director of Industries for statutory resolution.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {grievances.map(g => (
              <div key={g.id} className="card" style={{ padding: '1.5rem' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-crimson">{g.id}</span>
                    <span className="badge badge-saffron">{g.department}</span>
                    <span className="badge badge-blue">{g.category}</span>
                  </div>
                  <span className={`badge ${g.status === 'Resolved' ? 'badge-emerald' : 'badge-gold'}`}>
                    {g.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>{g.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {g.description}
                </p>

                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.03)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Applicant: </span>
                    <strong style={{ color: '#fff' }}>{g.applicantName}</strong> ({g.businessName}) • App ID: {g.applicationId}
                  </div>

                  {g.status !== 'Resolved' && (
                    <button 
                      className="btn btn-emerald btn-sm"
                      onClick={() => handleResolveGrievance(g.id)}
                    >
                      <CheckCircle2 size={14} />
                      <span>Issue Redressal Order</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PARTICIPATING DEPARTMENTS */}
      {activeAdminTab === 'departments' && (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {departments.map(d => (
            <div key={d.id} className="card" style={{ padding: '1.5rem' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                <span className="badge badge-saffron">{d.code}</span>
                <span className="badge badge-emerald">{d.rtsCompliancePct}% RTS</span>
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>{d.name}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {d.headquarters}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                fontSize: '0.82rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '0.75rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Active Files:</span>
                  <div style={{ fontWeight: '700', color: '#fff' }}>{d.activeApplications}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Scrutiny Officers:</span>
                  <div style={{ fontWeight: '700', color: '#fff' }}>{d.officerCount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
