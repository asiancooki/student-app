import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom pulsing icon
const userIcon = L.icon({
  iconUrl: '/current.svg',
  iconSize: [36, 36],     // explicitly size
  iconAnchor: [18, 18],   // center it
});

// 🔥 Updated MapResizer to accept trigger
const MapResizer = ({ trigger }) => {
    const map = useMap();
  
    useEffect(() => {
      const container = map.getContainer();
  
      const handleTransitionEnd = () => {
        map.invalidateSize();
      };
  
      container.addEventListener('transitionend', handleTransitionEnd);
  
      return () => {
        container.removeEventListener('transitionend', handleTransitionEnd);
      };
    }, [trigger, map]); // ✅ still listen for trigger + map
  
    return null;
  };
  

const MapView = ({ opportunities, showList }) => { // ✅ added showList prop
  const [center, setCenter] = useState([45.5017, -73.5673]);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setCenter(coords);
          setUserPosition(coords);
        },
        (err) => {
          console.error('Geolocation error:', err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);
  

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="custom-map"
    >
      <MapResizer trigger={showList} /> {/* ✅ pass showList to trigger invalidate */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      {opportunities.map((opp) => (
        <Marker key={opp.id} position={[opp.latitude, opp.longitude]}>
          <Popup>
            <strong>{opp.title}</strong><br />
            {opp.description}
          </Popup>
        </Marker>
      ))}
      {userPosition && (
        <Marker position={userPosition} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;
