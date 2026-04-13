import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

const slides = [
  {
    emoji: '🏙️',
    title: 'Gebze Şehir Rehberi',
    desc: "Gebze'nin tüm bilgilerine tek uygulamadan kolayca ulaşın.",
  },
  {
    emoji: '💊',
    title: 'Nöbetçi Eczane',
    desc: 'Size en yakın nöbetçi eczaneyi anında bulun, tek tuşla arayın.',
  },
  {
    emoji: '🗺️',
    title: 'Harita & Tarihi Yerler',
    desc: "Gebze'nin tarihi güzelliklerini keşfedin, interaktif haritayla konumları görün.",
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuth();
  const [current, setCurrent] = useState(0);
  const slidesRef = useRef(null);

  const goTo = (index) => {
    setCurrent(index);
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  const next = () => {
    if (current < slides.length - 1) {
      goTo(current + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <div className="onboarding">
      {/* Slides */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div
          ref={slidesRef}
          style={{
            display: 'flex',
            height: '100%',
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="slide"
              style={{ minWidth: '100%' }}
            >
              <span className="slide-emoji">{slide.emoji}</span>
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="onboarding-footer">
        {/* Dots */}
        <div className="dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="onboarding-actions">
          {current < slides.length - 1 && (
            <button className="btn-skip" onClick={completeOnboarding}>
              Geç
            </button>
          )}
          <button className="btn-primary" onClick={next}>
            {current < slides.length - 1 ? 'Devam →' : 'Başlayalım 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}
