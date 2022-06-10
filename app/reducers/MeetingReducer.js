
const Meetings = []


  export default MeetingReducer = (state = Meetings, action) => {
    switch (action.type) {
      case "updateMeetList":
        return  [...action.data];
     
      default:
        return state;
    }
  };
  