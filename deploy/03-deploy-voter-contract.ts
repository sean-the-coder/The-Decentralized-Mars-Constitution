import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import {
  networkConfig,
  developmentChains,
  QUORUM_PERCENTAGE,
  VOTING_PERIOD,
  VOTING_DELAY,
} from "../helper-hardhat-config"

const deployVoterContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const marsColonyCoin = await get("MCC")
  const timeLock = await get("TimeLock")

  log("----------------------------------------------------")
  log("Deploying VoterContract and waiting for confirmations...")
  const voterContract = await deploy("VoterContract", {
    from: deployer,
    args: [
      marsColonyCoin.address,
      timeLock.address,
      QUORUM_PERCENTAGE,
      VOTING_PERIOD,
      VOTING_DELAY,
    ],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`VoterContract at ${voterContract.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(voterContract.address, [])
  }
}

export default deployVoterContract
deployVoterContract.tags = ["all", "governor"]
