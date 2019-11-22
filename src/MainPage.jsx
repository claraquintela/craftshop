import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./mainpage.css";

class UnconnectedMainPage extends Component {
  render = () => {
    if (this.props.searchResults.length === 0) {
      return (
        <div className="container-mainpage">
          <div>
            <img
              src="http://claraquintela.com/wp-content/uploads/2019/11/White-and-Green-Leaves-Illustration-Landscaping-Business-Card-2.png "
              className="product_title"
            />
          </div>
          <div className="body-mainpage">
            {this.props.products.map(item => {
              return (
                <div className="item-container">
                  <Link to={"/itemDescription/" + item._id}>
                    <img src={item.image} className="mainpage-photo" />
                    <br />
                    {item.title}
                    <div></div>
                  </Link>
                  $ {item.price}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    console.log("this.props.searchResults", this.props.searchResults);
    return (
      <div className="container-mainpage">
        <div>
          <img
            src="http://claraquintela.com/wp-content/uploads/2019/11/White-and-Green-Leaves-Illustration-Landscaping-Business-Card-2.png "
            className="product_title"
          />
        </div>
        <div className="body-mainpage">
          {this.props.searchResults.length ? "" : "No products found"}
          {this.props.searchResults.map(item => {
            return (
              <div className="item-container">
                <Link to={"/itemDescription/" + item._id}>
                  <img src={item.image} className="mainpage-photo" />
                  <br />
                  {item.title}
                </Link>
                {item.description}
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
    searchQuery: state.searchQuery,
    minPrice: state.min,
    maxPrice: state.max
  };
};
let MainPage = connect(mapStateToProps)(UnconnectedMainPage);
export default MainPage;
