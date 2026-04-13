import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

export default function LoginScreen({ onRegister, onReset }) {
  const { isRegistered, login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (phone.length < 10) { setError('Geçerli telefon numarası girin.'); return; }
    if (!password) { setError('Şifre boş bırakılamaz.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const user = isRegistered(phone);
    if (!user) { setError('Bu numara kayıtlı değil. Lütfen kayıt olun.'); setLoading(false); return; }
    if (user.password !== password) { setError('Şifre hatalı.'); setLoading(false); return; }
    login(user);
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">

        <div className="auth-logo">
          <div className="auth-logo-icon">🏙️</div>
          <h1>Gebze</h1>
          <span>Şehir Rehberi</span>
        </div>

        <h2 className="auth-title">Giriş Yap</h2>
        <p className="auth-subtitle">Telefon ve şifrenizle giriş yapın.</p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <div className="input-group">
          <label className="input-label">Telefon Numarası</label>
          <div className="phone-input-row">
            <span className="phone-prefix">+90</span>
            <input
              className="phone-input"
              type="tel"
              inputMode="numeric"
              placeholder="5XXXXXXXXX"
              value={phone}
              onChange={e => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Şifre</label>
          <input
            className="input-field"
            type="password"
            placeholder="Şifreniz"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
          />
        </div>

        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <button className="auth-link" onClick={onReset}>Şifremi unuttum</button>
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? '⏳ Giriş yapılıyor...' : 'Giriş Yap →'}
        </button>

        <div className="auth-link-row">
          Hesabınız yok mu?{' '}
          <button className="auth-link" onClick={onRegister}>Kayıt Ol</button>
        </div>

      </div>
    </div>
  );
}
