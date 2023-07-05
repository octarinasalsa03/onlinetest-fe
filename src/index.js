import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import Candidate from "../src/components/page/admin/candidate";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from "./app/store";
import TestIndex from "./components/page/test";
// import TimerIndex from "./components/template/timer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* {<Candidate></Candidate>} */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestIndex></TestIndex>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
