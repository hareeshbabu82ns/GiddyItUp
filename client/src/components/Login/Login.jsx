import React, { useEffect, useState } from "react";
// import AuthContext from "../context/AuthContext";
import API from "../utils/UserAPI";
// import AuthForm from "../AuthForm/AuthForm";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const id = sessionStorage.getItem("currentUsers");
    if (id) {
      history.push("/NewChild");
    }
  }, [history]);

  const handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    API.login({
      email: state.email,
      password: state.password,
    })
      .then((response) => {
        sessionStorage.setItem(
          "currentUsers",
          response.data.data.foundUser._id
        );
        sessionStorage.setItem("userToken", response.data.data.token);
        history.push("/NewChild");
      })
      .catch((err) => {
        throw err;
      });
    setState({
      email: "",
      password: "",
    });
  };

  return (
    // <div className="container">
    //   <div className="row login-jumbotron">
    //     <br />
    //     <br />
    //   </div>
    //   <div className="jumbotron">
    //     <div className="row">
    //       <div className="col text-center">
    //         <h1 className="welcome">Howdy Partner!</h1>
    //         <h3>Go on and check in below.</h3>
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col-sm-3"></div>
    //       <div className="col-sm-6 login-signup">
    //         <AuthForm
    //           handleSubmit={handleSubmit}
    //           buttonText="Sign In"
    //           slug="login"
    //           buttonSign="Sign Up"
    //           slug="signup"
    //         />
    //       </div>
    //       <div className="col-sm-12">
    //         <hr className="my-4" />
    //         <h5 className="my-2 text-center">Hold on little fella!</h5>
    //         <h6 className="my-2 text-center">
    //           Do you have permission from your parents?
    //         </h6>
    //         <h6 className="my-2 text-center">
    //           If not, go wrangle them up and lets get this started!
    //         </h6>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <main className="content">
      <div className="container sign-in-container">
        <section className="row">
          <div className="col-sm-12">
            <h1>Howdy Partner</h1>
          </div>
        </section>
        <div>
          <br />
        </div>
        <section className="row">
          <form className="col-sm-12" id="sign-in-form">
            <div className="form-group">
              <input
                value={state.email}
                name="email"
                onChange={handleInputChange}
                type="email"
                className="form-control sign-in-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                value={state.password}
                name="password"
                onChange={handleInputChange}
                type="password"
                className="form-control sign-in-input"
                id="exampleInputPassword1"
                aria-describedby="passwordHelp"
                placeholder="password"
              />
            </div>
            <div id="sign-in-btns">
              <Link
                type="submit"
                className="btn btn-primary button sign-in-btn"
                to="/NewChild"
              >
                Login
              </Link>
              &nbsp;
              <Link
                type="submit"
                className="btn btn-primary button sign-in-btn"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </section>
        <div className="col-sm-12">
          <hr className="my-4" />
          <h5 className="my-2 text-center">Hold on little fella!</h5>
          <h6 className="my-2 text-center">
            Do you have permission from your parents?
          </h6>
          <h6 className="my-2 text-center">
            If not, go wrangle them up and lets get this started!
          </h6>
        </div>
      </div>
    </main>
  );
};

export default Login;
