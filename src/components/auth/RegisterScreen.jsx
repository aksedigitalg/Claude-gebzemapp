import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

export default function RegisterScreen({ onBack }) {
  const { sendOTP, verifyOTP, registerUser, login } = useAuth();
  const [step, setStep] = useState(1); // 1: form, 2: otp
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [digits, setDigits] = useState(['1','1','1','1','1','1']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const otpRefs = useRef([]);

  /* ── Step 1: bilgileri doldur → OTP gönder ── */
  const handleSend = async () => {
    if (phone.length < 10) { setError('Geçerli telefon numarası girin.'); return; }
    if (!name.trim()) { setError('Ad alanı zorunludur.'); return; }
    if (!surname.trim()) { setError('Soyad alanı zorunludur.'); return; }
    if (password.length < 4) { setError('Şifre en az 4 karakter olmalıdır.'); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    sendOTP(phone);
    setDigits(['1','1','1','1','1','1']);
    setError('');
    setLoading(false);
    setStep(2);
  };

  /* ── Step 2: OTP doğrula ── */
  const handleOtpChange = (i, val) => {
    const v = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setError('');
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
    if (next.every(d => d) && v) verifyAndRegister(next.join(''));
  };

  const handleOtpKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const verifyAndRegister = async (code) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const ok = verifyOTP(phone, code);
    if (!ok) {
      setError('Kod hatalı.');
      setDigits(['','','','','','']);
      otpRefs.current[0]?.focus();
      setLoading(false);
      return;
    }
    const user = registerUser(phone, name.trim(), surname.trim(), password);
    setDone(true);
    setLoading(false);
    setTimeout(() => login(user), 1000);
  };

  if (done) {
    return (
      <div className="auth-screen">
        <div className="auth-safe-top" />
        <div className="auth-container">
          <div className="success-screen">
            <div className="success-icon">🎉</div>
            <h2 className="auth-title">Hoşgeldiniz!</h2>
            <p className="auth-subtitle">{name}, hesabınız oluşturuldu.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-screen">
      <div className="auth-safe-top" />
      <div className="auth-container">
        <button className="btn-back" onClick={step === 1 ? onBack : () => setStep(1)}>← Geri</button>

        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? 'done' : 'active'}`} />
          <div className={`step-line ${step >= 2 ? 'done' : ''}`} />
          <div className={`step-dot ${step === 2 ? 'active' : ''}`} />
        </div>

        {/* ── Step 1: Form ── */}
        {step === 1 && (
          <>
            <h2 className="auth-title">Kayıt Ol</h2>
            <p className="auth-subtitle">Bilgilerinizi girerek hesap oluşturun.</p>

            {error && <div className="error-msg"><span>⚠️</span>{error}</div>}

            <div className="input-group">
              <label className="input-label">Telefon</label>
              <div className="input-prefix-wrap">
                <span className="input-prefix-flag">🇹🇷 +90</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="5XX XXX XX XX"
                  value={phone}
                  autoComplete="tel"
                  onChange={e => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Ad</label>
              <input
                className="input-field"
                type="text"
                placeholder="Adınız"
                value={name}
                autoComplete="given-name"
                onChange={e => { setName(e.target.value); setError(''); }}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Soyad</label>
              <input
                className="input-field"
                type="text"
                placeholder="Soyadınız"
                value={surname}
                autoComplete="family-name"
                onChange={e => { setSurname(e.target.value); setError(''); }}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Şifre</label>
              <input
                className="input-field"
                type="password"
                placeholder="En az 4 karakter"
                value={password}
                autoComplete="new-password"
                onChange={e => { setPassword(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
            </div>

            <button className="btn-primary" onClick={handleSend} disabled={loading}>
              {loading ? '⏳ Gönderiliyor...' : 'Devam Et →'}
            </button>
          </>
        )}

        {/* ── Step 2: OTP ── */}
        {step === 2 && (
          <>
            <h2 className="auth-title">Doğrulama</h2>
            <p className="auth-subtitle">
              <strong style={{ color: '#e2e8f0' }}>+90 {phone}</strong> numarasına gönderilen kodu girin.
            </p>

            <div className="otp-demo-banner">
              <span>🧪</span>
              <div>
                <div className="demo-label">Demo — Otomatik kod</div>
                <div className="demo-code">1 1 1 1 1 1</div>
              </div>
            </div>

            {error && <div className="error-msg"><span>⚠️</span>{error}</div>}

            <div className="otp-group">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => otpRefs.current[i] = el}
                  className={`otp-input ${d ? 'filled' : ''} ${error ? 'error' : ''}`}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKey(i, e)}
                />
              ))}
            </div>

            <button
              className="btn-primary"
              onClick={() => verifyAndRegister(digits.join(''))}
              disabled={digits.some(d => !d) || loading}
            >
              {loading ? '⏳ Kayıt yapılıyor...' : 'Kaydı Tamamla 🚀'}
            </button>
          </>
        )}

      </div>
      <div className="auth-safe-bottom" />
    </div>
  );
}
