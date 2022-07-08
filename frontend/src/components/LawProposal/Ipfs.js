import React from "react";
import "../../css/bootstrap.css";

import { useState } from "react";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { Container } from "react-bootstrap";

const client = create("https://ipfs.infura.io:5001/api/v0");

const Ipfs = ({ hash, setHash }) => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [url, setUrl] = useState("");
  const [json, setJson] = useState({});
  const [validFile, setValidFile] = useState(false);

  function saveFile() {
    const fileData = JSON.stringify("testing this should be the text");
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "user-info.txt";
    link.href = url;
    link.click();
  }

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    setValidFile(data.type === "text/plain");
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setFile(Buffer(reader.result));
    };

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validFile) {
      setResult("File must be a text file");
      return;
    }

    try {
      const buf = Buffer.from(file);
      const created = await client.add(buf);
      setHash(created.path);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setResult(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  function retreiveJson() {
    console.log(url);
    return fetch(`${url}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setJson(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div class="card">
      <div class="card-body">
        <header className="App-header">
          Upload your file and Click Submit
        </header>

        <div className="main">
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={retrieveFile} />
            <button type="submit" className="button">
              Submit
            </button>
          </form>
          <div>
            {result && validFile ? (
              <a href={result} style={{ color: "#000" }}>
                Access file using hash
              </a>
            ) : null}
          </div>

          <br />
          {result}
        </div>
      </div>
    </div>
  );
};

export default Ipfs;
