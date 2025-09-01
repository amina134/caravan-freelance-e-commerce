import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineHeart } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import './navbar.css';
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Login from '../6-sign/login';
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Close search when opening menu
        if (!isMenuOpen && isSearchVisible) {
            setIsSearchVisible(false);
        }
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
        // Close menu when opening search
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
                   <Link  to="/Menu"> <li>Menu</li></Link>
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
                <FiUser  onClick={()=>{setShowLoginForm(true)}}className='user-icon' />
            </div>
            
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className='span-ham'></span>
                <span className='span-ham'></span>
                <span className='span-ham'></span>
            </div>
            {/* Login Form */}
            {showLoginForm && (
                <div className="loginForm">
                    <Login key={showLoginForm} setShowLoginForm={setShowLoginForm} />
                </div>
               
            )}
        </div>
    );
};

export default Navbar;