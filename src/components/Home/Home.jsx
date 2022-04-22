import React, { Component } from "react";
import Identicon from 'identicon.js';
import { Link } from 'react-router-dom';
import logo from './image(3).png';
import './Home.css'
class  Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
          account: this.props.account,
          loading: false,
          dstorage: null,
          files: [],
          type: null,
          name: null
        }
       //Bind functions
      }
    render (){
    let img= `data:image/png;base64,${new Identicon(this.props.account,30).toString()}`;
    return(
        
    <div className="diagonalimg"> 
    <div className="content">
    
    <div className="navbar">
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <div className="links">
            <div className="link">
                <Link to="/">Home</Link>
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
            <img src={img} onClick={()=>{console.log("hello world niggas")}} alt="UserIdenticon" />
        </div>
    </div> 
    <div className="TagLine">
            <h1>A Step<br/><h1 id='ahead'>Ahead</h1>of Cloud</h1>
        </div>
    </div>
    </div> );
    }
}
 
export default Home;