import { Home } from 'lucide-react';

export default function BottomNav() {
  return (
    <div className="bottom-nav-wrap">
      <div className="bottom-nav">
        <div className="bottom-nav-inner">
          <button className="nav-item active">
            <span className="nav-icon">
              <Home size={22} strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
