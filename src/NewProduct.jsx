import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "",
      description: "",
      location: "",
      img: undefined
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
    this.setState({ img: evt.target.img[0] });
  };
  submitHandler = evt => {
    evt.preventDefault();
    if (this.state.img === undefined) {
      alert("Please add photo to sell your product");
    }
    console.log("product form submitted");
    let data = new FormData();
    data.append("item title", this.state.title);
    data.append("item price", this.state.price);
    data.append("item description", this.state.description);
    data.append("item location", this.state.location);
    data.append("item img", this.state.img);
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
    console.log("users new product form");
    return (
      <div>
        Sell Products:
        <form
          onSubmit={this.submitHandler}
          action="/image"
          method="POST"
          enctype="multipart/form-data"
        >
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
            <input
              type="file"
              onChange={this.imgHandler}
              name="picture"
              accept="/images/*"
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
let NewProduct = connect()(UnconnectedNewProduct);

export default NewProduct;
