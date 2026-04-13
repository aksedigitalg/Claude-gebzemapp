import { useState } from 'react';
import { Clock, MapPin, Ticket, Search } from 'lucide-react';
import { historicalPlaces } from '../data/historicalPlaces';

export default function HistoricalPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const cats = ['all', ...new Set(historicalPlaces.map(p => p.category))];

  const filtered = historicalPlaces.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q);
    const matchCat = category === 'all' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="container">
      <div className="page-title">🏛️ Tarihi Yerler</div>

      <div className="search-bar">
        <Search size={16} color="#334155" />
        <input placeholder="Tarihi yer ara..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="filter-row">
        {cats.map(cat => (
          <button
            key={cat}
            className={`filter-pill ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? `Tümü (${historicalPlaces.length})` : cat}
          </button>
        ))}
      </div>

      <div className="places-list">
        {filtered.map((p) => (
          <div key={p.id} className="place-card">
            <div className="place-image-placeholder">{p.emoji}</div>
            <div className="place-content">
              <span className="place-category">{p.category}</span>
              <div className="place-name">{p.name}</div>
              <p className="place-desc">{p.description}</p>
              <div className="place-meta">
                <div className="place-meta-item"><Clock size={12} />{p.visitHours}</div>
                <div className="place-meta-item"><MapPin size={12} />{p.location}</div>
                <div className="place-meta-item"><Ticket size={12} />{p.entryFee}</div>
              </div>
              <div className="period-tag">📅 {p.period}</div>
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
    </div>
  );
}
