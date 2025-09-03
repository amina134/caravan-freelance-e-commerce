import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SignUp from './signup';
import SignIn from './signIn';
import { useState } from "react";

const Login = ({ setShowLoginForm }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return(
        <div className='login-overlay'>
            <div className='login-form'>
                <button className='icon-close' onClick={() => setShowLoginForm(false)}> 
                    <FontAwesomeIcon icon={faXmark} />
                </button>                  
                
                <div className="login-header">
                    <h1>{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
                    <p>{isSignUp ? 'Join us today' : 'Sign in to continue'}</p>
                
                </div>

                <div className="login-content">
                    {isSignUp ? (
                        <SignUp setShowLoginForm={setShowLoginForm} />
                    ) : (
                        <SignIn setShowLoginForm={setShowLoginForm} />
                    )}
                    
                    <div className="login-switch">
                        <p>
                            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                            <button 
                                className="switch-button"
                                onClick={() => setIsSignUp(!isSignUp)}
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;