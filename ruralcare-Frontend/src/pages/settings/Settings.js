import React, { useState, useEffect, useCallback } from "react";
import "./Settings.css";

function Settings() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePic: "https://via.placeholder.com/50",
  });
  const [activeSection, setActiveSection] = useState("Profile");
  const [message, setMessage] = useState("");

  // Fetch User Data from Firestore
  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Unauthorized: Please log in.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/protected", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok && data.user) {
        setUser({
          fullName: data.user.name || "Unknown",
          email: data.user.email || "",
          phone: data.user.phoneNumber || "",
          profilePic: data.user.profilePic || "https://via.placeholder.com/50",
        });
        setMessage("");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Failed to load user data. Check your network connection.");
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Handle Profile Updates
  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Unauthorized: Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.fullName,
          phoneNumber: user.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Failed to update profile. Try again later.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle Profile Picture Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-container">
      <div className="sidebar">
        <h3>⚙️ Settings</h3>
        <ul>
          <li onClick={() => setActiveSection("Profile")} className={activeSection === "Profile" ? "active" : ""}>Profile</li>
          <li onClick={() => setActiveSection("Privacy")} className={activeSection === "Privacy" ? "active" : ""}>Privacy</li>
          <li onClick={() => setActiveSection("About")} className={activeSection === "About" ? "active" : ""}>About</li>
          <li onClick={() => setActiveSection("PrivacyPolicy")} className={activeSection === "PrivacyPolicy" ? "active" : ""}>Privacy Policy</li>
        </ul>
      </div>

      <div className="settings-content">
        {message && <p className="alert alert-danger">{message}</p>}

        {/* Profile Section */}
        {activeSection === "Profile" && (
          <>
            <h2>Profile</h2>
            <p>Manage your profile settings</p>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={user.fullName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={user.email} disabled />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phone" value={user.phone} onChange={handleChange} />
            </div>

            <div className="profile-picture">
              <img src={user.profilePic} alt="Profile" className="profile-img" />
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            </div>

            <button className="update-btn" onClick={handleUpdateProfile}>Update</button>
          </>
        )}

        {/* Privacy Section */}
        {activeSection === "Privacy" && (
          <>
            <h2>Privacy</h2>
            <p>Manage your privacy settings and preferences.</p>
          </>
        )}

        {/* About Section */}
        {activeSection === "About" && (
          <>
            <div className="about-container">
              <h2>📖 About RuralCare</h2>
              <p>
                RuralCare is an AI-powered healthcare platform designed to assist people in rural areas by providing real-time health navigation, chatbot-based symptom assessments, and telehealth service.
              </p>
              <p>
                Our goal is to reduce ER congestion, improve access to healthcare, and help users find the nearest healthcare facilities efficiently.
              </p>
            </div>
          </>
        )}

        {/* Privacy Policy Section */}
        {activeSection === "PrivacyPolicy" && (
          <>
            <div className="privacy-container">
              <h2>🔒 Privacy Policy</h2>
              <p>
                Your privacy is important to us. We do not share or sell your data. Your personal information is securely stored and only used to enhance your healthcare experience.
              </p>
              <h3>What Data We Collect:</h3>
              <ul>
                <li>Basic user details (name, email, age, etc.)</li>
                <li>Chat interactions (to improve chatbot responses)</li>
                <li>Location data (only when searching for healthcare facilities)</li>
              </ul>
              <p>For questions, contact us at: <strong>support@ruralcare.com</strong></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Settings;
