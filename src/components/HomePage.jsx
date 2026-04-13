import { Pill, Landmark, Map, Phone, MapPin, Clock } from 'lucide-react';

export default function HomePage({ setActivePage }) {
  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <h2>Hoşgeldiniz, Gebze 🏙️</h2>
        <p>Şehrinizin eczane, tarihi yer ve harita bilgilerine tek yerden ulaşın</p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">6</div>
            <div className="stat-label">Eczane</div>
          </div>
          <div className="stat">
            <div className="stat-number">3</div>
            <div className="stat-label">Nöbetçi</div>
          </div>
          <div className="stat">
            <div className="stat-number">6</div>
            <div className="stat-label">Tarihi Yer</div>
          </div>
          <div className="stat">
            <div className="stat-number">500K+</div>
            <div className="stat-label">Nüfus</div>
          </div>
        </div>
      </div>

      {/* Quick access */}
      <h2 className="section-title">⚡ Hızlı Erişim</h2>
      <div className="quick-grid">
        <div className="quick-card" onClick={() => setActivePage('pharmacies')}>
          <div className="quick-card-icon">💊</div>
          <h3>Nöbetçi Eczaneler</h3>
          <p>3 eczane nöbette</p>
        </div>
        <div className="quick-card" onClick={() => setActivePage('historical')}>
          <div className="quick-card-icon">🏛️</div>
          <h3>Tarihi Yerler</h3>
          <p>Gezilecek 6 yer</p>
        </div>
        <div className="quick-card" onClick={() => setActivePage('map')}>
          <div className="quick-card-icon">🗺️</div>
          <h3>İnteraktif Harita</h3>
          <p>Tüm konumlar haritada</p>
        </div>
        <div className="quick-card">
          <div className="quick-card-icon">🌤️</div>
          <h3>Gebze Havası</h3>
          <p>18°C • Parçalı Bulutlu</p>
        </div>
      </div>

      {/* Emergency */}
      <h2 className="section-title">🚨 Acil Hatlar</h2>
      <div className="emergency-grid">
        <a className="emergency-card" href="tel:112">
          <span className="emergency-icon">🚑</span>
          <div className="emergency-info">
            <h4>Ambulans</h4>
            <p>112</p>
          </div>
        </a>
        <a className="emergency-card" href="tel:110">
          <span className="emergency-icon">🚒</span>
          <div className="emergency-info">
            <h4>İtfaiye</h4>
            <p>110</p>
          </div>
        </a>
        <a className="emergency-card" href="tel:155">
          <span className="emergency-icon">🚔</span>
          <div className="emergency-info">
            <h4>Polis</h4>
            <p>155</p>
          </div>
        </a>
        <a className="emergency-card" href="tel:156">
          <span className="emergency-icon">🪖</span>
          <div className="emergency-info">
            <h4>Jandarma</h4>
            <p>156</p>
          </div>
        </a>
        <a className="emergency-card" href="tel:182">
          <span className="emergency-icon">💊</span>
          <div className="emergency-info">
            <h4>ALO Eczane</h4>
            <p>182</p>
          </div>
        </a>
      </div>

      {/* Info about Gebze */}
      <h2 className="section-title">📍 Gebze Hakkında</h2>
      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {[
          { label: 'İl', value: 'Kocaeli', icon: '📍' },
          { label: 'Yüzölçümü', value: '473 km²', icon: '📐' },
          { label: 'Nüfus', value: '~500.000', icon: '👥' },
          { label: 'Organize Sanayi', value: '3 OSB', icon: '🏭' },
          { label: 'Tarihsel İsim', value: 'Libyssa', icon: '📜' },
          { label: 'İstanbul\'a Mesafe', value: '55 km', icon: '🛣️' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{item.label}</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9' }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
