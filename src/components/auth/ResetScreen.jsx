import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

// Step 1: phone  →  Step 2: OTP  →  Step 3: new PIN  →  done
export default function ResetScreen({ onBack, onDone }) {
  const { sendOTP, verifyOTP } = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const otpRefs = useRef([]);

  /* ── Step 1: send OTP ── */
  const sendCode = async () => {
    if (phone.length < 10) { setError('Geçerli telefon numarası girin.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const code = sendOTP(phone);
    setOtpCode(code);
    setLoading(false);
    setError('');
    setStep(2);
  };

  /* ── Step 2: verify OTP ── */
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
      setDigits(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    }
  };

  /* ── Step 3: new PIN ── */
  const savePin = async () => {
    if (pin.length < 4) { setError('PIN en az 4 karakter olmalı.'); return; }
    if (pin !== pinConfirm) { setError('PIN\'ler eşleşmiyor.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    // In a real app: save hashed PIN to backend
    setDone(true);
    setLoading(false);
    setTimeout(onDone, 1500);
  };

  if (done) {
    return (
      <div className="auth-screen">
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
      <div className="auth-container">
        <button className="btn-back" onClick={step === 1 ? onBack : () => setStep(s => s - 1)}>
          ← Geri
        </button>

        {/* Step indicator */}
        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? 'done' : ''}`} />
          <div className={`step-line ${step >= 2 ? 'done' : ''}`} />
          <div className={`step-dot ${step >= 2 ? 'done' : ''} ${step === 2 ? 'active' : ''}`} />
          <div className={`step-line ${step >= 3 ? 'done' : ''}`} />
          <div className={`step-dot ${step === 3 ? 'active' : ''}`} />
        </div>

        {/* ── Step 1 ── */}
        {step === 1 && (
          <>
            <h2 className="auth-title">Şifre Yenile</h2>
            <p className="auth-subtitle">Kayıtlı telefon numaranızı girin.</p>

            {error && <div className="error-msg"><span>⚠️</span>{error}</div>}

            <div className="input-group">
              <label className="input-label">Telefon</label>
              <div className="input-prefix">
                <span className="prefix-flag">🇹🇷 +90</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="5XX XXX XX XX"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  autoFocus
                />
              </div>
            </div>

            <button className="btn-primary" onClick={sendCode} disabled={phone.length < 10 || loading}>
              {loading ? '⏳ Gönderiliyor...' : 'Kod Gönder →'}
            </button>
          </>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <>
            <h2 className="auth-title">Kodu Doğrula</h2>
            <p className="auth-subtitle">+90 {phone} numarasına gönderilen kodu girin.</p>

            <div className="otp-demo-banner">
              <span>🧪</span>
              <div>
                <div className="demo-label">Demo Kodu</div>
                <div className="demo-code">{otpCode}</div>
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
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <button className="btn-primary" onClick={() => verifyCode(digits.join(''))}
              disabled={digits.some(d => !d) || loading}>
              {loading ? '⏳ Doğrulanıyor...' : 'Doğrula ✓'}
            </button>
          </>
        )}

        {/* ── Step 3 ── */}
        {step === 3 && (
          <>
            <h2 className="auth-title">Yeni Şifre</h2>
            <p className="auth-subtitle">4+ karakterli yeni şifrenizi belirleyin.</p>

            {error && <div className="error-msg"><span>⚠️</span>{error}</div>}

            <div className="input-group">
              <label className="input-label">Yeni Şifre</label>
              <input
                className="input-field"
                type="password"
                placeholder="••••••"
                value={pin}
                onChange={e => { setPin(e.target.value); setError(''); }}
                autoFocus
              />
            </div>

            <div className="input-group">
              <label className="input-label">Şifre Tekrar</label>
              <input
                className={`input-field ${error ? 'error' : ''}`}
                type="password"
                placeholder="••••••"
                value={pinConfirm}
                onChange={e => { setPinConfirm(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && savePin()}
              />
            </div>

            <button className="btn-primary" onClick={savePin}
              disabled={!pin || !pinConfirm || loading} style={{ marginTop: 8 }}>
              {loading ? '⏳ Kaydediliyor...' : 'Şifreyi Güncelle ✓'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
