import { useState } from 'react';
import { Search } from 'lucide-react';
import { pharmacies } from '../data/pharmacies';
import { historicalPlaces } from '../data/historicalPlaces';

export default function SearchPage({ setPage }) {
  const [query, setQuery] = useState('');

  const results = query.trim().length < 2 ? [] : [
    ...pharmacies
      .filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.address.toLowerCase().includes(query.toLowerCase()) ||
        p.neighborhood.toLowerCase().includes(query.toLowerCase())
      )
      .map(p => ({ ...p, _type: 'pharmacy' })),
    ...historicalPlaces
      .filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase())
      )
      .map(p => ({ ...p, _type: 'historical' })),
  ];

  return (
    <div className="container">
      <div className="page-title">🔍 Arama</div>

      <div className="search-bar">
        <Search size={16} color="#334155" />
        <input
          placeholder="Eczane, tarihi yer, mahalle..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {query.trim().length < 2 && (
        <div style={{ marginTop: 32 }}>
          <div className="section-label">💡 Öneriler</div>
          <div className="search-result-list">
            {[
              { label: 'Nöbetçi Eczaneler', sub: '3 eczane aktif', icon: '💊', page: 'pharmacies' },
              { label: 'Tarihi Yerler',      sub: '6 mekan',        icon: '🏛️', page: 'historical' },
              { label: 'Harita',             sub: 'Tüm konumlar',   icon: '🗺️', page: 'map' },
            ].map(s => (
              <div key={s.page} className="search-result-item" onClick={() => setPage(s.page)}>
                <div className="search-result-icon historical">{s.icon}</div>
                <div className="search-result-info">
                  <h4>{s.label}</h4>
                  <p>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>"{query}" için sonuç bulunamadı.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="search-result-list">
          {results.map(item => (
            <div
              key={`${item._type}-${item.id}`}
              className="search-result-item"
              onClick={() => setPage(item._type === 'pharmacy' ? 'pharmacies' : 'historical')}
            >
              <div className={`search-result-icon ${item._type}`}>
                {item._type === 'pharmacy' ? '💊' : item.emoji}
              </div>
              <div className="search-result-info">
                <h4>{item.name}</h4>
                <p>{item._type === 'pharmacy' ? item.address : item.location}</p>
              </div>
              <span className={`result-type-badge ${item._type}`}>
                {item._type === 'pharmacy' ? 'Eczane' : 'Tarihi'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
