import './signIn.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postUserSignIn } from '../../../api/userApi';
// Email Validation using regex expression
 const isEmail = (mail) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);
    
const SignIn=()=>{
    // Inputs 
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rememberMe, setRememberMe] = useState();
    
    // inputs errors
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    // Overall Form Validity
    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();
    const [verif, setVerif] = useState("")

    const navigate=useNavigate();
    ///////***   validations ****///////
    // Validation for onBlur Email
    const handleEmail = () => {
        console.log(isEmail(email));
        if (!isEmail(email)) {
            setEmailError(true);
            return;
        }

        setEmailError(false);
    };
    // Validation for onBlur Password
    const handlePassword = () => {
        if (
            !password ||

            password.length < 5 ||

            password.length > 20
        ) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);
    };
    /////// end of validation part ///////
    // submit login //
    const submitLogin=async(values)=>{
        console.log("provided email",values.email);
        console.log("provided password",values.password);
        try {
            
            const res= await postUserSignIn(values)
            localStorage.setItem('token',res.token);
            const data=await fetchAccount();
            console.log('email from Mongodb',data.email);
            console.log("Password from MongoDB :", data.password);

            const test=bcrypt.compareSync(values.password,data.password)
            console.log('test',test)
            if((values.email===data.email)&&(test)){
                if((data.role==='admin')){
                   // navigate('/dashboradAdmin');
                }
                else{
                    console.log('sucess',success)
                    setSuccess('from submitted succesfully')
                    navigate('/userZone');
                    
                }
            
            }
            else if(!test){
                 setFormValid("Incorrect email or password. Please try again.");
                console.log(formValid)
            }


        } catch (error) {
             console.log(error)
        }
    }
    ///// handle submittion//////////////////
    const handleSubmit=()=>{
        /////// check for errors

        // if email error is true
        if(emailError || !email){
            setFormValid('email is invalid .please re-enter')
            return;
        }

        // if password error is true 
        if(passwordError || !password){
            setFormValid( "Password is set btw 5 - 20 characters long. Please Re-Enter"
            );
            return;
        }
        setFormValid(null)
        submitLogin({email,password})
    }
    return(
        <div className="form-container sign-in-container">
            <div>
                <h1 className='h1-login create-account '>Sign In</h1>
                  {/* <div className='socialMedia-container'>
                            <a className="instagram-icon-login"> <CiInstagram /></a>
                             <a className='facebook-icon-login'><GrFacebookOption /> </a>
                              <a className="youtube-icon-login"><FaYoutube/></a>
                      
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
                <span className="other-method special">or use your account</span>
                <input   className={`login-input ${emailError ? 'input-error' : ''}`} type="email" placeholder="Email" 
                error={emailError}
                value={email}
                onBlur={handleEmail}
                onChange={(event)=>{
                    setEmail(event.target.value);
                }}/>
                {emailError && <p className="input-error-message">Please enter a valid email.</p>}
                <input  className={`login-input ${passwordError ? 'input-error' : ''}`} type="password" placeholder="Password" 
                 error={passwordError}
                 value={password}
                 onBlur={handlePassword}
                 onChange={(event)=>{
                     setPassword(event.target.value);
                 }}/>
                 {passwordError && <p className="input-error-message">Password must be 8–20 characters long.</p>}
                <a className='a-login ' href="#">Forgot your password?</a>
                <button className="button-click"  onClick={handleSubmit}>Sign In</button>
            </div>

              {/* Show Form Error if any */}
              {formValid && (
                <div className="form-message error">
                    {formValid}
                </div>
            )}
       
        </div>

    )
}
export default SignIn;