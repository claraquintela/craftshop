import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCart extends Component {
  render = () => {
    return (
      <div>
        These are the items in your cart:
        {this.props.cart.map(items => (
          <div>{items}</div>
        ))}
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    cart: st.cart
  };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
