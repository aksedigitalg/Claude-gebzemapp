import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gebze_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = (userData) => {
    const u = { ...userData, loginAt: Date.now() };
    localStorage.setItem('gebze_user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('gebze_user');
    setUser(null);
  };

  // Sabit demo OTP — gerçek SMS entegrasyonuna kadar 111111
  const sendOTP = (phone) => {
    const code = '111111';
    sessionStorage.setItem(`otp_${phone}`, code);
    return code;
  };

  const verifyOTP = (phone, code) => {
    const saved = sessionStorage.getItem(`otp_${phone}`);
    if (saved === code) {
      sessionStorage.removeItem(`otp_${phone}`);
      return true;
    }
    return false;
  };

  const isRegistered = (phone) => {
    const users = JSON.parse(localStorage.getItem('gebze_users') || '[]');
    return users.find(u => u.phone === phone) || null;
  };

  const registerUser = (phone, name, surname, password) => {
    const users = JSON.parse(localStorage.getItem('gebze_users') || '[]');
    const newUser = { phone, name, surname, password, createdAt: Date.now() };
    users.push(newUser);
    localStorage.setItem('gebze_users', JSON.stringify(users));
    return newUser;
  };

  const updatePassword = (phone, password) => {
    const users = JSON.parse(localStorage.getItem('gebze_users') || '[]');
    const updated = users.map(u => u.phone === phone ? { ...u, password } : u);
    localStorage.setItem('gebze_users', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      login, logout,
      sendOTP, verifyOTP,
      isRegistered, registerUser, updatePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
