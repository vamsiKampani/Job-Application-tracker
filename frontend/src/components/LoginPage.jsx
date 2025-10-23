import React, { useState } from "react";
import "./LoginPage.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";

const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (name && contact) {
      onLogin(name); 
    } else {
      alert("Please enter both name and contact number.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Application Tracker</h1>
        <p className="login-subtitle">Your career journey starts here 🚀</p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Enter your contact number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <button type="submit" className="explore-btn">
            Explore Yourself
          </button>
        </form>

        <div className="divider">or login with</div>

        <div className="social-login">
          <button className="social-btn google">
            <FcGoogle className="icon" /> Google
          </button>
          <button className="social-btn facebook">
            <FaFacebook className="icon" /> Facebook
          </button>
          <button className="social-btn github">
            <FaGithub className="icon" /> GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
