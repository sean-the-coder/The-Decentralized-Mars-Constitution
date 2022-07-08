import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

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

const Proposal = ({ proposal }) => {
  const [url, setUrl] = useState(
    `https://ipfs.infura.io/ipfs/${proposal.hash}`
  );
  const [proposalText, setProposalText] = useState("");
  //const [json, setJson] = useState({});
  const classes = useStyles();

  useEffect(() => {
    retreiveJson();
  }, [proposal]);

  function retreiveJson() {
    fetch(url)
      .then((res) => res.text())
      .then((out) => {
        setProposalText(out);
      })
      .catch((err) => console.error(err));
  }

  return (
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
            Proposal Num:{" "}
          </Box>
          {parseInt(proposal.proposalNum._hex, 16)}
        </Typography>
        <br />
        <Typography component="span" variant="body2" gutterBottom>
          <Button size="small" variant="outlined" color="primary">
            Vote No
          </Button>{" "}
          Votes: {parseInt(proposal.voteNo._hex, 16)}
        </Typography>
        <br />
        <Typography component="span" variant="body2" gutterBottom>
          <Button size="small" variant="outlined" color="primary">
            Vote Yes
          </Button>{" "}
          Votes: {parseInt(proposal.voteYes._hex, 16)}
        </Typography>
        <br />
      </CardContent>
    </Card>
  );
};

export default Proposal;
