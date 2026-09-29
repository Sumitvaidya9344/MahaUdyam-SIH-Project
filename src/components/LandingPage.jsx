import React from 'react';
import { 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Users, 
  Zap, 
  Award, 
  Building, 
  Cpu, 
  Car, 
  Pill, 
  Apple, 
  Sun, 
  Sparkles,
  HelpCircle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function LandingPage({ onStartWizard, onOpenTrackModal, onExploreSchemes, onSelectSector }) {
  const stats = [
    { label: 'Total Industrial Investment Facilitated', value: '₹ 4.82 Lakh Cr', change: '+18.4% YoY', icon: TrendingUp },
    { label: 'Direct & Indirect Jobs Created', value: '18.4 Lakh+', change: 'Across 36 Districts', icon: Users },
    { label: 'Average Approval Turnaround', value: '14.2 Days', change: 'Statutory Benchmark 45d', icon: Clock },
    { label: 'Maharashtra RTS SLA Compliance', value: '98.4%', change: 'Zero Penalty Guarantee', icon: ShieldCheck }
  ];

  const features = [
    {
      id: 'checklist',
      title: 'Intelligent Approval Checklist',
      description: 'Dynamic rule-based engine mapping sector, CPCB pollution category (Red/Orange/Green/White), investment tier, and MIDC land regulations into an exact sequence of clearances.',
      badge: 'Smart Engine',
      badgeColor: 'badge-saffron',
      icon: CheckCircle2,
      actionText: 'Generate Checklist'
    },
    {
      id: 'docs',
      title: 'Digital Document Management',
      description: 'AI-assisted pre-validation checks file dimensions, stamp signatures, and PAN/GST consistency before formal submission, preventing 70% of bureaucratic rejections.',
      badge: 'AI Pre-Validation',
      badgeColor: 'badge-blue',
      icon: FileText,
      actionText: 'Test Pre-Validation'
    },
    {
      id: 'tracking',
      title: 'Application Tracking',
      description: 'Real-time transparency with synchronized status milestones and statutory Right to Services (RTS) countdown timers down to the minute.',
      badge: 'Live Status',
      badgeColor: 'badge-emerald',
      icon: Clock,
      actionText: 'Track Application'
    },
    {
      id: 'compliance',
      title: 'Compliance & Renewals',
      description: 'Automated statutory calendar tracking annual MPCB Consent to Operate (CTO), Fire NOC audits, and Factory Act licenses with 30-day proactive alerts.',
      badge: 'Statutory Calendar',
      badgeColor: 'badge-purple',
      icon: Calendar,
      actionText: 'View Calendar'
    },
    {
      id: 'inspection',
      title: 'Inspection Management',
      description: 'Central Inspection System (CIS) synchronizes MPCB, DISH, and Fire Department audits into a single coordinated joint visit with digital 72-hour notice.',
      badge: 'Joint CIS Visit',
      badgeColor: 'badge-gold',
      icon: ShieldCheck,
      actionText: 'Explore CIS Matrix'
    },
    {
      id: 'schemes',
      title: 'Government Schemes',
      description: 'Intelligent eligibility matching for Maharashtra Package Scheme of Incentives (PSI 2019/2024), 100% stamp duty waiver, SGST cashback, and power tariff rebates.',
      badge: 'Fiscal Incentives',
      badgeColor: 'badge-emerald',
      icon: Award,
      actionText: 'Explore Subsidies'
    },
    {
      id: 'grievance',
      title: 'Grievance Support',
      description: 'Integrated citizen grievance portal with 48-hour time-bound escalation to the District Collector & Appellate Authority under Maharashtra RTS Act 2015.',
      badge: 'RTS Escalation',
      badgeColor: 'badge-crimson',
      icon: HelpCircle,
      actionText: 'Lodge Ticket'
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboard',
      description: 'State-level executive control tower monitoring department pendency heatmaps, SLA bottleneck detection, and district industrial investment flows.',
      badge: 'Control Tower',
      badgeColor: 'badge-blue',
      icon: TrendingUp,
      actionText: 'View Analytics'
    }
  ];

  const sectors = [
    { name: 'Automobile & EV', count: '48 Approvals Mapped', icon: Car, tag: 'Pune, Chakan, Talegaon' },
    { name: 'Pharma & Chemicals', count: '54 Approvals Mapped', icon: Pill, tag: 'Raigad, Roha, Tarapur' },
    { name: 'Food & Agro-Tech', count: '38 Approvals Mapped', icon: Apple, tag: 'Nashik, Sangli, Solapur' },
    { name: 'Green Tech & Solar', count: '29 Approvals Mapped', icon: Sun, tag: 'Nagpur, Vidarbha, Dhule' },
    { name: 'IT & Electronics', count: '22 Approvals Mapped', icon: Cpu, tag: 'Navi Mumbai, Hinjewadi' },
    { name: 'Textiles & Garments', count: '34 Approvals Mapped', icon: Building, tag: 'Ichalkaranji, Amravati' }
  ];

  const industrialHubs = [
    { name: 'Chakan & Talegaon MIDC', district: 'Pune', focus: 'Auto & EV Hub', status: 'Plug-and-Play Ready' },
    { name: 'Roha & Taloja Industrial Belt', district: 'Raigad', focus: 'Chemical & Specialty API', status: 'CETP Connected' },
    { name: 'Butibori & MIHAN SEZ', district: 'Nagpur', focus: 'Logistics, Aerospace & Green Tech', status: 'Multi-Modal Hub' },
    { name: 'Dindori Wine & Food Park', district: 'Nashik', focus: 'Agro & Food Processing', status: 'Cold Chain Enabled' },
    { name: 'Shendra-Bidkin (AURIC)', district: 'Chhatrapati Sambhajinagar', focus: 'Smart Industrial City', status: 'DMIC Corridor' }
  ];

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 3.5rem 0',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            {/* Tag Badge */}
            <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
              <span className="badge badge-saffron" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                <Sparkles size={14} /> State Single Window 2.0 • Government of Maharashtra Concept
              </span>
            </div>

            {/* Hero Main Heading */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em'
            }}>
              One Platform. Every Approval. <br />
              <span style={{
                background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 60%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Faster Business.
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '740px',
              margin: '0 auto 2.5rem auto'
            }}>
              Streamline industrial approvals, compliance, inspections and government support through one intelligent digital platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4" style={{ flexWrap: 'wrap', marginBottom: '3rem' }}>
              <button 
                className="btn btn-primary"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
                onClick={onStartWizard}
              >
                <span>Get Started (Approval Roadmap)</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-secondary"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.6rem' }}
                onClick={onOpenTrackModal}
              >
                <Search size={18} style={{ color: 'var(--saffron)' }} />
                <span>Track Application</span>
              </button>

              <button 
                className="btn btn-secondary"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.6rem' }}
                onClick={onExploreSchemes}
              >
                <Award size={18} style={{ color: 'var(--gold)' }} />
                <span>Explore Schemes</span>
              </button>
            </div>

            {/* RTS Act Guarantee Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '0.85rem',
              color: '#34d399'
            }}>
              <ShieldCheck size={16} />
              <span>Legally Protected under Maharashtra Right to Public Services Act (RTS 2015)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live State Industrial Stats Ticker */}
      <section style={{ padding: '2.5rem 0', background: 'rgba(13, 21, 39, 0.5)' }}>
        <div className="container">
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="card" style={{ padding: '1.25rem 1.5rem', background: 'rgba(17, 28, 51, 0.5)' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.label}</span>
                    <Icon size={18} style={{ color: 'var(--saffron)', opacity: 0.8 }} />
                  </div>
                  <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', marginTop: '0.2rem', fontWeight: '600' }}>
                    {s.change}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Cards Grid (8 Cards Specified) */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-saffron" style={{ marginBottom: '0.75rem' }}>
              Comprehensive Single Window Architecture
            </span>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
              Everything Your Enterprise Needs to Establish & Scale
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Eliminating multi-department friction with an integrated digital workflow from initial land allotment to annual compliance audits.
            </p>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {features.map(f => {
              const Icon = f.icon;
              return (
                <div 
                  key={f.id} 
                  className="card flex flex-col justify-between"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    minHeight: '260px'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between" style={{ marginBottom: '1.2rem' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--saffron)'
                      }}>
                        <Icon size={22} />
                      </div>
                      <span className={`badge ${f.badgeColor}`}>{f.badge}</span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{f.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {f.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button 
                      className="flex items-center gap-1.5"
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--saffron)',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        if (f.id === 'checklist') onStartWizard();
                        else if (f.id === 'tracking') onOpenTrackModal();
                        else if (f.id === 'schemes') onExploreSchemes();
                        else onStartWizard();
                      }}
                    >
                      <span>{f.actionText}</span>
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sector Spotlight */}
      <section style={{ padding: '4rem 0', background: 'rgba(13, 21, 39, 0.6)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>Pre-Configured Industry Blueprints</span>
              <h2 style={{ fontSize: '2rem' }}>Tailored to Maharashtra’s Manufacturing Engines</h2>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={onStartWizard}>
              <span>Launch Wizard for Your Sector</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {sectors.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <div 
                  key={i} 
                  className="card flex items-center gap-4 cursor-pointer"
                  style={{ padding: '1.25rem' }}
                  onClick={() => onSelectSector(sec.name)}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(249, 115, 22, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--saffron)',
                    flexShrink: 0
                  }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>{sec.name}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--emerald)', margin: 0, fontWeight: '600' }}>{sec.count}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{sec.tag}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Major Industrial Parks Showcase */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>MIDC Smart Industrial Parks</span>
            <h2 style={{ fontSize: '2rem' }}>Ready Industrial Infrastructure Across Maharashtra</h2>
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
            {industrialHubs.map((hub, idx) => (
              <div key={idx} className="card" style={{ padding: '1.25rem' }}>
                <span className="badge badge-saffron" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>{hub.district}</span>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>{hub.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{hub.focus}</p>
                <div className="flex items-center gap-1.5" style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: '600' }}>
                  <CheckCircle2 size={13} />
                  <span>{hub.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(17, 28, 51, 0.95) 100%)',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <h3 style={{ fontSize: '1.85rem', marginBottom: '0.75rem' }}>
                Ready to Establish Your Industrial Enterprise in Maharashtra?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
                Answer 4 quick project questions and get an instant customized statutory clearance roadmap, RTS SLA calendar, and eligible state subsidy grants.
              </p>
            </div>
            <button 
              className="btn btn-primary"
              style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}
              onClick={onStartWizard}
            >
              <span>Launch Approval Roadmap</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
