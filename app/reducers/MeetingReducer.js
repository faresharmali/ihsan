
const Meetings = 
    {
        "2022-04-11": [
          { name: "11", startTime: "8:00", endTime: "10:30" },
          { name: "11", startTime: "10:30", endTime: "12:25" },
          { name: "11", startTime: "13:00", endTime: "15:30" },
        ],
        "2022-04-16": [
          { name: "16", startTime: "9:00", endTime: "10:30" },
          { name: "16", startTime: "11:00", endTime: "12:30" },
        ],
        "2022-04-17": [
          { name: "17", startTime: "8:00", endTime: "10:30" },
        ],
        "2022-04-18": [
          { name: "18", startTime: "8:00", endTime: "9:00" },
          { name: "18", startTime: "9:00", endTime: "10:30" },
        ],
        "2022-04-19": [
          { name: "19", startTime: "8:00", endTime: "10:30" },
          { name: "19", startTime: "8:00", endTime: "10:30" },
        ],
        "2022-04-20": [
          { name: "20", startTime: "8:00", endTime: "10:30" },
          { name: "20", startTime: "8:00", endTime: "10:30" },
        ],
      }

  const AddChild=(state,action)=>{
      state.forEach((f)=>{
          if(f.id==action.id){
              f.Children=[...f.Children,{name:"خرا"}]
          }
      })
      return state
  }
  export default MeetingReducer = (state = Meetings, action) => {
    switch (action.type) {
      case "ShowMeeting":
        return state;
      case "AddMeeting":
        return {...state};
      case "AddChild":
        return AddMeeting(state,action);
      default:
        return state;
    }
  };
  