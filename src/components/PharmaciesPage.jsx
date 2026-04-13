import { useState } from 'react';
import { Phone, MapPin, Clock, Search } from 'lucide-react';
import { pharmacies } from '../data/pharmacies';

export default function PharmaciesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = pharmacies.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' || (filter === 'duty' && p.onDuty);
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <h2 className="section-title">💊 Gebze Eczaneleri</h2>

      {/* Search */}
      <div className="search-bar">
        <Search size={18} color="#475569" />
        <input
          placeholder="Eczane adı veya mahalle ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="map-filters" style={{ marginBottom: '24px' }}>
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tümü ({pharmacies.length})
        </button>
        <button
          className={`filter-btn ${filter === 'duty' ? 'active' : ''}`}
          onClick={() => setFilter('duty')}
        >
          🟢 Nöbetçi ({pharmacies.filter((p) => p.onDuty).length})
        </button>
      </div>

      {/* Cards */}
      <div className="pharmacy-grid">
        {filtered.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className={`pharmacy-card ${pharmacy.onDuty ? 'on-duty' : ''}`}
          >
            <div className="pharmacy-header">
              <div className="pharmacy-name">💊 {pharmacy.name}</div>
              {pharmacy.onDuty && (
                <span className="duty-badge">✓ Nöbetçi</span>
              )}
            </div>
            <div className="pharmacy-info">
              <div className="pharmacy-info-row">
                <MapPin size={14} />
                <span>{pharmacy.address}</span>
              </div>
              <div className="pharmacy-info-row">
                <Clock size={14} />
                <span>{pharmacy.hours}</span>
              </div>
              <div className="pharmacy-info-row">
                <MapPin size={14} />
                <span style={{ color: '#64748b' }}>{pharmacy.neighborhood} Mahallesi</span>
              </div>
            </div>
            <div className="pharmacy-phone">
              <a href={`tel:${pharmacy.phone}`}>
                <button className="phone-btn">
                  <Phone size={14} />
                  {pharmacy.phone}
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <p>Arama kriterlerinize uygun eczane bulunamadı.</p>
        </div>
      )}

      {/* Note */}
      <div style={{
        marginTop: '24px',
        background: 'rgba(59,130,246,0.1)',
        border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '13px',
        color: '#93c5fd',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start'
      }}>
        <span style={{ fontSize: '18px' }}>ℹ️</span>
        <p>Nöbetçi eczane bilgileri güncellenmektedir. En güncel bilgi için <strong>182 ALO Eczane Hattı</strong>'nı arayabilirsiniz.</p>
      </div>
    </div>
  );
}
