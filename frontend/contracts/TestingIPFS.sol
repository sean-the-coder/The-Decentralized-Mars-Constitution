// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract IpfsTest{
    uint count = 0;
    mapping (uint  => string) hashMap;

    function storeHash(string memory hash) public{
        count = count + 1;
        hashMap[count] = hash; 
    }

    function getHash(uint num) public view returns(string memory){
        require(num <= count);
        return hashMap[num];
    }

    function getCount() public view returns(uint){
        return count;
    }
}