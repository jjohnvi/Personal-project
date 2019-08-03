import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import { userReducer } from "./UserReducer/UserReducer";
import { postsReducer } from "./PostsReducer/PostsReducer";

const root = combineReducers({
  userReducer,
  postsReducer
});

export default createStore(root, applyMiddleware(promise));
