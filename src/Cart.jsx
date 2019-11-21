import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCart extends Component {
  render = () => {
    console.log(
      "added product info",
      this.props.cart.title,
      this.props.cart.price
    );
    return (
      <div>
        These are the items in your cart:
        {this.props.cart.map(items => (
          <div>
            {items.title}
            {parseInt(items.price) + "$"}
            <form onSubmit="deleteItem">
              <input type="submit" value="X" />
            </form>
          </div>
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
