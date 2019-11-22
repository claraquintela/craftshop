import React, { Component } from "react";
import { connect } from "react-redux";
import "./newproduct.css";

class UnconnectedNewProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  titleHandler = evt => {
    this.props.dispatch({ type: "new-title", title: evt.target.value });
  };
  priceHandler = evt => {
    this.props.dispatch({ type: "new-price", price: evt.target.value });
  };
  descriptionHandler = evt => {
    this.props.dispatch({
      type: "new-description",
      description: evt.target.value
    });
  };
  locationHandler = evt => {
    this.props.dispatch({
      type: "new-location",
      location: evt.target.value
    });
  };
  quantityHandler = evt => {
    this.props.dispatch({ type: "new-quantity", quantity: evt.target.value });
  };
  imgHandler = evt => {
    this.props.dispatch({ type: "new-img", img: evt.target.files[0] });
  };
  submitHandler = async evt => {
    evt.preventDefault();
    if (this.props.img === undefined) {
      alert("Please add photo to sell your product");
    }
    let data = new FormData();
    data.append("title", this.props.title);
    data.append("price", this.props.price);
    data.append("description", this.props.description);
    data.append("location", this.props.location);
    data.append("img", this.props.img);
    data.append("quantity", this.props.quantity);
    let newResponse = await fetch("/new-product", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let newResponseBody = await newResponse.text();
    let newBody = JSON.parse(newResponseBody);
    if (!newBody.success) {
      alert("Upload failed, try again");
      return;
    }
    alert("Your product has been successfully uploaded :D");
    this.setState({
      title: "",
      price: null,
      location: "",
      description: "",
      img: null,
      quantity: null
    });
    this.props.dispatch({ type: "newproduct-success" });
  };
  render() {
    return (
      <div className="container">
        <img
          src="http://claraquintela.com/wp-content/uploads/2019/11/Sell_title.png"
          className="shopping-cart-title"
        />
        <div className="container-newproduct">
          <div className="sell-text">Sell Products: </div>
          <form onSubmit={this.submitHandler} className="sell-form">
            <div>
              Item title:
              <input
                type="text"
                onChange={this.titleHandler}
                value={this.props.title}
              />
            </div>
            <div>
              Item Price:
              <input
                type="number"
                onChange={this.priceHandler}
                value={this.props.price}
              />
            </div>
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
              Quantity of item:
              <input
                type="number"
                onChange={this.quantityHandler}
                value={this.props.quantity}
              />
            </div>
          </form>
          <div className="image-container">
            {this.props.img && (
              <img
                src={window.URL.createObjectURL(this.props.img)}
                className="image-preview"
              />
            )}
          </div>
          <div className="button">
            <input type="file" onChange={this.imgHandler} />
          </div>
          <div className="button">
            <button onClick={this.submitHandler}>Submit</button>
          </div>
        </div>
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
    img: st.img,
    quantity: st.quantity
  };
};
let NewProduct = connect(mapStateToProps)(UnconnectedNewProduct);

export default NewProduct;
