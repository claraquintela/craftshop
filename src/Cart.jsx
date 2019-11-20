import React, { Component } from "react";
import { connect } from "react-redux";

<<<<<<< HEAD:src/Cart.jsx
class unconnectedCart extends Component {
  render = () => {
    let cartItems = this.props.cart.map(itemId => {
=======
class UnconnectedCart extends Component {
  render() {
    let cartItems = this.props.items.map(itemId => {
>>>>>>> 6a2f10d337efb2b406d1face1f4bf251f4d94894:src/AddToCart.jsx
      return findItem(itemId);
    });
    let itemsAsElements = cartItems.map(item => {
      return <div>{item.title}</div>;
    });
    return (
      <div>
        This is what is in your cart:
        <div>{itemsAsElements}</div>
      </div>
    );
  }
}
let mapStateToProps = st => {
  return {
    cart: st.cart
  };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
