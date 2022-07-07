import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const deployDMC: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying DMC and waiting for confirmations...")
  const dmc = await deploy("DMC", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`DMC at ${dmc.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(dmc.address, [])
  }
  const dmcContract = await ethers.getContractAt("DMC", dmc.address)
  const timeLock = await ethers.getContract("TimeLock")
  const transferTx = await dmcContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)
}

export default deployDMC
deployDMC.tags = ["all", "dmc"]