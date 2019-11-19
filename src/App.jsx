import { connect } from "react-redux";
import "./app.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import ItemDescription from "./ItemDescription.jsx";

class UnconnectedApp extends Component {
  componentDidMount = async () => {
    let response = await fetch("/allproducts");
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    this.props.dispatch({ type: "set-products", products: parsed });
  };
  renderMainPage = () => {
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
          {this.props.products.map(item => {
            <Link to={"/itemDescription/" + item.itemId}>{item.title}</Link>;
          })}
        </div>
      </div>
    );
  };
  renderItemDescriptionPage = routerData => {
    let itemId = routerData.match.params.itemId;
    let details = products.filter(item => {
      return item.id === itemId;
    });
    return <ItemDescription item={details[0]} />;
  };
  renderUserPage = routerData => {
    let userId = routerdata.match.params.id;
    let candidate = users.filter(user => {
      return user.id === userId;
    });
    return <User user={candidate[0]} />;
  };
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={this.renderMainPage} />
          <Route
            exact={true}
            path="/itemDescription/:itemId"
            render={this.renderItemDescriptionPage}
          />
          <Route
            exact={true}
            path="/userPage/:id"
            render={this.renderUserPage}
          />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  return {
    login: state.login,
    products: state.products,
    users: state.user,
    reviews: state.reviews
  };
};
let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
