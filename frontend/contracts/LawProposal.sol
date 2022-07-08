// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;

import {UserRegistry} from "./UserRegistry.sol";
import {MarsCoin} from "./MarsCoin.sol";

contract LawProposal{
    UserRegistry public userRegistry;
    MarsCoin public marsCoin;

    struct Proposal {
        address creator; //ideally this should be a citizen
        uint proposalNum;
        string hash;
        uint voteYes;
        uint voteNo;
        uint status; //0-cancelled, 1-pending, 2-law
    }

    mapping(uint => Proposal) proposals;
    Proposal[] proposalArray;
    mapping(uint => Proposal) laws;
    uint proposalCount = 0;
    uint lawCount = 0;

  constructor(address _userRegistryAddr, address _marsCoinAddress) {
    userRegistry = UserRegistry(_userRegistryAddr);
    marsCoin = MarsCoin(_marsCoinAddress);
  }

  function proposeLaw(string memory _hash) public{
      require(userRegistry.checkPermissions(msg.sender) == true, "You are not a citizen");
      Proposal memory proposal = Proposal(msg.sender, proposalCount + 1, _hash, 0, 0, 1);
      proposalCount = proposalCount + 1;
      proposals[proposalCount] = proposal;
      proposalArray.push(proposal);
  } 

  function voteLaw(uint _proposalNum, bool yesOrNo) public{
      require(userRegistry.checkPermissions(msg.sender) == true, "You are not a citizen");
      //How to check if someone has already voted on a law
      if(yesOrNo){
          proposals[_proposalNum].voteYes = proposals[_proposalNum].voteYes + 1; 
      }
      else{
          proposals[_proposalNum].voteNo = proposals[_proposalNum].voteNo + 1; 
      }
  }

    //Currently there is backing step for the law

    //Currently the address that created the law can end the vote at anytime. This should be determined by some type of timer
    function endVote(uint _proposalNum) public{
        require(proposals[_proposalNum].creator == msg.sender, "You did not create this law");
        if(proposals[_proposalNum].voteYes > proposals[_proposalNum].voteNo){
            proposals[_proposalNum].status = 2;
            lawCount = lawCount + 1;
            laws[lawCount] = proposals[_proposalNum];
        }
        else{
            proposals[_proposalNum].status = 0;
        }
    }

    function getProposalCount() public view returns(uint){
        return proposalCount;
    }

    function getLawCount() public view returns(uint){
        return lawCount;
    }

    function getProposalHash(uint _proposalNum) public view returns (string memory){
        require(_proposalNum <= proposalCount && _proposalNum > 0, "Proposal does not exist");
        return proposals[_proposalNum].hash;
    }

    function getLawHas(uint _lawNum) public view returns (string memory){
        require(_lawNum <= lawCount && _lawNum > 1, "Law does not exist");
        return laws[_lawNum].hash;
    }

    function getProposal(uint _proposalNum) public view returns (Proposal memory){
        require(_proposalNum <= proposalCount && _proposalNum > 0, "Proposal does not exist");
        return proposals[_proposalNum];
    }

    function getProposals() public view returns (Proposal [] memory){
        return proposalArray;
    }
}