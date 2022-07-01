import * as fs from "fs";
import { network } from "hardhat";
import { networkInterfaces } from "os";
import { proposalsFile } from "../helper-hardhat-config";

const index = 0;

async function main(proposalIndex: number) {
    const proposals = JSON.parse(fs.readFileSync[proposalsFile, "utf-8"]);
    const proposalId = proposals[network.config.chainId!][proposalIndex];
}

main(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })