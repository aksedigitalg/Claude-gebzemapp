export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-logo">
          <div className="topbar-logo-icon">🏙️</div>
          <div className="topbar-logo-text">
            <strong>Gebze</strong>
            <span>Şehir Rehberi</span>
          </div>
        </div>
        <div className="topbar-badge">
          <span className="dot" />
          Kocaeli
        </div>
      </div>
    </div>
  );
}
