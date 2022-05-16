import React, { Component } from 'react';
import './Navbar.css'
import Identicon from 'identicon.js';
import { Link } from 'react-router-dom';
import logo from './image(3).png';
import './Navbar.css'
import log from './stb.svg';
class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: props.account,
            loading: false,
            dstorage: null,
            files: [],
            type: null,
            name: null
        }
        //Bind functions
    }

    render() {
        console.log("Hello", this.props.account);
        let img = `data:image/png;base64,${new Identicon(this.props.account.toString(), 30).toString()}`;
        return (
            
            <div className="navbar-x">
                <div className="navbar-logo">
                    <img src={log} alt="logo" />
                </div>
                <div className="links-x">
                    <div className="link-x">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="link-x">
                        <Link to="/Upload">Upload</Link>
                    </div>
                    <div className="link-x">
                        <Link to="/View">View Files</Link>
                    </div>
                    <div className="link-x">
                        <Link to="/Share">Share Files</Link>
                    </div>
                    <div className="link-x">
                        <Link to="/About">About Us</Link>
                    </div>
                </div>
                <div className="navbar-user-profile">
                    <img src={img} alt="" />
                </div>
            </div>
            );
    }
}

export default Navbar;