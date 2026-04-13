import { useState } from 'react';
import { Clock, MapPin, Ticket, Search } from 'lucide-react';
import { historicalPlaces } from '../data/historicalPlaces';

export default function HistoricalPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...new Set(historicalPlaces.map((p) => p.category))];

  const filtered = historicalPlaces.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <h2 className="section-title">🏛️ Gebze'nin Tarihi Yerleri</h2>

      {/* Search */}
      <div className="search-bar">
        <Search size={18} color="#475569" />
        <input
          placeholder="Tarihi yer veya dönem ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category filters */}
      <div className="map-filters" style={{ marginBottom: '24px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? `Tümü (${historicalPlaces.length})` : cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="places-grid">
        {filtered.map((place) => (
          <div key={place.id} className="place-card">
            <div className="place-image-placeholder">
              {place.emoji}
            </div>
            <div className="place-content">
              <span className="place-category">{place.category}</span>
              <h3 className="place-name">{place.name}</h3>
              <p className="place-desc">{place.description}</p>
              <div className="place-meta">
                <div className="place-meta-item">
                  <Clock size={13} />
                  <span>{place.visitHours}</span>
                </div>
                <div className="place-meta-item">
                  <MapPin size={13} />
                  <span>{place.location}</span>
                </div>
                <div className="place-meta-item">
                  <Ticket size={13} />
                  <span>{place.entryFee}</span>
                </div>
              </div>
              <div style={{
                marginTop: '12px',
                padding: '6px 12px',
                background: 'rgba(245,158,11,0.1)',
                borderRadius: '8px',
                display: 'inline-block',
                fontSize: '12px',
                color: '#f59e0b',
                fontWeight: '600'
              }}>
                📅 {place.period}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <p>Arama kriterlerinize uygun yer bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
