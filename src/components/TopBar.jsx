import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TopBar() {
  const { logout } = useAuth();

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
        <button className="topbar-logout" onClick={logout}>
          <LogOut size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
