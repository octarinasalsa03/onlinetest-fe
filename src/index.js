import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Candidate from "../src/components/page/admin/candidate";
import Participant from "../src/components/page/admin/participant";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* {<Candidate></Candidate>} */}
    <Router>
      <Routes>
        <Route path="/admin" element={<Candidate />}></Route>
        <Route path="/admin/participant" element={<Participant />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
