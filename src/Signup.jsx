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
      location: "",
      image: null,
      redirect: false
    };
  }
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleUserLocation = event => {
    this.setState({ location: event.target.value });
  };
  userImgHandler = event => {
    console.log("image handler", event.target.files[0]);
    this.setState({ image: event.target.files[0] });
  };
  signupSubmitHandler = async event => {
    event.preventDefault();
    console.log("this.state.image", this.state.image);
    let data = new FormData();

    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("location", this.state.location);
    data.append("file", this.state.image);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    console.log("Signup response", response);
    let responseBody = await response.text();
    console.log("Signup responseBody", responseBody);
    let body = JSON.parse(responseBody);
    console.log("SIGNNNNUP BODY", body);
    if (!body.success) {
      alert("Signup failed! This crafty username is taken, choose another!");
      return;
    }
    alert("Signup is successful! Welcome to CraftyPeople!!");
    this.setState({ username: "", password: "", location: "", image: null });
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
              Choose your Username:
              <input
                type="text"
                onChange={this.handleUsernameChange}
                value={this.state.username}
                className="signup-field"
              />
            </div>
            <div className="signup-child">
              Choose a Password:
              <input
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
                className="signup-field"
              />
            </div>
            <div className="signup-child">
              Tell us, where you're from:
              <input
                type="text"
                onChange={this.handleUserLocation}
                value={this.state.location}
                className="signup-field"
              />
            </div>
            <div className="signup-child">
              {this.state.image && (
                <img
                  src={window.URL.createObjectURL(this.state.image)}
                  className="image-preview"
                />
              )}
            </div>
            <div className="signup-child">
              Add a photo of yourself here:
              <input type="file" onChange={this.userImgHandler} />
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
