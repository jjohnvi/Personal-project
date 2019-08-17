import axios from "axios";

const initialState = {
  comments: [],
  loading: false,
  comment: "",
  editStatus: false,
  comment_edit: ""
};

const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENTS = "GET_COMMENTS";
const DELETE_COMMENT = "DELETE_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const POPULATE_COMMENT = "POPULATE_COMMENT";
const SET_EDIT_STATUS = "SET_EDIT_STATUS";
const HANDLE_EDIT_ON_CHANGE = "HANDLE_EDIT_ON_CHANGE";

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

export const populateComment = comment => {
  return {
    type: POPULATE_COMMENT,
    payload: comment
  };
};

export const setEditStatus = editStatus => {
  return {
    type: SET_EDIT_STATUS,
    payload: editStatus
  };
};

export const handleEditOnChange = comment => {
  return {
    type: HANDLE_EDIT_ON_CHANGE,
    payload: comment
  };
};

export function commentsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${ADD_COMMENT}_PENDING`:
      return { ...state, loading: true };
    case `${ADD_COMMENT}_FULFILLED`:
      console.log(state.comment);
      console.log(state.comments);
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

    case HANDLE_EDIT_ON_CHANGE:
      return { ...state, comment_edit: payload };

    // case `${SET_EDIT_STATUS}_PENDING`:
    //   return { ...state, loading: true };
    case SET_EDIT_STATUS:
      console.log(payload);
      return { ...state, editStatus: payload };

    case POPULATE_COMMENT:
      return { ...state, comment_edit: payload };
    default:
      return state;
  }
}
