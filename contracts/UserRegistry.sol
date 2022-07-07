// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;

contract UserRegistry {

    struct Citizen {
        uint id;
        string name;
        string dateOfBirth;
        address citizenAddress;
    }

    struct PermissionSet {
        bool registered;
        bool hasPermissions;
    }

    constructor() {
        ownerAddress = msg.sender;
        permissions[ownerAddress].registered = true;
        permissions[ownerAddress].hasPermissions = true;
    }

    address ownerAddress;
    uint count = 1;

    mapping(address => PermissionSet) public permissions;
    mapping(uint => Citizen) private citizens;

    function getUser(uint _id) public view returns(Citizen memory) {
        return citizens[_id];
    }

    function _registerUser(string memory _name, string memory _dateOfBirth, address _address) public {
        require(msg.sender == ownerAddress, "Only owner can register new users");
        Citizen memory newUser = Citizen(count, _name, _dateOfBirth, _address);
        citizens[count] = newUser;
        permissions[_address].registered = true;
        permissions[_address].hasPermissions = true;
        count += 1;
    }

    function addressChange(uint _id, address _newAddress) public {
        Citizen memory citizen = getUser(_id);
        require(permissions[msg.sender].hasPermissions == true, "You are not a permissioned user");
        require(msg.sender == citizen.citizenAddress, "You can only change your own address");
        permissions[citizen.citizenAddress].hasPermissions = false;
        permissions[citizen.citizenAddress].registered = false;
        citizen.citizenAddress = _newAddress;
        permissions[_newAddress].registered = true;
        permissions[_newAddress].hasPermissions = true;
        citizens[_id] = citizen;
    }

    function checkPermissions(address _address) public view returns(bool) {
        require(permissions[_address].registered == true, "This address is not registered");
        return permissions[_address].hasPermissions;
    }
}