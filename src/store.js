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
    return {
      ...state,
      users: action.users
    };
  }
  if (action.type === "search-results") {
    return {
      ...state,
      searchResults: action.searchResults,
      hasSearched: true
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
  if (action.type === "clearSearch") {
    return { ...state, searchResults: [], hasSearched: false };
  }

  if (action.type === "deleteCartItem") {
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
    newProductUpload: false,
    hasSearched: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
