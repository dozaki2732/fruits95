import actions from "../actions";

export default function currentUser(state = [], action) {
  switch (action.type) {
    case actions.STORE_TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
}
