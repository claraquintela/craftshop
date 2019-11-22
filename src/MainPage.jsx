import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./mainpage.css";

class UnconnectedMainPage extends Component {
  render = () => {
    let productsToDisplay =
      this.props.searchResults.length > 0
        ? this.props.searchResults
        : this.props.products;

    return (
      <div className="container-mainpage">
        <div>
          <img
            src="http://claraquintela.com/wp-content/uploads/2019/11/White-and-Green-Leaves-Illustration-Landscaping-Business-Card-2.png "
            className="product_title"
          />
        </div>
        <div className="mainpage-item-grid">
          {this.props.searchResults.length === 0 && this.props.hasSearched
            ? "No products found"
            : productsToDisplay.map(item => {
                return (
                  <div className="item-container" key={item._id}>
                    <Link to={"/itemDescription/" + item._id}>
                      <img src={item.image} className="mainpage-photo" />
                      <br />
                      {item.title}
                    </Link>
                    <div>{item.price}</div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    products: state.products,
    searchResults: state.searchResults,
    hasSearched: state.hasSearched
  };
};
let MainPage = connect(mapStateToProps)(UnconnectedMainPage);
export default MainPage;
