import Man from "../../assets/avatars/man.png";
import Man2 from "../../assets/avatars/man2.png";
import Woman from "../../assets/avatars/user.png";
import Woman2 from "../../assets/avatars/woman.png";
import User from "../../assets/avatars/woman2.png";
import Gamer from "../../assets/avatars/gamer.png";
const users = [
    {
      0: "فارس حرمالي",
      1: "ادارة",
      icon1: "phone",
      pic: Man,
    },

    {
      0: "عبد المجيد اسماعيل",
      1: "رئيس قسم",
      icon1: "رئيس قسم",
      pic: Man2,
    },

    {
      0: "سماعيل دحماني",
      1: "وسيط اجتماعي",
      icon1: "phone",
      pic: Woman,
    },

    {
      0: "اسلام مقران",
      1: "وسيط اجتماعي",
      icon1: "phone",
      pic: Woman2,
    },
    {
      0: "عيسى بن مبارك",
      1: "موزع القفة",
      icon1: "phone",
      pic: User,
    },
    {
      0: "حسين أمزيان",
      1: "موزع القفة",
      icon1: "phone",
      pic: Gamer,
    },
  ];
  export default UserReducer=(state=users,action)=>{
    switch(action.type){
        case "showUsers":return state
        case "AddUser":
          return [...state, action.data];
        default : return state
    }
}


