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
    console.log(parsed);
    this.props.dispatch({ type: "set-products", products: parsed });
    let userResponse = await fetch("/allusers");
    let userResponseBody = await userResponse.text();
    let userParsed = JSON.parse(userResponseBody);
    console.log("user parsed", userParsed);
    this.props.dispatch({ type: "set-users", users: userParsed.user });
  };
  renderMainPage = () => {
    console.log("this.props.users", this.props.users);
    return (
      <div>
        <MainPage />
        <div>
          Users:
          {this.props.users.map(user => {
            console.log(
              "Is this.props.users working?",
              user._id,
              user.username
            );
            return (
              <div>
                <Link to={"/userPage/" + user._id}> {user.username} </Link>
              </div>
            );
          })}
        </div>
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
    return <NewProduct />;
  };
  renderAddToCart = () => {
    return <Cart />;
  };
  renderItemDescriptionPage = routerData => {
    let itemId = routerData.match.params._id;
    let details = this.props.products.filter(item => {
      console.log(item.id, itemId);
      return item._id === itemId;
    });
    console.log("details", details);
    return <ItemDescription item={details[0]} />;
  };
  renderUserPage = routerData => {
    let userId = routerData.match.params._id;
    console.log("user id", userId);
    let candidate = this.props.users.filter(user => {
      console.log("user._id", user._id);
      return user._id === userId;
    });
    console.log("candidate", candidate);
    return <Users user={candidate[0]} />;
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
  console.log(state);
  return {
    login: state.login,
    products: state.products,
    users: state.users,
    reviews: state.reviews
  };
};
let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
