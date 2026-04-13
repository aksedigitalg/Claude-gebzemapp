import { ChevronRight } from 'lucide-react';

const categories = [
  {
    icon: '💊',
    bg: '#0d2318',
    label: 'Eczaneler',
    sub: '6 eczane · 3 nöbetçi',
    page: 'pharmacies',
  },
  {
    icon: '🏛️',
    bg: '#1c1810',
    label: 'Tarihi Yerler',
    sub: 'Osmanlı, Bizans ve antik eserler',
    page: 'historical',
  },
  {
    icon: '🗺️',
    bg: '#0d1a35',
    label: 'İnteraktif Harita',
    sub: 'Tüm konumları haritada gör',
    page: 'map',
  },
  {
    icon: '🚨',
    bg: '#200d0d',
    label: 'Acil Hatlar',
    sub: '112, 110, 155, 156, 182...',
    page: 'home',
  },
  {
    icon: '🌤️',
    bg: '#0d1520',
    label: 'Hava Durumu',
    sub: 'Gebze • 18°C • Parçalı Bulutlu',
    page: 'home',
  },
  {
    icon: '🏭',
    bg: '#151520',
    label: 'Sanayi & OSB',
    sub: '3 Organize Sanayi Bölgesi',
    page: 'home',
  },
];

export default function CategoriesPage({ setPage }) {
  return (
    <div className="container">
      <div className="page-title">📂 Kategoriler</div>
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="category-card"
            onClick={() => setPage(cat.page)}
          >
            <div className="category-card-icon" style={{ background: cat.bg }}>
              {cat.icon}
            </div>
            <div className="category-card-info">
              <h3>{cat.label}</h3>
              <p>{cat.sub}</p>
            </div>
            <ChevronRight size={18} className="category-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
}
