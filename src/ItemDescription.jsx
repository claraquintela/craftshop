import { connect } from "react-redux";
import React, { Component } from "react";
import App from "./App.jsx";
import { Link } from "react-router-dom";

class UnconnectedItemDescription extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.item.name}</h2>
        <div>
          <b>Price:</b>
          {this.props.item.price}
        </div>
        <div>
          <b>Remaining:</b>
          {this.props.item.remaining}
        </div>
        <div>
          <b>Location:</b>
          {this.props.item.location}
        </div>
        <div>
          <b>Description of product:</b>
          {this.props.item.description}
        </div>
      </div>
    );
  }
}

let ItemDescription = connect()(UnconnectedItemDescription);
export default ItemDescription;
