import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import { userReducer } from "./UserReducer/UserReducer";

const root = combineReducers({
  userReducer
});

export default createStore(root, applyMiddleware(promise));
