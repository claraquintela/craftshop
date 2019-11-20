import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedTopBar extends Component {
  render = () => {
    return (


    )} 
}

let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;