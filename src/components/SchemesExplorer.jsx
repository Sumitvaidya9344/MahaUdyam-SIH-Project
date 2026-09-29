import React, { useState } from 'react';
import { 
  Award, 
  TrendingUp, 
  Zap, 
  Leaf, 
  FileCheck, 
  Sparkles, 
  Banknote, 
  ShieldCheck, 
  ArrowRight,
  Download,
  Filter
} from 'lucide-react';
import { evaluateIncentiveSchemes } from '../../server/engine/rulesEngine.js';

export default function SchemesExplorer({ onApplyScheme }) {
  const [district, setDistrict] = useState('Nagpur');
  const [zone, setZone] = useState('Group D');
  const [investmentCr, setInvestmentCr] = useState(35);
  const [employment, setEmployment] = useState(150);
  const [sector, setSector] = useState('Automobile & Electric Vehicles');
  const [isWomenLed, setIsWomenLed] = useState(true);

  // Evaluate schemes dynamically using rule engine
  const schemes = evaluateIncentiveSchemes({
    district,
    zone,
    investmentCr,
    employment,
    sector,
    pollutionCategory: 'Orange',
    isWomenLed
  });

  const handleDistrictChange = (d, z) => {
    setDistrict(d);
    setZone(z);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(17, 28, 51, 0.95) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem',
        marginBottom: '2.5rem'
      }}>
        <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
              <span className="badge badge-gold">Directorate of Industries, Maharashtra</span>
              <span className="badge badge-emerald">PSI 2019/2024 Framework</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.35rem' }}>
              Maharashtra Industrial Incentive & Subsidy Calculator
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, maxWidth: '700px' }}>
              Discover exact financial grants, stamp duty waivers, and power rebates your enterprise is eligible to claim under the Maharashtra Package Scheme of Incentives.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>
          Simulate Your Enterprise Parameters
        </h3>

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Select District & Group Zone:
            </label>
            <select 
              value={`${district}|${zone}`}
              onChange={(e) => {
                const [d, z] = e.target.value.split('|');
                handleDistrictChange(d, z);
              }}
            >
              <option value="Pune|Group A">Pune (Group A - MMR/Pune Developed)</option>
              <option value="Thane|Group A">Thane (Group A - MMR)</option>
              <option value="Nashik|Group B">Nashik (Group B - Developing)</option>
              <option value="Kolhapur|Group B">Kolhapur (Group B - Developing)</option>
              <option value="Raigad|Group C">Raigad (Group C - Developing Hub)</option>
              <option value="Satara|Group C">Satara (Group C)</option>
              <option value="Nagpur|Group D">Nagpur (Group D - Backward/Vidarbha)</option>
              <option value="Amravati|Group D">Amravati (Group D)</option>
              <option value="Nanded|Group D">Nanded (Group D)</option>
              <option value="Gadchiroli|Group D+">Gadchiroli (Group D+ - Remote Tribal / Aspirant)</option>
              <option value="Nandurbar|Group D+">Nandurbar (Group D+)</option>
              <option value="Beed|Group D+">Beed (Group D+)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Industrial Sector:
            </label>
            <select value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="Automobile & Electric Vehicles">Automobile & Electric Vehicles</option>
              <option value="Pharmaceuticals & Chemicals">Pharmaceuticals & Chemicals</option>
              <option value="Food Processing & Agro-tech">Food Processing & Agro-tech</option>
              <option value="Renewable Energy & Green Hydrogen">Renewable Energy & Green Hydrogen</option>
              <option value="IT / ITeS / Electronics Hardware">IT / Electronics Hardware</option>
              <option value="Textiles & Garments">Textiles & Garments</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Capital Investment (₹ Crores): {investmentCr} Cr
            </label>
            <input 
              type="range"
              min="1"
              max="250"
              step="1"
              value={investmentCr}
              onChange={(e) => setInvestmentCr(parseFloat(e.target.value))}
              style={{ accentColor: 'var(--saffron)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Direct Employment: {employment} Workers
            </label>
            <input 
              type="range"
              min="10"
              max="1000"
              step="10"
              value={employment}
              onChange={(e) => setEmployment(parseInt(e.target.value))}
              style={{ accentColor: 'var(--blue)' }}
            />
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--bg-card-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '0.9rem', color: 'var(--gold)' }}>
            <input 
              type="checkbox"
              checked={isWomenLed}
              onChange={(e) => setIsWomenLed(e.target.checked)}
              style={{ width: 'auto' }}
            />
            <span><strong>Women-Led Enterprise Promoted Unit (&gt;51% equity)</strong> — unlocks special +5% bonus state capital subsidy!</span>
          </label>
        </div>
      </div>

      {/* Eligible Subsidies Cards */}
      <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem' }}>
          Matched Fiscal Subsidies for {district} ({zone})
        </h3>
        <span className="badge badge-emerald">
          {schemes.length} Eligible Programs
        </span>
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {schemes.map(sch => (
          <div key={sch.id} className="card flex flex-col justify-between" style={{ padding: '1.75rem' }}>
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                <span className="badge badge-emerald">{sch.category}</span>
                <Award size={20} style={{ color: 'var(--gold)' }} />
              </div>

              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{sch.name}</h4>

              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '0.6rem' }}>
                {sch.estimatedBenefitAmount}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-highlight)', fontWeight: '600', marginBottom: '0.5rem' }}>
                Benefit Formula: {sch.benefitValue}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {sch.eligibilitySummary}
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                {sch.tags.map((t, idx) => (
                  <span key={idx} className="badge badge-blue" style={{ fontSize: '0.68rem' }}>{t}</span>
                ))}
              </div>

              <button 
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
                onClick={() => onApplyScheme(sch)}
              >
                <span>Apply for Incentive Claim</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
