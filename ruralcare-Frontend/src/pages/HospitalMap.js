import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom hospital/clinic/pharmacy icons
const medicalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966484.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function HospitalMap({ selectedFacility }) {
  if (!selectedFacility) return <p>🗺️ Select a medical center to view it on the map.</p>;

  return (
    <MapContainer center={[selectedFacility.lat, selectedFacility.lon]} zoom={15} style={{ height: "400px", width: "100%", borderRadius: "10px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[selectedFacility.lat, selectedFacility.lon]} icon={medicalIcon}>
        <Popup>
          <strong>{selectedFacility.name}</strong> <br />
          📍 Location: {selectedFacility.lat}, {selectedFacility.lon}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default HospitalMap;
