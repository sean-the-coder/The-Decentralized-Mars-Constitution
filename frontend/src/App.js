import "./App.css";
import Home from "./pages/Home";
import LawProposalPage from "./pages/LawProposalPage";
import PendingLawsPage from "./pages/PendingLawsPage";
import ConstitutionPage from "./pages/ConstitutionPage";
import AboutPage from "./pages/AboutPage";
import "./css/bootstrap.css";
import { Navbar, Nav } from "react-bootstrap";
import "./css/bootstrap.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand></Navbar.Brand>
          <Nav>
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  <Link to="/">
                    <h3> Home</h3>
                  </Link>
                </div>
                <div class="col-sm">
                  <Link to="/a">
                    <h3> About</h3>
                  </Link>
                </div>
                <div class="col-sm">
                  <Link to="/pal">
                    <h3> Propose a Law</h3>
                  </Link>
                </div>
                <div class="col-sm">
                  <Link to="/pl">
                    <h3> Pending Laws</h3>
                  </Link>
                </div>
                <div class="col-sm">
                  <Link to="/c">
                    <h3> Constitution</h3>
                  </Link>
                </div>
              </div>
            </div>
          </Nav>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a" element={<AboutPage />} />
          <Route path="/pal" element={<LawProposalPage />} />
          <Route path="/pl" element={<PendingLawsPage />} />
          <Route path="/c" element={<ConstitutionPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
