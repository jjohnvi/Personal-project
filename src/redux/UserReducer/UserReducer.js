import axios from "axios";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  loading: false,
  user: {}
};

const UPDATE_STATE = "UPDATE_STATE";
const RESET_FIELDS = "RESET_FIELDS";
const LOGIN_USER = "LOGIN_USER";

export const updateState = e => {
  return {
    type: UPDATE_STATE,
    payload: e
  };
};

export const loginUser = (username, password) => {
  return {
    type: LOGIN_USER,
    payload: axios.post("/auth/login", {
      username: username,
      password: password
    })
  };
};

export const resetFields = () => {
  return {
    type: RESET_FIELDS
  };
};

export function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    case `${LOGIN_USER}_PENDING`:
      return { ...state, loading: true };
    case `${LOGIN_USER}_FULFILLED`:
      console.log(payload.data);
      return { ...state, loading: false, user: payload.data };
    default:
      return state;
  }
}
