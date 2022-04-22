import React, { Component } from 'react';
import { convertBytes } from '../helpers';
import moment from 'moment'
import Navbar from '../Navbar/Navbar';

class Share extends Component{

    render() {
        return (
            <div className="Navbar-x">
                <Navbar account={this.props.account}/>
                <h1> Hello world</h1>
            </div>
        )
           
    }
}
export default Share;