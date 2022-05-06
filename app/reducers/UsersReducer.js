import Man from "../../assets/avatars/man.png";
import Man2 from "../../assets/avatars/man2.png";
import Woman from "../../assets/avatars/user.png";
import Woman2 from "../../assets/avatars/woman.png";
import User from "../../assets/avatars/woman2.png";
import Gamer from "../../assets/avatars/gamer.png";

const users = [];
export default UserReducer = (state = users, action) => {
  switch (action.type) {
    case "showUsers":
      return state;
    case "updateUserList":
      return [ ...action.data];
    case "AddUser":
      return [...state, action.data];
    default:
      return state;
  }
};
