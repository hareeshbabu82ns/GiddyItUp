import Header from "./components/Header/Header";
import Bounty from "./components/Bounty/Bounty";
import Saloon from "./components/Saloon/Saloon";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ParentBounty from "./components/ParentBounty/ParentBounty";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import NewChild from "./components/NewChild/NewChild";


class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     points: 0,
  //     show: true,
  //   };
  // }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Header />
            <Routes>
              <Route path="/" >
                <Route index element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="Saloon" element={<Saloon />} />
                <Route path="Bounty" element={<Bounty />} />
                <Route path="ParentBounty" element={<ParentBounty />} />
                <Route path="NewChild" element={<NewChild />} />
              </Route>
            </Routes>
          </header>
        </div>
      </Router >
    );
  }
}

export default App;
