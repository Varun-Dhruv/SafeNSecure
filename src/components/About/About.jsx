import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './About.css'
import Charmander from "./Charmander.jpg"
import Squirtle from "./squirtle.jpg"
import Bulbasaur from "./bulbasaur.jpg"
import Linkedin from "./linkedin.png"

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        //Bind functions
    }
    render() {
        return (

            <div className='About'>
                <Navbar account={this.props.account} />
                <footer>
                    <h2>Developed By</h2>
                    <div className='profiles'>
                        <div className='Profile-About'>
                            <img src={Charmander} alt="profile img" />
                            <h3>Charmander</h3>
                            <a href='https://www.linkedin.com/in/varun-koranne-657592209/'><img id="Li" src={Linkedin} alt="Linkedin" /></a>
                        </div>
                        <div className='Profile-About'>
                            <img src={Squirtle} alt="profile img" />
                            <h3>Squirtle</h3>
                            <a href='https://www.linkedin.com/in/varun-koranne-657592209/'><img id="Li" src={Linkedin} alt="Linkedin" /></a>
                        </div>
                        <div className='Profile-About'>
                            <img src={Bulbasaur} alt="profile img" />
                            <h3>Bulbasaur</h3>
                            <a href='https://www.linkedin.com/in/varun-koranne-657592209/'><img id="Li" src={Linkedin} alt="Linkedin" /></a>
                        </div>
                    </div>
                    <h2 className="The Project">The Project</h2>
                    <p>An International Atomic Energy Agency (IAEA) team of experts said that Denmark has developed and 
                       implemented a robust and well-functioning system for maintaining and further enhancing the safety and effectiveness of 
                       spent fuel and radioactive waste management.  The team also noted that the national programme for the management of 
                       radioactive waste should be further developed and its implementation requires significant efforts.</p>
                </footer>
            </div>
        );
    }
}
export default About;