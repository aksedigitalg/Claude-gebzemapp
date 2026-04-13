import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

export default function OTPScreen({ phone, otpCode, onSuccess, onBack }) {
  const { verifyOTP, sendOTP, isRegistered } = useAuth();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [currentCode, setCurrentCode] = useState(otpCode);
  const inputs = useRef([]);

  useEffect(() => {
    const t = setInterval(() => setTimer(p => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const handleChange = (i, val) => {
    const v = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setError('');
    if (v && i < 5) inputs.current[i + 1]?.focus();
    if (next.every(d => d !== '') && v) {
      // auto-verify when all 6 filled
      verify(next.join(''));
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) {
      const next = text.split('');
      setDigits(next);
      inputs.current[5]?.focus();
      verify(text);
    }
  };

  const verify = async (code) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const ok = verifyOTP(phone, code);
    setLoading(false);
    if (ok) {
      const existing = isRegistered(phone);
      onSuccess({ phone, isNewUser: !existing, existingUser: existing });
    } else {
      setError('Kod hatalı. Lütfen tekrar deneyin.');
      setDigits(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = digits.join('');
    if (code.length < 6) { setError('Lütfen 6 haneli kodu girin.'); return; }
    verify(code);
  };

  const resend = () => {
    const code = sendOTP(phone);
    setCurrentCode(code);
    setTimer(60);
    setDigits(['', '', '', '', '', '']);
    setError('');
    inputs.current[0]?.focus();
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <button className="btn-back" onClick={onBack}>
          ← Geri
        </button>

        <h2 className="auth-title">SMS Kodu</h2>
        <p className="auth-subtitle">
          <strong style={{ color: '#e2e8f0' }}>+90 {phone}</strong> numarasına gönderilen 6 haneli kodu girin.
        </p>

        {/* Demo banner */}
        <div className="otp-demo-banner">
          <span>🧪</span>
          <div>
            <div className="demo-label">Demo Kodu (gerçek SMS yok)</div>
            <div className="demo-code">{currentCode}</div>
          </div>
        </div>

        {error && (
          <div className="error-msg">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* OTP inputs */}
        <div className="otp-group" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => inputs.current[i] = el}
              className={`otp-input ${d ? 'filled' : ''} ${error ? 'error' : ''}`}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              autoFocus={i === 0}
            />
          ))}
        </div>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={digits.some(d => d === '') || loading}
        >
          {loading ? '⏳ Doğrulanıyor...' : 'Doğrula ✓'}
        </button>

        <div className="resend-row">
          {timer > 0 ? (
            <span className="resend-timer">Yeniden gönder ({timer}s)</span>
          ) : (
            <button className="resend-btn" onClick={resend}>
              Kodu yeniden gönder
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
