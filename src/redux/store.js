import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import { userReducer } from "./UserReducer/UserReducer";
import { postsReducer } from "./PostsReducer/PostsReducer";
import { followsReducer } from "./FollowsReducer/FollowsReducer";
import { likesReducer } from "./LikesReducer/LikesReducer";
import { commentsReducer } from "./CommentsReducer/CommentsReducer";
import { modalReducer } from "./ModalReducer/ModalReducer";
import { pictureReducer } from "./PictureReducer/PictureReducer";

const root = combineReducers({
  userReducer,
  postsReducer,
  followsReducer,
  likesReducer,
  commentsReducer,
  modalReducer,
  pictureReducer
});

export default createStore(root, applyMiddleware(promise));
