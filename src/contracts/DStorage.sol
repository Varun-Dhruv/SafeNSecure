// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract DStorage {
  string public name = "DStorage";// Name
  uint public userCount=0;  //UserCount
  mapping(uint =>User) public UserList; // mapping of users
  mapping(address =>File[]) public sharedFiles;  // mapping of shared files
  mapping(address=>uint) public sharedFilesCount;
  uint public fileCount=0;  // Number of files
  mapping(uint=>File) public files;// Mapping fileId=>Struct 

 // Struct Files
 struct File{
     uint field;
     string fileHash;
     uint fileSize;
     string fileType;
     string fileName;
     string fileDescription;
     uint uploadTime;
     address payable uploader; 
   }
  // Struct
  struct User{
    string userName;
    address payable owner;
  }

  // Event
  event FileUploaded(
     uint field,
     string fileHash,
     uint fileSize,
     string fileType,
     string fileName,
     string fileDescription,
     uint uploadTime,
     address payable uploader 
  );

  event UserAdded(
     string userName,
     address payable owner
  );

  event FileShared(
    address payable receiver,
    address payable sender
  );

   // Add a User
    function addUser(string memory _userName) public {
  
    require(msg.sender!=address(0));  //check if the address is valid
  
    require(bytes(_userName).length>0);   // Check if the username is valid
    userCount++;
    UserList[userCount] =  User(_userName,payable(msg.sender)); //adding user to mapping 
    emit UserAdded(_userName,payable(msg.sender));
  }

  function getSharedFilesName(address payable receiver,uint i) public view returns(string memory _fileName ) {
    return(sharedFiles[receiver][i].fileName);
  }
  function getSharedFilesHash(address payable receiver,uint i) public view returns(string memory _fileHash ) {
    return(sharedFiles[receiver][i].fileHash);
  }
  function getSharedFilesSize(address payable receiver,uint i) public view returns(uint _fileSize) {
    return(sharedFiles[receiver][i].fileSize);
  }
  function getSharedFilesType(address payable receiver,uint i) public view returns(string memory _fileType) {
    return(sharedFiles[receiver][i].fileType);
  }
  function getSharedFilesDescription(address payable receiver,uint i) public view returns(string memory _fileDescription ) {
    return(sharedFiles[receiver][i].fileDescription);
  }
  function getSharedFileUploadTime(address payable receiver,uint i) public view returns(uint _fileUploadTime ) {
    return(sharedFiles[receiver][i].uploadTime);
  }  
  function getSharedFilesUploader(address payable receiver,uint i) public view returns(address _fileUploaderName) {
    return(sharedFiles[receiver][i].uploader);
  }
  //Get Shared Files
  
 //Share a file 
  function shareFile(address payable receiver ,string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public {
    require((bytes(_fileHash).length>0)); // Make sure the file hash exists

    require((bytes(_fileType).length>0)); // Make sure file type exists
    
    require((bytes(_fileDescription).length>0)); // Make sure file description exists
   
    require((bytes(_fileName).length>0));  // Make sure file fileName exists
    
    require(msg.sender!=address(0)); // Make sure uploader address exists
    
    require(_fileSize>0); // Make sure file size is more than 0

     //Increasing shared files count
     sharedFilesCount[receiver]++;

     sharedFiles[receiver].push(File(fileCount,_fileHash,_fileSize,_fileType,_fileName,_fileDescription, block.timestamp ,payable(msg.sender)));
  }

// Upload File function
  function uploadFile(string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public {


    require((bytes(_fileHash).length>0)); // Make sure the file hash exists

    require((bytes(_fileType).length>0)); // Make sure file type exists
    
    require((bytes(_fileDescription).length>0)); // Make sure file description exists
   
    require((bytes(_fileName).length>0));  // Make sure file fileName exists
    
    require(msg.sender!=address(0)); // Make sure uploader address exists
    
    require(_fileSize>0); // Make sure file size is more than 0

    fileCount++; // Increment file id

    files[fileCount]=File(fileCount,_fileHash,_fileSize,_fileType,_fileName,_fileDescription, block.timestamp ,payable(msg.sender));  // Add File to the contract

    emit FileUploaded(fileCount,_fileHash,_fileSize,_fileType,_fileName,_fileDescription, block.timestamp ,payable(msg.sender)); // Trigger an event
  }
  constructor()  {
  }

}