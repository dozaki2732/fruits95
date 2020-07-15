import actions from "../actions";

export default function displayedTransactions(state = [], action) {
  switch (action.type) {
    case actions.DISPLAY_TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
}
