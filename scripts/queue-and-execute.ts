import { ethers, network } from "hardhat";
import { developmentChains, FUNC, MIN_DELAY, NEW_STORE_VALUE, PROPOSAL_DESCRIPTION } from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import { moveTime } from "../utils/move-time";

export async function queueAndExecute() {
    const args = [NEW_STORE_VALUE];
    const dmc = await ethers.getContract("DMC");
    const encodedFunctionCall = dmc.interface.encodeFunctionData(FUNC, args);
    const descpriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION));

    const voter = await ethers.getContract("VoterContract");
    const queueTx = await voter.queue(
        [dmc.address],
        [0],
        [encodedFunctionCall],
        descpriptionHash
    )

    await queueTx.wait(1);

    if (developmentChains.includes(network.name)) {
        await moveTime(MIN_DELAY + 1);
        await moveBlocks(1);
    }

    console.log("Executing ...")
    const executeTx = await voter.execute(
        [dmc.address],
        [0],
        [encodedFunctionCall],
        descpriptionHash
    );
    await executeTx.wait(1);

    const dmcNewValue = await dmc.retrieve();
    console.log(`New Box Value: ${dmcNewValue.toString()}`)
}