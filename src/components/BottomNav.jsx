import { Home, Search, Grid3X3, User } from 'lucide-react';

const items = [
  { id: 'home',       label: 'Anasayfa',   icon: Home },
  { id: 'search',     label: 'Arama',      icon: Search },
  { id: 'categories', label: 'Kategoriler',icon: Grid3X3 },
  { id: 'profile',    label: 'Profil',     icon: User },
];

export default function BottomNav({ active, onChange }) {
  return (
    <div className="bottom-nav-wrap">
      <div className="bottom-nav">
        <div className="bottom-nav-inner">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${active === id ? 'active' : ''}`}
              onClick={() => onChange(id)}
            >
              <span className="nav-icon">
                <Icon size={20} strokeWidth={active === id ? 2.5 : 1.8} />
              </span>
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
