import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import UserRegistry from "../artifacts/contracts/UserRegistry.sol/UserRegistry.json";

const userRegistryAddress = process.env.REACT_APP_USER_REGISTRY;

const RegisterPage = () => {
  const [result, setResult] = useState("");
  const [address, setAddress] = useState("");
  const [admin, setAdmin] = useState(true);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newResult, setNewResult] = useState("");

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function checkAddress() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum); //if the smart contract function is view, then a signer is not needed
      const contract = new ethers.Contract(
        userRegistryAddress,
        UserRegistry.abi,
        provider
      );
      try {
        const data = await contract.checkUser(address);
        setAdmin(data);
        if (data) {
          setResult("You are an admin and can register new users");
        } else {
          setResult("You are not an admin");
        }
      } catch (err) {
        setResult("Not a valid address");
        console.log("Error: ", err);
      }
    }
  }

  async function registerNewUser() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        userRegistryAddress,
        UserRegistry.abi,
        signer
      );
      try {
        const transaction = await contract.registerUser(name, dob, newAddress);
        await transaction.wait();
        setNewResult(`User ${name}, ${dob}, with address ${newAddress} added`);
      } catch (err) {
        setNewResult("See console for error");
        console.log("Error: ", err);
      }
    }
  }

  return (
    <div className="container justify-content-between">
      <div className="pull-left">
        <h2>Only Admin can register new users</h2>
      </div>
      <div className="mb-3">
        <label className="form-label">Check if you're an admin</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ethereum Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={checkAddress}
            >
              Check
            </button>
          </div>
        </div>
      </div>
      <div className="mb-3">{result}</div>
      {admin && (
        <div>
          <h3> Register a New user</h3>
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Full Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Date of Birth</label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setDob(e.target.value.toString())}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                Ethereum Address
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={registerNewUser}
            >
              Submit
            </button>
          </form>
          {newResult}
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
