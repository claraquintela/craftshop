import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCart extends Component {
  deleteItem = index => {
    let filtered = this.props.items;
    filtered = filtered.splice(index, 1);

    this.props.dispatch({
      type: "deleteCartItem",
      cart: filtered
    });
  };

  render = () => {
    console.log(
      "added product info",
      this.props.cart.title,
      this.props.cart.price
    );
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
