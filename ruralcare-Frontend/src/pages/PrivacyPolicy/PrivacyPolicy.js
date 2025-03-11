// import 
import React from "react";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
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
  );
}

export default PrivacyPolicy;
