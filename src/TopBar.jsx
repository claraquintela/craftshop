import React, { Component } from "react";
import "./topbar.css";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
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
      <TopAppBar
        title="Crafty People"
        prominent
        dense
        navigationIcon={
          <MaterialIcon icon="menu" onClick={() => console.log("click")} />
        }
        actionItems={[
          <MaterialIcon icon="file_download" />,
          <MaterialIcon icon="print" />,
          <MaterialIcon icon="bookmark" />
        ]}
      />
    );
  };
}

let TopBar = connect()(UnconnectedLogin);
export default TopBar;
