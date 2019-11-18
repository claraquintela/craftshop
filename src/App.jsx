import { connect } from "react-redux";
import React, { Component } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        <h1>Signup here</h1>
        <Signup />
        <h1>Login here</h1>
        <Login />
        <div>
          <Search />
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { login: state.login };
};
let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
