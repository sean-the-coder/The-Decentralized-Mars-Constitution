// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const TestingIPFS = await hre.ethers.getContractFactory("IpfsTest");
  const testingIPFS = await TestingIPFS.deploy();

  await testingIPFS.deployed();

  console.log("TestingIPFS deployed to:", testingIPFS.address);

  const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();

  const LawProposal = await hre.ethers.getContractFactory("LawProposal");
  const lawProposal = await LawProposal.deploy(userRegistry.address)

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
