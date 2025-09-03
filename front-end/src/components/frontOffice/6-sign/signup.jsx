import './signUp.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from "react";
// social media icons
import { CiInstagram } from "react-icons/ci";
import { GrFacebookOption } from "react-icons/gr";
import { FaYoutube } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { postUser } from '../../../api/userApi';

const SignUp = ({ setShowLoginForm }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // email validation using regex
    const isEmail = (mail) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);
    
    // Inputs
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Inputs errors 
    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    // Form validity and messages
    const [formMessage, setFormMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Validation functions
    const handleUserName = () => {
        if (!userName || userName.length < 3) {
            setUserNameError("Username must be at least 3 characters long");
            return;
        }
        setUserNameError('');
    };

    const handleEmail = () => {
        if (!isEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        setEmailError('');
    };

    const handlePassword = () => {
        if (!password || password.length < 8 || password.length > 20) {
            setPasswordError("Password must be 8-20 characters long");
            return;
        }
        setPasswordError('');
    };

    // Add user to database
    const handleAdd = async (value) => {
        try {
            const res = await postUser(value);
            
           
            localStorage.setItem("token", res.token);
            setShowLoginForm(false)
            navigate("/userZone");
        } catch (error) {
            setFormMessage(error.message);
             setIsError(true);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormMessage('');
        setIsError(false);
        
        // Validate all fields
        handleUserName();
        handleEmail();
        handlePassword();
        
        // Check if any errors exist
        if (userNameError || emailError || passwordError || 
            !userName || !email || !password) {
            setFormMessage("Please fix the errors before submitting");
            setIsError(true);
            return;
        }
        
        // Proceed with registration
        handleAdd({ userName, email, password });
        

    };

    return (
        <div className="form-container sign-up-container">
            <form className='form-sign' onSubmit={handleSubmit}>
                <h1 className='h1-create-account'>Create Account</h1>
                
                <span className="other-method">or use your email for registration</span>
                
                <input
                    className={`login-input ${userNameError ? 'input-error' : ''}`}
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    onBlur={handleUserName}
                />
                {userNameError && <p className="input-error-message">{userNameError}</p>}

                <input
                    className={`login-input ${emailError ? 'input-error' : ''}`}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={handleEmail}
                />
                {emailError && <p className="input-error-message">{emailError}</p>}

                <input
                    className={`login-input ${passwordError ? 'input-error' : ''}`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onBlur={handlePassword}
                />
                {passwordError && <p className="input-error-message">{passwordError}</p>}

                {/* Form message display */}
                {formMessage && (
                    <p className={isError ? "form-error-message" : "form-success-message"}>
                        {formMessage}
                    </p>
                )}

                <button type="submit" className="button-click">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;