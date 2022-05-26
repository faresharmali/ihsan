const Reports = [];

export default ActivityReducer = (state = Reports, action) => {
  switch (action.type) {
    
    case "updateReportsList":
      return [...action.data];
 
    default:
      return state;
  }
};
