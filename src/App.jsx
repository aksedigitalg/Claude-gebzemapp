import { useState } from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';

import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import ResetScreen from './components/auth/ResetScreen';

import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';

function AuthFlow() {
  const [screen, setScreen] = useState('login');

  if (screen === 'login') {
    return (
      <LoginScreen
        onRegister={() => setScreen('register')}
        onReset={() => setScreen('reset')}
      />
    );
  }
  if (screen === 'register') {
    return <RegisterScreen onBack={() => setScreen('login')} />;
  }
  if (screen === 'reset') {
    return (
      <ResetScreen
        onBack={() => setScreen('login')}
        onDone={() => setScreen('login')}
      />
    );
  }
  return null;
}

function MainApp() {
  return (
    <div className="app">
      <TopBar />
      <main className="main">
        <HomePage />
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 48,
      }}>
        🏙️
      </div>
    );
  }

  if (!user) return <AuthFlow />;
  return <MainApp />;
}
