import { supportReducer } from "./Support.Reducer";
import { userReducer } from "./User.reducer";
import { combineReducers } from "redux";
import { chatReducer } from "./Chat.reducer";

const combineReducer = combineReducers({ chatState:chatReducer, userState:userReducer, supportState:supportReducer });

export default combineReducer;
