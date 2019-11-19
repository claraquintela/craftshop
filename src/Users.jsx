import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <div>
            Sell Products:
            <form onSubmit={this.submitHandler}>
              <div>
                Item title:
                <input type="text" onChange={this.titleHandler} />
              </div>
              Item Price:
              <input type="number" onChange={this.priceHandler} />
              <div>
                Item description:
                <input type="text" onChange={this.descriptionHandler} />
              </div>
              <div>
                Location of item:
                <input type="text" onChange={this.locationHandler} />
              </div>
              <div>
                Add an image:
                <input type="file" onChange={this.imgHandler} />
              </div>
              <input type="submit" />
            </form>
          </div>
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
