
const LoggedUser = {};

export default FamilyReducer = (state = LoggedUser, action) => {
  switch (action.type) {
    case "getLoggedUser":
      return state;
      case "setLoggedUser":
        return { ...action.data};
    case "DeleteLoggedUser":
      return {};
  
    default:
      return state;
  }
};
