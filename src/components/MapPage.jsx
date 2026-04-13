import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { pharmacies } from '../data/pharmacies';
import { historicalPlaces } from '../data/historicalPlaces';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createIcon = (emoji, color) => {
  return L.divIcon({
    html: `<div style="
      background: ${color};
      border-radius: 50% 50% 50% 0;
      width: 36px;
      height: 36px;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      display:flex;align-items:center;justify-content:center;
    "><span style="transform:rotate(45deg);font-size:16px;display:block;text-align:center;line-height:30px;">${emoji}</span></div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

const pharmacyIcon = createIcon('💊', '#22c55e');
const dutyPharmacyIcon = createIcon('💊', '#ef4444');
const historicalIcon = createIcon('🏛️', '#f59e0b');

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 14);
  }, [center, map]);
  return null;
}

export default function MapPage() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const center = [40.8022, 29.4310];

  const markers = [
    ...(filter !== 'historical'
      ? pharmacies.map((p) => ({ ...p, type: 'pharmacy' }))
      : []),
    ...(filter !== 'pharmacies'
      ? historicalPlaces.map((p) => ({ ...p, type: 'historical' }))
      : []),
  ];

  return (
    <div>
      <h2 className="section-title">🗺️ Gebze Haritası</h2>

      {/* Filters */}
      <div className="map-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          🗺️ Tümü
        </button>
        <button
          className={`filter-btn ${filter === 'pharmacies' ? 'active' : ''}`}
          onClick={() => setFilter('pharmacies')}
        >
          💊 Eczaneler
        </button>
        <button
          className={`filter-btn ${filter === 'historical' ? 'active' : ''}`}
          onClick={() => setFilter('historical')}
        >
          🏛️ Tarihi Yerler
        </button>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '16px',
        flexWrap: 'wrap',
        fontSize: '13px',
        color: '#94a3b8'
      }}>
        {(filter === 'all' || filter === 'pharmacies') && (
          <>
            <span>🟢 Eczane</span>
            <span>🔴 Nöbetçi Eczane</span>
          </>
        )}
        {(filter === 'all' || filter === 'historical') && (
          <span>🟡 Tarihi Yer</span>
        )}
      </div>

      {/* Map */}
      <div className="map-container" style={{ height: '500px' }}>
        <MapContainer
          center={center}
          zoom={14}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap center={center} />

          {markers.map((item) => {
            const icon =
              item.type === 'pharmacy'
                ? item.onDuty
                  ? dutyPharmacyIcon
                  : pharmacyIcon
                : historicalIcon;
            return (
              <Marker
                key={`${item.type}-${item.id}`}
                position={[item.lat, item.lng]}
                icon={icon}
                eventHandlers={{ click: () => setSelected(item) }}
              >
                <Popup>
                  <div style={{ minWidth: '180px', fontFamily: 'Inter, sans-serif' }}>
                    <strong style={{ fontSize: '14px' }}>
                      {item.type === 'pharmacy' ? '💊' : '🏛️'} {item.name}
                    </strong>
                    {item.type === 'pharmacy' ? (
                      <div style={{ marginTop: '6px', fontSize: '12px', color: '#666' }}>
                        <p>📍 {item.address}</p>
                        <p>🕐 {item.hours}</p>
                        <p>📞 {item.phone}</p>
                        {item.onDuty && (
                          <span style={{
                            display: 'inline-block',
                            marginTop: '6px',
                            background: '#22c55e',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: '700'
                          }}>Nöbetçi</span>
                        )}
                      </div>
                    ) : (
                      <div style={{ marginTop: '6px', fontSize: '12px', color: '#666' }}>
                        <p>📍 {item.location}</p>
                        <p>📅 {item.period}</p>
                        <p>🎫 {item.entryFee}</p>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '16px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        {(filter === 'all' || filter === 'pharmacies') && (
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '10px',
            padding: '12px 18px',
            fontSize: '13px',
            color: '#94a3b8'
          }}>
            💊 <strong style={{ color: '#e2e8f0' }}>{pharmacies.length}</strong> Eczane &nbsp;|&nbsp;
            🟢 <strong style={{ color: '#22c55e' }}>{pharmacies.filter(p => p.onDuty).length}</strong> Nöbetçi
          </div>
        )}
        {(filter === 'all' || filter === 'historical') && (
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '10px',
            padding: '12px 18px',
            fontSize: '13px',
            color: '#94a3b8'
          }}>
            🏛️ <strong style={{ color: '#e2e8f0' }}>{historicalPlaces.length}</strong> Tarihi Yer
          </div>
        )}
      </div>
    </div>
  );
}
