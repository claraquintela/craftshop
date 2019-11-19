import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./app.css";

class UnconnectedItemDescription extends Component {
  render() {
    return (
      <div>
        <img
          height="300px"
          width="400px"
          src={this.props.products.imgLocation}
        />
        <h2>{this.props.products.title}</h2>
        <div>
          <b>Location:</b>
          {this.props.products.location}
        </div>
        <div>
          <b>Seller:</b>
          <Link to={"/users/" + this.props.users.id}>
            {this.props.users.name}
          </Link>
        </div>

        <div>
          <b>Price:</b>
          {this.props.products.price}
        </div>
        <div>
          <b>Remaining:</b>
          {this.props.products.remaining}
        </div>
        <div>
          <b>Description of product:</b>
          {this.props.products.description}
        </div>
        <div>
          <b>Item Reviews:</b>
          {this.props.products.reviews}
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    products: state.products,
    reviews: state.reviews,
    users: state.users
  };
};
let ItemDescription = connect(mapStateToProps)(UnconnectedItemDescription);
export default ItemDescription;
