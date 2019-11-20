import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UnconnectedUsers extends Component {
  render() {
    console.log("USERS WORK ALREADY", this.props.user);
    return (
      <div>
        <div>
          <h2>Name: {this.props.user.username}</h2>
          <div>Location:{this.props.user.location}</div>
        </div>
        <div>
          Products for sale:
          <ul>
            {this.props.products.map(item => {
              return (
                <li>
                  <Link to={"/itemDescription/" + item._id}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          Reviews of products:
          <ul>
            {this.props.reviews.map(review => {
              return (
                <li>
                  <Link to={"/itemDescription/" + review.itemId}>
                    {review.reviews}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <Link to={"/addNewProduct/"}>Sell Your Product</Link>
        </div>
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    products: st.products,
    reviews: st.reviews,
    users: st.users
  };
};

let Users = connect(mapStateToProps)(UnconnectedUsers);
export default Users;
