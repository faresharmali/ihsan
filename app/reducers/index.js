import { combineReducers } from "redux";
import FamilyReducer from "./FamilyReducer.js";
import UserReducer from "./UsersReducer.js";
import InformationsReducer from "./InformationsReducer.js";
export default reducer = combineReducers({
    users:UserReducer,
    Families:FamilyReducer,
    Informations:InformationsReducer
})