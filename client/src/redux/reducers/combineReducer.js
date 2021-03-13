const { combineReducers } = require("redux");
const { chatReducer } = require("./Chat.reducer");
const { userReducer } = require("./User.reducer");

const combineReducer = combineReducers({ chatState:chatReducer, userState:userReducer });

export default combineReducer;
