import axios from "axios";

const initialState = {
  following: false,
  loading: false,
  users: []
};

const FOLLOW_USER = "FOLLOW_USER";
const SEARCH_USER = "SEARCH_USER";
const CHECK_FOLLOW = "CHECK_FOLLOW";

export const searchUser = username => {
  return {
    type: SEARCH_USER,
    payload: axios.get(`/api/users?username=${username}`)
  };
};

export const followUser = id => {
  return {
    type: FOLLOW_USER,
    payload: axios.post(`/api/follow/${id}`)
  };
};

export const checkFollow = id => {
  return {
    type: CHECK_FOLLOW,
    payload: axios.get(`/api/follow/${id}`)
  };
};

export function followsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${FOLLOW_USER}_PENDING`:
      return { ...state, loading: true, following: false };
    case `${FOLLOW_USER}_FULFILLED`:
      return { ...state, loading: false, following: payload.data };

    case `${SEARCH_USER}_PENDING`:
      return { ...state, loading: true };
    case `${SEARCH_USER}_FULFILLED`:
      console.log(payload.data);
      return { ...state, loading: false, users: payload.data };

    case `${CHECK_FOLLOW}_PENDING`:
      return { ...state, loading: true };
    case `${CHECK_FOLLOW}_FULFILLED`:
      return { ...state, loading: false };

    default:
      return state;
  }
}
