import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { postUser } from '../../../api/userApi';
import './signUp.css';

const SignUp = ({ setShowLoginForm }) => {
    const navigate = useNavigate();
    const isEmail = (mail) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);
    
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});
    const [formMessage, setFormMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.userName || formData.userName.length < 3) {
            newErrors.userName = "Username must be at least 3 characters";
        }

        if (!formData.email || !isEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password || formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormMessage('');

        if (!validateForm()) {
            setFormMessage("Please fix the errors below");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await postUser({
                userName: formData.userName,
                email: formData.email,
                password: formData.password
            });
            
            localStorage.setItem("token", res.token);
            setShowLoginForm(false);
            navigate("/userZone");
        } catch (error) {
            setFormMessage(error.message || "Sign up failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="userName">Username</label>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.userName}
                    onChange={handleChange}
                    className={errors.userName ? 'input-error' : 'input-sign-up'}
                />
                {errors.userName && <span className="error-text">{errors.userName}</span>}
            </div>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : 'input-sign-up'}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'input-error' :'input-sign-up'}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

          

            {formMessage && (
                <div className="form-message error">
                    {formMessage}
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
                        Creating Account...
                    </>
                ) : (
                    'Create Account'
                )}
            </button>
        </form>
    );
};

export default SignUp;