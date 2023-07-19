import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import authService from "../../services/authService";
import { redirect, useNavigate } from "react-router-dom";

function Navbar({ Toggle }) {
  const navigate = useNavigate();

  function logout() {
    authService.logout();
    navigate("/admin/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-white d-flex mt-4">
        <div className="container-fluid">
          <h4>
            <i className="bi bi-list menu-logo" onClick={Toggle}></i>
          </h4>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Octarina
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={(e) => logout()} href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
