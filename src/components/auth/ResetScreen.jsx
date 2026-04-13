import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

export default function ResetScreen({ onBack, onDone }) {
  const { sendOTP, verifyOTP, updatePassword } = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [digits, setDigits] = useState(['1','1','1','1','1','1']);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const otpRefs = useRef([]);

  const sendCode = async () => {
    if (phone.length < 10) { setError('Geçerli telefon numarası girin.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    sendOTP(phone);
    setDigits(['1','1','1','1','1','1']);
    setError('');
    setLoading(false);
    setStep(2);
  };

  const handleOtpChange = (i, val) => {
    const v = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setError('');
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
    if (next.every(d => d) && v) verifyCode(next.join(''));
  };

  const handleOtpKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const verifyCode = async (code) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const ok = verifyOTP(phone, code);
    setLoading(false);
    if (ok) { setStep(3); setError(''); }
    else {
      setError('Kod hatalı.');
      setDigits(['','','','','','']);
      otpRefs.current[0]?.focus();
    }
  };

  const savePassword = async () => {
    if (password.length < 4) { setError('Şifre en az 4 karakter olmalı.'); return; }
    if (password !== passwordConfirm) { setError('Şifreler eşleşmiyor.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    updatePassword(phone, password);
    setDone(true);
    setLoading(false);
    setTimeout(onDone, 1200);
  };

  if (done) {
    return (
      <div className="auth-screen">
        <div className="auth-safe-top" />
        <div className="auth-container">
          <div className="success-screen">
            <div className="success-icon">✅</div>
            <h2 className="auth-title">Şifre Güncellendi!</h2>
            <p className="auth-subtitle">Yeni şifrenizle giriş yapabilirsiniz.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-screen">
      <div className="auth-safe-top" />
      <div className="auth-container">
        <button className="btn-back" onClick={step === 1 ? onBack : () => setStep(s => s - 1)}>← Geri</button>

        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? 'done' : 'active'}`} />
          <div className={`step-line ${step >= 2 ? 'done' : ''}`} />
          <div className={`step-dot ${step === 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`} />
          <div className={`step-line ${step >= 3 ? 'done' : ''}`} />
          <div className={`step-dot ${step === 3 ? 'active' : ''}`} />
        </div>

        {step === 1 && (
          <>
            <h2 className="auth-title">Şifremi Unuttum</h2>
            <p className="auth-subtitle">Kayıtlı telefon numaranıza doğrulama kodu göndereceğiz.</p>
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
            <button className="btn-primary" onClick={sendCode} disabled={phone.length < 10 || loading}>
              {loading ? '⏳ Gönderiliyor...' : 'Kod Gönder →'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="auth-title">Kodu Girin</h2>
            <p className="auth-subtitle">+90 {phone} numarasına gönderilen 6 haneli kodu girin.</p>
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
            <button className="btn-primary" onClick={() => verifyCode(digits.join(''))} disabled={digits.some(d => !d) || loading}>
              {loading ? '⏳ Doğrulanıyor...' : 'Doğrula ✓'}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="auth-title">Yeni Şifre</h2>
            <p className="auth-subtitle">En az 4 karakterli yeni şifrenizi belirleyin.</p>
            {error && <div className="error-msg"><span>⚠️</span>{error}</div>}
            <div className="input-group">
              <label className="input-label">Yeni Şifre</label>
              <input
                className="input-field"
                type="password"
                placeholder="••••••"
                value={password}
                autoComplete="new-password"
                onChange={e => { setPassword(e.target.value); setError(''); }}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Şifre Tekrar</label>
              <input
                className={`input-field ${error ? 'error' : ''}`}
                type="password"
                placeholder="••••••"
                value={passwordConfirm}
                autoComplete="new-password"
                onChange={e => { setPasswordConfirm(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && savePassword()}
              />
            </div>
            <button className="btn-primary" onClick={savePassword} disabled={!password || !passwordConfirm || loading}>
              {loading ? '⏳ Kaydediliyor...' : 'Şifreyi Güncelle ✓'}
            </button>
          </>
        )}

      </div>
      <div className="auth-safe-bottom" />
    </div>
  );
}
