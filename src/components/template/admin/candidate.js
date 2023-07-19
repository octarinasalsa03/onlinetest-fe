import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../organism/navbar";
import Sidebar from "../../organism/admin/sidebar";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import service from "../../../services/user/service";

function Candidate() {
  const url = "http://localhost:8088/api/candidate-management/candidate";
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };

  const column = [
    {
      name: "No",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.fullname,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Action",
      cell: (row) => (
        <button className="btn btn-primary" onClick={(e) => sendLink(row.id)}>
          Send Link
        </button>
      ),

      // <button className="btn btn-danger" onClick={(e) => remove(row.id)}>
      //   Delete
      // </button>
    },
  ];

  useEffect(() => {
    axios
      .get(url)
      .then(function (res) {
        setRecords(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(JSON.parse(window.localStorage.getItem("user")).token));
  }, []);

  const [records, setRecords] = useState([]);
  return (
    <div>
      <div className="container-fluid bg-body-secondary min-vh-100">
        <div className="row">
          {toggle && (
            <div className="col-2 bg-white vh-100">
              <Sidebar></Sidebar>
            </div>
          )}
          <div className="col" id="col-nav">
            <div Toggle={Toggle}>
              <Navbar Toggle={Toggle}></Navbar>
              <div className="card mt-5 border-0">
                <div className="card-body">
                  {/* <a className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#createParticipantModal">
                    Create
                  </a> */}
                  <DataTable columns={column} data={records} pagination></DataTable>
                  {/* <table className="table mt-3 text-center" id="myTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Candidate Name</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.data.map((x) => {
                        return (
                          <tr>
                            <td>{x.id}</td>
                            <td>{x.name}</td>
                            <td>{x.email}</td>
                            <td>
                              <button className="btn btn-primary">Send Link</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="modal" tabindex="-1" id="createParticipantModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
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
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );

  function remove(id) {
    const conf = window.confirm("Are you sure you want to delete?");
    // alert(id);
    if (conf) {
      axios.delete(url + id).then(function (res) {
        alert("Deleted successfully!");
      });
    }
  }

  function sendLink(id) {
    axios
      .get("http://localhost:8088/api/candidate/" + id)
      .then(function (res) {
        const obj = {
          recipient: res.data.data.email,
          subject: "Techincal Test Online",
        };
        console.log(obj);
        axios
          .post("http://localhost:8088/api/candidate-management/sendMail", obj)
          .then(function (res) {
            alert("Link sent successfully!");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
}

export default Candidate;
