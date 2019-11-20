import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "logout") {
    return { ...state, login: false };
  }
  if (action.type === "login-success") {
    return { ...state, login: true };
  }
  if (action.type === "query") {
    return { ...state, searchQuery: action.q };
  }
  if (action.type === "minimum-price") {
    return { ...state, minimum: action.price };
  }
  if (action.type === "maximum-price") {
    return { ...state, maximum: action.price };
  }
  if (action.type === "set-products") {
    return { ...state, products: action.products };
  }
  if (action.type === "set-users") {
    console.log("action.users", action.users);
    return { ...state, users: action.users };
  }
  if (action.type === "search-results") {
    return { ...state, searchResults: action.searchResults };
  }
  if (action.type === "addedToCart") {
    console.log("reducer hit for add to cart");
    return { ...state, cart: state.cart.concat(action.added) };
  }

  return state;
};

let store = createStore(
  reducer,
  {
    products: [],
    searchResults: [],
    users: [],
    login: false,
    searchQuery: "",
    minimum: 0,
    maximum: 1000000,
    reviews: [],
    cart: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
