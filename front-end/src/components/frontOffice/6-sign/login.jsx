import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon
import { faXmark } from '@fortawesome/free-solid-svg-icons';  // Import the fa-xmark icon
import SignUp from './signup'
import SignIn from './signIn'
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react"
import { CiHeart } from "react-icons/ci";
const Login=({setShowLoginForm})=>{
    const [isSignUp,setIsSignUp]=useState(true)

    return(
        
        <div className='login-form'>
            <button className='icon-close' onClick={() => setShowLoginForm(false)} > <FontAwesomeIcon icon={faXmark} /></button>                  
            <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
                    <SignUp setIsSignUp={() => setIsSignUp(true)} />
                    <SignIn setIsSignUp={() => setIsSignUp(false)} />
                    <div className="overlay-container">
                        <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className='h1-login'>Welcome Back!</h1>
                            <p className='p-login'>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={() => setIsSignUp(false)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className='h1-login'>Hello, Friend!</h1>
                            <p className='p-login'>Enter your personal details and start your journey with us</p>
                            <button className="ghost" onClick={() => setIsSignUp(true)}>Sign Up</button>
                        </div>
                        </div>
                    </div>
            </div>
           
          
        </div>
    )
}
export default Login;