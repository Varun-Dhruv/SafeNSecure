//import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import { useCallback } from 'react';
// import Navbar from './Navbar'
//import Navbar from '../components/Navbar/Navbar'
//import Main from './main'
import Web3 from 'web3';
import './App.css';
import DStorage from '../abis/DStorage.json'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Upload from './Upload/Upload'
import View from './View_Files/View';
import Share from './Share/Share';
import SetUser from './SetUser/SetUser' 


const ipfsClient = require('ipfs-http-client') //Declare IPFS
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    this.setState({loading:false})
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
    this.setState({loading:true})
    const web3 = window.web3//Declare Web3

    const accounts = await web3.eth.getAccounts() //Load account
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId() //Network ID
    const networkData = DStorage.networks[networkId]

    if (networkData) { //IF got connection, get data from contracts

      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)  //Assign contract
      this.setState({ dstorage })

      //Get number of users
      const UserCount=await dstorage.methods.userCount().call()
      this.setState({UserCount})

      //Get Users addresses
      //Get User Details
      for(var i=1;i<=UserCount;i++){
        const user=await dstorage.methods.UserList(i).call()
        this.setState({
          UserList:[...this.state.UserList,user]
        })
      }
    this.state.UserList.map((users,key)=>{
      if(users.owner===this.state.account)
      {
        this.state.isUserAuthenticated=true
        this.state.userName=users.userName
      }
      console.log(users.userName,users.owner)
    })
     console.log("boom",this.state.UserList);
        
    
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
     
  }

  shareFile=(address,fileHash,fileSize,fileType,fileName,fileDescription)=>
  {
    console.log(address,fileHash,fileSize,fileType,fileName,fileDescription);
    this.setState({loading:true})
    console.log("Hello in shareFile")
    this.state.dstorage.methods.shareFile(address,fileHash,fileSize,fileType,fileName,fileDescription).send({ from: this.state.account }).on('transactionHash',(hash)=>{
      this.setState({
        isFileShared:true,
        loading:false
      })
      console.log("File Shared  successfully")
     // window.location.reload()
    }).on('error', (e) => {
      window.alert('Error',e)
      this.setState({ loading: false })
    })
    
  }

  setUser =(_username)=>{
    this.setState({loading:true})
    console.log("Hello in username",_username)
    this.state.dstorage.methods.addUser(_username).send({ from: this.state.account }).on('transactionHash',(hash)=>{
      this.setState({
        isUserAuthenticated:true,
        loading:false
      })
      console.log("Username set successfully")
     // window.location.reload()
    }).on('error', (e) => {
      window.alert('Error',e)
      this.setState({ loading: false })
    })
  }
  // Get file from user
  captureFile = (event) => {
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
      account: '0x2241281922Efe379C835fa44C0b6243B276877DD',
      loading: false,
      dstorage: null,
      files: [],
      type: null,
      name: null,
      UserList:[],
      isUserAuthenticated:false,
      userName:''
    }

    //Bind functions
  }

  render() {
    console.log("boom",this.state.UserList);
    
    return (
      <div className='App'>
      
        {/* <Navbar account={this.state.account} /> */}
        <Router>
          <Routes>
            <Route path="/" element={
              this.state.loading
              ?<div>Loading...</div>
              :
              !this.state.isUserAuthenticated
            ?<SetUser 
            account={this.state.account}
            userName={this.state.userName}
            setUser={this.setUser}
            />
            :<Home account={this.state.account} 
                   userName={this.state.userName}/>} />

            <Route path="/Upload" element={
              this.state.loading
                ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
                : <Upload
                  account={this.state.account}
                  files={this.state.files.filter(item => item.uploader === this.state.account)}
                  captureFile={this.captureFile}
                  uploadFile={this.uploadFile}
                />} />
             <Route path="/View"  element={<View
             account={this.state.account}
             files={this.state.files.filter(item => item.uploader === this.state.account)}
             />}/>
            <Route path="/Share" element={<Share
            account={this.state.account} 
            files={this.state.files} 
            UserList={this.state.UserList}
            shareFile={this.shareFile}
            />} />
          </Routes>
        </Router>
      </div>

    );
  }
}

export default App;