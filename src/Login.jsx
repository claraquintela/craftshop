import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
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
      type: "login-success",
      username: this.state.username
    });

    alert("login successful");
    this.setState({ redirect: true });
  };
  render = () => {
    if (this.state.redirect) return <Redirect to="/" />;
    return (
      <div className="container-login">
        <img
          src="http://claraquintela.com/wp-content/uploads/2019/11/white_and_green_leaves_illustration_landscaping_business_card.png"
          className="image-login"
        />

        <form onSubmit={this.handleSubmit} className="login">
          <div className="login-child">
            Username
            <input
              type="text"
              onChange={this.handleUsernameChange}
              className="login-field"
            />
          </div>
          <div className="login-child">
            Password
            <input
              type="password"
              onChange={this.handlePasswordChange}
              className="login-field"
            />
          </div>
          <input type="submit" className="login-button" />
          <Link className="link" to="/signup">
            <div>Would you like to sign up? Click here</div>
          </Link>
        </form>
      </div>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
