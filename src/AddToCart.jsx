import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCart extends Component {
  render() {
    let cartItems = this.props.items.map(itemId => {
      return findItem(itemId);
    });
    let itemsAsElements = cartItems.map(item => {
      return <div>{item.description}</div>;
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
