import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import { userReducer } from "./UserReducer/UserReducer";
import { postsReducer } from "./PostsReducer/PostsReducer";
import { followsReducer } from "./FollowsReducer/FollowsReducer";
import { likesReducer } from "./LikesReducer/LikesReducer";
import { commentsReducer } from "./CommentsReducer/CommentsReducer";

const root = combineReducers({
  userReducer,
  postsReducer,
  followsReducer,
  likesReducer,
  commentsReducer
});

export default createStore(root, applyMiddleware(promise));
