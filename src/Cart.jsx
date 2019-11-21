import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCart extends Component {
  deleteItem = index => {
    let filtered = this.props.cart.filter((ele, i) => {
      return i !== index;
    });

    this.props.dispatch({
      type: "deleteCartItem",
      cart: filtered
    });
  };

  render = () => {
    let cartTotal = 0;
    this.props.cart.forEach(items => {
      cartTotal = cartTotal + parseInt(items.price);
    });
    return (
      <div>
        These are the items in your cart:
        {this.props.cart.map((items, index) => (
          <div>
            {items.title}
            {parseInt(items.price) + "$"}
            <form
              onSubmit={e => {
                e.preventDefault();
                this.deleteItem(index);
              }}
            >
              <input type="submit" value="delete" />
            </form>
          </div>
        ))}
        <div>
          <div>total:{cartTotal + "$"}</div>
          <form onSubmit="handleCheckout">
            <input type="submit" value="Proceed to checkout" />
          </form>
        </div>
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
