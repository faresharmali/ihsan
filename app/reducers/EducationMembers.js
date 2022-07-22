const Members = [];
export default EducationMembers = (state = Members, action) => {
  switch (action.type) {
    case "ShowDonators":
      return state;
  
      case "updateEducationMembers":
        return [ ...action.data];
    default:
      return state;
  }
};
