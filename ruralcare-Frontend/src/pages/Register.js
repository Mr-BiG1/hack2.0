// import React, { useState } from "react";
// import "../";

// function Register() {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("Registering...");

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("✅ Registration successful!");
//       } else {
//         setMessage(`❌ Error: ${data.error}`);
//       }
//     } catch (error) {
//       setMessage("❌ Network error. Try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2 className="text-center">📝 Register</h2>
//       <form onSubmit={handleSubmit} className="auth-form">
//         <input className="form-control" type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button className="btn btn-success btn-block" type="submit">Register</button>
//       </form>
//       <p className="text-center mt-3">{message}</p>
//     </div>
//   );
// }
// // 
// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        setMessage("✅ Registration successful!");
        localStorage.setItem("token", data.token); // Store token if needed
        setTimeout(() => navigate("/dashboard"), 1500); // Redirect after success
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Network error. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="text-center">📝 Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input className="form-control" type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-success btn-block" type="submit">Register</button>
      </form>
      <p className="text-center mt-3">{message}</p>
    </div>
  );
}

export default Register;
