import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Ipfs from "./Ipfs";
import LawProposal from "../../artifacts/contracts/LawProposal.sol/LawProposal.json";
import { Grid, Button } from "@material-ui/core";
import useStyles from "./styles.js";
import Proposal from "./Proposal/Proposal";

const lawProposalAddress = process.env.REACT_APP_LAW_PROPOSAL;

const Proposals = () => {
  const [proposalNum, setProposalNum] = useState(1);

  const [proposalArray, setProposalArray] = useState([]);
  const classes = useStyles();

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getProposals() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        lawProposalAddress,
        LawProposal.abi,
        provider
      );
      try {
        setProposalArray(await contract.getProposals());
        console.log(proposalArray);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  return proposalArray.length === 0 ? (
    <div>
      <Button onClick={getProposals}> Get Proposals</Button>
    </div>
  ) : (
    <div>
      <Grid
        className={classes.container}
        container
        allignment="stretch"
        spacing={1}
      >
        {proposalArray.map((proposal) => (
          <Grid item xs={12} sm={6}>
            <Proposal proposal={proposal} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Proposals;
