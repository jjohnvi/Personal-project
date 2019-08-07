import axios from "axios";

const initialState = {
  following: false,
  loading: false,
  users: []
};

const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SEARCH_USER = "SEARCH_USER";

export const searchUser = username => {
  return {
    type: SEARCH_USER,
    payload: axios.get(`/api/users?username=${username}`)
  };
};

export function followsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${FOLLOW_USER}_PENDING`:
      return { ...state, loading: true };
    case `${FOLLOW_USER}_FULFILLED`:
      return { ...state, loading: false, following: true };
    case `${SEARCH_USER}_PENDING`:
      return { ...state, loading: true };
    case `${SEARCH_USER}_FULFILLED`:
      console.log(payload.data);
      return { ...state, loading: false, users: payload.data };
    default:
      return state;
  }
}
