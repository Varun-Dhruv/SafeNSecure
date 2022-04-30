import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import {useState,useEffect} from 'react';
//import { FileUploader } from "react-drag-drop-files";
import { FileDrop } from 'react-file-drop';
class Upload extends Component {

  render() {
    const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    const fileTypes = ["JPEG", "PNG", "GIF"];
    return (
      <div className='Upload'>
          <Navbar account={this.props.account}/> 
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                <h2 className="text-white text-monospace bg-dark"><b><ins>Share File</ins></b></h2>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.fileDescription.value
                    this.props.uploadFile(description)
                  }} >
                      <div className="form-group">
                        <br></br>
                          <input
                            id="fileDescription"
                            type="text"
                            ref={(input) => { this.fileDescription = input }}
                            className="form-control text-monospace"
                            placeholder="description..."
                            required />
                      </div>
                    <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>
                    
                    <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                  </form>
                  <div style={styles}>
                  <FileDrop
                    onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                    onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                    onFrameDrop={(event) => console.log('onFrameDrop', event)}
                    onDragOver={(event) => console.log('onDragOver', event)}
                    onDragLeave={(event) => console.log('onDragLeave', event)}
                    onDrop={(files, event) =>this.props.captureFile(files)}
                   >
          
          Drop some files here!
        </FileDrop>
</div>
              </div>
                <p>&nbsp;</p>
            </div>
          </main>
        </div>
      </div>
      </div>
    );
  }
}

export default Upload;