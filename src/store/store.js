import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./combineReducers";

const initialState = {
  user: {},
  transactions: [],
  displayedTransactions: [],
};

const store = createStore(rootReducer, initialState, composeWithDevTools());

export default store;
