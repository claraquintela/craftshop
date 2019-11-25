import React, { Component } from "react";
import { connect } from "react-redux";
import "./newproduct.css";

class UnconnectedNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "",
      location: "",
      description: "",
      img: null,
      redirect: false
    };
  }
  titleHandler = evt => {
    this.setState({ title: evt.target.value });
  };
  priceHandler = evt => {
    this.setState({ price: evt.target.value });
  };
  descriptionHandler = evt => {
    this.setState({
      description: evt.target.value
    });
  };
  locationHandler = evt => {
    this.setState({
      location: evt.target.value
    });
  };
  quantityHandler = evt => {
    this.setState({ quantity: evt.target.value });
  };
  imgHandler = evt => {
    this.setState({ img: evt.target.files[0] });
  };
  submitHandler = async evt => {
    evt.preventDefault();
    if (this.state.img === undefined) {
      alert("Please add photo to sell your product");
    }
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("price", this.state.price);
    data.append("description", this.state.description);
    data.append("location", this.state.location);
    data.append("img", this.state.img);
    data.append("quantity", this.state.quantity);
    data.append("username", this.props.username);
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
                value={this.state.title}
              />
            </div>
            <div>
              Item Price:
              <input
                type="number"
                onChange={this.priceHandler}
                value={this.state.price}
              />
            </div>
            <div>
              Item description:
              <input
                type="text"
                onChange={this.descriptionHandler}
                value={this.state.description}
              />
            </div>
            <div>
              Location of item:
              <input
                type="text"
                onChange={this.locationHandler}
                value={this.state.location}
              />
            </div>
            <div>
              Quantity of item:
              <input
                type="number"
                onChange={this.quantityHandler}
                value={this.state.quantity}
              />
            </div>
          </form>
          <div className="image-container">
            {this.state.img && (
              <img
                src={window.URL.createObjectURL(this.state.img)}
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
  console.log("LOOKING FOR THE STATE*******", st);
  return {
    newProductUpload: st.newProductUpload,
    username: ""
  };
};
let NewProduct = connect(mapStateToProps)(UnconnectedNewProduct);

export default NewProduct;
