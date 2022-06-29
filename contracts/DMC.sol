// contracts/DMC.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";


contract DMC is Ownable {
    uint256 private value;

    // Emitted whenever the stored value changes
    event ValueChanged(uint256 newValue);

    // Stores a new value in the contract
    function store(uint newValue) public onlyOwner {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}