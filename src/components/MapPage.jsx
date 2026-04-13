import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { pharmacies } from '../data/pharmacies';
import { historicalPlaces } from '../data/historicalPlaces';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const makeIcon = (emoji, bg) => L.divIcon({
  html: `<div style="background:${bg};border-radius:50% 50% 50% 0;width:34px;height:34px;transform:rotate(-45deg);border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center"><span style="transform:rotate(45deg);font-size:15px;display:block;text-align:center;line-height:29px">${emoji}</span></div>`,
  className: '',
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

const pharIcon = makeIcon('💊', '#22c55e');
const dutyIcon = makeIcon('💊', '#ef4444');
const histIcon = makeIcon('🏛️', '#f59e0b');

function Recenter({ center }) {
  const map = useMap();
  useEffect(() => { map.setView(center, 14); }, [center, map]);
  return null;
}

export default function MapPage() {
  const [filter, setFilter] = useState('all');
  const center = [40.8022, 29.4310];

  const markers = [
    ...(filter !== 'historical' ? pharmacies.map(p => ({ ...p, _type: 'pharmacy' })) : []),
    ...(filter !== 'pharmacies' ? historicalPlaces.map(p => ({ ...p, _type: 'historical' })) : []),
  ];

  return (
    <div className="container">
      <div className="page-title">🗺️ Harita</div>

      <div className="filter-row">
        {[
          { id: 'all',        label: '🗺️ Tümü' },
          { id: 'pharmacies', label: '💊 Eczaneler' },
          { id: 'historical', label: '🏛️ Tarihi Yerler' },
        ].map(f => (
          <button key={f.id} className={`filter-pill ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="map-wrapper">
        <MapContainer center={center} zoom={14} style={{ height: '420px', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter center={center} />
          {markers.map(item => (
            <Marker
              key={`${item._type}-${item.id}`}
              position={[item.lat, item.lng]}
              icon={item._type === 'pharmacy' ? (item.onDuty ? dutyIcon : pharIcon) : histIcon}
            >
              <Popup>
                <div style={{ fontFamily: 'Inter,sans-serif', minWidth: 170 }}>
                  <strong style={{ fontSize: 13 }}>
                    {item._type === 'pharmacy' ? '💊' : '🏛️'} {item.name}
                  </strong>
                  <div style={{ marginTop: 6, fontSize: 12, color: '#555', lineHeight: 1.6 }}>
                    {item._type === 'pharmacy' ? (
                      <>
                        <div>📍 {item.address}</div>
                        <div>🕐 {item.hours}</div>
                        <div>📞 {item.phone}</div>
                        {item.onDuty && (
                          <span style={{ display:'inline-block', marginTop:5, background:'#22c55e', color:'#fff', padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700 }}>Nöbetçi</span>
                        )}
                      </>
                    ) : (
                      <>
                        <div>📍 {item.location}</div>
                        <div>📅 {item.period}</div>
                        <div>🎫 {item.entryFee}</div>
                      </>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="map-summary">
        {(filter === 'all' || filter === 'pharmacies') && (
          <div className="map-badge">
            💊 <strong style={{ color: '#e2e8f0' }}>{pharmacies.length}</strong> eczane &nbsp;·&nbsp;
            <strong style={{ color: '#22c55e' }}>{pharmacies.filter(p => p.onDuty).length}</strong> nöbetçi
          </div>
        )}
        {(filter === 'all' || filter === 'historical') && (
          <div className="map-badge">
            🏛️ <strong style={{ color: '#e2e8f0' }}>{historicalPlaces.length}</strong> tarihi yer
          </div>
        )}
      </div>
    </div>
  );
}
