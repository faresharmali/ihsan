import { combineReducers } from "redux";
import FamilyReducer from "./FamilyReducer.js";
import UserReducer from "./UsersReducer.js";
import InformationsReducer from "./InformationsReducer.js";
import MeetingReducer from "./MeetingReducer.js";
import DonatorsReducer from "./DonatorsReducer.js";
export default reducer = combineReducers({
    users:UserReducer,
    Families:FamilyReducer,
    Informations:InformationsReducer,
    Meetings:MeetingReducer,
    Donators:DonatorsReducer,

})