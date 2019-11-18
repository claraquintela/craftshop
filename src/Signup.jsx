import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  signupSubmitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("Signup failed! This crafty username is taken, choose another!");
      return;
    }
    alert("Signup is successful! Welcome to CraftyPeople!!");
    this.setState({ username: "", password: "" });
    this.props.dispatch({ type: "login-success" });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.signupSubmitHandler}>
          Username:
          <input
            type="text"
            onChange={this.handleUsernameChange}
            value={this.state.username}
          />
          Password:
          <input
            type="text"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
