const Transactions = [

];

export default TransactionReducer = (state = Transactions, action) => {
  switch (action.type) {
    case "GetInformations":
      return state;
    case "UpdateTransactions":
      return [...action.data];
    default:
      return state;
  }
};
