// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DMC is Ownable {
  uint256 private value;

  struct Law {
      string ipfsHash;
      string[] parentHashes;
    }
  
  mapping(uint256 => Law) hashMap;
  uint256 hashCount;

  // Emitted when the stored value changes
  event ValueChanged(uint256 newValue);
  
  event DMCChanged(string ipfsHash);

  // Stores a new value in the contract
  function store(uint256 newValue) public onlyOwner {
    value = newValue;
    emit ValueChanged(newValue);
  }

  function store_law(uint256 index, string memory hashVal, string[] memory parents) public onlyOwner {
    hashMap[index].ipfsHash = hashVal;
    hashMap[index].parentHashes = parents;
    hashCount++;
    
    emit DMCChanged(hashMap[index].ipfsHash);
  }

  function modify_law(uint256 index, string memory hashVal, string[] memory parents) public onlyOwner {
    hashMap[index].ipfsHash = hashVal;
    hashMap[index].parentHashes = parents;
    
    emit DMCChanged(hashMap[index].ipfsHash);
  }

  // Reads the last stored value
  function retrieve() public view returns (uint256) {
    return value;
  }

  function retrieve_count() public view returns (uint256) {
    return hashCount;
  }

  function retrieve_law(uint256 index) public view returns (Law memory) {
      return hashMap[index];
  }
}

