import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postUserSignIn, fetchAccount } from '../../../api/userApi';
import './signIn.css';
import {  useDispatch } from 'react-redux';
import { setCurrentUser, setToken } from "../../../redux/userSlice";
const isEmail = (mail) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);
    
const SignIn = ({ setShowLoginForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    
    const handleEmail = () => {
        if (!email) {
            setEmailError("Email is required");
            return;
        }
        if (!isEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        setEmailError("");
    };
    
    const handlePassword = () => {
        if (!password) {
            setPasswordError("Password is required");
            return;
        }
        setPasswordError("");
    };
    
    const submitLogin = async (values) => {
        setIsSubmitting(true);
        setFormError("");
        
        try {
            const res = await postUserSignIn(values);
            if (rememberMe) {
                localStorage.setItem("token", res.token); 
            } else {
                sessionStorage.setItem("token", res.token); 
            }

            const data = await fetchAccount();
             dispatch(setCurrentUser(res.user));
            dispatch(setToken(res.token));
            setShowLoginForm(false);
            
            if (data.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/userZone');
            }
            
        } catch (error) {
            setFormError("Invalid email or password. Please try again.");
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
            
            {formError && (
                <div className="form-error">
                    {formError}
                </div>
            )}
            
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
        </form>
    );
};

export default SignIn;