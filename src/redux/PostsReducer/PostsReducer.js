import axios from "axios";

const initialState = {
  posts: [],
  loading: false
};

const GET_POSTS = "GET_POSTS";
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const GET_POST = "GET_POST";

export const getPosts = () => {
  return {
    type: GET_POSTS,
    payload: axios.get("/api/posts")
  };
};

export const addPost = (image_url, content, title) => {
  return {
    type: ADD_POST,
    payload: axios.post("/api/posts", { image_url, content, title })
  };
};

export const removePost = id => {
  return {
    type: REMOVE_POST,
    payload: axios.delete(`/api/posts/:${id}`)
  };
};

export const getPost = id => {
  return {
    type: GET_POST,
    payload: axios.get(`/api/posts/${id}`)
  };
};

export function postsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${GET_POSTS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_POSTS}_FULFILLED`:
      return { ...state, loading: false, posts: payload.data };

    case `${ADD_POST}_PENDING`:
      return { ...state, loading: true };
    case `${ADD_POST}_FULFILLED`:
      console.log(payload);
      return { ...state, loading: false, posts: payload.data };

    case `${REMOVE_POST}_PENDING`:
      return { ...state, loading: true };
    case `${REMOVE_POST}_FULFILLED`:
      return { ...state, loading: false, posts: payload.data };

    case `${GET_POST}_PENDING`:
      return { ...state, loading: true, posts: [] };
    case `${GET_POST}_FULFILLED`:
      return { ...state, loading: false, posts: payload.data };
    default:
      return state;
  }
}
