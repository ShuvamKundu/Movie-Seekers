import React from "react";
import "./Login.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes and clear errors
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: "" }));
    }
  };

  const logins = async (e) => {
    e.preventDefault(); // Prevent form submission
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Check credentials
      const storedEmail = localStorage.getItem("uid");
      const storedPassword = localStorage.getItem("pass");

      if (!storedEmail || !storedPassword) {
        setErrors({ general: "No user account found. Please sign up first." });
        return;
      }

      if (storedEmail === email && storedPassword === password) {
        localStorage.setItem("token", "123");
        window.location.href = "http://localhost:3000";
      } else {
        setErrors({ general: "Invalid email or password. Please try again." });
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container p-6 m-3 login-main">
      {/* Default form login */}
      <form className="container text-light text-center" onSubmit={logins}>
        <div className="login-container" style={{ backgroundColor: "#163554" }}>
          <h1>Welcome Back!</h1>
          <p className="subheading">Sign in using</p>
          
          {/* General error message */}
          {errors.general && (
            <div className="alert alert-danger mb-3" style={{ color: '#ff6b6b', backgroundColor: 'rgba(255, 107, 107, 0.1)', padding: '10px', borderRadius: '5px', border: '1px solid #ff6b6b' }}>
              {errors.general}
            </div>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control mb-2 ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            disabled={isLoading}
            style={{ borderColor: errors.email ? '#ff6b6b' : '' }}
          />
          {errors.email && (
            <div className="invalid-feedback mb-2" style={{ color: '#ff6b6b', fontSize: '0.875rem' }}>
              {errors.email}
            </div>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-control mb-2 ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            disabled={isLoading}
            style={{ borderColor: errors.password ? '#ff6b6b' : '' }}
          />
          {errors.password && (
            <div className="invalid-feedback mb-2" style={{ color: '#ff6b6b', fontSize: '0.875rem' }}>
              {errors.password}
            </div>
          )}

          <div className="options">
            <label>
              <input type="checkbox" disabled={isLoading} /> Remember me
            </label>
            <a href="#">Reset Password</a>
          </div>

          <button 
            type="submit" 
            className="primary-btn" 
            disabled={isLoading}
            style={{ 
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          {/* <button type="button" className="social-btn google">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Continue with Google
              </button> */}

          {/* <button type="button" className="social-btn apple">
                <img src="https://www.svgrepo.com/show/303128/apple-logo.svg" alt="Apple" />
                Continue with Apple
              </button> */}
          <p className="signup-link">
            New here? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;