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
  return state;
};

let store = createStore(
  reducer,
  {
    products: [],
    users: [],
    login: false,
    searchQuery: "",
    minimum: 0,
    maximum: 1000000,
    reviews: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
