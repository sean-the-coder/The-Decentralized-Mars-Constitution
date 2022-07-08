// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { getRoles } = require("@testing-library/react");
const hre = require("hardhat");

async function main() {
  // We first deploy the coin
  const MarsCoin = await hre.ethers.getContractFactory("MarsCoin");
  const marsCoin = await MarsCoin.deploy();

  await marsCoin.deployed();

  const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy(marsCoin.address);

  await userRegistry.deployed();

  const LawProposal = await hre.ethers.getContractFactory("LawProposal");
  const lawProposal = await LawProposal.deploy(
    userRegistry.address,
    marsCoin.address
  );

  console.log("UserRegistry deployed to", userRegistry.address);
  console.log("LawProposal deployed to:", lawProposal.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
