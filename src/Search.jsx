import { connect } from "react-redux";
import React, { Component } from "react";
import "./search.css";

class UnconnectedSearch extends Component {
  onQueryChange = evt => {
    this.props.dispatch({ type: "query", q: evt.target.value });
  };
  handleMinimumPrice = evt => {
    console.log(evt.target.value);
    this.props.dispatch({ type: "minimum-price", price: evt.target.value });
  };
  handleMaximumPrice = evt => {
    this.props.dispatch({ type: "maximum-price", price: evt.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("search", this.props.query);
    data.append("minPrice", this.props.minPrice);
    data.append("maxPrice", this.props.maxPrice);
    console.log(
      "search",
      this.props.query,
      this.props.minPrice,
      this.props.maxPrice
    );
    let response = await fetch("/search", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    console.log("search response", response);
    let responseBody = await response.text();
    console.log("search response body", responseBody);
    let parsed = JSON.parse(responseBody);
    console.log("search parsed", parsed);
    this.props.dispatch({
      type: "search-results",
      searchResults: parsed.items
    });
  };
  toggleAdvancedSearch = () => {
    this.props.dispatch({ type: "toggleAdvancedSearch" });
  };
  clickInStock = () => {
    this.props.dispatch({ type: "productInStock" });
  };
  submitClearHandler = () => {};
  displayAdvancedSearch = () => {
    if (!this.props.displayAdvancedSearch) {
      return null;
    }
    {
      return (
        <div>
          <div>
            Minimum price
            <input
              type="number"
              onChange={this.handleMinimumPrice}
              value={this.props.minPrice}
            />
          </div>
          <div>
            Maximum price
            <input
              type="number"
              onChange={this.handleMaximumPrice}
              value={this.props.maxPrice}
            />
          </div>
          <div>
            Item in stock
            <input type="checkbox" onChange={this.clickInStock} />
          </div>
          <div>
            <button onClick={this.submitClearHandler}>Clear search</button>
          </div>
        </div>
      );
    }
  };
  render = () => {
    console.log("this.props.searchResults", this.props.searchResults);
    return (
      <div className="topbar-search">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="search"
              className="search-field"
              onChange={this.onQueryChange}
              value={this.props.query}
              placeholder="I'm looking for..."
            />
            <input type="submit" value="search" className="search-button" />
          </div>
          <div>
            {this.displayAdvancedSearch()}
            <button
              onClick={this.toggleAdvancedSearch}
              className="search-button"
            >
              Advanced Search
            </button>
          </div>
        </form>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    products: st.products,
    searchResults: st.searchResults,
    query: st.searchQuery,
    minPrice: st.minimum,
    maxPrice: st.maximum,
    inStock: st.inStock,
    displayAdvancedSearch: st.displayAdvancedSearch
  };
};

let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
