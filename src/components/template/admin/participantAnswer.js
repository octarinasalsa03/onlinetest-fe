import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../organism/navbar";
import Sidebar from "../../organism/admin/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";

function ParticipantAnswer() {
  const { id } = useParams();
  const url = "http://localhost:8088/api/candidate-answer/" + id;
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
      name: "Question",
      selector: (row) => row.question.description,
    },
    {
      name: "Answer",
      selector: (row) => row.answer.value,
    },
    {
      name: "Result",
      selector: (row) => row.answer.iscorrectanswer.toString(),
    },
  ];

  useEffect(() => {
    axios
      .get(url)
      .then(function (res) {
        setRecords(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
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
                  <DataTable columns={column} data={records} pagination></DataTable>
                  {/* <table className="table mt-3 text-center" id="myTable">
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

export default ParticipantAnswer;
