import "../css/bootstrap.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="container">
      <div className="App">
        <header class="text-left">
          <h1 class="text-center">Home</h1>
          <div class="card">
            <h5 class="card-header">GitHub</h5>
            <div class="card-body">
              <h5 class="card-title">About the repository</h5>
              <p class="card-text">Here is the GitHub...</p>
              <a
                href="https://github.com/sean-the-coder/The-Decentralized-Mars-Constitution"
                class="btn btn-primary"
              >
                The Decentralized Mars Constitution GitHub
              </a>
            </div>
          </div>
          <br />
          <div class="card">
            <h5 class="card-header">Discord</h5>
            <div class="card-body">
              <h5 class="card-title">Join the Discord Server</h5>
              <p class="card-text">
                The Discord Server is used for communication among citizens
              </p>
              <a
                href="https://github.com/sean-the-coder/The-Decentralized-Mars-Constitution"
                class="btn btn-primary"
              >
                Click to join
              </a>
            </div>
          </div>
          <br></br>
        </header>
      </div>
    </div>
  );
};

export default Home;
