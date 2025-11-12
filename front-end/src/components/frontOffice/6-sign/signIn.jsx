import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postUserSignIn } from '../../../api/userApi';
import './signIn.css';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from "@react-oauth/google";

import { setAuth } from "../../../redux/userSlice";

const isEmail = (mail) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);

const SignIn = ({ setShowLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmail = () => {
    if (!email) return setEmailError("Email is required");
    if (!isEmail(email)) return setEmailError("Please enter a valid email address");
    setEmailError("");
  };

  const handlePassword = () => {
    if (!password) return setPasswordError("Password is required");
    setPasswordError("");
  };

  const submitLogin = async (values) => {
    setIsSubmitting(true);
    setFormError('');

    try {
      const res = await postUserSignIn(values);
      const user = res.found;
      if (!user) throw new Error('User data not found in response');
      
      dispatch(setAuth({ user, token: res.token, rememberMe }));
      setShowLoginForm(false);

      navigate(user.role === 'admin' ? '/Admindashboard' : '/userZone');
    } catch (error) {
      console.error('Login error:', error);
      setFormError(error.response?.data?.error || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmail();
    handlePassword();
    if (emailError || passwordError || !email || !password) {
      setFormError("Please fill in all fields correctly");
      return;
    }
    submitLogin({ email, password });
  };

  //Handle Google success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // Send token to your backend to verify and log in
      const res = await postUserSignIn({
        email: decoded.email,
        googleToken: credentialResponse.credential,
      });

      const user = res.found;
      dispatch(setAuth({ user, token: res.token, rememberMe: true }));
      setShowLoginForm(false);
      navigate('/userZone');
    } catch (error) {
      console.error("Google sign-in error:", error);
      setFormError("Google sign-in failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    setFormError("Google sign-in failed. Please try again.");
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className={`form-input ${emailError ? 'input-error' : ''}`}
          type="email"
          placeholder="Enter your email"
          value={email}
          onBlur={handleEmail}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
        />
        {emailError && <span className="error-text">{emailError}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className={`form-input ${passwordError ? 'input-error' : ''}`}
          type="password"
          placeholder="Enter your password"
          value={password}
          onBlur={handlePassword}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
        />
        {passwordError && <span className="error-text">{passwordError}</span>}
      </div>

      <div className="form-options">
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <span className="checkmark"></span>
          Remember me
        </label>
        <a href="#" className="forgot-link">Forgot password?</a>
      </div>

      {formError && <div className="form-error">{formError}</div>}

      <button 
        type="submit" 
        className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      {/* 🔹 Google Sign-In Button */}
      <div className="google-login">
        <p>Or continue with</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </form>
  );
};

export default SignIn;
