// src/pages/LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // We will create this file next

function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, this just shows an alert.
    alert('Login functionality is not yet connected.');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p>Login to manage your contributions.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="email" className="floating-label">Email Address</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="password" className="floating-label">Password</label>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;