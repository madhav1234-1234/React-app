import UsersReducer from "./UsersReducer";
import { combineReducers } from "redux";
 
const allReducers = combineReducers({
    allUsers: UsersReducer
});

export default allReducers;