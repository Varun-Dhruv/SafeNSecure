import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import logo from './image(3).png';

const Navbar = () => {
    return ( <div className="navbar">
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <div className="links">
            <div className="link">
                <Link to="/Home">Home</Link>
            </div>
            <div className="link">
                <Link to="/Upload">Upload</Link>
            </div>
            <div className="link">
                <Link to="/View">View Files</Link>
            </div>
            <div className="link">
                <Link to="/Share">Share Files</Link>
            </div>
        </div>
        <div className="user-profile">
            <img src={logo} alt="" />
        </div>
    </div> );
}
 
export default Navbar;