import React, { useState, useEffect } from "react";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

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
          setMessage(`Error: ${data.error}`);
        }
      } catch (error) {
        setMessage("Failed to load protected data.");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {message && <p>{message}</p>}
      {user && (
        <div>
          <p>Welcome, {user.email}!</p>
          <p>UID: {user.uid}</p>
          <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>
            Logout
          </button>

        </div>
      )}
    </div>
  );
}

export default Dashboard;
