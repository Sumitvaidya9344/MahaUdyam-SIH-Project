import React from 'react';
import { ShieldCheck, ExternalLink, Building2, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#04070e',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4rem 0 2rem 0',
      color: 'var(--text-secondary)',
      fontSize: '0.88rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Col 1: Platform Brand */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: '800',
                fontSize: '1.1rem'
              }}>
                मु
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>
                Maha<span style={{ color: 'var(--saffron)' }}>Udyam</span>
              </span>
            </div>
            <p style={{ lineHeight: 1.6, marginBottom: '1rem', fontSize: '0.85rem' }}>
              Unified Industrial Approval & Compliance Platform for the State of Maharashtra. Designed to accelerate ease of doing business, paperless clearances, and synchronized inspections.
            </p>
            <div className="flex items-center gap-1.5" style={{ color: 'var(--emerald)', fontSize: '0.8rem', fontWeight: '600' }}>
              <ShieldCheck size={16} />
              <span>Certified RTS Act 2015 SLA Compliant</span>
            </div>
          </div>

          {/* Col 2: Key Portals */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem' }}>Key Government Portals</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
              <li>
                <a href="https://midcindia.org" target="_blank" rel="noreferrer" className="flex items-center gap-1.5" style={{ transition: 'color 0.2s ease' }}>
                  <span>MIDC Industrial Parks</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://mpcb.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                  <span>MPCB e-Consent System</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://dish.maharashtra.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                  <span>DISH Safety & Factories Act</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://mahafireservice.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                  <span>Maharashtra Fire Services</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://aaplesarkar.mahaonline.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                  <span>Aaple Sarkar Citizen Portal</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Industrial Clearances */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem' }}>Key Approvals</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0, fontSize: '0.82rem' }}>
              <li>Consent to Establish (CTE) & Operate (CTO)</li>
              <li>MIDC Industrial Land Allotment & Building Plan</li>
              <li>Provisional & Final Fire Safety NOC</li>
              <li>Factories Act 1948 Registration & Plan Approval</li>
              <li>Central Inspection System (CIS) Joint Audits</li>
              <li>Package Scheme of Incentives (PSI 2019/2024)</li>
            </ul>
          </div>

          {/* Col 4: State Contact */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem' }}>Single Window Helpdesk</h4>
            <div className="flex flex-col gap-2.5" style={{ fontSize: '0.82rem' }}>
              <div className="flex items-center gap-2">
                <MapPin size={16} style={{ color: 'var(--saffron)' }} />
                <span>Directorate of Industries, 2nd Floor, New Administrative Building, Mantralaya, Mumbai 400032</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} style={{ color: 'var(--saffron)' }} />
                <span>Toll Free Single Window Helpline: 1800 220 226</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} style={{ color: 'var(--saffron)' }} />
                <span>support.mahaudyam@maharashtra.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem'
        }}>
          <div>
            © 2026 Government of Maharashtra • MahaUdyam Industrial Single Window Prototype
          </div>

          <div className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
            Built for Smart India Hackathon / Directorate of Industries Demonstration • Academic & Innovation Concept
          </div>
        </div>
      </div>
    </footer>
  );
}
