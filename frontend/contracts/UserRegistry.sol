// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;

// Created by Charlie

import {MarsCoin} from "./MarsCoin.sol";

contract UserRegistry{
    
    MarsCoin public marsCoin;

    struct Citizen {
        uint id;
        string name;
        string dateOfBirth;
        address citizenAddress;
    }

    constructor(address _marsCoinAddress) {
        ownerAddress = msg.sender;
        permissions[ownerAddress] = true;
        marsCoin = MarsCoin(_marsCoinAddress);
    }

    address ownerAddress;
    uint count = 1;

    mapping(address => bool) permissions;
    mapping(uint => Citizen) private citizens;

    function getUser(uint _id) public view returns(Citizen memory) {
        return citizens[_id];
    }

    function registerUser(string memory _name, string memory _dateOfBirth, address _address) public {
        require(msg.sender == ownerAddress, "Only owner can register new users");
        marsCoin.transfer(_address, 10000);
        Citizen memory newUser = Citizen(count, _name, _dateOfBirth, _address);
        citizens[count] = newUser;
        permissions[_address] = true;
        count += 1;
    }

    function addressChange(uint _id, address _newAddress) public {
        Citizen memory citizen = getUser(_id);
        require(permissions[msg.sender] == true, "You are not a permissioned user");
        require(msg.sender == citizen.citizenAddress, "You can only change your own address");
        permissions[citizen.citizenAddress] = false;
        citizen.citizenAddress = _newAddress;
        permissions[_newAddress] = true;
        citizens[_id] = citizen;
    }

    function checkPermissions(address _address) public view returns(bool){
       // require(permissions[_address].registered == true, "This address is not registered");
        return permissions[_address];
    }

    function checkUser(address _address) public view returns(bool){
        return _address == ownerAddress;
    }
}