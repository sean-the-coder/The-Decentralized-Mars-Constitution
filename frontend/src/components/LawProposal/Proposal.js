import React from "react";
import "../../css/bootstrap.css";
import { useState } from "react";
import { ethers } from "ethers";
import TestingIPFS from "../../artifacts/contracts/TestingIPFS.sol/IpfsTest.json";

import Ipfs from "./Ipfs";

// Update with the contract address logged out to the CLI when it was deployed
const ipfsTestAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const Proposal = () => {
  // store greeting in local state
  const [law, setLaw] = useState("");
  const [hash, setHash] = useState("");
  const [count, setCount] = useState(null);

  async function saveFile() {
    const fileData = law;
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "law.txt";
    link.href = url;
    link.click();
  }

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // call the smart contract, send an update
  async function storeHash() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ipfsTestAddress,
        TestingIPFS.abi,
        signer
      );

      try {
        const transaction = await contract.storeHash(hash);
        await transaction.wait();
        console.log(`${hash} was stored`);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function getCount() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        ipfsTestAddress,
        TestingIPFS.abi,
        provider
      );
      try {
        const data = await contract.getCount();
        setCount(parseInt(data._hex, 16));
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function getHash() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        ipfsTestAddress,
        TestingIPFS.abi,
        provider
      );
      try {
        const data = await contract.getHash(4);
        setHash(data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <header class="text-left">
          <h2>Steps To Propose a Law</h2>
          <ol>
            <li>
              Write the law in the text field and download the text file (you
              may use your own text file)
            </li>
            <li>Upload the text file and click submit</li>
            <li>Confirm the transactions using MetaMask</li>
          </ol>
        </header>
        <div class="container">
          <div class="row">
            <div class="col">
              <textarea
                class="form-control"
                rows="3"
                placeholder="Write the Law"
                onChange={(e) => setLaw(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
        </div>
        <div>
          <button className="btn btn-outline-secondary" onClick={saveFile}>
            Download Text File
          </button>
        </div>
        <br />
      </header>
      <Ipfs hash={hash} setHash={setHash} />
      <button className="btn btn-outline-secondary" onClick={storeHash}>
        Propose The Law
      </button>
      <br />
      <button className="btn btn-outline-secondary" onClick={getCount}>
        Get Count
      </button>
      <div>{count}</div>
      <button className="btn btn-outline-secondary" onClick={getHash}>
        Get Hash
      </button>
      {`https://ipfs.infura.io/ipfs/${hash}`}
    </div>
  );
};

export default Proposal;
