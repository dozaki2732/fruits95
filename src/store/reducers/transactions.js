import actions from "../actions";

export default function transactions(transactions = {}, action) {
  let newTransactions = { ...transactions };
  switch (action.type) {
    case actions.STORE_ALL_TRANSACTIONS:
      newTransactions = action.payload;
      return newTransactions;
    default:
      return transactions;
  }
}
