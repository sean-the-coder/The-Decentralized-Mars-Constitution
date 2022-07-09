// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

// Created by Cole

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarsCoin is ERC20{
    address owner = msg.sender;
    constructor() ERC20('Mars Token', 'MAR') {
        _mint(owner, 10000* 10 ** 18);
    }

    function mint(address to, uint amount) internal {
        _mint(to, amount);
    }

    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }

     function transfer(address from, address to, uint256 amount) public  returns (bool) {
        _transfer(from, to, amount);
       // balanceCheck(owner, 10000 * 10 ** 18);
        return true;
    }

    //  function balanceCheck(address account, uint specifiedAmount) public {
    //     if (balanceOf(account) < specifiedAmount){
    //         _mint(account, specifiedAmount);
    //     }
    // }
}