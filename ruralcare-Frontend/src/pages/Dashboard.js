import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHeartbeat, FaSignOutAlt, FaMapMarkerAlt, FaClock, FaHospital, FaClinicMedical, FaPills } from "react-icons/fa";
import "./Dashboard.css";
import HospitalMap from "./HospitalMap";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [facilityType, setFacilityType] = useState("hospital");

  // Fetch User Authentication
  const fetchProtectedData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Unauthorized: Please log in.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/protected", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        setMessage(`Error: ${data.error}`);
        window.location.href = "/login";
      }
    } catch (error) {
      setMessage("Failed to load user data.");
      window.location.href = "/login";
    }
  }, []);

  // Fetch Nearby Healthcare Facilities
  const fetchFacilities = useCallback(() => {
    setLoading(true);
    setMessage("");

    if (!navigator.geolocation) {
      setMessage(" Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(`📍 User Location: Lat: ${lat}, Lon: ${lon}`);

        try {
          const response = await fetch(
            `http://localhost:8080/api/healthcare-facilities?lat=${lat}&lon=${lon}&type=${facilityType}`
          );
          const data = await response.json();

          if (data.facilities) {
            setFacilities(data.facilities);
          } else {
            setFacilities([]);
          }
        } catch (error) {
          setMessage(" Could not fetch facilities.");
        }
        setLoading(false);
      },
      (error) => {
        console.error(" Location Access Denied:", error);
        setMessage(" Please enable location access to find nearby healthcare facilities.");
        setLoading(false);
      }
    );
  }, [facilityType]);

  useEffect(() => {
    fetchProtectedData();
  }, [fetchProtectedData]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">
        <FaHeartbeat className="dashboard-icon" /> Dashboard
      </h2>

      {message && <p className="alert alert-danger">{message}</p>}

      {user && (
        <div className="card profile-card">
          <h5><FaUser /> User Profile</h5>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.uid}</p>
        </div>
      )}

      {/* Facility Filter & Fetch Button */}
      <div className="facility-controls">
        <label>Filter:</label>
        <select value={facilityType} onChange={(e) => setFacilityType(e.target.value)}>
          <option value="hospital">🏥 Hospitals</option>
          <option value="clinic">🏥 Clinics</option>
          <option value="pharmacy">💊 Pharmacies</option>
        </select>
        <button className="btn btn-primary fetch-btn" onClick={fetchFacilities} disabled={loading}>
          {loading ? "🔄 Loading..." : "🔍 Show Facilities"}
        </button>
      </div>

      {/* Facility List */}
      <div className="hospital-list-section">
        <h4>🏥 Nearby Healthcare Facilities</h4>
        {loading ? (
          <p className="loading-text">⏳ Loading facilities...</p>
        ) : (
          <ul className="facility-list">
            {facilities.length > 0 ? (
              facilities.map((facility, index) => (
                <li key={index} onClick={() => setSelectedFacility(facility)} className="facility-item">
                  {facilityType === "hospital" && <FaHospital className="facility-icon hospital" />}
                  {facilityType === "clinic" && <FaClinicMedical className="facility-icon clinic" />}
                  {facilityType === "pharmacy" && <FaPills className="facility-icon pharmacy" />}
                  <span className="facility-name">{facility.name}</span>
                  <span className="facility-address"><FaMapMarkerAlt /> {facility.address}</span>
                  {facility.waitTime && <span className="facility-wait"><FaClock /> {facility.waitTime} mins</span>}
                </li>
              ))
            ) : (
              <p>No facilities found.</p>
            )}
          </ul>
        )}
      </div>

      {/* Selected Facility Details & Map */}
      {selectedFacility && (
        <div className="selected-facility-card">
          <h5><strong>Selected Facility:</strong></h5>
          <p className="selected-facility-name">{selectedFacility.name}</p>
          <p><FaMapMarkerAlt /> {selectedFacility.address}</p>
          {selectedFacility.waitTime && <p><FaClock /> Wait Time: {selectedFacility.waitTime} mins</p>}

          {/*  Show the map here */}
          <div className="map-container">
            <HospitalMap facility={selectedFacility} />
          </div>
        </div>
      )}

      {/* Chatbot Section (Redirects to Chat Page) */}
      <div className="chatbot-section">
        <h4>💬 Chat with RuralCare AI</h4>
        <p>Click the button below to start a conversation with our AI bot.</p>
        <Link to="/chat" className="btn btn-primary">Go to Chat</Link>
      </div>

      {/* Logout Button */}
      <button className="btn btn-danger logout-btn" onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default Dashboard;
