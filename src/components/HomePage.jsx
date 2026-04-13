export default function HomePage({ setPage }) {
  return (
    <div className="container">

      {/* Hero */}
      <div className="hero">
        <h2>Hoşgeldiniz 👋</h2>
        <p>Gebze'de ne arıyorsunuz?</p>
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="stat-pill-num">6</span>
            <span className="stat-pill-label">Eczane</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-num">3</span>
            <span className="stat-pill-label">Nöbetçi</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-num">6</span>
            <span className="stat-pill-label">Tarihi Yer</span>
          </div>
        </div>
      </div>

      {/* Quick access */}
      <div className="section-label">⚡ Hızlı Erişim</div>
      <div className="quick-grid">
        <div className="quick-card" onClick={() => setPage('pharmacies')}>
          <span className="quick-card-icon">💊</span>
          <h3>Nöbetçi Eczaneler</h3>
          <p>3 eczane nöbette</p>
        </div>
        <div className="quick-card" onClick={() => setPage('historical')}>
          <span className="quick-card-icon">🏛️</span>
          <h3>Tarihi Yerler</h3>
          <p>6 mekan</p>
        </div>
        <div className="quick-card" onClick={() => setPage('map')}>
          <span className="quick-card-icon">🗺️</span>
          <h3>Harita</h3>
          <p>Tüm konumlar</p>
        </div>
        <div className="quick-card">
          <span className="quick-card-icon">🌤️</span>
          <h3>Hava Durumu</h3>
          <p>18°C · Bulutlu</p>
        </div>
      </div>

      {/* Emergency */}
      <div className="section-label">🚨 Acil Hatlar</div>
      <div className="emergency-grid">
        {[
          { emoji: '🚑', name: 'Ambulans',  num: '112' },
          { emoji: '🚒', name: 'İtfaiye',  num: '110' },
          { emoji: '🚔', name: 'Polis',     num: '155' },
          { emoji: '🪖', name: 'Jandarma', num: '156' },
          { emoji: '💊', name: 'ALO Eczane', num: '182' },
          { emoji: '🏥', name: 'SABİM',    num: '184' },
        ].map((e) => (
          <a key={e.num} className="emergency-card" href={`tel:${e.num}`}>
            <span className="emergency-icon">{e.emoji}</span>
            <div className="emergency-info">
              <h4>{e.name}</h4>
              <p>{e.num}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Gebze Info */}
      <div className="section-label">📍 Gebze</div>
      <div className="info-grid">
        {[
          { emoji: '🏙️', label: 'İl', value: 'Kocaeli' },
          { emoji: '👥', label: 'Nüfus', value: '~500.000' },
          { emoji: '📐', label: 'Yüzölçümü', value: '473 km²' },
          { emoji: '📜', label: 'Tarihi İsim', value: 'Libyssa' },
          { emoji: '🛣️', label: "İstanbul'a", value: '55 km' },
          { emoji: '🏭', label: 'Organize Sanayi', value: '3 OSB' },
        ].map((r, i) => (
          <div key={i} className="info-row">
            <span className="info-emoji">{r.emoji}</span>
            <div>
              <div className="info-label">{r.label}</div>
              <div className="info-value">{r.value}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
