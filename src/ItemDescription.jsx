import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./app.css";
import "./itemdescription.css";

class UnconnectedItemDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      displayReviews: false,
      relevantReviews: []
    };
  }
  componentDidMount = async () => {
    let data = new FormData();
    console.log("item Id", this.props.item._id);
    data.append("itemId", this.props.item._id);
    let response = await fetch("/reviews", { method: "POST", body: data });
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    console.log("parsed", parsed);
    this.setState({
      relevantReviews: parsed
    });
    console.log("relevant reviews", this.state.relevantReviews);
    return;
  };
  reviewHandler = evt => {
    this.setState({ review: evt.target.value });
  };
  submitHandler = evt => {
    evt.preventDefault();
    if (this.props.username === undefined) {
      alert("You must be logged in to buy items");
      return <Login />;
    }
    this.props.dispatch({
      type: "addedToCart",
      added: this.props.item
    });
  };
  toggleReviewDisplay = () => {
    console.log("toggleReviewDisplay hit");
    this.setState({ displayReviews: !this.state.displayReviews });
  };
  displayReviews = () => {
    {
      return (
        <div>
          <div>
            <div>
              Reviews of this item:
              <ul>
                {this.state.relevantReviews.map(review => {
                  return (
                    <li>
                      <div>{review.review}</div>
                      <div>
                        this review was submitted by:
                        {" " + review.reviewerId}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="review">
              Want to review this item? Do it here!
              <form onSubmit={this.submitReview}>
                <input
                  type="text"
                  onChange={this.reviewHandler}
                  value={this.state.review}
                  height="500px"
                  width="500px"
                />
                <input
                  type="submit"
                  value="submit your review"
                  className="button"
                />
              </form>
            </div>
          </div>
        </div>
      );
    }
  };

  submitReview = async evt => {
    evt.preventDefault();
    let data = new FormData();

    data.append("review", this.state.review);
    data.append("itemId", this.props.item._id);
    data.append("username", this.props.username);
    let response = await fetch("/submitReview", { method: "POST", body: data });
    let responseBody = await response.text();

    let body = JSON.parse(responseBody);

    if (!body.success) {
      alert("Review submit failed! Sorry!");
      return;
    }
    alert("Review submitted successfully! Thanks!");
    this.setState({ review: "" });
  };

  render() {
    return (
      <div className="centerDesc">
        <div className="box">
          <div className="container">
            <img src={this.props.item.image} className="item-image" />

            <div className="product-description">
              <h3>{this.props.item.title}</h3>
              <div>
                <b>Description of product: </b>
                {this.props.item.description}
              </div>
              <div>
                <b>Price: </b>
                {Number(this.props.item.price)}$
              </div>
              <div>
                <b>Remaining: </b>
                {Number(this.props.item.quantity)}
              </div>

              <div>
                <b>Seller: </b>
                <Link to={"/userPage/" + this.props.user._id}>
                  {this.props.user.username}
                </Link>
              </div>
              <div>
                <b>Location: </b>
                {this.props.item.location}
              </div>
              <form onSubmit={this.submitHandler}>
                <input type="submit" value="add to cart" className="button" />
              </form>
            </div>
            <div>
              <button onClick={this.toggleReviewDisplay} className="button">
                Click here to check out other customer's reviews!
              </button>
              {this.state.displayReviews ? this.displayReviews() : null}
            </div>
          </div>
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
    username: state.username
  };
};
let ItemDescription = connect(mapStateToProps)(UnconnectedItemDescription);
export default ItemDescription;
