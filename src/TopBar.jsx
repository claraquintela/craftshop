import React, { Component } from "react";
import "./topbar.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";

class UnconnectedTopBar extends Component {
  logoutHandler = evt => {
    fetch("/logout", { method: POST, body: "", creditals: "include" });
    this.props.dispatch({ type: "logout" });
  };

  notLoggedIn = () => {
    return (
      <div>
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
        <Link className="link" to="/cart">
          <img
            src="http://claraquintela.com/wp-content/uploads/2019/11/shopping-cart.png"
            height="50px"
            nameclass="icon"
            aria-label="shopping_cart"
          />
        </Link>
      </div>
    );
  };

  loggedIn = () => {
    return (
      <div className="topbar-right">
        <img
          src="http://pixsector.com/cache/94bed8d5/av3cbfdc7ee86dab9a41d.png"
          height="50px"
          className="icon"
          aria-label="login"
        />
        <div>Hello, {this.props.username} </div>
        <Link className="link" to="/cart">
          <img
            src="http://claraquintela.com/wp-content/uploads/2019/11/shopping-cart.png"
            height="50px"
            className="icon"
            aria-label="shopping_cart"
          />
        </Link>
        <div onClick={this.logoutHandler}>
          <img
            src="https://www.pngfind.com/pngs/m/339-3396821_png-file-svg-download-icon-logout-transparent-png.png"
            align="left"
            height="200px"
            className="topbar-image"
          />
        </div>
      </div>
    );
  };

  render = () => {
    return (
      <div className="container-topbar">
        <div>
          <Link className="link" to="/">
            <img
              src="http://claraquintela.com/wp-content/uploads/2019/11/circle-cropped-1.png"
              align="left"
              height="200px"
              className="topbar-image"
            />
          </Link>
        </div>

        <div className="navigationBar">
          <Search />

          <section>
            {this.props.username ? this.loggedIn() : this.notLoggedIn()}
          </section>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    username: state.username
  };
};

let TopBar = connect(mapStateToProps)(UnconnectedTopBar);
export default TopBar;
