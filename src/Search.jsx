import { connect } from "react-redux";
import React, { Component } from "react";
import "./search.css";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAdvancedSearch: false,
      
    };
  }
  onQueryChange = evt => {
    this.props.dispatch({ type: "query", q: evt.target.value });
  };
  handleMinimumPrice = evt => {
    console.log(evt.target.value);

    this.props.dispatch({
      type: "minimum-price",
      price: parseInt(evt.target.value)
    });
  };
  handleMaximumPrice = evt => {
    this.props.dispatch({
      type: "maximum-price",
      price: parseInt(evt.target.value)
    });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("search", this.props.query);
    data.append("minPrice", this.props.minPrice);
    data.append("maxPrice", this.props.maxPrice);
    data.append("inStock", this.props.inStock);
    data.append("quantity", this.props.quantity);
    console.log(
      "search",
      this.props.query,
      this.props.minPrice,
      this.props.maxPrice,
      this.props.quantity,
      this.props.inStock
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
    let disp = this.state.displayAdvancedSearch;
    this.setState({ displayAdvancedSearch: !disp });
  };
  clickInStock = evt => {
    this.props.dispatch({
      type: "inStock",
      inStock: evt.target.checked
    });
  };
  submitClearHandler = () => {
    this.props.dispatch({ type: "clearSearch" });
  };
  displayAdvancedSearch = () => {
    if (!this.state.displayAdvancedSearch) {
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
              placeholder="0"
            />
          </div>
          <div>
            Maximum price
            <input
              type="number"
              onChange={this.handleMaximumPrice}
              placeholder="100000"
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
        </form>
        <div>
          {this.displayAdvancedSearch()}
          <button onClick={this.toggleAdvancedSearch} className="search-button">
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
    searchResults: st.searchResults,
    query: st.searchQuery,
    minPrice: st.minimum,
    maxPrice: st.maximum,
    quantity: st.quantity,
    inStock: st.inStock,
    displayAdvancedSearch: st.displayAdvancedSearch
  };
};

let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
