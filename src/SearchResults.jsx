import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./mainpage.css";

class UnconnectedSearchResults extends Component {
  render = () => {
    let results = products.filter(search => {
      return product.title.includes;
    });
    return (
      <div className="container-mainpage">
        <div className="title-mainpage">
          {/* <img
            src="http://claraquintela.com/wp-content/uploads/2019/11/crafty-people-Logo-2.png"
            height="300px"
          /> */}
          products
        </div>
        <div className="body-mainpage">
          {this.props.searchResults.map(item => {
            return (
              <div className="item-container">
                <Link to={"/itemDescription/" + item._id}>
                  <img src={item.image} className="mainpage-photo" />
                  <br />
                  {item.title}
                </Link>
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
    minPrice: state.minimum,
    maxPrice: state.maximum
  };
};
let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
