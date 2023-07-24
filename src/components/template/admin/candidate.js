import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../organism/navbar";
import Sidebar from "../../organism/admin/sidebar";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import service from "../../../services/user/service";

function Candidate() {
  const url = "http://localhost:8088/api/candidate-management/candidate";
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };

  // const datetime = new Date().toISOString().slice(0, -8).split('T')[0]
  const [inputData, setInputData] = useState({ fullname: "", email: "", score: null, istestfinished: 0, Teststarttime: "" });
  const [datetime, setDatetime] = useState("");
  const navigate = useNavigate();

  function handleChange(ev) {
    if (!ev.target["validity"].valid) return;
    // const dt = ev.target["value"] + ":00Z";
    const dt = ev.target["value"].replace("T", " ") + ":00";

    setDatetime(dt);
    setInputData({ ...inputData, Teststarttime: datetime });
    // console.log("ini " + ev);
    // console.log("ini " + dt);
    // console.log(datetime);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // setInputData({ ...inputData, Teststarttime: datetime });
    // authService.login(inputData);
    console.log(inputData);
    try {
      axios.post("http://localhost:8088/api/candidate", inputData).then(function (res) {
        window.location.reload();
      });
    } catch (error) {}
  }

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
      .catch((err) => console.log(JSON.parse(window.sessionStorage.getItem("user")).token));
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
                  <a className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#createParticipantModal">
                    Add Candidate
                  </a>
                  <DataTable columns={column} data={records} pagination></DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" tabindex="-1" id="createParticipantModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="fullname" className="form-label">
                    Full Name
                  </label>
                  <input type="text" className="form-control" id="Fullname" name="Fullname" onChange={(e) => setInputData({ ...inputData, fullname: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="Email" name="Email" onChange={(e) => setInputData({ ...inputData, email: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label for="teststarttime" className="form-label">
                    Test Start Time
                  </label>
                  <input type="datetime-local" className="form-control" value={(datetime || "").toString().substring(0, 16)} onChange={handleChange} />
                  {/* <input type="datetime-local" className="form-control" id="Teststarttime" name="Teststarttime" onChange={(e) => setInputData({ ...inputData, Teststarttime: e.target.defaultValue })} /> */}
                </div>
                <button className="btn btn-primary">Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
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
