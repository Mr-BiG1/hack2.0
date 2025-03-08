import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>🚀 Welcome to <span className="brand-name">RuralCare</span></h1>
        <p className="tagline">Your gateway to futuristic healthcare solutions</p>
        <Link to="/register" className="btn btn-primary">Get Started</Link>
      </header>

      {/* Our Aim Section */}
      <section className="aim-section">
        <h2>🌍 Our Mission</h2>
        <p>
          We are revolutionizing **rural healthcare access** with AI-powered **chatbots, real-time hospital tracking**, 
          and **telehealth booking** – all in one seamless experience.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>✨ What We Offer</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>📍 AI-Based Hospital Finder</h3>
            <p>Get real-time **hospital, clinic, and pharmacy** locations.</p>
          </div>

          <div className="service-card">
            <h3>🤖 Intelligent Symptom Checker</h3>
            <p>AI-driven **symptom analysis** to guide you to the right care.</p>
          </div>

          <div className="service-card">
            <h3>🩺 Telehealth at Your Fingertips</h3>
            <p>Instantly **book virtual consultations** with certified doctors.</p>
          </div>

          <div className="service-card">
            <h3>🚑 Emergency Assistance</h3>
            <p>Real-time **emergency support** & ambulance tracking.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>🔗 Experience the Future of Healthcare</h2>
        <p>Sign up today and get access to cutting-edge medical assistance.</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-glass">Register</Link>
          <Link to="/login" className="btn btn-outline">Login</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
