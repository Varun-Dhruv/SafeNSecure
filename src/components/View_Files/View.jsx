import React, { Component } from 'react';
import { convertBytes } from '../helpers';
import moment from 'moment'
import './View.css'
import Navbar from '../Navbar/Navbar';
import 'react-tabs/style/react-tabs.css';
import index from "./index.jpg"

//import FilePreviewer from 'react-file-previewer'
//import FilePreview from "react-file-preview-latest";

class View extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tab1: true,
      FileStates: []
    }
    //Bind functions
  }
 
  //onError = (err) => console.log("Error:", err);
  render() {
    //console.log("This is File",this.props.SharedFiles)
    
    return (

      <div className="View">
        <Navbar account={this.props.account} />
        <div className='Tabs'>
          <button onClick={() => { this.setState({ tab1: true }) }}>My Files</button>
          <button onClick={() => { this.setState({ tab1: false }) }}>Shared With me</button>
        </div>
        {this.state.tab1 ?
        
         <table className="table-t" style={{ width: '1000px', maxHeight: '450px' }}>
            <thead style={{ 'fontSize': '15px' }}>
              <tr className="tr-class">

                <th scope="col" style={{ width: '200px' }}>Name</th>
                <th scope="col" style={{ width: '120px' }}>Type</th>
                <th scope="col" style={{ width: '90px' }}>Size</th>
                <th scope="col" style={{ width: '90px' }}>Date</th>
                <th scope="col" style={{ width: '120px' }}>Uploader/View</th>
                <th scope="col" style={{ width: '120px' }}>Hash/View/Get</th>
              </tr>
            </thead>
            {this.props.files.map((file, key) => {
              return (
                <thead style={{ 'fontSize': '12px' }} key={key}>
                  <tr>

                    <td>{file.fileName}</td>
                    <td>{file.fileType}</td>
                    <td>{convertBytes(file.fileSize)}</td>
                    <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                    <td>
                      <a
                        href={"https://etherscan.io/address/" + file.uploader}
                        rel="noopener noreferrer"
                        target="_blank">
                        {file.uploader.substring(0, 10)}...
                      </a>
                    </td>
                    <td>
                      <a
                        href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                        rel="noopener noreferrer"
                        target="_blank">
                        {file.fileHash.substring(0, 10)}...
                      </a>

                      {/* <FilePreview
                        type={"file"}
                        file={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                        onError={this.onError}
                        /> 
                      */}
                    </td>
                  </tr>
                </thead>
              )
            })}
          </table>
          : <div>
            <table className="table-t" style={{ width: '1000px', maxHeight: '450px' }}>
              <thead style={{ 'fontSize': '15px' }}>
                <tr className="tr-class">

                  <th scope="col" style={{ width: '200px' }}>Name</th>
                  <th scope="col" style={{ width: '120px' }}>Type</th>
                  <th scope="col" style={{ width: '90px' }}>Size</th>
                  <th scope="col" style={{ width: '90px' }}>Date</th>
                  <th scope="col" style={{ width: '120px' }}>Hash/View/Get</th>
                </tr>
              </thead>
              {
                this.props.SharedFiles.map((file, key) => {                  
                  return (
                    // for(var i=0;i<this.props.SharedFilesCount;i++)
            
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                        <td>{file._fileName}</td>
                        <td>{file._fileType}</td>
                        <td>{file._fileSize}</td>
                        <td>{moment.unix(file._fileUploadTime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://ipfs.infura.io/ipfs/" +file._fileHash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file._fileHash.substring(0, 10)}...
                          </a>
                        </td>
              
                      </tr>
                    </thead> 
                  )
                }
                )
              }
            </table>
          </div>

        }
        {/*<FilePreviewer file={{url:"https://ipfs.infura.io/ipfs/" + file.fileHash}}/>*/}
      </div>
    )
  }
}
export default View;