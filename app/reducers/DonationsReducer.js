const Donations = [];
export default DonationsReducer = (state = Donations, action) => {
  switch (action.type) {
    case "ShowDonators":
      return state;
    case "AddDonator":
      return [...state, action.data];
      case "updateDonationsList":
        return [ ...action.data];
    default:
      return state;
  }
};
