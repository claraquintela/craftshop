import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UnconnectedUsers extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Name: {this.props.user.username}</h2>
          <div>Location:{this.props.user.location}</div>
        </div>
        <div>
          Products for sale:
          {/* TODO: make work  */}
          <ul>
            {this.props.items.map(item => {
              return <li>{item.title}</li>;
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
  console.log("Users page", st);
  return {
    products: st.products,
    reviews: st.reviews,
    users: st.users
  };
};

let Users = connect(mapStateToProps)(UnconnectedUsers);
export default Users;
