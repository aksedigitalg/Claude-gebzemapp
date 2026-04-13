import { useState } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import PharmaciesPage from './components/PharmaciesPage';
import HistoricalPage from './components/HistoricalPage';
import MapPage from './components/MapPage';
import SearchPage from './components/SearchPage';
import CategoriesPage from './components/CategoriesPage';
import ProfilePage from './components/ProfilePage';

function App() {
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

  // Bottom nav only shows 4 main tabs
  const navPage = ['home', 'search', 'categories', 'profile'].includes(page)
    ? page
    : 'home';

  return (
    <div className="app">
      <TopBar />
      <main className="main">
        {renderPage()}
      </main>
      <BottomNav active={navPage} onChange={setPage} />
    </div>
  );
}

export default App;
