// import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Candidate from "./components/page/admin/candidate";
// import Participant from "./components/page/admin/participant";
// import { useState } from "react";
// import React from "react";
import ReactDOM from "react-dom/client";
// import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Protected from "./util/ProtectedRoute";
import { Provider } from "react-redux";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import store from "./app/store";
import Greeting from "./components/template/test/greeting";
import TestIndex from "./components/page/test";
import Finish from "./components/template/test/finish";
import NotFound from "./components/template/error/404";
import CandidateNotFound from "./components/template/error/candidateNotFound";
import Login from "./components/page/admin/login";
// import Protected from "./util/ProtectedRoute";
import Candidate from "../src/components/page/admin/candidate";
import Participant from "../src/components/page/admin/participant";
import ParticipantAnswer from "../src/components/page/admin/participantAnswer";
// import App from "./App";

function App() {
  // const [, setIsLoggedIn] = useState(false);
  // const checkUserToken = () => {
  //   const userToken = localStorage.getItem("token");
  //   if (!userToken || userToken === "undefined") {
  //     setIsLoggedIn(false);
  //     return Navigate("/admin/login");
  //   }
  //   setIsLoggedIn(true);
  // };

  // useEffect(() => {
  //   checkUserToken();
  // }, [isLoggedIn]);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* <App /> */}
          {/* <Route
            path="/admin"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Candidate />
              </Protected>
            }
          /> */}
          <Route path="/admin/participant" element={<Participant />}></Route>
          <Route path="/admin/participant/answer/:id" element={<ParticipantAnswer />}></Route>
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
  );
}

export default App;
