import { connect } from "react-redux";
import React, { Component } from "react";
import "./search.css";

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
    let data = new FormData();
    data.append("search", this.props.query);
    console.log("search", this.props.query, data);
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
    this.setState({ query: "", minPrice: "", maxPrice: "" });
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
              value={this.props.query}
              placeholder="I'm looking for..."
            />
            <input type="submit" value="search" className="search-button" />
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
        <div>
          <ul>
            {this.props.searchResults.map(items => {
              return <li>{items.title}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    searchResults: st.searchResults,
    query: st.searchQuery,
    minPrice: st.min,
    maxPrice: st.max
  };
};

let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;

//main page for css to define the background color, the font, etc
//if you need to define position must be inside the component, example if login and signup to be small boxes in the top right corner and then position it
