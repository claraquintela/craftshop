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
    console.log("user parsed", userParsed.users);
    this.props.dispatch({ type: "set-users", users: userParsed.users });
  };
  renderMainPage = () => {
    console.log("this.props.users", this.props.users);
    return (
      <div>
        <h1>Signup here</h1>
        <Signup />
        <h1>Login here</h1>
        <Login />
        <div>
          <Search />
        </div>
        <div>
          Products:
          {this.props.products.map(item => {
            return (
              <div>
                <Link to={"/itemDescription/" + item._id}>{item.title}</Link>
              </div>
            );
          })}
        </div>
        <div>
          Users:
          {this.props.users.map(user => {
            return (
              <div>
                <Link to={"/userPage/" + user._id}>{user.username}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
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
    let userId = routerData.match.params.id;
    let candidate = this.props.users.filter(user => {
      return user.id === userId;
    });
    return <Users user={candidate[0]} />;
  };
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={this.renderMainPage} />
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
