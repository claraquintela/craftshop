import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        <h1>Signup here</h1>
        <Signup />
        <h1>Login here</h1>
        <Login />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { login: state.loggedIn };
};
let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
