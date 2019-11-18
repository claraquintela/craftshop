import { connect } from "react-redux";
import React, { Component } from "react";

class UnconnectedSearch extends Component {
  onQueryChange = evt => {
    this.props.dispatch({ type: "query", q: evt.target.value });
  };
  handleMinimumPrice = evt => {
    let price = parseInt(evt.target.value);
    this.props.dispatch({ type: "minimum-price", price: price });
  };
  handleMaximumPrice = evt => {
    let price = parseInt(evt.target.value);
    this.props.dispatch({ type: "maximum-price", price: price });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    let response = await fetch("/search");
    let responseBody = await response.text();
    let parsed = JSON.parse(responseBody);
    this.props.dispatch({ type: "searchQuery", products: parsed });
    this.setState({ query: "", minPrice: "", maxPrice: "" });
  };
  render = () => {
    return (
      <div>
        <form onSubmit="handleSubmit">
          <div>
            Search Query
            <input
              type="text"
              onChange={this.onQueryChange}
              value={this.props.query}
            />
            <input type="submit" value="search" />
          </div>
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
        </form>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    query: st.searchQuery,
    minPrice: st.min,
    maxPrice: st.max
  };
};

let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
