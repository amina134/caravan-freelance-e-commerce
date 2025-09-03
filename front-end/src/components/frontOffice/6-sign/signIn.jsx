import './signIn.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postUserSignIn, fetchAccount } from '../../../api/userApi';

// Email Validation using regex expression
const isEmail = (mail) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);
    
const SignIn = ({ setShowLoginForm }) => {
    // Inputs 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const [rememberMe, setRememberMe] = useState(false);
    
    // inputs errors
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    // Overall Form Validity
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    
    // Validation for onBlur Email
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
    
    // Validation for onBlur Password
    const handlePassword = () => {
        if (!password) {
            setPasswordError("Password is required");
            return;
        }
        
        if (password.length < 5) {
            setPasswordError("Password must be at least 5 characters long");
            return;
        }

        if (password.length > 20) {
            setPasswordError("Password must be less than 20 characters");
            return;
        }

        setPasswordError("");
    };
    
    // submit login
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

                alert("Login successful!");
            
            // If login is successful, fetch account data
            try {
                const data = await fetchAccount();
                setShowLoginForm(false);
                
                if (data.role === 'admin') {
                    // navigate('/dashboardAdmin');
                    console.log("Admin logged in");
                } else {
                    navigate('/userZone');
                }
            } catch (error) {
                console.error("Error fetching account:", error);
                setFormError("Login successful but couldn't load user data");
            }
        } catch (error) {
            console.log("Login error:", error);
            
            // Handle different error formats from backend
            if (error.response?.data?.error) {
                setFormError(error.response.data.error);
            } else if (error.response?.data?.msg) {
                setFormError(error.response.data.msg);
            } else if (error.message) {
                setFormError(error.message);
            } else {
                setFormError("Login failed. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate inputs
        handleEmail();
        handlePassword();
        
        // Check if there are any errors
        if (emailError || passwordError || !email || !password) {
            if (!email) setEmailError("Email is required");
            if (!password) setPasswordError("Password is required");
            setFormError("Please fix the errors above");
            return;
        }
        
        submitLogin({ email, password });
    };
    
    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit} noValidate>
                <h1 className='h1-login create-account'>Sign In</h1>
                
                <span className="or">or use your account</span>
                
                <div className="input-group">
                    <input
                        className={`login-input ${emailError ? 'input-error' : ''}`}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onBlur={handleEmail}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                        }}
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div>
                
                <div className="input-group">
                    <input
                        className={`login-input ${passwordError ? 'input-error' : ''}`}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onBlur={handlePassword}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (passwordError) setPasswordError("");
                        }}
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                </div>
                
                {/* <a className='a-login' href="#">Forgot your password?</a> */}
                 <label>
                    <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember me
                </label>
                <button 
                    className={`button-click ${isSubmitting ? 'submitting' : ''}`} 
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
                
                {formError && (
                    <div className="form-error-message">
                        {formError}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SignIn;  