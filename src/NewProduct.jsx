import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedNewProduct extends Component {
  titleHandler = evt => {
    console.log("title of new product", evt.target.value);
    this.props.dispatch({ type: "new-title", title: evt.target.value });
  };
  priceHandler = evt => {
    console.log("price of new product", evt.target.number);
    this.props.dispatch({ type: "new-price", price: evt.target.number });
  };
  descriptionHandler = evt => {
    console.log("description of new product", evt.target.value);
    this.props.dispatch({
      type: "new-description",
      description: evt.target.value
    });
  };
  locationHandler = evt => {
    console.log("location of new product", evt.target.value);
    this.props.dispatch({
      type: "new-location",
      location: evt.target.value
    });
  };
  imgHandler = evt => {
    console.log("img of new product", evt.target.file);
    this.props.dispatch({ type: "new-img", img: evt.target.file[0] });
  };
  submitHandler = evt => {
    evt.preventDefault();
    console.log(this.props.img);
    if (this.props.img === undefined) {
      alert("Please add photo to sell your product");
    }
    console.log("product form submitted");
    let data = new FormData();
    data.append("item title", this.props.title);
    data.append("item price", this.props.price);
    data.append("item description", this.props.description);
    data.append("item location", this.props.location);
    data.append("item img", this.props.img);
    fetch("/new-product", {
      method: "POST",
      body: data,
      credentials: "include"
    });

    return;
  };
  render() {
    console.log("users new product form");
    return (
      <div>
        Sell Products:
        <form onSubmit={this.submitHandler}>
          <div>
            Item title:
            <input
              type="text"
              onChange={this.titleHandler}
              value={this.props.title}
            />
          </div>
          Item Price:
          <input
            type="number"
            onChange={this.priceHandler}
            value={this.props.price}
          />
          <div>
            Item description:
            <input
              type="text"
              onChange={this.descriptionHandler}
              value={this.props.description}
            />
          </div>
          <div>
            Location of item:
            <input
              type="text"
              onChange={this.locationHandler}
              value={this.props.location}
            />
          </div>
          <div>
            Add an image:
            <input type="file" onChange={this.imgHandler} />
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}
let mapStateToProps = st => {
  return {
    title: st.title,
    price: st.price,
    location: st.location,
    description: st.description,
    img: st.img
  };
};
let NewProduct = connect(mapStateToProps)(UnconnectedNewProduct);

export default NewProduct;
