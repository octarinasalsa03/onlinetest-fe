import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Candidate from "./components/page/admin/candidate";
import Participant from "./components/page/admin/participant";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Routes>
        <Route path="/admin" element={<Candidate />}></Route>
        <Route path="/admin/participant" element={<Participant />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
