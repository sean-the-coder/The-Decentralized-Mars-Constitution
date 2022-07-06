# The-Decentralized-Mars-Constitution

This project uses Hardhat, ethers.js, and React

To start clone this repository into your own directory.

1) Install the dependencies with 
```shell
npm i
```
2) Start a hardhat node (keep this terminal open)
```shell
npx hardhat node
```
3) In another terminal. Compile the Solidity files
```shell
npx hardhat compile
```
Then to run locally enter the command
```shell
npx hardhat run scripts/deploy.js --network localhost
```

Then change the ipfsTestAddress within Proposal.js in Components to the deployed address in the terminal

Then run 
```shell
npm start
```

