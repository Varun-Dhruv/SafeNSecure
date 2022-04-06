//import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './main'
import Web3 from 'web3';
import './App.css';
import DStorage from '../abis/DStorage.json'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const ipfsClient = require('ipfs-http-client') //Declare IPFS
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {   //Setting up Web3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3//Declare Web3

    const accounts = await web3.eth.getAccounts() //Load account
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId() //Network ID
    const networkData = DStorage.networks[networkId]
    if (networkData) { //IF got connection, get data from contracts

      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)  //Assign contract
      this.setState({ dstorage })
      //Get files amount
      const filesCount = await dstorage.methods.fileCount().call()
      this.setState({ filesCount })
      //Load files&sort by the newest
      for (var i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call()
        this.setState({
          files: [...this.state.files, file]
        })
      }

    } else { //Else
      window.alert('DStorage contract not deployed to detected network')//alert Error
    }

    this.setState({ loading: false })
  }

  // Get file from user
  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }
  }
  //Upload File
  uploadFile = description => {
    console.log("Submitting file to IPFS...")

    ipfs.add(this.state.buffer, (error, result) => { //Add file to the IPFS
      console.log('IPFS result', result.size)
      if (error) { //Check If error
        console.log(error)
        return  //Return error
      }
      this.setState({ loading: true })   //Set state to loading

      if (this.state.type === '') {  //Assign value for the file without extension
        this.setState({ type: 'none' })
      }
      //Call smart contract uploadFile function 
      this.state.dstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
          loading: false,
          type: null,
          name: null
        })
        window.location.reload()
      }).on('error', (e) => {
        window.alert('Error')
        this.setState({ loading: false })
      })
    })
  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: false,
      dstorage: null,
      files: [],
      type: null,
      name: null
    }

    //Bind functions
  }

  render() {
    return (
      <div className='App'>
         <Navbar account={this.state.account} />
        <Router>
          <Routes>
            <Route path ="/Upload" element={<Main 
                account={this.state.account}
                files={this.state.files.filter(item => item.uploader === this.state.account)}
                captureFile={this.captureFile}
                uploadFile={this.uploadFile}/>}>
            {/* <h1>HEllo world</h1>
            { 
            this.state.loading
              ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
              : <Main
                account={this.state.account}
                files={this.state.files.filter(item => item.uploader === this.state.account)}
                captureFile={this.captureFile}
                uploadFile={this.uploadFile}
              />
            } */}
            </Route>
            <Route exact path="/View_Files" >
              
            </Route>
            <Route exact path="/Share_Files">
               
            </Route>
          </Routes>
        </Router>
      </div>

    );
  }
}

export default App;