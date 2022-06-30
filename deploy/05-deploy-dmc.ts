import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
// @ts-ignore
import { ethers } from "hardhat";

const deployDMC: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    // @ts-ignore
    const { getNamedAccounts, deployments} = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();

    log("Deploying DMC!")

    const dmc = await deploy("DMC", {
        from: deployer,
        args: [],
        log: true,
    });

    const timeLock = await ethers.getContract("TimeLock", deployer);
    const boxContract = await ethers.getContractAt("DMC", dmc.address);

    const transferOwnerTx = await boxContract.transferOwnership(timeLock.address);
    await transferOwnerTx.wait(1);
    log("DMC Deployed!")
}

export default deployDMC;