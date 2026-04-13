import { useState } from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';

// Auth screens
import OnboardingScreen from './components/auth/OnboardingScreen';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import ResetScreen from './components/auth/ResetScreen';

// App screens
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import PharmaciesPage from './components/PharmaciesPage';
import HistoricalPage from './components/HistoricalPage';
import MapPage from './components/MapPage';
import SearchPage from './components/SearchPage';
import CategoriesPage from './components/CategoriesPage';
import ProfilePage from './components/ProfilePage';

// Auth flow: login | register | reset
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

// Main app (after login)
function MainApp() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':        return <HomePage setPage={setPage} />;
      case 'search':      return <SearchPage setPage={setPage} />;
      case 'categories':  return <CategoriesPage setPage={setPage} />;
      case 'profile':     return <ProfilePage />;
      case 'pharmacies':  return <PharmaciesPage />;
      case 'historical':  return <HistoricalPage />;
      case 'map':         return <MapPage />;
      default:            return <HomePage setPage={setPage} />;
    }
  };

  const navPage = ['home', 'search', 'categories', 'profile'].includes(page)
    ? page : 'home';

  return (
    <div className="app">
      <TopBar />
      <main className="main">{renderPage()}</main>
      <BottomNav active={navPage} onChange={setPage} />
    </div>
  );
}

// Root — decides which flow to show
export default function App() {
  const { loading, onboardingDone, user } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0b1120',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 48,
      }}>
        🏙️
      </div>
    );
  }

  if (!onboardingDone) return <OnboardingScreen />;
  if (!user) return <AuthFlow />;
  return <MainApp />;
}
