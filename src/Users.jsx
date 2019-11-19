import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class unconnectedUsers extends Component {
  render() {
    return (
      <div>
        <div>
          <img height="200px" width="200px" src={this.props.users.userImg} />
          <h2>{this.props.users.name}</h2>
          <div>{this.props.users.location}</div>
        </div>
        <div>
          Products for sale:
          <ul>
            {this.props.products.map(item => {
              return (
                <li>
                  {" "}
                  <Link to={"/itemDescription/" + item.itemId}>
                    {item.name}
                  </Link>
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
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    users: st.users,
    products: st.products,
    reviews: st.reviews
  };
};

let Users = connect(mapStateToProps)(unconnectedUsers);
export default Users;
