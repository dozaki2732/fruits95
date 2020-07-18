import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import transactions from "./reducers/transactions";

export default combineReducers({
  currentUser,
  transactions,
});
