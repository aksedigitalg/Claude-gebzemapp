import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

export default function PhoneScreen({ onNext }) {
  const { sendOTP } = useAuth();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    setError('');
  };

  const handleSubmit = async () => {
    if (phone.length < 10) {
      setError('Lütfen geçerli bir telefon numarası girin.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // simulate network
    const code = sendOTP(phone);
    setLoading(false);
    onNext({ phone, otpCode: code });
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">🏙️</div>
          <h1>Gebze</h1>
          <span>Şehir Rehberi</span>
        </div>

        <h2 className="auth-title">Giriş Yap</h2>
        <p className="auth-subtitle">
          Telefon numaranızı girin, size SMS ile doğrulama kodu gönderelim.
        </p>

        {error && (
          <div className="error-msg">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="input-group">
          <label className="input-label">Telefon Numarası</label>
          <div className="input-prefix">
            <span className="prefix-flag">🇹🇷 +90</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="5XX XXX XX XX"
              value={phone}
              onChange={handleChange}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={phone.length < 10 || loading}
          style={{ marginTop: 8 }}
        >
          {loading ? '⏳ Gönderiliyor...' : 'SMS Kodu Gönder →'}
        </button>

        <p className="terms-text">
          Devam ederek{' '}
          <a href="#">Kullanım Şartları</a>'nı ve{' '}
          <a href="#">Gizlilik Politikası</a>'nı kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  );
}
