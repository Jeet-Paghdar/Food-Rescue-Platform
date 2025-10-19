// src/pages/MapView.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapView = ({ listings, userLocation, onMarkerClick }) => {
  return (
    <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={11} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      {listings.map(item => (
        <Marker key={item.id} position={item.coords}>
          <Popup>
            <div className="popup-content">
              <h5>{item.title}</h5>
              <p><strong>{item.distanceInKm} km away</strong></p>
              <button className="claim-btn" style={{width: '100%', marginTop: '5px'}} onClick={() => onMarkerClick(item)}>View Details</button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;