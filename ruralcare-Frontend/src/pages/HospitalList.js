import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function HospitalMap({ facility }) {
  if (!facility || !facility.lat || !facility.lon) return <p>📍 Select a medical center to view it on the map.</p>;

  return (
    <MapContainer center={[facility.lat, facility.lon]} zoom={15} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[facility.lat, facility.lon]}>
        <Popup>{facility.name}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default HospitalMap;
