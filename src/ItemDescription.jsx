import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./app.css";

class UnconnectedItemDescription extends Component {
  submitHandler = evt => {
    evt.preventDefault();
    this.props.dispatch({
      type: "addedToCart",
      added: this.props.item
    });
  };

  submitReview = evt => {
    evt.preventDefault();
    this.props.dispatch({type: "reviewSubmitted", review: evt.target.value });
    let data = new FormData();
    console.log("review submitted", evt.target.value)
    data.append("review", evt.target.value )
    data.append("item-id", this.props.products._id)
    data.append("reviewer-id", this.props.users._id)
    let response = await fetch('/submitReview', {method: "POST", body: data})
    let responseBody = await response.text();
    console.log("response body from submitReview", responseBody)
    let body = JSON.parse(responseBody)
    console.log("parsed body", body)
    if (!body.success) {
      alert("Review submit failed! Sorry!");
      return;
    }
    alert("Review submitted successfully! Thanks!");
  }

  render() {
    console.log("this.props.item.image", this.props.item.image);
    return (
      <div>
        <img height="300px" width="400px" src={this.props.item.image} />
        <h2>{this.props.item.title}</h2>
        <div>
          <b>Location:</b>
          {this.props.item.location}
        </div>
        <div>
          <b>Seller:</b>
          <Link to={"/users/" + this.props.users._id}>
            {this.props.users.username}
          </Link>
        </div>

        <div>
          <b>Price:</b>
          {this.props.item.price}
        </div>
        <div>
          <b>Remaining:</b>
          {this.props.item.quantity}
        </div>
        <div>
          <b>Description of product:</b>
          {this.props.item.description}
        </div>
        <div>
          <b>Item Reviews:</b>
          {this.props.item.reviews}
        </div>
        <form onSubmit={this.submitHandler}>
          <input type="submit" value="add to cart" />
        </form>
        <div>
          Want to review this item? Do it here!
          <form onSubmit="submitReview">
            <input type="text" height="500px" width="500px" />
          </form>
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    products: state.products,
    reviews: state.reviews,
    users: state.users,
    displayReviews: state.displayReviews
  };
};
let ItemDescription = connect(mapStateToProps)(UnconnectedItemDescription);
export default ItemDescription;
