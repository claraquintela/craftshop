import { connect } from "react-redux";
import React, { Component } from "react";
import "./search.css";
import { ETIME } from "constants";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAdvancedSearch: false,
      searchQuery: "",
      minPrice: 0,
      maxPrice: 1000000000,
      quantity: undefined,
      inStock: undefined
    };
  }
  onQueryChange = evt => {
    this.setState({ searchQuery: evt.target.value });
  };
  handleMinimumPrice = evt => {
    this.setState({
      minPrice: evt.target.value
    });
  };
  handleMaximumPrice = evt => {
    this.setState({
      maxPrice: evt.target.value
    });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("search", this.state.searchQuery);
    data.append("minPrice", this.state.minPrice);
    data.append("maxPrice", this.state.maxPrice);
    data.append("inStock", this.state.inStock);
    data.append("quantity", this.state.quantity);

    let response = await fetch("/search", {
      method: "POST",
      body: data,
      credentials: "include"
    });

    let responseBody = await response.text();

    let parsed = JSON.parse(responseBody);

    this.props.dispatch({
      type: "search-results",
      searchResults: parsed.items
    });
  };
  toggleAdvancedSearch = () => {
    let disp = this.state.displayAdvancedSearch;
    this.setState({ displayAdvancedSearch: !disp });
  };
  clickInStock = evt => {
    this.setState({
      inStock: evt.target.checked
    });
  };
  submitClearHandler = evt => {
    this.setState({
      searchQuery: "",
      minPrice: 0,
      maxPrice: 1000000000,
      quantity: undefined,
      inStock: undefined
    });
    this.props.dispatch({ type: "clearSearch" });
  };
  displayAdvancedSearch = () => {
    if (!this.state.displayAdvancedSearch) {
      return null;
    }
    {
      return (
        <div className="advanced-search">
          <div>
            Minimum price
            <input
              type="number"
              onChange={this.handleMinimumPrice}
              placeholder="0"
              value={this.state.minPrice}
            />
          </div>
          <div>
            Maximum price
            <input
              type="number"
              onChange={this.handleMaximumPrice}
              placeholder="100000"
              value={this.state.maxPrice}
            />
          </div>
          <div>
            Item in stock
            <input
              type="checkbox"
              onChange={this.clickInStock}
              value={this.state.inStock}
            />
          </div>
          <div>
            <button onClick={this.submitClearHandler}>Clear search</button>
          </div>
        </div>
      );
    }
  };
  render = () => {
    return (
      <div className="topbar-search">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="search"
              className="search-field"
              onChange={this.onQueryChange}
              value={this.state.searchQuery}
              placeholder="I'm looking for..."
            />
            <input type="submit" value="search" className="search-button" />
          </div>
        </form>
        <div>
          {this.displayAdvancedSearch()}
          <button
            onClick={this.toggleAdvancedSearch}
            className="search-advanced"
          >
            Advanced Search
          </button>
        </div>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    products: st.products,
    searchResults: st.searchResults
  };
};

let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
