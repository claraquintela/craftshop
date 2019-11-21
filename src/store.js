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
  if (action.type === "new-title") {
    return { ...state, title: action.title };
  }
  if (action.type === "new-description") {
    return { ...state, description: action.description };
  }
  if (action.type === "new-location") {
    return { ...state, location: action.location };
  }
  if (action.type === "new-price") {
    return { ...state, price: action.price };
  }
  if (action.type === "new-img") {
    return { ...state, img: action.img };
  }
  if (action.type === "newproduct-success") {
    return { ...state, newProductUpload: true };
  }
  if (action.type === "addedToCart") {
    return { ...state, cart: state.cart.concat(action.added) };
  }
  if (action.type === "toggleAdvancedSearch") {
    return { ...state, displayAdvancedSearch: !state.displayAdvancedSearch };
  }
  if (action.type === "deleteCartItem") {
    return { ...state, cart: action.cart };
  }
  if (action.type === "productInStock") {
    return { ...state, inStock: action.inStock };
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
    inStock: undefined,
    reviews: [],
    cart: [],
    title: "",
    price: "",
    location: "",
    description: "",
    img: null,
    newProductUpload: false,
    displayAdvancedSearch: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
