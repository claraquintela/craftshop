import { connect } from "react-redux";
import "./app.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import ItemDescription from "./ItemDescription.jsx";

let renderMainPage = () => {
  return (
    <div>
      <h1>Signup here</h1>
      <Signup />
      <h1>Login here</h1>
      <Login />
      <div>
        <Search />
      </div>
    </div>
  );
};
let renderItemDescriptionPage = routerData => {
  let itemId = routerData.match.params.itemId;
  let details = products.filter(item => {
    return item.id === itemId;
  });
  return <ItemDescription item={details[0]} />;
};
let renderUserPage = routerData => {
  let userId = routerdata.match.params.id;
  let candidate = users.filter(user => {
    return user.id === userId;
  });
  return <User user={candidate[0]} />;
};
class UnconnectedApp extends Component {
  
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderMainPage} />
          <Route
            exact={true}
            path="/itemDescription/:itemId"
            render={renderItemDescriptionPage}
          />
          <Route exact={true} path="/userPage/:id" render={renderUserPage} />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  return { login: state.login, products: state.products, users: state.user };
};
let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
