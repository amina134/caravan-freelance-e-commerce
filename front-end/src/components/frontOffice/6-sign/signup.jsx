import './signUp.css'
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useState } from "react";
/// social media icons//
import { CiInstagram } from "react-icons/ci";
import { GrFacebookOption } from "react-icons/gr";
import { FaYoutube } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { postUser } from '../../../api/userApi';
const SignUp=()=>{
    const dispatch = useDispatch();
    const navigate=useNavigate();
    // email validation using regex
    const isEmail = (mail) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);
    // Inputs
    const [userName,setUserName]=useState();
    const[email,setEmail]=useState();
    const [password, setPassword] = useState();
    // Inputs errors 
    const [userNameError,setUserNameError]=useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    /////// form validity
    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();
    /////////************* validation */
    // Validate for onBlur Username
    const handleUserName = () => {
        if (!userName) {
            setUserNameError(true);
            return;
        }
        setUserNameError(false);
    };
    //// validate the email 
    const handleEmail=()=>{
        console.log(isEmail(email));
        if(!isEmail(email)){
        setEmailError(true)
        return;
        }
        setEmailError(false);
        
    }

    ///// validate the password
    const handlePassword=()=>{
        if(!password || password.length<8 || password.length>20)
        { setPasswordError(true);
        return;}
        setPasswordError(false)
    }
    //   end of validation part 


    // add the user infoooos in the database
    const handleAdd=async(value)=>{
        try{
           const res=await postUser(value)
           localStorage.setItem("token",res.token);
           navigate('userZone')

        }catch (error){
           console.error('Error while signing up:', error);

        }
    }

  //handle submition 
  const handleSubmit=()=>{
    setSuccess(null)
      if (userNameError || !userName) {
        setFormValid(
            "Username is set btw 8 - 20 charaters long. Please Re-Enter"
        );
        return;
    }
    //If Email error is true
    if (emailError || !email) {
        setFormValid("Email is Invalid. Please Re-Enter");
        return;
    }
    // If Password error is true
    if (passwordError || !password) {
        setFormValid("Password is set btw 8 - 20 characters long. Please Re-Enter");
        return;
    }
   
    //Proceed to use the information passed
    console.log("FirstName :" + userName);
    console.log("Email :" + email);
    console.log("Password :" + password);

    //Show Successfull Submission
    setFormValid("Form Submitted Successfully");
    // submitLogin({ firstName, email, password });
     handleAdd({userName, email, password });
  }

    return(
        <div className="form-container sign-up-container">
            <div>
                <h1 className='h1-create-account'>Create Account</h1>
                {/* <div className='socialMedia-container'>
                    <a className="instagram-icon-login"> <CiInstagram className="insta" /></a>
                    <a className='facebook-icon-login'><GrFacebookOption className="face" /> </a>
                    <a className="youtube-icon-login"><IoLogoGoogle className="google" /></a>
                
                    </div> */}
            {/* <div  className="hey">
                <GoogleLogin 
                onSuccess={(credentialResponse) => {
                    console.log("Google login ssuccess:", credentialResponse);
                
                }}
                onError={() => {
                    console.log("Google login failed");
                }}
                />
            </div> */}
                <span className="other-method">or use your email for registration</span>
                <input
        className={`login-input ${userNameError ? 'input-error' : ''}`}
        type="text"
        placeholder="Name"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        onBlur={handleUserName}
        />
        {userNameError && <p className="input-error-message">Username is required (8–20 characters).</p>}

        <input
        className={`login-input ${emailError ? 'input-error' : ''}`}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={handleEmail}
        />
        {emailError && <p className="input-error-message">Please enter a valid email.</p>}

        <input
        className={`login-input ${passwordError ? 'input-error' : ''}`}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        onBlur={handlePassword}
        />
        {passwordError && <p className="input-error-message">Password must be 8–20 characters long.</p>}

                <button className="button-click"  onClick={handleSubmit}>Sign Up</button>
            </div>

                {/* Show Form Error if any */}
            
       </div>
    )
}
export default SignUp;