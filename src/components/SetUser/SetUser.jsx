import React, { Component } from 'react';
import './SetUser.css'

class SetUser extends Component{

    
constructor(props) {
    super(props)
    this.state = {
      userName:''
    }

    //Bind functions
  }

    render() {
        const handleChange=(event)=>{
           this.setState(
              {userName:event.target.value}
           )
        }
        return (
               <div className='SetUserName'>
                   <h1>Hey,You look new Here, Can you please enter your username</h1>
                <form  className="UserNameForm" onSubmit={(event)=>{
                    event.preventDefault()  
                    
                    console.log("Username:",this.state.userName)
                    this.props.setUser(this.state.userName)
                }}>
                    <input
                            type="string"
                            placeholder='UserName'
                            name='name'
                            onChange={handleChange}
                            value={this.state.userName}
                            required
                            className="input"
                        /> 
                    <button type='submit'>Set Username</button>
                </form>
            </div>
        )      
    }
}
export default SetUser;