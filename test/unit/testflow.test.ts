import { GovernorContract, GovernanceToken, TimeLock, DMC } from "../../typechain-types"
import { deployments, ethers } from "hardhat"
import { assert, expect } from "chai"
import {
  FUNC,
  PROPOSAL_DESCRIPTION,
  NEW_STORE_VALUE,
  VOTING_DELAY,
  VOTING_PERIOD,
  MIN_DELAY,
} from "../../helper-hardhat-config"
import { moveBlocks } from "../../utils/move-blocks"
import { moveTime } from "../../utils/move-time"

describe("Voter Flow", async () => {
  let voter: GovernorContract
  let marsColonyCoin: GovernanceToken
  let timeLock: TimeLock
  let dmc: DMC
  const voteWay = 1 // for
  const reason = "I lika do da cha cha"
  beforeEach(async () => {
    await deployments.fixture(["all"])
    voter = await ethers.getContract("VoterContract")
    timeLock = await ethers.getContract("TimeLock")
    marsColonyCoin = await ethers.getContract("MCC")
    dmc = await ethers.getContract("DMC")
  })

  it("can only be changed through voting", async () => {
    await expect(dmc.store(55)).to.be.revertedWith("Ownable: caller is not the owner")
  })

  it("proposes, votes, waits, queues, and then executes", async () => {
    // propose
    const encodedFunctionCall = dmc.interface.encodeFunctionData(FUNC, [NEW_STORE_VALUE])
    const proposeTx = await voter.propose(
      [dmc.address],
      [0],
      [encodedFunctionCall],
      PROPOSAL_DESCRIPTION
    )

    const proposeReceipt = await proposeTx.wait(1)
    const proposalId = proposeReceipt.events![0].args!.proposalId
    let proposalState = await voter.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)

    await moveBlocks(VOTING_DELAY + 1)
    // vote
    const voteTx = await voter.castVoteWithReason(proposalId, voteWay, reason)
    await voteTx.wait(1)
    proposalState = await voter.state(proposalId)
    assert.equal(proposalState.toString(), "1")
    console.log(`Current Proposal State: ${proposalState}`)
    await moveBlocks(VOTING_PERIOD + 1)

    // queue & execute
    // const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))
    const descriptionHash = ethers.utils.id(PROPOSAL_DESCRIPTION)
    const queueTx = await voter.queue([dmc.address], [0], [encodedFunctionCall], descriptionHash)
    await queueTx.wait(1)
    await moveTime(MIN_DELAY + 1)
    await moveBlocks(1)

    proposalState = await voter.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)

    console.log("Executing...")
    console.log
    const exTx = await voter.execute([dmc.address], [0], [encodedFunctionCall], descriptionHash)
    await exTx.wait(1)
    console.log((await dmc.retrieve()).toString())
  })
})
