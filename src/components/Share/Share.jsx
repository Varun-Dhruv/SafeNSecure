import React, { Component } from 'react';
import { convertBytes } from '../helpers';
import moment from 'moment'
import Navbar from '../Navbar/Navbar';
import "./Share.css"


class Share extends Component{

    constructor(props) {
        super(props)
        this.state = {
          isFileSelected:false,
          SelectedFileName:'',
          SelectedFileHash:'',
          SelectedFileSize:0,
          SelectedFileType:'',
          SelectedFileDescription:'',
        }
            //Bind functions
      }
    render() {
        
        return (
            <div className="Share">
                <Navbar account={this.props.account}/>
                <div className='content'>
                {
                this.state.isFileSelected
                ?<div>
                    {this.props.UserList.map((users,key)=>{
                        return(
                            <ul>
                                <li>{users.userName}    {users.owner}   <button onClick={async()=>{
                                    await this.props.shareFile(users.owner
                                        ,this.state.SelectedFileHash
                                        ,this.state.SelectedFileSize
                                        ,this.state.SelectedFileType
                                        ,this.state.SelectedFileName
                                        ,this.state.SelectedFileName
                                        )
                                        this.setState({ isFileSelected:false})

                                }}>Select User</button>
                                </li>
                            </ul>
                        )
                    })}
                </div>
                :
                this.props.files.map((file,key)=>{
                    return(
                        <ul >
                        <li>{file.fileName}
                        <button 
                        onClick={()=>{this.setState({isFileSelected:true,
                            SelectedFileName:file.fileName,
                            SelectedFileHash:file.fileHash,
                            SelectedFileSize:file.fileSize,
                            SelectedFileType:file.fileType,
                            SelectedFileDescription:file.SelectedFileDescription})}}>Send File</button>
                        </li>
                        </ul>
                    )
                })}
                </div>
            </div>
        )
           
    }
}
export default Share;