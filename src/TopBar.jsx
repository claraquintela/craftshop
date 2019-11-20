import React, { Component } from "react";
import "./topbar.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";

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
      <div>
        <div className="navigationBar">
          <Link className="link" to="/">
            <img
              src="http://claraquintela.com/wp-content/uploads/2019/11/crafty-people-Logo.png"
              align="left"
              height="200px"
            />
          </Link>
          <Search />
          <section class="topbar-left">
            <Link className="link" to="/login">
              <img
                src="http://pixsector.com/cache/94bed8d5/av3cbfdc7ee86dab9a41d.png"
                height="50px"
                nameclass="icon"
                aria-label="login"
              />
            </Link>
            <Link className="link" to="/signup">
              <img
                src="http://claraquintela.com/wp-content/uploads/2019/11/signup.png"
                height="50px"
                nameclass="icon"
                aria-label="signup"
              />
            </Link>
            <Link className="link" to="/c art">
              <img
                src="http://claraquintela.com/wp-content/uploads/2019/11/shopping-cart.png"
                height="50px"
                nameclass="icon"
                aria-label="shopping_cart"
              />
            </Link>
          </section>
        </div>
      </div>
    );
  };
}

let TopBar = connect()(UnconnectedTopBar);
export default TopBar;
