import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../organism/navbar";
import Sidebar from "../../organism/admin/sidebar";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function Candidate(props) {
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
      email: "Email",
      selector: (row) => row.email,
    },
  ];

  useEffect(() => {
    const getData = async () => {
      axios
        .get("http://localhost:8088/api/candidate/")
        .then(function (response) {
          console.log(response);
        })
        .catch((err) => console.log(err));
    };
    getData();
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
                    Create
                  </a>
                  <DataTable columns={column} data={records}></DataTable>
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
    </div>
  );
}

export default Candidate;
