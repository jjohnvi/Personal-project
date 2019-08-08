import axios from "axios";

const initialState = {
  comments: [],
  comment: "",
  loading: false
};

const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENTS = "GET_COMMENTS";
const DELETE_COMMENT = "DELETE_COMMENT";

export const addComment = id => {
  return {
    type: ADD_COMMENT,
    payload: axios.post(`/api/comments/${id}`)
  };
};

export const getComments = id => {
  return {
    type: GET_COMMENTS,
    payload: axios.get(`/api/comments/${id}`)
  };
};

export function commentsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${ADD_COMMENT}_PENDING`:
      return { ...state, loading: true };
    case `${ADD_COMMENT}_FULFILLED`:
      return { ...state, loading: false, comments: payload.data };

    case `${GET_COMMENTS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_COMMENTS}_FULFILLED`:
      return { ...state, loading: false, comments: payload.data };
    default:
      return state;
  }
}
