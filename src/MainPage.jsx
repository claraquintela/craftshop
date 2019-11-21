import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./mainpage.css";

class UnconnectedMainPage extends Component {
  render = () => {
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
                  <div></div>
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
    products: state.products
  };
};
let MainPage = connect(mapStateToProps)(UnconnectedMainPage);
export default MainPage;
