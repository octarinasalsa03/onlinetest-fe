import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";

function Login() {
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // authService.login(inputData);

    axios.post("http://localhost:8088/api/user-management/authentication", inputData).then(function (res) {
      console.log(res.data);
      const user = res.data.data;
      console.log(user);
      window.sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/admin");
    });
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container mt-3">
        <div class="card col-lg-6 mx-auto my-auto">
          <div class="card-body">
            <h4 class="text-center">Login Admin</h4>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email
                </label>
                <input type="email" class="form-control" id="email" name="email" onChange={(e) => setInputData({ ...inputData, email: e.target.value })} />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">
                  Password
                </label>
                <input type="password" class="form-control" id="password" name="password" onChange={(e) => setInputData({ ...inputData, password: e.target.value })} />
              </div>
              <button class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
