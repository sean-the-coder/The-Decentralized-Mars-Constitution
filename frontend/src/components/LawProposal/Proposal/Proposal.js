import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import LawProposal from "../../../artifacts/contracts/LawProposal.sol/LawProposal.json";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles.js";

const lawProposalAddress = process.env.REACT_APP_LAW_PROPOSAL;

const Proposal = ({ proposal, reload, setReload, law }) => {
  const [url, setUrl] = useState(
    `https://ipfs.infura.io/ipfs/${proposal.hash}`
  );
  const [proposalText, setProposalText] = useState("");
  //const [json, setJson] = useState({});
  const classes = useStyles();

  useEffect(() => {
    retreiveJson();
    console.log("here");
  }, [proposal, reload]);

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  function retreiveJson() {
    fetch(url)
      .then((res) => res.text())
      .then((out) => {
        setProposalText(out);
      })
      .catch((err) => console.error(err));
  }

  async function voteLaw(yesOrNo) {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        lawProposalAddress,
        LawProposal.abi,
        signer
      );

      try {
        const index = parseInt(proposal.proposalNum._hex, 16);
        console.log(index, yesOrNo);
        const transaction = await contract.voteLaw(index, yesOrNo);
        await transaction.wait();
        setReload(reload + 1);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function endVote() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        lawProposalAddress,
        LawProposal.abi,
        signer
      );
      try {
        const index = parseInt(proposal.proposalNum._hex, 16);
        const transaction = await contract.endVote(index);
        await transaction.wait();
        setReload(reload + 1);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  return (
    <div>
      <Card className={classes.card}>
        <div>
          <Box
            component="span"
            m={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="span" className={classes.title} variant="h5">
              {parseInt(proposal.status._hex, 16) !== 2 ? "Proposal" : "Law"}:{" "}
              {proposalText}
            </Typography>
          </Box>
        </div>
        <CardContent>
          <Typography component="span" variant="body2" gutterBottom>
            <Box fontWeight="bold" display="inline">
              Hash:{" "}
            </Box>
            {proposal.hash}
          </Typography>
          <br />
          <Typography component="span" variant="body2" gutterBottom>
            <Box fontWeight="bold" display="inline">
              Status:{" "}
            </Box>
            {parseInt(proposal.status._hex, 16) === 0
              ? "cancelled"
              : parseInt(proposal.status._hex, 16) === 1
              ? "pending"
              : "law"}
          </Typography>
          <br />
          <Typography component="span" variant="body2" gutterBottom>
            <Box fontWeight="bold" display="inline">
              Proposal Num:{" "}
            </Box>
            {parseInt(proposal.proposalNum._hex, 16)}
          </Typography>
          <br />
          <Typography component="span" variant="body2" gutterBottom>
            {parseInt(proposal.status._hex, 16) == 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  voteLaw(true);
                }}
              >
                Vote Yes
              </Button>
            ) : null}{" "}
            Yes Votes: {parseInt(proposal.voteYes._hex, 16)}
          </Typography>
          <br />
          <Typography component="span" variant="body2" gutterBottom>
            {parseInt(proposal.status._hex, 16) == 1 ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  voteLaw(false);
                }}
              >
                Vote No
              </Button>
            ) : null}{" "}
            No Votes: {parseInt(proposal.voteNo._hex, 16)}
          </Typography>
          <br />
          <br />
          {parseInt(proposal.status._hex, 16) == 1 ? (
            <Button size="small" variant="outlined" onClick={endVote}>
              End vote
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default Proposal;
