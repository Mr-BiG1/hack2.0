import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", dob: "", address: "", age: "", 
    weight: "", height: "", phoneNumber: "", condition: "", history: ""
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step Navigation
  const nextStep = () => { if (step < 3) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  // Handle Final Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(" Registration successful!");
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(" Network error. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="form-title">📝 Register</h2>

      {/* Stepper UI */}
      <div className="stepper-wrapper">
        <div className={`step ${step === 1 ? "active" : ""}`}>1</div>
        <div className={`step-line ${step >= 2 ? "active-line" : ""}`}></div>
        <div className={`step ${step === 2 ? "active" : ""}`}>2</div>
        <div className={`step-line ${step >= 3 ? "active-line" : ""}`}></div>
        <div className={`step ${step === 3 ? "active" : ""}`}>3</div>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* Step 1 */}
        {step === 1 && (
          <div className={`step-content ${step === 1 ? "active" : ""}`}>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className={`step-content ${step === 2 ? "active" : ""}`}>
            <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Current Address" value={formData.address} onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className={`step-content ${step === 3 ? "active" : ""}`}>
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
            <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required />
            <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required />
            <input type="text" name="condition" placeholder="Current Medical Condition" value={formData.condition} onChange={handleChange} required />
            <textarea name="history" placeholder="Previous Medical History" value={formData.history} onChange={handleChange} required />
          </div>
        )}

        {/* Step Navigation Buttons */}
        <div className="button-group">
          {step > 1 && <button type="button" className="btn-back" onClick={prevStep}>Back</button>}
          {step < 3 ? (
            <button type="button" className="btn-next" onClick={nextStep}>Next</button>
          ) : (
            <button type="submit" className="btn-submit">Register</button>
          )}
        </div>
      </form>

      <p className="text-center mt-3">{message}</p>
    </div>
  );
}

export default Register;
