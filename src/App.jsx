import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PharmaciesPage from './components/PharmaciesPage';
import HistoricalPage from './components/HistoricalPage';
import MapPage from './components/MapPage';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'pharmacies':
        return <PharmaciesPage />;
      case 'historical':
        return <HistoricalPage />;
      case 'map':
        return <MapPage />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="main">{renderPage()}</main>
      <footer className="footer">
        <p>🏙️ Gebze Şehir Rehberi • Kocaeli, Türkiye • 2024</p>
        <p style={{ marginTop: '4px', fontSize: '12px' }}>
          Eczane bilgileri için: <strong>182 ALO Eczane</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
