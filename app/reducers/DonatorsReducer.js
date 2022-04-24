
const Donators = [
    {
      0: "فارس حرمالي",
      2: "العاصمة",
      1: "0660818412",
      fees:1500,
      families:[],
      kids:[],
    },
    {
      0: "عمر شرفاوي",
      2: "البويرة",
      1: "0540068768",
      fees:1500,
      families:[],
      kids:[],
    },

   
  ];
  export default DonatorsReducer=(state=Donators,action)=>{
    switch(action.type){
        case "ShowDonators":return state
        case "AddDonator":
          return [...state, action.data];
        default : return state
    }
}


