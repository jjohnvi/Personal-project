import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import { userReducer } from "./UserReducer/UserReducer";
import { postsReducer } from "./PostsReducer/PostsReducer";
import { followsReducer } from "./FollowsReducer/FollowsReducer";
import { likesReducer } from "./LikesReducer/LikesReducer";

const root = combineReducers({
  userReducer,
  postsReducer,
  followsReducer,
  likesReducer
});

export default createStore(root, applyMiddleware(promise));
