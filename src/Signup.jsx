import React, { Component } from "react";
import "./signup.css";
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
    console.log("signup form submitted");
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/signup", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    console.log("responseBody from signup", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
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
        <form onSubmit={this.signupSubmitHandler} className="signup">
          <div>
            Username:
            <input
              type="text"
              onChange={this.handleUsernameChange}
              value={this.state.username}
            />
          </div>
          <div>
            Password:
            <input
              type="text"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
