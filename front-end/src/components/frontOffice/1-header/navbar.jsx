import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from '../6-sign/login';
import {logout} from '../../../redux/userSlice'
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { token } = useSelector((state) => state.userElement);
    const isLoggedIn = !!token;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen && isSearchVisible) {
            setIsSearchVisible(false);
        }
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
        if (!isSearchVisible && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    const logoutUser=()=>{
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='navbar'>
            <div className='logo'>
                <img src="/logoo.png" alt="Caravan" />
            </div>
            
            <div className={`nav ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                <Link to="/Home"><li>Home</li></Link>   
                    <Link to="/Menu"><li>Menu</li></Link>
                    <li>Contact</li>
                    <li>About</li>
                </ul>
            </div>
            
            <div className={`search-container ${isSearchVisible ? 'active' : ''}`}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="What are you looking for?"
                />
                <span className="search-icon"><BsSearch /></span>
            </div>
            
            <div className='icons-nav'>
                <div className="icon-button" onClick={toggleSearch}>
                    <BsSearch className="search-toggle-icon" />
                </div>
                 <Link to="/userZone/favourites"><FiHeart className='heart-icon-nav'/></Link>
            <Link to="/userZone/cart">  <FiShoppingCart className='cart-icon-nav' /></Link>

                {/* User Dropdown Container */}
                <div className="user-dropdown-container">
                    <FiUser 
                        onClick={() => {
                            if (!isLoggedIn) setShowLoginForm(true);
                        }}
                        className='user-icon' 
                    />

                    {isLoggedIn && (
                        <div className="user-dropdown">
                            <ul>
                                <li>
                                    <Link to="userZone/profile">Profile</Link>
                                </li>
                                <li onClick={() => {console.log("Logout clicked");
                                                  logoutUser();}}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className='span-ham'></span>
                <span className='span-ham'></span>
                <span className='span-ham'></span>
            </div>

            {showLoginForm && (
                <div className="loginForm">
                    <Login key={showLoginForm} setShowLoginForm={setShowLoginForm} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
