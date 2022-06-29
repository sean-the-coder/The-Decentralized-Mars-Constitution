import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";

const deployMarsColonyCoin: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments} = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("Deploying Mars Colony Coin...")
    const marsColonyCoin = await deploy("MarsColonyCoin", {
        from: deployer,
        args: [],
        log: true,
        // waitConfirmations
    })
    // verify
    log(`Deployed Mars Colony Coin to to address: ${marsColonyCoin}`)

    await delegate(marsColonyCoin.address, deployer);
    log("Delegated!")
}

const delegate = async (marsColonyCoinAddress: string, delegatedAccount: string) => {
    const marsColonyCoin = await ethers.getContractAt(
        "MarsColonyCoin",
        marsColonyCoinAddress
    )
    const tx = await marsColonyCoin.delegate(delegatedAccount);
    await tx.wait(1);
    console.log(
        `Checkpoints ${await marsColonyCoin.numCheckpoints(delegatedAccount)}`
    )
}

export default deployMarsColonyCoin;