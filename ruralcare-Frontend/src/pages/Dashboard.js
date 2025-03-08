import React, { useState, useEffect } from "react";
import { FaUser, FaHospital, FaCalendarAlt, FaHeartbeat, FaSignOutAlt } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Unauthorized: Please log in.");
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
          setMessage(`❌ Error: ${data.error}`);
        }
      } catch (error) {
        setMessage("❌ Failed to load data.");
      }
    };

    // Fetch nearby healthcare facilities (Example API Call)
    const fetchFacilities = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/healthcare-facilities");
        const data = await response.json();
        setFacilities(data.facilities);
      } catch (error) {
        setMessage("❌ Could not fetch facilities.");
      }
      setLoading(false);
    };

    fetchProtectedData();
    fetchFacilities();
  }, []);

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

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="btn btn-primary" onClick={() => alert("Launching AI Chatbot!")}>
          🤖 AI Symptom Checker
        </button>
        <button className="btn btn-success" onClick={() => alert("Booking Telehealth Appointment!")}>
          📅 Book Telehealth
        </button>
      </div>

      {/* Nearby Healthcare Facilities */}
      <div className="facilities-section">
        <h4>🏥 Nearby Healthcare Facilities</h4>
        {loading ? (
          <p>Loading facilities...</p>
        ) : (
          <div className="facility-grid">
            {facilities.length > 0 ? (
              facilities.map((facility, index) => (
                <div key={index} className="facility-card">
                  <FaHospital className="facility-icon" />
                  <h6>{facility.name}</h6>
                  <p>📍 {facility.address}</p>
                  <p>⌛ Wait Time: {facility.waitTime} mins</p>
                </div>
              ))
            ) : (
              <p>No facilities found.</p>
            )}
          </div>
        )}
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
