const Donators = [];
export default DonatorsReducer = (state = Donators, action) => {
  switch (action.type) {
    case "ShowDonators":
      return state;
    case "AddDonator":
      return [...state, action.data];
      case "updateDonatorsList":
        return [ ...action.data];
    default:
      return state;
  }
};
