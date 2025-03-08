import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaUsers, FaUserPlus, FaBolt, FaSignOutAlt, FaClock } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
        setMessage("❌ Failed to load protected data.");
      }
    };

    fetchProtectedData();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Dashboard</h2>

      {message && <p className="alert alert-danger">{message}</p>}

      {user && (
        <div className="dashboard-content">
          {/* User Profile Section */}
          <div className="user-card">
            <h3><FaUserCircle /> User Profile</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
          </div>

          {/* Quick Stats Section */}
          <div className="stats-container">
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <h4>Total Users</h4>
              <p>123</p>
            </div>
            <div className="stat-card">
              <FaUserPlus className="stat-icon" />
              <h4>New Registrations</h4>
              <p>25 Today</p>
            </div>
            <div className="stat-card">
              <FaBolt className="stat-icon" />
              <h4>Active Users</h4>
              <p>87 Online</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="activity-section">
            <h3>📜 Recent Activity</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Activity</th>
                  <th><FaClock /> Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{user.email}</td>
                  <td>Logged in</td>
                  <td>Just now</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>testuser@example.com</td>
                  <td>Registered</td>
                  <td>5 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
