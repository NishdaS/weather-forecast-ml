import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    // Retrieve the current URL path
    const location = useLocation();
    // State to manage visibility of the mobile navigation menu
    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

    // Toggle function to show/hide mobile navigation
    const toggleMobileNav = () => {
        setIsMobileNavVisible(prevState => !prevState);
    };

    return (
        <>
            <div className="site-header">
                <div className="container">
                    {/* Logo and branding */}
                    <Link to="/" className="branding">
                        <img src="images/logo.png" alt="" className="logo" />
                        <div className="logo-type">
                            <h1 className="site-title">Swinburne University of Technology</h1>
                            <small className="site-description">weather finder</small>
                        </div>
                    </Link>

                    {/* Main navigation for desktop */}
                    <div className="main-navigation">
                        {/* Button to toggle mobile navigation visibility */}
                        <button type="button" className="menu-toggle" onClick={toggleMobileNav}>
                            <i className="fa fa-bars"></i>
                        </button>
                        {/* Navigation menu items */}
                        <ul className="menu">
                            <li className={`menu-item ${location.pathname === '/' ? 'current-menu-item' : ''}`}>
                                <Link to="/">Home</Link>
                            </li>
                            <li className={`menu-item ${location.pathname === '/news' ? 'current-menu-item' : ''}`}>
                                <Link to="/news">News</Link>
                            </li>
                            <li className={`menu-item ${location.pathname === '/liveCam' ? 'current-menu-item' : ''}`}>
                                <Link to="/liveCam">Live cameras</Link>
                            </li>
                            <li className={`menu-item ${location.pathname === '/photos' ? 'current-menu-item' : ''}`}>
                                <Link to="/photos">Photos</Link>
                            </li>
                            <li className={`menu-item ${location.pathname === '/contact' ? 'current-menu-item' : ''}`}>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile navigation menu */}
                    {isMobileNavVisible && (
                        <div className={`mobile-navigation ${isMobileNavVisible ? 'active' : ''}`}>
                            <ul className="menu">
                                <li className={`menu-item ${location.pathname === '/' ? 'current-menu-item' : ''}`}>
                                    <Link to="/" onClick={toggleMobileNav}>Home</Link>
                                </li>
                                <li className={`menu-item ${location.pathname === '/news' ? 'current-menu-item' : ''}`}>
                                    <Link to="/news" onClick={toggleMobileNav}>News</Link>
                                </li>
                                <li className={`menu-item ${location.pathname === '/liveCam' ? 'current-menu-item' : ''}`}>
                                    <Link to="/liveCam" onClick={toggleMobileNav}>Live cameras</Link>
                                </li>
                                <li className={`menu-item ${location.pathname === '/photos' ? 'current-menu-item' : ''}`}>
                                    <Link to="/photos" onClick={toggleMobileNav}>Photos</Link>
                                </li>
                                <li className={`menu-item ${location.pathname === '/contact' ? 'current-menu-item' : ''}`}>
                                    <Link to="/contact" onClick={toggleMobileNav}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};
