import React, { useEffect, useState } from "react";
// import AuthContext from "../context/AuthContext";
import API from "../utils/UserAPI";
// import AuthForm from "../AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [ state, setState ] = useState( {
    email: "",
    password: "",
  } );

  useEffect( () => {
    const id = sessionStorage.getItem( "currentUsers" );
    if ( id ) {
      navigate( "/" );
    }
  }, [ navigate ] );

  const handleInputChange = ( event ) => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    setState( { ...state, [ name ]: value } );
  };

  const handleSubmit = ( event ) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    API.login( {
      email: state.email,
      password: state.password,
    } )
      .then( ( response ) => {
        sessionStorage.setItem(
          "currentUsers",
          response.data.foundUser
        );
        // sessionStorage.setItem("userToken", response.data.data.token);
        navigate( "/NewChild" );
      } )
      .catch( ( err ) => {
        throw err;
      } );
    setState( {
      email: "",
      password: "",
    } );
  };

  return (
    <div className="container login-form">
      <div className="row form-margin">
      </div>
      <div className="jumbotron">
        <div className="row">
          <div className="col text-center">
            <h1 className="welcome-back">Howdy Partner! 🤠</h1>
            <h3>Go on and check in below.</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 login-signup">
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
                placeholder="Password"
              />
            </div>
            <div className="row d-flex" id="sign-in-btns">
              <div className="col-sm-3 text-center">
                {/* <Link
                  type="submit"
                  className="btn btn-light button  sign-in-btn"
                  to="/NewChild"
                >
                  LOGIN
              </Link> */}
                <button
                  type="submit"
                  className="btn btn-light button text-center sign-in-btn"
                  onClick={handleSubmit}
                >
                  LOGIN
                </button>
              </div>
              <div className="col-sm-3"></div>
              <div className="col-sm-2 text-center">
                <Link
                  type="submit"
                  className="btn btn-light button   text-center sign-in-btn"
                  to="/signup"
                >
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <hr className="my-4" />
            <h5 className="my-2 text-center">Hold on little fella! </h5>
            <h6 className="my-2 text-center">
              Do you have permission from your parents? 🤪
            </h6>
            <h6 className="my-2 text-center">
              If not, go wrangle them up and lets get this started!
            </h6>
            <hr />
            <h6 className="my-2  disclaimer text-center">We collect user information in our database, including the children's information, solely for the purpose of being able to save your account information. We do not sell or share this information with any group or persons.</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
