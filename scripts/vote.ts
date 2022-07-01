import * as fs from "fs";
// @ts-ignore
import { ethers, network } from "hardhat";
import { networkInterfaces } from "os";
import { developmentChains, proposalsFile, VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";

const index = 0;

async function main(proposalIndex: number) {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf-8"));
    const proposalId = proposals[network.config.chainId!][proposalIndex];
    // 0 = Against, 1 = For, 2 = Abstain
    const voteWay = 1;
    const voter = await ethers.getContract("VoterContract");
    const reason = "Becuase I'm awesome."
    const voteTxResponse = await voter.castVoteWithReason(proposalId, voteWay, reason); 
    await voteTxResponse.wait(1);

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1);
    }

    console.log("Vote placed!")
}

main(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })