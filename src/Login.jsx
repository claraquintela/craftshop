import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
    if (!body.success) {
      alert("login failed");
      return;
    }
    this.props.dispatch({
      type: "login-success"
    });
    alert("login successful");
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit} className="login">
        <div className="login-child">
          Username:
          <input type="text" onChange={this.handleUsernameChange} />
        </div>
        <div>
          Password:
          <input type="text" onChange={this.handlePasswordChange} />
        </div>
        <input type="submit" />
      </form>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
