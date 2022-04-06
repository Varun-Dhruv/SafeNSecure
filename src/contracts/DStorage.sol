// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract DStorage {
  string public name = "DStorage";// Name
  // Number of files
  uint public fileCount=0; 
  mapping(uint=>File) public files;// Mapping fileId=>Struct 

  // Struct
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
  constructor()  {

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

}