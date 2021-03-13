import thunk from "redux-thunk";
import combineReducer from '../reducers/combineReducer';
const { createStore, applyMiddleware } = require("redux");

export const Store = createStore(combineReducer, applyMiddleware(thunk));