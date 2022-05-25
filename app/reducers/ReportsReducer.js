const Reports = [];

export default FamilyReducer = (state = Reports, action) => {
  switch (action.type) {
    
    case "updateReportsList":
      return [...action.data];
 
    default:
      return state;
  }
};
