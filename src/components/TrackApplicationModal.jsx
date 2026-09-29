import React, { useState } from 'react';
import { 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function TrackApplicationModal({ isOpen, onClose, onSelectApp }) {
  const [trackingId, setTrackingId] = useState('MH-2026-IND-9421');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/applications/${trackingId.trim()}`);
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(`Application '${trackingId}' not found. Please verify your tracking number.`);
      }
    } catch (err) {
      setError('Unable to query application status. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ padding: '2.5rem', maxWidth: '640px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
          <div className="flex items-center gap-2">
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(249, 115, 22, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--saffron)'
            }}>
              <Search size={18} />
            </div>
            <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Track Industrial Application</h3>
          </div>

          <button onClick={onClose} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSearch} style={{ marginBottom: '1.75rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
            Enter Application Tracking ID / Acknowledgement Number:
          </label>
          <div className="flex items-center gap-2">
            <input 
              type="text"
              placeholder="e.g. MH-2026-IND-9421"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ whiteSpace: 'nowrap' }}>
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Demo samples: <strong>MH-2026-IND-9421</strong> (Pune EV), <strong>MH-2026-IND-8812</strong> (Raigad Pharma), <strong>MH-2026-IND-7319</strong> (Nashik Agro)
          </div>
        </form>

        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid var(--crimson)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--crimson)',
            fontSize: '0.88rem',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--bg-card-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem'
          }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="badge badge-saffron">{result.id}</span>
              <span className={`badge ${result.status === 'Approved' ? 'badge-emerald' : (result.status === 'Query Raised' ? 'badge-crimson' : 'badge-gold')}`}>
                {result.status}
              </span>
            </div>

            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>{result.businessName}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Promoter: {result.entrepreneurName} • {result.location}, {result.district}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              background: 'rgba(0,0,0,0.2)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              marginBottom: '1.25rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Authority:</span>
                <div style={{ fontWeight: '600', color: '#fff' }}>{result.assignedDept}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)' }}>RTS SLA Remaining:</span>
                <div style={{ fontWeight: '700', color: result.slaRemainingDays <= 5 ? 'var(--crimson)' : 'var(--emerald)' }}>
                  {result.status === 'Approved' ? '0 Days (Disposed)' : `${result.slaRemainingDays} Days`}
                </div>
              </div>
            </div>

            <button 
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                onClose();
                onSelectApp(result.id);
              }}
            >
              <span>Open in Full Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
