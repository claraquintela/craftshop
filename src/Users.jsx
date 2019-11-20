import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";

<<<<<<< HEAD
class UnconnectedUsers extends Component {
=======
class unconnectedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "",
      description: "",
      location: "",
      img: ""
    };
  }
  titleHandler = evt => {
    this.setState({ title: evt.target.value });
  };

  priceHandler = evt => {
    this.setState({ price: evt.target.value });
  };
  descriptionHandler = evt => {
    this.setState({ description: evt.target.value });
  };
  locationHandler = evt => {
    this.setState({ location: evt.target.value });
  };
  imgHandler = evt => {
    this.setState({ img: evt.target.value });
  };

  submitHandler = evt => {
    evt.preventDefault();
    console.log("product form submitted");
    let data = new FormData();
    data.append("item title", this.state.title);
    data.append("item price", this.state.price);
    data.append("item description", this.state.description);
    data.append("item location", this.state.location);
    data.append("item img", this.props.img);
    fetch("/new-product", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    this.setState({
      title: "",
      price: "",
      description: "",
      location: "",
      img: ""
    });
    return;
  };
>>>>>>> 1bf02f3ee06ffd96cc2b1251991b9fef40c9a2f5
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
        <div>Sell Your Product:</div>
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    products: st.products,
    reviews: st.reviews
  };
};

let Users = connect(mapStateToProps)(UnconnectedUsers);
export default Users;
