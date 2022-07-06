// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;

contract UserRegistry {

    struct Citizen {
        uint id;
        string name;
        string dateOfBirth;
        address citizenAddress;
    }

    constructor() {
        ownerAddress = msg.sender;
        permissions[ownerAddress] = true;
    }

    address ownerAddress;
    uint count = 1;

    mapping(address => bool) public permissions;
    mapping(uint => Citizen) private citizens;

    function getUser(uint _id) public view returns(Citizen memory) {
        return citizens[_id];
    }

    function _registerUser(string memory _name, string memory _dateOfBirth, address _address) public {
        require(msg.sender == ownerAddress, "Only owner can register new users");
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
}