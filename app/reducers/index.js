import { combineReducers } from "redux";
import FamilyReducer from "./FamilyReducer.js";
import UserReducer from "./UsersReducer.js";
import InformationsReducer from "./InformationsReducer.js";
import MeetingReducer from "./MeetingReducer.js";
import AuthReducer from "./AuthReducer";
import DonatorsReducer from "./DonatorsReducer"
import ReportsReducer from "./ReportsReducer.js";
export default reducer = combineReducers({
    users:UserReducer,
    Families:FamilyReducer,
    Informations:InformationsReducer,
    Meetings:MeetingReducer,
    Donators:DonatorsReducer,
    Auth:AuthReducer,
    Reports:ReportsReducer,

})