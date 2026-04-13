import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gebze_user');
    const savedOnboarding = localStorage.getItem('gebze_onboarding');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOnboarding) setOnboardingDone(true);
    setLoading(false);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('gebze_onboarding', 'done');
    setOnboardingDone(true);
  };

  const login = (userData) => {
    const u = { ...userData, loginAt: Date.now() };
    localStorage.setItem('gebze_user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('gebze_user');
    setUser(null);
  };

  // Simulated SMS OTP — real app would call an API here
  const sendOTP = (phone) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(`otp_${phone}`, code);
    console.info(`[DEV] OTP for ${phone}: ${code}`);
    return code; // returned so we can show it in demo banner
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

  const registerUser = (phone, name, surname) => {
    const users = JSON.parse(localStorage.getItem('gebze_users') || '[]');
    const newUser = { phone, name, surname, createdAt: Date.now() };
    users.push(newUser);
    localStorage.setItem('gebze_users', JSON.stringify(users));
    return newUser;
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      onboardingDone,
      completeOnboarding,
      login, logout,
      sendOTP, verifyOTP,
      isRegistered, registerUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
