import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import './navbar.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from '../6-sign/login';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

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

    return (
        <div className='navbar'>
            <div className='logo'>
                <img src="/logo.png" alt="Caravan" />
            </div>
            
            <div className={`nav ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li>Home</li>
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
                <FiHeart className='heart-icon-nav'/>
                <FiShoppingCart className='cart-icon-nav' />

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
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li onClick={() => console.log("Logout clicked")}>
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
