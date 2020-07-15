import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import transactions from "./reducers/transactions";
import displayedTransactions from "./reducers/displayedTransactions";

export default combineReducers({
  currentUser,
  transactions,
  displayedTransactions,
});
