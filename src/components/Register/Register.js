import React from "react";
import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile validation
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!validateMobile(mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, number and special character";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Store data (Note: In production, avoid localStorage for sensitive data)
      localStorage.setItem("uid", email);
      localStorage.setItem("pass", password);
      localStorage.setItem("mobile", mobile);
      
      // Redirect to login
      window.location.href = "http://localhost:3000/#/login";
    } else {
      setIsSubmitting(false);
    }
  };

  // Real-time validation helpers
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear email error if field becomes valid
    if (errors.email && value && validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    
    // Clear mobile error if field becomes valid
    if (errors.mobile && value && validateMobile(value)) {
      setErrors(prev => ({ ...prev, mobile: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Clear password error if field becomes valid
    if (errors.password && value && validatePassword(value)) {
      setErrors(prev => ({ ...prev, password: "" }));
    }
    
    // Re-validate confirm password if it exists
    if (confirmPassword && confirmPassword !== value) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
    } else if (confirmPassword && confirmPassword === value) {
      setErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    // Clear confirm password error if passwords match
    if (errors.confirmPassword && value === password) {
      setErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  };

  return (
    <div className="container login-main">
      {/* Default form login */}
      <form className="login-container text-light text-center p-6 m-5" onSubmit={handleSubmit}>
        <div className="container" style={{ backgroundColor: "#163554" }}>
          <h1>SignUp</h1>
          <p className="subheading">Create an account</p>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              className={`form-control mb-2 ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && <div className="error-message text-danger mb-3">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile No *</label>
            <input
              type="tel"
              className={`form-control mb-2 ${errors.mobile ? 'is-invalid' : ''}`}
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              required
            />
            {errors.mobile && <div className="error-message text-danger mb-3">{errors.mobile}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              className={`form-control mb-2 ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errors.password && <div className="error-message text-danger mb-3">{errors.password}</div>}
            <small className="form-text text-muted">
              Password must contain at least 8 characters, including uppercase, lowercase, number and special character
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password *</label>
            <input
              type="password"
              className={`form-control mb-2 ${errors.confirmPassword ? 'is-invalid' : ''}`}
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {errors.confirmPassword && <div className="error-message text-danger mb-3">{errors.confirmPassword}</div>}
          </div>

          <button 
            type="submit" 
            className="primary-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <p className="signup-link">
            Already SignUp ? <Link to='/login'>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;