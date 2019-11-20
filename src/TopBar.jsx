import React, { Component } from "react";
import "./topbar.css";
import { connect } from "react-redux";

class UnconnectedTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
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
  };
  render = () => {
    return (
      <div class="navigationBar">
        <div class="topbar">
          <section class="topbar right">
            <img src="public/logo.png">
            <button class="topbar menu">menu</button>
            <span class="topbar-title">Crafty People</span>{" "}
        </section>
          <section class="topbar left">
            <button class="icon" aria-label="Download">
              file_download
            </button>
            <button class="icon" aria-label="Print this page">
              print
            </button>
            <button class="icon" aria-label="Bookmark this page">
              bookmark
            </button>
          </section>
        </div>
      </div>
    );
  };
}

let TopBar = connect()(UnconnectedTopBar);
export default TopBar;
