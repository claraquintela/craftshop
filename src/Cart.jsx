import React, { Component } from "react";
import { connect } from "react-redux";
import "./cart.css";
import { appendFile } from "fs";
import StripeCheckout from "react-stripe-checkout";

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
      <div className="container">
        <img
          src="http://claraquintela.com/wp-content/uploads/2019/11/Shopping-cart_title.png"
          className="shopping-cart-title"
        />
        <div className="container-cart">
          <div className="cart-text">These are the items in your cart:</div>
          {this.props.cart.map((items, index) => (
            <div className="sub-container-cart">
              <div className="cart-item-text">
                {items.title} {parseInt(items.price) + "$"}
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.deleteItem(index);
                  }}
                >
                  <input type="submit" value="delete" />
                </form>
              </div>

              <img src={items.image} className="item-thumb" />
            </div>
          ))}
          <div>
            <div className="total">total:{cartTotal + "$"}</div>
            <div>
              <form onSubmit="handleCheckout">
                <input type="submit" value="Proceed to checkout" />
              </form>
              <StripeCheckout
                token={this.onToken}
                stripeKey="pk_test_RxljPF1snPezy2PVjLRSLvV500o8Ykg7z4"
              />
              ) }
            </div>
          </div>
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
