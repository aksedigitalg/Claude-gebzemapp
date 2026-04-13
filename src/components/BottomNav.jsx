import { Home, Search, Grid3X3, Lightbulb, User } from 'lucide-react';

const items = [
  { id: 'home',       icon: Home },
  { id: 'search',     icon: Search },
  { id: 'categories', icon: Grid3X3 },
  { id: 'discover',   icon: Lightbulb },
  { id: 'profile',    icon: User },
];

export default function BottomNav({ active, onChange }) {
  return (
    <div className="bottom-nav-wrap">
      <div className="bottom-nav">
        <div className="bottom-nav-inner">
          {items.map(({ id, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${active === id ? 'active' : ''}`}
              onClick={() => onChange(id)}
            >
              <span className="nav-icon">
                <Icon size={22} strokeWidth={active === id ? 2.5 : 1.8} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
