import { useState } from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';

import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import ResetScreen from './components/auth/ResetScreen';

import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import CategoriesPage from './components/CategoriesPage';
import DiscoverPage from './components/DiscoverPage';
import ProfilePage from './components/ProfilePage';

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
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':       return <HomePage />;
      case 'search':     return <SearchPage />;
      case 'categories': return <CategoriesPage />;
      case 'discover':   return <DiscoverPage />;
      case 'profile':    return <ProfilePage />;
      default:           return <HomePage />;
    }
  };

  return (
    <div className="app">
      <TopBar />
      <main className="main">{renderPage()}</main>
      <BottomNav active={page} onChange={setPage} />
    </div>
  );
}

export default function App() {
  const { user } = useAuth();
  if (!user) return <AuthFlow />;
  return <MainApp />;
}
