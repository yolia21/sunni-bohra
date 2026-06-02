'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Premium Marker Icons
const customIcon = (colorClass) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-dot ${colorClass}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const epicenterIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div class="marker-dot marker-epicenter"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Waypoint coordinates
const coordinates = {
  // Era 1 Nodes
  hejazYemen: [16.5, 44.0],
  levant: [33.5, 36.3],
  kufa: [32.03, 44.40],
  iran: [29.0, 53.0],
  arabianSea: [16.0, 63.0],
  cambay: [22.3, 72.6],
  surat: [21.17, 72.83],
  centralAsia: [39.0, 66.0],
  delhi: [28.6, 77.2],
  ahmedabad: [23.02, 72.57],
  bharuch: [21.7, 72.98],
  
  // Era 2 Nodes
  karachi: [24.86, 67.0],
  rangoon: [16.8, 96.2],
  mombasa: [-4.05, 39.66],
  darEsSalaam: [-6.8, 39.28],
  johannesburg: [-26.2, 28.0],
  durban: [-29.85, 31.0],
  uk: [53.5, -1.5],
  canada: [43.65, -79.38],
  malaysia: [3.14, 101.69],
  indonesia: [-6.21, 106.85],
  mauritius: [-20.16, 57.50],
  reunion: [-20.88, 55.45],
  zambia: [-15.42, 28.28],
  australia: [-33.87, 151.21],
  uae: [25.20, 55.27],
  thailand: [13.76, 100.50]
};

// Era 1 Routes: Medieval Convergence to Gujarat (solid Gold lines #D4AF37)
const era1Routes = [
  // Route A: Hejaz / Yemen ➔ Arabian Sea ➔ Cambay ➔ Surat
  [coordinates.hejazYemen, coordinates.arabianSea, coordinates.cambay, coordinates.surat],
  // Route B: Central Asia ➔ Delhi ➔ Ahmedabad ➔ Bharuch
  [coordinates.centralAsia, coordinates.delhi, coordinates.ahmedabad, coordinates.bharuch],
  // Route C: Levant ➔ Hejaz ➔ Arabian Sea ➔ Surat
  [coordinates.levant, [24.0, 39.0], coordinates.hejazYemen, coordinates.arabianSea, coordinates.surat],
  // Route D: Kufa ➔ Persian Gulf ➔ Strait of Hormuz ➔ Arabian Sea ➔ Surat
  [coordinates.kufa, [28.0, 50.0], [26.0, 56.0], coordinates.arabianSea, coordinates.surat],
  // Route E: Iran (Nawayat) ➔ Strait of Hormuz ➔ Arabian Sea ➔ Surat
  [coordinates.iran, [26.0, 56.0], coordinates.arabianSea, coordinates.surat]
];

// Era 2 Routes: The Modern Global Diaspora (dashed Crimson lines #991B1B radiating from Gujarat)
const era2Routes = [
  // 1947 Partition: Gujarat ➔ Karachi
  [coordinates.bharuch, coordinates.karachi],
  // Eastern Route: Gujarat ➔ Rangoon
  [coordinates.surat, coordinates.rangoon],
  // African Settlement: Gujarat ➔ Mombasa & Dar es Salaam ➔ Johannesburg & Durban
  [coordinates.surat, [5.0, 60.0], coordinates.mombasa, coordinates.darEsSalaam, coordinates.johannesburg, coordinates.durban],
  // Western Migration: Gujarat / Karachi ➔ UK ➔ North America
  [coordinates.surat, [30.0, 45.0], [45.0, 15.0], coordinates.uk],
  [coordinates.karachi, [30.0, 45.0], [45.0, 15.0], coordinates.uk],
  [coordinates.uk, [50.0, -40.0], coordinates.canada],
  // Southeast Asia: Gujarat ➔ Malaysia ➔ Indonesia
  [coordinates.surat, [10.0, 85.0], coordinates.malaysia, coordinates.indonesia],
  // Southern Indian Ocean: Gujarat ➔ Mauritius ➔ Reunion
  [coordinates.surat, [5.0, 65.0], [-10.0, 60.0], coordinates.mauritius, coordinates.reunion],
  // Central Africa: Gujarat ➔ Mombasa ➔ Zambia
  [coordinates.surat, [5.0, 60.0], coordinates.mombasa, coordinates.zambia],
  // Oceania: Gujarat ➔ Malaysia ➔ Australia
  [coordinates.surat, [10.0, 85.0], coordinates.malaysia, coordinates.australia],
  // Gulf Region: Gujarat ➔ UAE
  [coordinates.surat, coordinates.uae],
  // Southeast Asia Secondary: Gujarat ➔ Thailand
  [coordinates.surat, coordinates.thailand]
];

export default function DiasporaMap({ selectedCountry, onSelectCountry }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer
        center={[15.0, 60.0]}
        zoom={3}
        minZoom={2}
        maxZoom={8}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* --- Era 1 Polylines (Medieval Convergence - Gold) --- */}
        {era1Routes.map((route, idx) => (
          <Polyline
            key={`era1-${idx}`}
            positions={route}
            pathOptions={{ color: '#D4AF37', weight: 3, opacity: 0.85 }}
          />
        ))}

        {/* --- Era 2 Polylines (Modern Diaspora - Crimson Dashed) --- */}
        {era2Routes.map((route, idx) => (
          <Polyline
            key={`era2-${idx}`}
            positions={route}
            pathOptions={{ color: '#991B1B', weight: 3.5, opacity: 0.85, dashArray: '6, 8' }}
          />
        ))}

        {/* --- Era 1 Markers (Medieval Convergence - Gold) --- */}
        <Marker position={coordinates.hejazYemen} icon={customIcon('marker-gold')}>
          <Popup>
            <div className="map-popup-content">
              <strong>Hejaz & Yemen</strong>
              <p>Historical origin of Fatimid-Musta'li missionaries migrating across the Arabian Sea.</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={coordinates.levant} icon={customIcon('marker-gold')}>
          <Popup>
            <div className="map-popup-content">
              <strong>The Levant</strong>
              <p>Medieval migrations of scholars and merchants fleeing regional conflicts to find sanctuary in Gujarat.</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={coordinates.kufa} icon={customIcon('marker-gold')}>
          <Popup>
            <div className="map-popup-content">
              <strong>Kufa, Iraq</strong>
              <p>Early Alid and Hashimite migrations escaping Umayyad and Abbasid persecution, settling along the western coast of India.</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={coordinates.iran} icon={customIcon('marker-gold')}>
          <Popup>
            <div className="map-popup-content">
              <strong>Iran (Nawayat Migration)</strong>
              <p>Nawayat community migrations fleeing political turmoil in Persia via maritime routes to Gujarat and the Konkan coast.</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={coordinates.centralAsia} icon={customIcon('marker-gold')}>
          <Popup>
            <div className="map-popup-content">
              <strong>Central Asia</strong>
              <p>Overland migration routes originating from Transoxiana and Central Asian trade junctions.</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={coordinates.delhi} icon={customIcon('marker-gold')}>
          <Popup>
            <div className="map-popup-content">
              <strong>Delhi</strong>
              <p>Mughal/Delhi Sultanate scholarly linkages feeding Hanafi Sunni learning to Gujarat.</p>
            </div>
          </Popup>
        </Marker>

        {/* --- Epicenter (Gujarat) --- */}
        <Marker 
          position={coordinates.surat} 
          icon={epicenterIcon}
          eventHandlers={{
            click: () => onSelectCountry('india')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Gujarat Heartlands (Surat, Rander, Bharuch, Ahmedabad)</strong>
              <p>The cultural and economic epicenter of the Sunni Bohra community.</p>
            </div>
          </Popup>
        </Marker>

        {/* --- Era 2 Markers (Modern Global Diaspora - Crimson) --- */}
        <Marker 
          position={coordinates.karachi} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('pakistan')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Karachi & Sindh, Pakistan</strong>
              <p>Post-1947 partition merchant migration hubs.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.rangoon} 
          icon={customIcon('marker-crimson')}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Rangoon (Yangon), Burma</strong>
              <p>Historic 19th-20th century Southeast Asian shipping and trading settlements.</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={coordinates.mombasa} icon={customIcon('marker-crimson')}>
          <Popup>
            <div className="map-popup-content">
              <strong>Mombasa & Dar es Salaam</strong>
              <p>East African coastal hubs of Gujarati passenger Indian networks.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.durban} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('southafrica')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Natal & Transvaal, South Africa</strong>
              <p>Prominent settlements of Surti Sunni Vohras in Durban and Johannesburg.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.uk} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('uk')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>United Kingdom (Lancashire & Yorkshire)</strong>
              <p>Post-WWII industrial settlements and community centers.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.canada} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('canada')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>North America (Canada & United States)</strong>
              <p>Modern professional and academic diaspora networks.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.malaysia} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('malaysia')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Malaysia</strong>
              <p>Textile, spice, and wholesale shipping settlements in Penang, Malacca, and Kuala Lumpur.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.indonesia} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('indonesia')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Indonesia</strong>
              <p>Gujarati merchant houses in Batavia (Jakarta), Surabaya, and Sumatra port cities.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.mauritius} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('mauritius')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Mauritius (Port Louis)</strong>
              <p>Prominent 19th-century Surti Sunni merchants and founders of the Surti Mosque.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.reunion} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('reunion')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Reunion Island</strong>
              <p>Establishment of influential wholesale, retail, and real estate estates by Surti Sunni Vohras.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.zambia} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('zambia')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Zambia</strong>
              <p>Trading and manufacturing settlements in Lusaka, Chipata, and the Copperbelt region.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.australia} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('australia')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Australia</strong>
              <p>Thriving modern professional diaspora networks across Sydney, Melbourne, and Brisbane.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.uae} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('uae')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>United Arab Emirates (Dubai)</strong>
              <p>Prominent hub of modern traders, professionals, and corporate executives in the Gulf.</p>
            </div>
          </Popup>
        </Marker>

        <Marker 
          position={coordinates.thailand} 
          icon={customIcon('marker-crimson')}
          eventHandlers={{
            click: () => onSelectCountry('thailand')
          }}
        >
          <Popup>
            <div className="map-popup-content">
              <strong>Thailand (Bangkok)</strong>
              <p>19th-20th century Surti gem trading and wholesale businesses near the Chao Phraya River.</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* --- CSS Styled Map Legend overlay --- */}
      <div className="map-legend" style={{ position: 'absolute', bottom: '15px', right: '15px', zIndex: 1000 }}>
        <h4 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-accent)', color: 'var(--gold-glow)', fontSize: '0.85rem' }}>MIGRATION ERAS</h4>
        <div className="legend-item">
          <div className="legend-color legend-gold"></div>
          <span>Medieval Convergence (11th-15th C.)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-crimson"></div>
          <span>Modern Global Diaspora (19th-21st C.)</span>
        </div>
      </div>
    </div>
  );
}
