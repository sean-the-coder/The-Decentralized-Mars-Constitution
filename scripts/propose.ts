// @ts-ignore
import { ethers, network } from "hardhat";
import { developmentChains, FUNC, NEW_STORE_VALUE, proposalsFile, PROPOSAL_DESCRIPTION, VOTING_DELAY } from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import * as fs from "fs"

export async function propose(args: any[], functionToCall: string, proposalDescription: string) {
    const voter = await ethers.getContract("VoterContract");
    const dmc = await ethers.getContract("DMC");
    const encodedFunctionCall = dmc.interface.encodeFunctionData( functionToCall, args);

    console.log(encodedFunctionCall);
    console.log(`Proposing ${functionToCall} on ${dmc.address} with ${args}`);
    console.log(`Proposal Description: \n ${proposalDescription}`);

    const proposeTx = await voter.propose(
        [dmc.address],
        [0],
        [encodedFunctionCall],
        proposalDescription,
    );
    const proposeReceipt = proposeTx.wait(1);

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 1);
    }

    const proposalId = proposeReceipt.event[0];
    let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8")) 
    proposals[network.config.chainId!.toString()].push(proposalId.toString());
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals));
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
    .then(()=> process.exit(0))
    .catch((error)=> {
        console.log(error);
        process.exit(1);
    });