import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { QUORUM_PERCENTAGE, VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config";

const deployVoterContract: DeployFunction = async (hre: HardhatRuntimeEnvironment ) => {
    // @ts-ignore
    const { getNamedAccounts, deployments} = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const marsColonyCoin = await get("MarsColonyCoin");
    const timeLock = await get("TimeLock");
    log("Deploying Voter Contract");

    // const voterContract = await deploy("VoterContract", {
    //     from: deployer,
    //     args: [
    //         marsColonyCoin.address,
    //         timeLock.address,
    //         QUORUM_PERCENTAGE,
    //         VOTING_PERIOD,
    //         VOTING_DELAY,
    //     ],
    //     log: true,
    // })

    log("🖐 Deployed Voter Contract");
}

export default deployVoterContract;