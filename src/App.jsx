import { connect } from "react-redux";
import "./app.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import ItemDescription from "./ItemDescription.jsx";
import Users from "./Users.jsx";
import Cart from "./Cart.jsx";
import TopBar from "./TopBar.jsx";
import NewProduct from "./NewProduct.jsx";
import MainPage from "./MainPage.jsx";
import BottomBar from "./BottomBar.jsx";

class UnconnectedApp extends Component {
  componentDidMount = async () => {
    let response = await fetch("/allproducts");
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);

    this.props.dispatch({ type: "set-products", products: parsed });
    let userResponse = await fetch("/allusers");
    let userResponseBody = await userResponse.text();
    let userParsed = JSON.parse(userResponseBody);

    this.props.dispatch({ type: "set-users", users: userParsed.user });
  };
  renderMainPage = () => {
    return (
      <div>
        <MainPage />
      </div>
    );
  };
  renderSignup = () => {
    return <Signup />;
  };
  renderLogin = () => {
    return <Login />;
  };
  renderNewProduct = () => {
    if (this.props.login) {
      return <NewProduct />;
    }
    {
      alert("Login to add a new product!");
      return <Login />;
    }
  };
  renderAddToCart = () => {
    if (this.props.login) {
      return <Cart />;
    }
    {
      alert("You need to login or sign up before accessing your cart!");
      return <Login />;
    }
  };
  renderItemDescriptionPage = routerData => {
    let itemId = routerData.match.params._id;
    let item = this.props.products.find(item => {
      return itemId === item._id;
    });

    let seller = this.props.users.find(user => {
      return user.username === item.username;
    });

    return <ItemDescription item={item} user={seller} />;
  };
  renderUserPage = routerData => {
    let userId = routerData.match.params._id;
    let user = this.props.users.find(user => {
      return user._id === userId;
    });

    let items = this.props.products.filter(item => {
      return item.username === user.username;
    });

    return <Users user={user} items={items} />;
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <TopBar />
          <Route exact={true} path="/" render={this.renderMainPage} />
          <Route exact={true} path="/signup" render={this.renderSignup} />
          <Route exact={true} path="/login" render={this.renderLogin} />
          <Route
            exact={true}
            path="/itemDescription/:_id"
            render={this.renderItemDescriptionPage}
          />
          <Route
            exact={true}
            path="/userPage/:_id"
            render={this.renderUserPage}
          />
          <Route
            exact={true}
            path="/addNewProduct"
            render={this.renderNewProduct}
          />
          <Route exact={true} path="/cart" render={this.renderAddToCart} />

          <BottomBar />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  return {
    login: state.login,
    products: state.products,
    users: state.users,
    reviews: state.reviews
  };
};
let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
