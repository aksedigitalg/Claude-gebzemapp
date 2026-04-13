import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

export default function RegisterScreen({ phone, onBack }) {
  const { registerUser, login } = useAuth();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Ad alanı zorunludur.'); return; }
    if (!surname.trim()) { setError('Soyad alanı zorunludur.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const user = registerUser(phone, name.trim(), surname.trim());
    setDone(true);
    setTimeout(() => login(user), 1200);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="auth-screen">
        <div className="auth-container">
          <div className="success-screen">
            <div className="success-icon">🎉</div>
            <h2 className="auth-title">Hoşgeldiniz!</h2>
            <p className="auth-subtitle">
              Hesabınız oluşturuldu.<br />Gebze Şehir Rehberi'ne hoşgeldiniz.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <button className="btn-back" onClick={onBack}>← Geri</button>

        {/* Step indicator */}
        <div className="step-indicator">
          <div className="step-dot done" />
          <div className="step-line done" />
          <div className="step-dot done" />
          <div className="step-line done" />
          <div className="step-dot active" />
        </div>

        <h2 className="auth-title">Hesap Oluştur</h2>
        <p className="auth-subtitle">
          Son adım! Adınızı girerek kaydınızı tamamlayın.
        </p>

        <div className="phone-badge">
          📱 +90 {phone}
        </div>

        {error && (
          <div className="error-msg"><span>⚠️</span> {error}</div>
        )}

        <div className="input-group">
          <label className="input-label">Ad</label>
          <input
            className="input-field"
            type="text"
            placeholder="Adınız"
            value={name}
            onChange={e => { setName(e.target.value); setError(''); }}
            autoFocus
          />
        </div>

        <div className="input-group">
          <label className="input-label">Soyad</label>
          <input
            className="input-field"
            type="text"
            placeholder="Soyadınız"
            value={surname}
            onChange={e => { setSurname(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!name.trim() || !surname.trim() || loading}
          style={{ marginTop: 8 }}
        >
          {loading ? '⏳ Kaydediliyor...' : 'Kaydı Tamamla 🚀'}
        </button>
      </div>
    </div>
  );
}
