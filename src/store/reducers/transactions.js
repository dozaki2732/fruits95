import actions from "../actions";

export default function transactions(transactions = {}, action) {
  let newTransactions = { ...transactions };
  switch (action.type) {
    case actions.STORE_ALL_TRANSACTIONS:
      newTransactions = action.payload;
      return newTransactions;
    case actions.DISPLAY_TRANSACTIONS:
      //    const filteredTransactions = transactions.filter((transaction) => {
      // const selectedYearMonth = toDisplayDate(this.state.date, "yyyyMM");
      // const transactionYearMonth = toDisplayDate(transaction.date, "yyyyMM");
      // //want it to look like "202007"
      // return selectedYearMonth === transactionYearMonth;
      newTransactions = action.payload;
      return newTransactions;
    case actions.DISPLAY_TOTAL_EXPENSE:
      /*
      
      
      */
      return;
    default:
      return transactions;
  }
}
