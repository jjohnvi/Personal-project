import axios from "axios";

const initialState = {
  comments: [],
  loading: false
};

const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENTS = "GET_COMMENTS";
const DELETE_COMMENT = "DELETE_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";

export const addComment = (post_id, comment) => {
  return {
    type: ADD_COMMENT,
    payload: axios.post(`/api/comments/${post_id}`, { comment })
  };
};

export const getComments = id => {
  return {
    type: GET_COMMENTS,
    payload: axios.get(`/api/comments/${id}`)
  };
};

export const deleteComment = id => {
  return {
    type: DELETE_COMMENT,
    payload: axios.delete(`/api/comments/${id}`)
  };
};

export const updateComment = (id, comment) => {
  return {
    type: UPDATE_COMMENT,
    payload: axios.put(`/api/comments/${id}`, { comment })
  };
};

export function commentsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${ADD_COMMENT}_PENDING`:
      return { ...state, loading: true };
    case `${ADD_COMMENT}_FULFILLED`:
      return { ...state, loading: false };

    case `${GET_COMMENTS}_PENDING`:
      return { ...state, loading: true, comments: [] };
    case `${GET_COMMENTS}_FULFILLED`:
      return { ...state, loading: false, comments: payload.data };

    case `${DELETE_COMMENT}_PENDING`:
      return { ...state, loading: true };
    case `${DELETE_COMMENT}_FULFILLED`:
      return { ...state, loading: false };

    case `${UPDATE_COMMENT}_PENDING`:
      return { ...state, loading: true };
    case `${UPDATE_COMMENT}_FULFILLED`:
      return { ...state, loading: false };
    default:
      return state;
  }
}
