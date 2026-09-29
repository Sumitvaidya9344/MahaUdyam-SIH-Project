import React from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  UserCheck, 
  ShieldCheck, 
  Briefcase, 
  CheckCircle2, 
  Layers, 
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  userRole, 
  setUserRole, 
  onOpenTrackModal,
  notificationCount = 3 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = React.useState(false);

  const notifications = [
    {
      id: 1,
      title: 'RTS SLA Warning - 5 Days Left',
      desc: 'Application MH-2026-IND-8812 joint inspection report due in 48 hours.',
      time: '10m ago',
      type: 'warning'
    },
    {
      id: 2,
      title: 'Query Response Submitted',
      desc: 'Sahyadri Electric Mobility has responded to MIDC solar rooftop query.',
      time: '1h ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'Statutory Renewal Due Soon',
      desc: 'Konkan Bio-Pharmaceuticals MPCB CTO expires in 6 days.',
      time: '3h ago',
      type: 'alert'
    }
  ];

  return (
    <header className="header">
      {/* Top Bar with Maharashtra State Identity & Disclaimer */}
      <div className="header-top">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <span style={{ color: 'var(--saffron)' }}>🇮🇳</span> GOVERNMENT OF MAHARASHTRA
            </span>
            <span className="hide-mobile text-slate-500">|</span>
            <span className="hide-mobile text-slate-400">
              Department of Industries • Maharashtra Single Window System (RTS Act 2015 Compliant)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="badge badge-gold" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
              Prototype • Academic Concept
            </span>
            <span className="hide-mobile text-slate-400">English | मराठी</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container flex items-center justify-between">
          {/* Logo & Platform Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab('landing')}
          >
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '1.25rem'
            }}>
              मु
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: 0 }}>
                  Maha<span style={{ color: 'var(--saffron)' }}>Udyam</span>
                </h1>
                <span className="badge badge-saffron" style={{ fontSize: '0.65rem' }}>2.0</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                Unified Industrial Approval & Compliance Platform
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hide-mobile flex items-center gap-1">
            <button 
              className={`nav-link ${activeTab === 'landing' ? 'active' : ''}`}
              onClick={() => setActiveTab('landing')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${activeTab === 'wizard' ? 'active' : ''}`}
              onClick={() => setActiveTab('wizard')}
            >
              Approval Wizard
            </button>
            <button 
              className={`nav-link ${activeTab === 'entrepreneur' ? 'active' : ''}`}
              onClick={() => {
                setUserRole('applicant');
                setActiveTab('entrepreneur');
              }}
            >
              My Dashboard
            </button>
            <button 
              className={`nav-link ${activeTab === 'officer' ? 'active' : ''}`}
              onClick={() => {
                setUserRole('officer');
                setActiveTab('officer');
              }}
            >
              Officer Scrutiny
            </button>
            <button 
              className={`nav-link ${activeTab === 'schemes' ? 'active' : ''}`}
              onClick={() => setActiveTab('schemes')}
            >
              State Schemes
            </button>
            <button 
              className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => {
                setUserRole('admin');
                setActiveTab('admin');
              }}
            >
              Admin Radar
            </button>
          </nav>

          {/* Actions & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Track Button */}
            <button 
              className="btn btn-secondary btn-sm hide-mobile"
              onClick={onOpenTrackModal}
              title="Track Application Status"
            >
              <Search size={15} style={{ color: 'var(--saffron)' }} />
              <span>Track App</span>
            </button>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button 
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.5rem', borderRadius: '50%' }}
                onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
                title="Notifications"
              >
                <Bell size={16} />
                {notificationCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'var(--crimson)',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotificationDrawer && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  width: '320px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--bg-card-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 200
                }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>RTS Notifications</span>
                    <span className="badge badge-saffron">{notifications.length} New</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {notifications.map(n => (
                      <div key={n.id} style={{
                        padding: '0.6rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.03)',
                        fontSize: '0.8rem'
                      }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: '0.2rem' }}>
                          <span style={{ fontWeight: '600', color: 'var(--text-highlight)' }}>{n.title}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{n.time}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0 }}>{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Pill */}
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              padding: '0.2rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--bg-card-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}>
              <button
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  color: userRole === 'applicant' ? '#ffffff' : 'var(--text-secondary)',
                  background: userRole === 'applicant' ? 'var(--saffron)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => {
                  setUserRole('applicant');
                  setActiveTab('entrepreneur');
                }}
              >
                Applicant
              </button>
              <button
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  color: userRole === 'officer' ? '#ffffff' : 'var(--text-secondary)',
                  background: userRole === 'officer' ? 'var(--blue)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => {
                  setUserRole('officer');
                  setActiveTab('officer');
                }}
              >
                Officer
              </button>
              <button
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  color: userRole === 'admin' ? '#ffffff' : 'var(--text-secondary)',
                  background: userRole === 'admin' ? 'var(--purple)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => {
                  setUserRole('admin');
                  setActiveTab('admin');
                }}
              >
                Admin
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.5rem', display: 'none' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
