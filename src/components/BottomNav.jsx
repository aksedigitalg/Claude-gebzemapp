import { Home, Pill, Landmark, Map } from 'lucide-react';

const items = [
  { id: 'home',       icon: Home },
  { id: 'pharmacies', icon: Pill },
  { id: 'historical', icon: Landmark },
  { id: 'map',        icon: Map },
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
