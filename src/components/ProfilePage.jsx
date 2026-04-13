export default function ProfilePage() {
  const menuItems = [
    { icon: '📍', label: 'Konumum', sub: 'Gebze, Kocaeli' },
    { icon: '🔔', label: 'Bildirimler', sub: 'Nöbetçi eczane uyarıları' },
    { icon: '🌙', label: 'Tema', sub: 'Koyu mod' },
    { icon: '🌐', label: 'Dil', sub: 'Türkçe' },
    { icon: '📞', label: 'İletişim', sub: 'Gebze Belediyesi' },
    { icon: 'ℹ️', label: 'Hakkında', sub: 'Gebze Şehir Rehberi v1.0' },
  ];

  return (
    <div className="container">
      <div className="page-title">👤 Profil</div>

      {/* Avatar */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div className="profile-avatar">🏙️</div>
        <div className="profile-name">Gebze Sakinleri</div>
        <div className="profile-sub">Gebze, Kocaeli · Türkiye</div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 10,
        marginBottom: 28,
      }}>
        {[
          { num: '6', label: 'Eczane' },
          { num: '3', label: 'Nöbetçi' },
          { num: '6', label: 'Tarihi Yer' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#141f35',
            border: '1px solid #1e2d45',
            borderRadius: 14,
            padding: '14px 8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#3b82f6' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="section-label">⚙️ Ayarlar</div>
      <div className="profile-menu">
        {menuItems.map(item => (
          <button key={item.label} className="profile-menu-item">
            <span className="menu-icon">{item.icon}</span>
            <div>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>
                {item.label}
              </span>
              <span style={{ fontSize: 12, color: '#475569' }}>{item.sub}</span>
            </div>
            <span className="menu-arrow">›</span>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: '#334155' }}>
        🏙️ Gebze Şehir Rehberi · 2024<br />
        Eczane bilgileri için <strong style={{ color: '#475569' }}>182</strong>
      </div>
    </div>
  );
}
