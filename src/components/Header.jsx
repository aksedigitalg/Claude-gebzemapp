import { MapPin, Pill, Landmark, Map, Home } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Anasayfa', icon: Home },
  { id: 'pharmacies', label: 'Eczaneler', icon: Pill },
  { id: 'historical', label: 'Tarihi Yerler', icon: Landmark },
  { id: 'map', label: 'Harita', icon: Map },
];

export default function Header({ activePage, setActivePage }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">🏙️</div>
          <div className="logo-text">
            <h1>Gebze Şehir Rehberi</h1>
            <span>Kocaeli • Türkiye</span>
          </div>
        </div>
        <nav className="nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-btn ${activePage === id ? 'active' : ''}`}
              onClick={() => setActivePage(id)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
