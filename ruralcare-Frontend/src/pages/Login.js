
import React, { useState } from "react";
import { auth } from "../firebaseConfig"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      // Retrieve ID token
      const idToken = await user.getIdToken(); 

      // Send ID token to backend
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send ID token
        body: JSON.stringify({ token: idToken }), 
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful! ✅");
        setToken(data.token);
        // Store token for authentication
        localStorage.setItem("token", data.token); 
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Invalid credentials. Try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      {token && <p>🔑 Token: {token}</p>}
    </div>
  );
}

export default Login;
