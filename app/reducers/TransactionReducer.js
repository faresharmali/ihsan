const Finance = {
  transactions: [],
  hassalat: [],
};

export default TransactionReducer = (state = Finance, action) => {
  switch (action.type) {
    case "GetInformations":
      return state;
    case "UpdateTransactions":
      return { ...state, transactions: [...action.data] };

    case "UpdateHassalat":
      return { ...state, hassalat: [...action.data] };
    default:
      return state;
  }
};
