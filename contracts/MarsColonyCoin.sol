// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// ERC20Votes modified contract allowing snapshotting of tokens 
// owned in the past for voting as opposed to current to prevent 
// people from buying up tokens to vote and then dumping

contract MarsColonyCoin is ERC20Votes {
    uint256 public s_maxSupply = 100000000000000000000000;

    constructor() 
        ERC20("MarsColonyCoin", "MCC") 
        ERC20Permit("MarsColonyCoin") 
    {
        _mint(msg.sender, s_maxSupply);

    }


    // Overrides required by solidity

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20Votes) {
        super._burn(account, amount);
    }
}