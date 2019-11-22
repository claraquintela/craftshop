import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "logout") {
    return {
      ...state,
      login: false,
      username: ""
    };
  }
  if (action.type === "login-success") {
    return {
      ...state,
      login: true,
      username: action.username
    };
  }

  if (action.type === "set-products") {
    return {
      ...state,
      products: action.products
    };
  }
  if (action.type === "set-users") {
    console.log("action.users", action.users);
    return {
      ...state,
      users: action.users
    };
  }
  if (action.type === "search-results") {
    return {
      ...state,
      searchResults: action.searchResults
    };
  }
  if (action.type === "new-title") {
    return {
      ...state,
      title: action.title
    };
  }
  if (action.type === "new-description") {
    return {
      ...state,
      description: action.description
    };
  }
  if (action.type === "new-location") {
    return {
      ...state,
      location: action.location
    };
  }
  if (action.type === "new-quantity") {
    return { ...state, quantity: action.quantity };
  }
  if (action.type === "new-price") {
    return {
      ...state,
      price: action.price
    };
  }
  if (action.type === "new-img") {
    return {
      ...state,
      img: action.img
    };
  }
  if (action.type === "newproduct-success") {
    return {
      ...state,
      newProductUpload: true
    };
  }
  if (action.type === "addedToCart") {
    return {
      ...state,
      cart: state.cart.concat(action.added)
    };
  }
  if (action.type === "toggleAdvancedSearch") {
    return {
      ...state,
      displayAdvancedSearch: !state.displayAdvancedSearch
    };
  }
  if (action.type === "deleteCartItem") {
    console.log("action", action.cart);
    return {
      ...state,
      cart: action.cart
    };
  }

  return state;
};

let store = createStore(
  reducer,
  {
    products: [],
    searchResults: [],
    users: [],
    username: "",
    login: false,
    reviews: [],
    cart: [],
    title: "",
    price: "",
    location: "",
    description: "",
    img: null,
    newProductUpload: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
