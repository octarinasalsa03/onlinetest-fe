import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Candidate from "../src/components/page/admin/candidate";
import Participant from "../src/components/page/admin/participant";
import ParticipantAnswer from "../src/components/page/admin/participantAnswer";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import Candidate from "../src/components/page/admin/candidate";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import store from "./app/store";
import Greeting from "./components/template/test/greeting";
import TestIndex from "./components/page/test";
import Finish from "./components/template/test/finish";
import NotFound from "./components/template/error/404";
import CandidateNotFound from "./components/template/error/candidateNotFound";
import Login from "./components/page/admin/login";
import Protected from "./util/ProtectedRoute";
import ProtectedRoute from "./util/ProtectedRoute";
// import TimerIndex from "./components/template/timer";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const [isLoggedIn, setIsLoggedIn] = useState(false);
// const checkUserToken = () => {
//   const userToken = localStorage.getItem("token");
//   if (!userToken || userToken === "undefined") {
//     setIsLoggedIn(false);
//     return navigate("/admin/login");
//   }
//   setIsLoggedIn(true);
// };
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* {<Candidate></Candidate>} */}
    {/* <Router>
      <Routes>
      <Route path="/admin" element={<Candidate />}></Route>
      <Route path="/admin/participant" element={<Participant />}></Route>
      </Routes>
    </Router> */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Candidate />} path="/admin" exact />
            <Route element={<ParticipantAnswer />} path="/admin/participant/answer/:id" exact />
            <Route element={<Participant />} path="/admin/participant" exact />
          </Route>
          {/* <Route
            path="/admin"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Candidate />
              </Protected>
            }
          /> */}
          {/* <Route path="/admin/participant" element={<Participant />}></Route>
          <Route path="/admin/participant/answer/:id" element={<ParticipantAnswer />}></Route> */}
          <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/">
            <Route path="test">
              <Route path="home" element={<Greeting></Greeting>}></Route>
              <Route path="test" element={<TestIndex></TestIndex>}></Route>
              <Route path="finish" element={<Finish></Finish>}></Route>
              <Route path="candidate-not-found" element={<CandidateNotFound></CandidateNotFound>}></Route>
              <Route path="*" element={<NotFound></NotFound>}></Route>
            </Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
