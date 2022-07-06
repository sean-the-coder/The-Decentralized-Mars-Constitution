import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const deployMCC: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying MarsColonyCoin and waiting for confirmations...")
  const marsColonyCoin = await deploy("MCC", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`MarsColonyCoin at ${marsColonyCoin.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(marsColonyCoin.address, [])
  }
  log(`Delegating to ${deployer}`)
  await delegate(marsColonyCoin.address, deployer)
  log("Delegated!")
}

const delegate = async (marsColonyCoinAddress: string, delegatedAccount: string) => {
  const marsColonyCoin = await ethers.getContractAt("MCC", marsColonyCoinAddress)
  const transactionResponse = await marsColonyCoin.delegate(delegatedAccount)
  await transactionResponse.wait(1)
  console.log(`Checkpoints: ${await marsColonyCoin.numCheckpoints(delegatedAccount)}`)
}

export default deployMCC
deployMCC.tags = ["all", "governor"]
