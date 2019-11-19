import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./app.css";

class UnconnectedItemDescription extends Component {
  render() {
    return (
      <div>
        <img height="300px" width="400px" src={this.props.item.imgLocation} />
        <h2>{this.props.item.title}</h2>
        <div>
          <b>Location:</b>
          {this.props.item.location}
        </div>
        <div>
          <b>Seller:</b>
          <Link to={"/users/" + this.props.users.id}>
            {this.props.users.name}
          </Link>
        </div>

        <div>
          <b>Price:</b>
          {this.props.item.price}
        </div>
        <div>
          <b>Remaining:</b>
          {this.props.item.remaining}
        </div>
        <div>
          <b>Description of product:</b>
          {this.props.item.description}
        </div>
        <div>
          <b>Item Reviews:</b>
          {this.props.item.reviews}
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
