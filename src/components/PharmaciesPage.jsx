import { useState } from 'react';
import { Phone, MapPin, Clock, Search } from 'lucide-react';
import { pharmacies } from '../data/pharmacies';

export default function PharmaciesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = pharmacies.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.neighborhood.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || (filter === 'duty' && p.onDuty);
    return matchSearch && matchFilter;
  });

  return (
    <div className="container">
      <div className="page-title">💊 Eczaneler</div>

      <div className="search-bar">
        <Search size={16} color="#334155" />
        <input placeholder="Eczane veya mahalle ara..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="filter-row">
        <button className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          Tümü ({pharmacies.length})
        </button>
        <button className={`filter-pill ${filter === 'duty' ? 'active' : ''}`} onClick={() => setFilter('duty')}>
          🟢 Nöbetçi ({pharmacies.filter(p => p.onDuty).length})
        </button>
      </div>

      <div className="pharmacy-list">
        {filtered.map((p) => (
          <div key={p.id} className={`pharmacy-card ${p.onDuty ? 'on-duty' : ''}`}>
            <div className="pharmacy-header">
              <div className="pharmacy-name">{p.name}</div>
              {p.onDuty && <span className="duty-badge">Nöbetçi</span>}
            </div>
            <div className="pharmacy-info">
              <div className="pharmacy-info-row"><MapPin size={13} />{p.address}</div>
              <div className="pharmacy-info-row"><Clock size={13} />{p.hours}</div>
              <a
                className="pharmacy-info-row"
                href={`tel:${p.phone.replace(/\s/g, '')}`}
                style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}
              >
                <Phone size={13} style={{ color: '#3b82f6' }} />
                {p.phone}
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>Sonuç bulunamadı.</p>
        </div>
      )}

      <div className="note-banner">
        <span>ℹ️</span>
        <p>En güncel nöbetçi eczane için <strong>182 ALO Eczane</strong>'yi arayın.</p>
      </div>
    </div>
  );
}
