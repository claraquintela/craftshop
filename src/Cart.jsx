import React, { Component } from "react";
import { connect } from "react-redux";

class unconnectedCart extends Component {
  render = () => {
    let cartItems = this.props.cart.map(itemId => {
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
  };
}
let mapStateToProps = st => {
  return {
    cart: st.cart
  };
};

let Cart = connect(mapStateToProps)(unconnectedCart);

export default Cart;
