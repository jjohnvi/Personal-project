import axios from "axios";

const initialState = {
  liked: false,
  loading: false,
  posts: [],
  likesCount: [],
  likesForUser: null
};

const LIKE_POST = "LIKE_POST";
const GET_ALL_LIKES = "GET_ALL_LIKES";
const GET_LIKES = "GET_LIKES";

export const likePost = post => {
  return {
    type: LIKE_POST,
    payload: axios.post(`/api/likes/${post}`)
  };
};

export const getAllLikes = () => {
  return {
    type: GET_ALL_LIKES,
    payload: axios.get("/api/likes")
  };
};

export const getLikes = id => {
  return {
    type: GET_LIKES,
    payload: axios.get(`/api/likes/${id}`)
  };
};

export function likesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${LIKE_POST}_PENDING`:
      return { ...state, loading: true, liked: false };
    case `${LIKE_POST}_FULFILLED`:
      return { ...state, loading: false, liked: payload.data };

    // case `${GET_ALL_LIKES}_PENDING`:
    //   return { ...state, loading: true, likesCount: [] };
    case `${GET_ALL_LIKES}_FULFILLED`:
      return { ...state, loading: false, likesCount: payload.data };

    case `${GET_LIKES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        likesForUser: payload.data.likes[0].count,
        liked: payload.data
      };

    default:
      return state;
  }
}
