import actions from "../actions";

export default function transactions(state = [], action) {
  switch (action.type) {
    case actions.STORE_TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
}
