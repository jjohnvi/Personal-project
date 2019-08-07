import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import { userReducer } from "./UserReducer/UserReducer";
import { postsReducer } from "./PostsReducer/PostsReducer";
import { followsReducer } from "./FollowsReducer/FollowsReducer";

const root = combineReducers({
  userReducer,
  postsReducer,
  followsReducer
});

export default createStore(root, applyMiddleware(promise));
