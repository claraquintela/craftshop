import React, { Component } from "react";
import "./bottombar.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedBottomBar extends Component {
  render = () => {
    return (
      <div className="container-bottombar">
        <div className="navigationBar">
          <Link className="link" to="/">
            <img
              src="http://claraquintela.com/wp-content/uploads/2019/11/circle-cropped.png"
              align="left"
              height="200px"
              className="topbar-image"
            />
          </Link>
          <div className="footer-text">
            <div className="text_bottom">About us</div>
            <div className="text_bottom">Contact</div>
            <div className="text_bottom">Work with us</div>
          </div>
          <section className="bottombar-left">
            <a href="http://www.instagram.com">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/899px-Instagram_icon.png"
                height="50px"
                className="icon"
                aria-label="login"
              />
            </a>
            <a href="http://www.facebook.com">
              <img
                src="http://claraquintela.com/wp-content/uploads/2019/11/hiclipart.com-2.png"
                height="50px"
                className="icon"
                aria-label="signup"
              />
            </a>
            <a href="http://www.twitter.com">
              <img
                src="http://claraquintela.com/wp-content/uploads/2019/11/hiclipart.com_.png"
                height="50px"
                className="icon"
                aria-label="shopping_cart"
              />
            </a>
          </section>
        </div>
      </div>
    );
  };
}

let BottomBar = connect()(UnconnectedBottomBar);
export default BottomBar;
