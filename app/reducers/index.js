import { combineReducers } from "redux";
import FamilyReducer from "./FamilyReducer.js";
import UserReducer from "./UsersReducer.js";
export default reducer = combineReducers({
    users:UserReducer,
    Families:FamilyReducer
})