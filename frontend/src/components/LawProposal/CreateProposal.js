import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Ipfs from "./Ipfs";
import LawProposal from "../../artifacts/contracts/LawProposal.sol/LawProposal.json";

const lawProposalAddress = process.env.REACT_APP_LAW_PROPOSAL;

const CreateProposal = () => {
  // store greeting in local state
  const [law, setLaw] = useState("");
  const [hash, setHash] = useState("");
  const [count, setCount] = useState(null);
  const [result, setResult] = useState("");

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
  async function proposeLaw() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        lawProposalAddress,
        LawProposal.abi,
        signer
      );

      try {
        const transaction = await contract.proposeLaw(hash);
        await transaction.wait();
        setResult(`Proposal success. Hash is ${hash}`);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function getProposalCount() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        lawProposalAddress,
        LawProposal.abi,
        provider
      );
      try {
        const data = await contract.getProposalCount();
        setCount(parseInt(data._hex, 16));
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function getProposalHash() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        lawProposalAddress,
        LawProposal.abi,
        provider
      );
      try {
        const data = await contract.getProposalHash(4);
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
      <br />
      <div class="card">
        <div class="card-body">
          <header className="App-header">Propose the law</header>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={proposeLaw}
          >
            Propose The Law
          </button>
          <br />
          {result}
        </div>
      </div>

      {/* <br />
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={getProposalCount}
      >
        Get Count
      </button>
      <div>{count}</div>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={getProposalHash}
      >
        Get Hash
      </button>
      {`https://ipfs.infura.io/ipfs/${hash}`} */}
    </div>
  );
};

export default CreateProposal;
