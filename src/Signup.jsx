import React, { Component } from "react";
import "./signup.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
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
    this.props.dispatch({
      type: "login-success",
      username: this.state.username
    });
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    return (
      <div className="container-signup">
        <img
          src="http://claraquintela.com/wp-content/uploads/2019/11/White-and-Green-Leaves-Illustration-Landscaping-Business-Card-1.png"
          className="image-signup"
        />
        <div>
          <form onSubmit={this.signupSubmitHandler} className="signup">
            <div className="signup-child">
              Username
              <input
                type="text"
                onChange={this.handleUsernameChange}
                value={this.state.username}
                className="signup-field"
              />
            </div>
            <div className="signup-child">
              Password
              <input
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
                className="signup-field"
              />
            </div>
            <input type="submit" className="signup-button" />
            <Link className="link" to="/login">
              <div>Already have an account? Click here to log in</div>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
