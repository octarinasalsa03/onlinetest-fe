import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../organism/navbar";
import Sidebar from "../../organism/admin/sidebar";
import { useState } from "react";

function Participant(props) {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
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
                  <table className="table mt-3 text-center" id="myTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Participant Name</th>
                        <th>Email</th>
                        <th>Score</th>
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
                            <td>{x.score}</td>
                            <td>
                              <button className="btn btn-primary">See Answer</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Participant;
